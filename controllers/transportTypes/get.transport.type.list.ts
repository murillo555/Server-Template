import { Request, Response } from 'express';
import logger from "@logger"
import { TransportType } from '@models';
import { User as UserInterface } from "@interfaces/models/user"

interface RequestBody extends Request {
    user: UserInterface
}

/**
 * This method is for get a list of TransportTypes
 * @return {json} json String
 */

const listTransportTypesController = async (req: RequestBody, res: Response) => {
    logger.verbose('[TransportTypes, listTransportTypesController]', `User:${req.user.email} action:Get TransportType List`)
    const [total, transportTypes] = await Promise.all([
        TransportType.countDocuments(),
        TransportType.find()
    ])
    logger.info('[TransportTypes, listTransportTypesController] Succesfully')
    res.json({ total, transportTypes });
}

export default listTransportTypesController;