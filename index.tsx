import React, { useState, useEffect } from 'react';
import { Box, render, Text } from 'ink';
import {nanoid} from 'nanoid';
import { exampleLogs, TLog, TLogs } from './log';
import { BottomLogs } from './components/BottomLogs/BottomLogs';
import { useLogsParser } from './components/LogsTree/hooks/useLogsParser';
import { LogsTree } from './components/LogsTree/LogsTree';
import { Node } from './components/LogsTree/hooks/useLogsParser';

const Counter = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(previousCounter => previousCounter + 1);
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return <Text color="green">{counter} tests passed</Text>;
};

type TProps = {
    logs: TLogs;
};

const App = (props: TProps) => {

    const [logs, setLogs] = useState<{ visible: TLogs; invisible: TLogs; }>({visible: [], invisible: props.logs });

    useEffect(() => {
        const timeout = setTimeout(() => {

            let {invisible, visible} = logs;

            if (!invisible.length)
                return;
            
            visible = [...visible, invisible[0]]
            invisible = invisible.slice(1);

            setLogs({visible, invisible});
        }, 50);
        return () => clearTimeout(timeout);
    }, [logs]);

    return <Box flexDirection='column' flexGrow={1} height={Math.round(process.stdout.rows)}>
        <LogsTree logs={logs.visible} />
        <BottomLogs logs={logs.visible} />
    </Box>;
};


const tree = useLogsParser(exampleLogs, 1000, 1000).tree;

const logNode = (node: Node) => {
    node.logs.reverse().forEach(l => console.log(`${'    '.repeat(node.depth)}${node.scopeUUID}: ${l.t}`));
    for (const child of node.children.reverse())
        logNode(child);
}

// logNode(tree);

(async () => {
    const { waitUntilExit } = render(<App logs={exampleLogs} />);
    setInterval(() => { }, 1000)

    await waitUntilExit();
})();