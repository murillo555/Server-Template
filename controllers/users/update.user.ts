import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase, entityUpdate } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { TimeLine, User } from '@models';
import bcrypt from "bcryptjs"
import dayjs = require('dayjs');

interface RequestBody extends Request {
    user: UserInterface
}

const updateUser = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, updateUser]', `User:${req.user.email} action: Update his own user`);
    const _id = req.user._id
    const { password, google, ...rest } = req.body;
    //VALIDAR
    if (password) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }
    try {
        const user = await User.findByIdAndUpdate(_id, rest)
        const event = {
            date: dayjs().toDate(),
            actionType: 'UPDATE',
            target: 'User',
            actionBy: req.user._id,
            actionDescription: `Usuario ${user?.firstName} ${user?.lastName} Actualizado`
        }
        TimeLine.create(event)
        logger.info('[Users, updateUser] Succesfully')
        res.json(entityUpdate)
    } catch (error) {
        logger.error('[Users, updateUser]', ` User:${req.user.email} `, error)
        res.status(501).json(dataBase);
    }
}

export default updateUser;