import { Request, Response } from 'express';
import config from '@config';
const { dataBase } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { User } from '@models';

interface RequestBody extends Request {
    user: UserInterface
}

const getUserByIdController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, getUSerById]', `User:${req.user.email} action: Get user by Id`);
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('role', '-__v').populate('attachments', '-__v').populate({ path: 'attachments', populate: { path: 'createdBy', model: 'User' } });
        logger.info('[Users, getUserById]', `User:${req.user.email} Success`);
        res.json(user);
    } catch (error) {
        logger.error('[Users, getUserById]', ` User:${req.user.email} `, error)
        res.json(dataBase);
    }
}

export default getUserByIdController;