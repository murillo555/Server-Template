import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase, paramsError, entityDelete } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { TimeLine, Attachment, User } from '@models';
import fs from 'fs'
import dayjs = require('dayjs');

interface RequestBody extends Request {
    user: UserInterface
}

const removeUserAttachment = async (req: RequestBody, res: Response) => {
    logger.verbose('[Utils, deleteUserAttachment]', 'delete an attachment ');
    const { userId, attachmentId } = req.params;
    try {
        const [user, attachment] = await Promise.all([
            User.findById(userId),
            Attachment.findById(attachmentId)
        ]);
        if (fs.existsSync(`${attachment?.file}`)) fs.unlinkSync(`${attachment?.file}`)
        if (user?.attachments) user.attachments = user?.attachments?.filter(element => `${element}` != `${attachmentId}`);
        else return res.status(404).json(paramsError)

        await user?.save();
        await Attachment.findByIdAndDelete(attachment?._id)
        logger.info('[Utils, deleteUserAttachment] Succesfully')
        res.json(entityDelete)
    } catch (error) {
        logger.error('[Utils, deleteUserAttachment]', error)
        res.status(501).json(dataBase);
    }
};

export default removeUserAttachment