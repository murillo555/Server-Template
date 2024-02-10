import { Request, Response } from 'express';
import config from '@config';
const { dataBase } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { TransportType } from '@models';

interface RequestBody extends Request {
    user: UserInterface
}

const getTransportTypeByIdController = async (req: RequestBody, res: Response) => {
    logger.verbose('[TransportTypes, getTransportTypeById]', `User:${req.user.email} action: Get TransportType by Id`);
    const { id } = req.params;
    try {
        const transportType = await TransportType.findById(id).populate('updatedBy', '-__v').populate('createdBy', '-__v')
        if (!transportType) {
            logger.error('[TransportTypes, getTransportTypeById]', ` TransportType:${id} not found`);
            return res.status(404).json({ error: 'TransportType not found' });
        }
        logger.info('[TransportTypes, getTransportTypeById]', `User:${req.user.email} Success`);
        res.json(transportType);
    } catch (error) {
        logger.error('[TransportTypes, getTransportTypeById]', ` User:${req.user.email} `, error)
        res.json(dataBase);
    }
}

export default getTransportTypeByIdController;
