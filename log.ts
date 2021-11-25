import chalk from "chalk";
import faker from "faker";
import { nanoid } from "nanoid";

export type TLog = {
    // ID
    I: string;
    // scopeID
    sI: string;
    // parentScopeID
    psI: string | null;
    // depth
    d: number;
    // text
    t: string | (() => string);
};

export type TLogCommand = {
    cmd: 'close';
    sI: string;
};

export type TLogs = (TLog | TLogCommand)[];

export const isLogCommand = (log: TLog | TLogCommand): log is TLogCommand =>
    ('cmd' in log);

export const getLogText = (t: TLog['t']) => typeof t === 'string' ? t : t();

const l1 = nanoid();
const l2 = nanoid();
const l3 = nanoid();
const l3bis = nanoid();

const logger = {
    debug(t: string) {
        return chalk.blue('[DEBUG]:'.padEnd(8, ' ')) + ' ' + t;
    },
    silly(t: string) {
        return chalk.magenta('[SILLY]:'.padEnd(8, ' ')) + ' ' + t;
    },
    info(t: string) {
        return chalk.yellow('[INFO]:'.padEnd(8, ' ')) + ' ' + t;
    },
};

const generateRandomText = () => {
    const logMethods = [logger.debug, logger.info, logger.silly];

    const chosenLogMethodIndex = Math.floor(Math.random() * logMethods.length);
    const chosenLogMethod = logMethods[chosenLogMethodIndex];

    return chosenLogMethod(faker.lorem.words(Math.random() * 5) +1);
}

export const exampleLogs: TLogs = [
    { I: nanoid(), sI: l1, psI: null, d: 0, t: generateRandomText() },
    { I: nanoid(), sI: l1, psI: null, d: 0, t: generateRandomText() },
    { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    // { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    { I: nanoid(), sI: l3, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l2, psI: l1, d: 1, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    { I: nanoid(), sI: l3bis, psI: l2, d: 2, t: generateRandomText() },
    // { cmd: 'close', sI: l3 },
];