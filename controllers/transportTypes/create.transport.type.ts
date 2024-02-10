import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase } = config.message;
import logger from "@logger"
import { CreateTransportType } from '@interfaces/requests/transportType';
import { User as UserInterface } from "@interfaces/models/user"
import { TransportType } from '@models';
import { TimeLine } from '@models';
import dayjs from 'dayjs';

interface RequestBody extends Request {
    body: CreateTransportType,
    user: UserInterface
}

const createTransportTypeController = async (req: RequestBody, res: Response) => {
    logger.verbose('[TransportType, createTransportTypeController]', `User:${req.user.email} action:Create a TransportType on the admin panel`)
    const { type, defaultLoad, defaultWidth, defaultLength } = req.body;
    try {
        const transportType = new TransportType({ type, defaultLoad, defaultWidth, defaultLength, updatedBy: req.user._id, createdBy: req.user._id });
        await transportType.save()
        const event = {
            date: dayjs().toDate(),
            actionType: 'CREATE',
            target: 'TransportType',
            actionBy: req.user._id,
            actionDescription: `TransportType ${transportType.type} Creado por Usuario ${req.user.firstName} ${req.user.lastName}`,
            es: `TransportType ${transportType.type} Creado por Usuario ${req.user.firstName} ${req.user.lastName}`,
            en: `TransportType ${transportType.type} Created by User ${req.user.firstName} ${req.user.lastName}`
        }
        logger.info('[TransportType, createTransportTypeController] Succesfully')
        await TimeLine.create(event);
        return res.status(200).json(entityCreate)
    } catch (error) {
        logger.error('[TransportType, createTransportTypeController]', ` User:${req.user.email} `, error)
        res.status(400).json(dataBase)
    }
}

export default createTransportTypeController;
