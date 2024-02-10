import { Request, Response } from 'express';
import config from '@config';
const { dataBase, entityDelete } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { TimeLine, TransportType } from '@models';
import dayjs from 'dayjs';

interface RequestBody extends Request {
    user: UserInterface
}

const removeTransportType = async (req: RequestBody, res: Response) => {
    logger.verbose('[Utils, deleteTransportType]', 'delete a TransportType ');
    const transportTypeId = req.params.id;
    logger.debug("TRASNPORT TYPE", transportTypeId)
    try {
        const deletedTransportType = await TransportType.findByIdAndDelete(transportTypeId);

        if (!deletedTransportType) {
            logger.error('[Utils, deleteTransportType] TransportType not found');
            return res.status(404).json({ error: 'TransportType not found' });
        }
        
        const event = {
            date: dayjs().toDate(),
            actionType: 'DELETE',
            target: 'TransportType',
            actionBy: req.user._id,
            actionDescription: `TransportType ${transportTypeId} Eliminado por Usuario ${req.user.firstName} ${req.user.lastName}`,
            es: `TransportType ${transportTypeId} Eliminado por Usuario ${req.user.firstName} ${req.user.lastName}`,
            en: `TransportType ${transportTypeId} Deleted by User ${req.user.firstName} ${req.user.lastName}`
        }
        await TimeLine.create(event);
        logger.info('[Utils, deleteTransportType] Succesfully')
        res.status(200).json(entityDelete)
    } catch (error) {
        logger.error('[Utils, deleteTransportType]', error)
        res.status(501).json(dataBase);
    }
};

export default removeTransportType