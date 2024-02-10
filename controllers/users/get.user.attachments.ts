import { Request, Response } from 'express';
import config from '@config';
const { dataBase } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { User } from '@models';

interface RequestBody extends Request {
    user: UserInterface
}

const getUserAttachmentsController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, getUserAttachmentsController]', `User:${req.user.email} action: Get timeline actions per user by Id`);
    const { userId } = req.params;
    try {
        const { attachments } = await User.findById(userId).populate('attachments', '-__v').populate({ path: 'attachments', populate: { path: 'createdBy', model: 'User' } }) as UserInterface

        logger.info('[Users, getUserAttachmentsController] Succesfully')
        res.json({ total: attachments?.length, attachments })
    } catch (error) {
        logger.error('[Users, getUserAttachmentsController]', ` User:${req.user.email} `, error)
        res.json(dataBase);
    }
}


export default getUserAttachmentsController