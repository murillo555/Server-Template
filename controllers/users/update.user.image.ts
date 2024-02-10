
import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase, paramsError } = config.message;
import logger from "@logger"
import { CreateUserBody } from '@interfaces/requests/user';
import { User as UserInterface } from "@interfaces/models/user"
import { User } from '@models';
import { Attachment } from '@models';
import fs from 'fs'

interface RequestBody extends Request {
    body: CreateUserBody,
    user: UserInterface
}


const updateUserImageController = async (req: RequestBody, res: Response) => {
    logger.verbose('[user, updateUserImage]', `User:${req.user.email} Update user image`);
    try {
        const file = req.file;
        const { userId } = req.params;
        const attachmentData = {
            name: 'User Image',
            category: 'User Image',
            fileType: file?.filename.split('.')[1],
            file: file?.path,
            createdBy: req.user._id
        }
        const attachment = await new Attachment(attachmentData)
        await attachment?.save();
        const user = await User.findById(userId)
        if (user) {
            if (user.image) {
                const existingAttachment = await Attachment.findById(user.image)
                if (fs.existsSync(`${existingAttachment?.file}`)) fs.unlinkSync(`${existingAttachment?.file}`)
                await Attachment.findByIdAndDelete(existingAttachment?._id)
            }
            user.image = attachment._id;
            await user?.save();
            logger.info('[user, updateUserImage]', `User:${req.user.email}  Successfully`)
            res.json(entityCreate);
        } else {
            res.status(400).json(paramsError)
        }
    } catch (error) {
        logger.error('[Users, createUserController]', ` User:${req.user.email} `, error)
        res.json(dataBase)
    }
};

export default updateUserImageController