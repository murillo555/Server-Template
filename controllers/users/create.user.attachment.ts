

import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase } = config.message;
import logger from "@logger"
import { CreateUserAttachmentBody } from '@interfaces/requests/user';
import { User as UserInterface } from "@interfaces/models/user"
import { TimeLine, Attachment, User } from '@models';
import { MulterFileType } from '@interfaces/requests/attachment';
import dayjs = require('dayjs');

interface RequestBody extends Request {
    body: CreateUserAttachmentBody,
    user: UserInterface
}

const createUserAttachmentController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, createUserAttachmentController]', `User:${req.user.email} Add new Attachment to a user`);
    try {
        const files = req.files as Express.Multer.File[]
        const { userId } = req.params;
        logger.debug(files)
        Promise.all(
            files?.map(async (file: MulterFileType) => {
                const attachmentData = {
                    name: `${file?.originalname}`,
                    category: 'userAttachment',
                    fileType: file?.filename.split('.')[1],
                    file: file?.path,
                    createdBy: req.user._id
                }
                const attachment = await new Attachment(attachmentData)
                const user = await User.findById(userId)
                user?.attachments?.push(attachment?._id)
                const event = {
                    date: dayjs().toDate(),
                    actionType: 'CREATE',
                    target: 'User',
                    actionBy: req.user._id,
                    actionDescription: `Se agregó el documento "${file?.originalname}" al usuario ${user?.firstName} ${user?.lastName}`,
                    es: `Se agregó el documento "${file?.originalname}" al usuario ${user?.firstName} ${user?.lastName}`,
                    en: `The attachment "${file?.originalname}" has been added to the user ${user?.firstName} ${user?.lastName}`
                }
                await user?.save();
                await attachment.save();
                await TimeLine.create(event);
            })
        )
        res.json(entityCreate);
    } catch (error) {
        logger.error('[Users, createUserAttachmentController]', ` User:${req.user.email} `, error)
        res.json(dataBase)
    }
};

export default createUserAttachmentController