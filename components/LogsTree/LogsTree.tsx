import { Box } from 'ink';
import React from 'react';
import { TLog, TLogs } from '../../log';
import { useLogsParser } from './hooks/useLogsParser';
import { LogsNode } from './LogsNode';

type TProps = {
    logs: TLogs;
};

export const LogsTree = (props: TProps) => {

    const {tree} = useLogsParser(props.logs, 5, Infinity);

    return <LogsNode node={tree} />;
};