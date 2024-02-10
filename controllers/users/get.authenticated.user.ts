import { Request, Response } from 'express';
import config from '@config';
const { dataBase } = config.message;
import { User } from "@models"
import logger from '@logger';

const getAuthenticatedUserController = async (req: Request, res: Response) => {
    logger.verbose('[Users, getAuthenticatedUserController]', `User:${req.user.email} action:Get Authenticated User`)
    try {
        const user = await User.findById(req.user._id).populate('role', '-__v')
        logger.info('[Users, getAuthenticatedUserController] Succesfully')
        res.json({ user, status: true })
    } catch (error) {
        logger.error('[Users, getAuthenticatedUserController]', ` User:${req.user.email} `, error)
        res.status(500).json(dataBase);
    }
}

export default getAuthenticatedUserController
