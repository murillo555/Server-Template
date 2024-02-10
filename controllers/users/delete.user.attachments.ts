import { Request, Response } from 'express';
import config from '@config';
const { entityDelete, dataBase, paramsError } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { User, Attachment } from '@models';
import fs from 'fs'

interface RequestBody extends Request {
    user: UserInterface
}


const deleteUserAttachment = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, deleteUserAttachment]', `User:${req.user.email}  delete an attachment `);
    const { userId, attachmentId } = req.params;
    try {
        const [user, attachment] = await Promise.all([
            User.findById(userId),
            Attachment.findById(attachmentId)
        ]);
        if (fs.existsSync(`${attachment?.file}`)) fs.unlinkSync(`${attachment?.file}`)
        if (user?.attachments) {
            user.attachments = user?.attachments?.filter((element) => `${element}` != `${attachmentId}`);
            await user?.save();
            await Attachment.findByIdAndDelete(attachment?._id)
            logger.info('[Users, deleteUserAttachment] Succesfully')
            res.json(entityDelete)
        } else {
            res.status(404).json(paramsError)
        }
    } catch (error) {
        logger.error('[Users, deleteUserAttachment]', ` User:${req.user.email} `, error)
        res.status(501).json(dataBase);
    }
};

export default deleteUserAttachment