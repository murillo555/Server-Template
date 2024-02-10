import { Request, Response } from 'express';
import config from '@config';
const { dataBase, entityUpdate } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { TimeLine, TransportType } from '@models';
import dayjs from 'dayjs';

interface RequestBody extends Request {
    user: UserInterface
}

const updateTransportType = async (req: RequestBody, res: Response) => {
    logger.verbose('[TransportTypes, updateTransportType]', `User:${req.user.email} action: Update TransportType`);
    const _id = req.user._id
    const data = req.body;
    //VALIDAR
    try {
        const transportType = await TransportType.findByIdAndUpdate(_id, data)
        const event = {
            date: dayjs().toDate(),
            actionType: 'UPDATE',
            target: 'TransportType',
            actionBy: req.user._id,
            actionDescription: `Usuario ${req.user?.firstName} ${req.user?.lastName} Actualizó transportType ${transportType?._id}`
        }
        TimeLine.create(event)
        logger.info('[TransportTypes, updateTransportType] Succesfully')
        res.json(entityUpdate)
    } catch (error) {
        logger.error('[TransportTypes, updateTransportType]', ` User:${req.user.email} `, error)
        res.status(501).json(dataBase);
    }
}

export default updateTransportType;