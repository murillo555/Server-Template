import configuration from '@config'
const config = configuration.logger;
import { createLogger, format, transports, addColors } from 'winston'
const { combine, timestamp, colorize, printf, padLevels } = format;
import { SPLAT } from 'triple-beam'

const all = format((info: any) => {
    const splat = info[SPLAT] || []; ``
    const message = formatObject(info.message);
    const rest = splat.map(formatObject).join(' ');
    info.message = `${message} ${rest}`;
    return info;
});

function formatObject(param: any) {
    if (typeof param === 'object') return JSON.stringify(param);
    return param;
}

addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'blue',
    debug: 'cyan',
    silly: 'magenta'
});

const logger = createLogger({
    level: 'silly',
    levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 },
    format: combine(
        all(),
        timestamp(),
        colorize(),
        padLevels(),
        printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level} ${formatObject(message)}`;
        })
    ),
    silent: false
});

if ((config.console || {}).level) {
    logger.add(new transports.Console({
        level: config.console.level,
        silent: false
    }));
}

if (config.files) {
    config.files.forEach(function (file: any) {
        logger.add(new transports.File({
            level: file.level,
            silent: false,
            filename: file.path + file.name,
            maxsize: 1000000,
            maxFiles: 1
        }));
    });
}

export default logger;