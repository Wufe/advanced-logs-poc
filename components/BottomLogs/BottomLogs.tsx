import { Box, DOMElement, measureElement, Text } from "ink"
import React, { memo, useEffect, useRef, useState } from "react"
import { getLogText, isLogCommand, TLog, TLogs } from "../../log";

type TProps = {
    logs: TLogs;
}

const useCalculateVisibleLogs = (logs: TLogs, cursor: number, height: number) => {

    // cursor = logs.length -1;

    let visibleLogs: TLog[] = [];

    for (let i = cursor; i >= 0 && visibleLogs.length < height; i--) {
        const log = logs[i];

        if (isLogCommand(log))
            continue;

        visibleLogs.push(log);
    }

    return {
        highlighted: visibleLogs[0]?.I,
        visibleLogs: visibleLogs.reverse(),
    }
}

export const BottomLogs = memo((props: TProps) => {

    const [logsHeight, setLogsHeight] = useState(3);
    const [cursor, setCursor] = useState(props.logs.length - 1);
    const containerRef = useRef<DOMElement>(null);
    const { highlighted, visibleLogs } = useCalculateVisibleLogs(props.logs, cursor, logsHeight);

    useEffect(() => {
        setCursor(props.logs.length -1)
    }, [props.logs])

    useEffect(() => {
        if (!containerRef.current)
            return;

        const { height } = measureElement(containerRef.current);
        setLogsHeight(height - 2);
    });

    return <Box
        ref={containerRef}
        flexDirection='column'
        flexShrink={1}
        flexGrow={1}
        minHeight={5}
        borderStyle='round'
        borderColor='yellow'
        paddingLeft={1}>
        {visibleLogs.map(l => {
            if (highlighted !== l.I)
                return <Text key={l.I} >{getLogText(l.t)}</Text>
            return <Text key={l.I} underline>{getLogText(l.t)}</Text>
            // return <Box key={l.I}>
            //     <Text underline>{l.t[0] || ' '}</Text>
            //     <Text>{(l.t || '').slice(1, -1)}</Text>
            // </Box>
        })}
    </Box>
}, (prev, next) => {
    return !!prev.logs.length &&
        !!next.logs.length &&
        prev.logs[prev.logs.length - 1] === next.logs[next.logs.length - 1];
});