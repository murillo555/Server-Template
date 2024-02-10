import { Router, RequestHandler } from 'express';
import config from "@config"
const { createPermissions, readPermissions, updatePermissions } = config.permissionType;
const { users } = config.routes;
import { validationFields } from '@middlewares/validation-fields';
import { userValidationById } from '@validators/user.validators';
import { emailValidation } from '@validators/user.validators';

import { permission } from '@middlewares/RoleValidation';
import { check } from "express-validator"
import jwtValidation from '@middlewares/webtokenValidation';
import { v4 } from "uuid"
import path from "path"
import multer from 'multer'
import {
    createUserController,
    listUsersController,
    getUserByIdController,
    updateUserImageController,
    getUserImageController,
    getTimeLineActionsPerUserController,
    getUserAttachmentsController,
    createUserAttachmentController,
    removeUserAttachmentController,
    getAuthenticatedUser,
    updateUserByAdminController,
    updateUserController
} from '@usercontrollers';

type PermissionOptions = 'createPermissions' | 'readPermissions' | 'updatePermissions' | 'deletePermissions'
const maxSize = 20 * 1024 * 1024
const storage = multer.diskStorage({
    destination: './assets',
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
const uploadFile = multer({ storage, dest: './assets', limits: { fileSize: maxSize } })
const router = Router();

////////////////////////////////////Get////////////////////////////////////
router.get('/', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, users),
    validationFields
] as RequestHandler[], listUsersController);

router.get('/id/:userId', [
    jwtValidation,
    check('userId', 'The id is required'),
    validationFields
] as RequestHandler[], getUserByIdController);

router.get('/auth/', [
    jwtValidation,
    validationFields
] as RequestHandler[], getAuthenticatedUser);

router.get('/image/:userId', [
    jwtValidation,
    check('userId', 'The id is required'),
    validationFields
] as RequestHandler[], getUserImageController)

router.get('/timeline/actions/:userId', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, users),
    validationFields
] as RequestHandler[], getTimeLineActionsPerUserController);

router.get('/attachments/:userId', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, users),
    validationFields
] as RequestHandler[], getUserAttachmentsController);

////////////////////////////////////Post////////////////////////////////////
router.post('/', [
    jwtValidation,
    permission(createPermissions as PermissionOptions, users),
    check('firstName', 'The name is required').notEmpty(),
    check('lastName', 'The name is required').notEmpty(),
    check('birthDate', 'Add a valid date for birthdate').isString(),
    check('entryDate', 'Add a valid date for birthdate').isString(),
    check('password', 'The password is RequireD').isLength({ min: 6 }),
    check('email', 'The email is not Valid').isEmail(),
    check('email').custom(emailValidation),
    validationFields
] as RequestHandler[], createUserController);

router.post('/attachments/:userId', [
    jwtValidation,
    uploadFile.array('files'),
    permission(createPermissions as PermissionOptions, users),
    validationFields
] as RequestHandler[], createUserAttachmentController);

router.post('/updateimage/:userId', [
    jwtValidation,
    permission(updatePermissions as PermissionOptions, users),
    check('userId', 'The User Id is required').isMongoId().notEmpty(),
    uploadFile.single('file'),
    validationFields
] as RequestHandler[], updateUserImageController);

////////////////////////////////////Update////////////////////////////////////
router.put('/updatebyadmin/:id', [
    jwtValidation,
    permission(updatePermissions as PermissionOptions, users),
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(userValidationById),
    validationFields
] as RequestHandler[], updateUserByAdminController);

router.put('/', [
    jwtValidation,
    permission(updatePermissions as PermissionOptions, users),
    validationFields
] as RequestHandler[], updateUserController);

////////////////////////////////////Delete////////////////////////////////////
router.delete("/attachments/:userId/:attachmentId", [
    jwtValidation,
    check("userId", "The User Id is required").isMongoId().notEmpty(),
    check("attachmentId", "The User Id is required").isMongoId().notEmpty(),
    validationFields,
] as RequestHandler[], removeUserAttachmentController);


export default router;