import { RequestHandler, Router } from 'express';
import config from "@config"
const { createPermissions, deletePermissions, readPermissions, updatePermissions } = config.permissionType;
const { transportType } = config.routes;
import { check } from "express-validator"
import { validationFields } from "@middlewares/validation-fields";
import { permission } from '@middlewares/RoleValidation';
import jwtValidation from '@middlewares/webtokenValidation';
import { listTransportTypesController, getTransportTypeByIdController, createTransportTypeController, updateTransportTypeController, removeTransportTypeController } from 'controllers/transportTypes';
import { transportTypeValidationById } from '@validators/transportTypes.validators ';

type PermissionOptions = 'createPermissions' | 'readPermissions' | 'updatePermissions' | 'deletePermissions'
const router = Router();

////////////////////////////////////Get////////////////////////////////////
router.get('/', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, transportType),
    validationFields
] as RequestHandler[], listTransportTypesController);

router.get('/id/:id', [
    jwtValidation,
    check('id', 'The id is required'),
    check('id').custom(transportTypeValidationById),
    validationFields
] as RequestHandler[], getTransportTypeByIdController);

////////////////////////////////////Post////////////////////////////////////
router.post('/', [
    jwtValidation,
    permission(createPermissions as PermissionOptions, transportType),
    check('type', 'The type is required').notEmpty(),
    validationFields
] as RequestHandler[], createTransportTypeController);

////////////////////////////////////Update////////////////////////////////////
router.put('/updatebyadmin/:id', [
    jwtValidation,
    permission(updatePermissions as PermissionOptions, transportType),
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(transportTypeValidationById),
    validationFields
] as RequestHandler[], updateTransportTypeController);

////////////////////////////////////Delete////////////////////////////////////
router.delete("/removebyadmin/:id", [
    jwtValidation,
    permission(deletePermissions as PermissionOptions, transportType),
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(transportTypeValidationById),
    validationFields,
] as RequestHandler[], removeTransportTypeController);

export default router;