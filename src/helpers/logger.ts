import { Platform } from 'react-native';

type Level = 'debug' | 'info' | 'warning' | 'error';

type LoggerOptions = {
    file: string;
    functionName?: string;
    message?: any;
    colorMessage?: string;
};

const colors = {
    debug: '\x1b[34m', // Blue
    info: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m', // Red
    ios: '\x1b[36m', // Cyan
    android: '\x1b[35m', // Light Purple
    reset: '\x1b[0m', // Reset color
};

const OS = Platform.OS;

const OS_COLOR = OS === 'ios' ? colors.ios : colors.android;

// get consoleLogFn function
const getConsoleLogFn = (level: Level) => {
    let consoleLogFn = console.log;
    switch (level) {
        case 'debug':
            consoleLogFn = console.debug;
            break;
        case 'info':
            consoleLogFn = console.info;
            break;
        case 'warning':
            consoleLogFn = console.warn;
            break;
        case 'error':
            consoleLogFn = console.error;
            break;
    }

    return consoleLogFn;
};

const logWithColor = (level: Level, options: LoggerOptions, ...optionalParams: any[]) => {
    if (__DEV__ === false) return;
    const consoleLogFn = getConsoleLogFn(level);

    let logMessage = `${OS_COLOR}[${OS}] ${colors[level]}[${level.toUpperCase()}] ${'\x1b[33m'}[${options.file}`;

    let appendData = '';
    if (options.functionName) appendData += `::${options.functionName}]${colors.reset} =>`;
    else appendData += `]${colors.reset} =>`;

    if (options.message) {
        if (appendData.length > 0) {
            appendData += ' ';
        }
        if (options.colorMessage) {
            appendData += `${options.colorMessage}${options.message}`;
        } else {
            appendData += `${options.message}`;
        }
    }
    logMessage += appendData;

    if (optionalParams.length > 0) consoleLogFn(logMessage, optionalParams);
    else consoleLogFn(logMessage);
};

const Logger = {
    debug: (options: LoggerOptions, ...optionalParams: any[]) =>
        logWithColor('debug', options, ...optionalParams),
    info: (options: LoggerOptions, ...optionalParams: any[]) =>
        logWithColor('info', options, ...optionalParams),
    warning: (options: LoggerOptions, ...optionalParams: any[]) =>
        logWithColor('warning', options, ...optionalParams),
    error: (options: LoggerOptions, ...optionalParams: any[]) =>
        logWithColor('error', options, ...optionalParams),
};

export default Logger;
