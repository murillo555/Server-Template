
import fs from 'fs'
import path from 'path'
import { Request, Response } from 'express';
import config from '@config';
const { paramsError, dataBase } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { Attachment } from '@models';


interface RequestBody extends Request {
    user: UserInterface
}

const downloadAttachmentController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Attachments, downloadAttachmentController]', 'download Attachment ');
    const { fileId } = req.params;
    const attachment = await Attachment.findById(fileId)
    const filePath = `${__dirname}${path?.sep}..${path?.sep}..${path?.sep}${attachment?.file}`;
    logger.info(filePath);
    try {
        fs.access(filePath, error => {
            if (error) {
                logger.error(error)
                res.status(404).json(paramsError)
            } else {
                logger.debug(filePath)
                res.sendFile(path.resolve(filePath));
            }
        })
    } catch (error) {
        logger.error('[Attachments, downloadAttachmentController]', error)
        res.status(501).json(dataBase);
    }
};

export default downloadAttachmentController