import { createLogger, LoggerOptions, transports } from 'winston';

const options: LoggerOptions = {
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'debug.log', level: 'debug' }),
    ],
};

const logger = createLogger(options);

export default logger;
