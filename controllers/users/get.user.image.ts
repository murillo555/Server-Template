
import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express';
import config from '@config';
const { paramsError } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { User } from '@models';
import { Attachment } from '@models';


interface RequestBody extends Request {
    user: UserInterface
}


const getUserImageController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, getUserImage]', `User:${req.user.email} get User image by user Id`);
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        const image = await Attachment.findById(user?.image)
        const filePath = `${image?.file}`;
        fs.access(filePath, error => {
            if (error) res.status(404).json(paramsError)
            else {
                res.sendFile(path.resolve(filePath));
            }
        })
    } catch (error) {
        logger.error('[Users, createUserController]', ` User:${req.user.email} `, error)
        res.status(501).json(null);
    }
}

export default getUserImageController
