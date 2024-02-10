import { Router, RequestHandler } from 'express';
import config from "@config"
import { check } from "express-validator"
const { createPermissions, readPermissions } = config.permissionType;
const { roles } = config.routes;
import { permission } from '@middlewares/RoleValidation';
import { validationFields } from "@middlewares/validation-fields";
import { uniqueRoleValidation, roleRoutesValidation } from '@validators/role.validators';
import { createRoleController, listRoleController } from "@rolecontrollers";
import jwtValidation from '@middlewares/webtokenValidation';
type PermissionOptions = 'createPermissions' | 'readPermissions' | 'updatePermissions' | 'deletePermissions'

const router = Router();
////////////////////////////////////Get////////////////////////////////////
router.get('/', [
    jwtValidation,
    permission(readPermissions as PermissionOptions, roles),
    validationFields
] as RequestHandler[], listRoleController);

router.post('/', [
    jwtValidation,
    permission(createPermissions as PermissionOptions, roles),
    check('role', 'The name of the role is required').notEmpty(),
    check('role').custom(uniqueRoleValidation),
    check('createPermissions').optional().isArray().custom(roleRoutesValidation),
    check('updatePermissions').optional().isArray().custom(roleRoutesValidation),
    check('deletePermissions').optional().isArray().custom(roleRoutesValidation),
    check('readPermissions').optional().isArray().custom(roleRoutesValidation),
    validationFields
] as RequestHandler[], createRoleController);


export default router;