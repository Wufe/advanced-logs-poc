import { TLog, TLogs } from "../../../log";

export const useLogsParser = (logs: TLogs, maxNodes: number, maxLogsPerNode: number) => {

    let nodesCount = 0;

    let done = false;

    const cursor = logs.length -1;

    let scopesMap: {[uuid: string]: Node} = {};
    const skippedScopes: {[uuid: string]: boolean} = {};
    const filledScopes: {[uuid: string]: boolean} = {};

    const canAddNode = () => nodesCount < maxNodes;
    const addNode = (scopeUUID: string, parentScopeUUID: string | null) => {
        const newNode = new Node(scopeUUID, parentScopeUUID);
        nodesCount ++;
        scopesMap[scopeUUID] = newNode;
    };

    const addLog = (log: TLog) => {
        const node = scopesMap[log.sI];
        if (!node)
            throw Error('Trying to add log to a non existing node');

        if (node.logs.length < maxLogsPerNode) {
            node.addLog(log);
        } else {
            skippedScopes[log.sI] = true;
            filledScopes[log.sI] = true;
        }
    }

    for (let i = cursor; i >= 0 && !done; i--) {

        const log = logs[i];

        const scopeUUID = log.sI;

        if (('cmd' in log)) {
            if(log.cmd === 'close') {
                skippedScopes[scopeUUID] = true;
                delete scopesMap[scopeUUID];
            }
            continue;
        }

        const parentScopeUUID = log.psI;

        if (scopeUUID in skippedScopes)
            continue;

        if (!(scopeUUID in scopesMap)) {
            if (!canAddNode()) {
                skippedScopes[scopeUUID] = true;
                continue;
            }

            addNode(scopeUUID, parentScopeUUID);
        }

        addLog(log);

        done = Object.keys(filledScopes).length === maxNodes;
    }

    const recursivelyAddChildrenToNode = (node: Node, depth = 1) => {

        if (!node) return;

        const children = Object.values(scopesMap)
            .filter(x => x.parentScopeUUID === node.scopeUUID);

        for (const child of children) {
            child.setDepth(depth);
            node.addChild(child);
            recursivelyAddChildrenToNode(child, depth +1);
        }
    }

    const rootNode = Object.values(scopesMap)
        .find(x => /* x.parentScopeUUID === null || */ !Object.values(scopesMap).find(y => y.scopeUUID === x.parentScopeUUID));

    if (rootNode) {
        recursivelyAddChildrenToNode(rootNode)
    } else {
        if (Object.values(scopesMap).length) {
            throw Error('Cannot find root node');
        }
    }

    return {
        tree: rootNode || new Node('', '')
    };
}

export class Node {

    constructor(public scopeUUID: string, public parentScopeUUID: string | null, public depth = 0) {}

    public children: Node[] = [];
    public logs: TLog[] = [];
    
    addChild(child: Node) {
        this.children.push(child);
    }

    addLog(log: TLog) {
        this.logs.push(log);
    }

    setDepth(depth: number) {
        this.depth = depth;
    }
}