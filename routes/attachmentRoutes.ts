import { Router, RequestHandler } from 'express';
import { validationFields } from '@middlewares/validation-fields';
import jwtValidation from '@middlewares/webtokenValidation';
import { check } from "express-validator"
import { downloadAttachmentController } from '@attachmentcontrollers'

const router = Router();


////////////////////////////////////Get////////////////////////////////////
router.get("/:fileId", [
    check("fileId", "The User Id is required").isMongoId().notEmpty(),
    validationFields,
] as RequestHandler[], downloadAttachmentController);



export default router;