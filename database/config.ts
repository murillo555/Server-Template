import mongoose from 'mongoose'
import logger from '@logger'

const connection = async () => {
    try {
        logger.verbose('(mongo, Connection)', 'Init connections...');
        logger.debug(`Connecting to: ${process.env.MONGODB_CNN}`)
        mongoose.connect(process.env.MONGODB_CNN || '', {
            family: 4,
        }).then(e => {
            logger.silly("(mongo, Connection)", "connected to database: " + process.env.MONGODB_CNN);
        });
    } catch (error) {
        logger.error('[Database, Connection]', error);
        throw new Error('(mongo,getClient)  Error initializing the database');
    }
}

const disconnect = async () => {
    try {
        mongoose.connection.close()
    } catch (error) {
        logger.error('[Database, Connection]', error);
        throw new Error('(mongo,getClient)  Error initializing the database');
    }
}


export { connection, disconnect };