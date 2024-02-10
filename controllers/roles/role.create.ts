import { Request, Response } from 'express';
import config from '@config'
const { entityCreate, dataBase } = config.message;
import { CreateRoleBody } from "@interfaces/requests/role"
import { User } from "@interfaces/models/user"
import { Role } from "@models"
import logger from '@logger'

interface RequestBody extends Request {
    body: CreateRoleBody,
    user: User
}

const createRoleController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Role, createRoleController]', ` User:${req.user.email} action: Create a role on admin panel`,)
    const { role = '', createPermissions = [], readPermissions = [], updatePermissions = [], deletePermissions = [] } = req.body;
    try {
        const newRole = new Role({ role, createPermissions, readPermissions, updatePermissions, deletePermissions })
        await newRole.save();
        logger.info('[Role, createRoleController]', ` User:${req.user.email} `, `Success New Role ${role} Added`);
        res.json(entityCreate)
    } catch (error) {
        logger.error('[Role, createRoleController]', ` User:${req.user.email} `, error)
        res.json(dataBase)
    }
}

export default createRoleController;