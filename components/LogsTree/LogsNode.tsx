import { Box, DOMElement, measureElement, Text } from 'ink';
import React, { useEffect, useRef, useState } from 'react';
import { getLogText, TLog } from '../../log';
import { Node } from './hooks/useLogsParser';;

type TProps = {
    node: Node
};

export const LogsNode = (props: TProps) => {
    const ref = useRef<DOMElement>(null);
    const [maxLogsCount, setMaxLogsCount] = useState(Infinity);
    const [visibleLogs, setVisibleLogs] = useState(props.node.logs);

    useEffect(() => {
        if (!ref.current)
            return;

        const { height } = measureElement(ref.current);
        setMaxLogsCount(Math.max(height - 2, 1)); // borders + bottom padding
    });

    useEffect(() => {
        setVisibleLogs(props.node.logs.filter((_, i) => i < 5));
    }, [props.node.logs]);

    return <Box
        ref={ref}
        flexDirection="column-reverse"
        marginLeft={props.node.depth}
        borderStyle='round'
        paddingLeft={1}
        minHeight={3}>
        {props.node.children.map(n => <LogsNode key={n.scopeUUID} node={n} />)}
        {visibleLogs.map(l => <Text key={l.I}>{getLogText(l.t)}</Text>)}
    </Box>
};