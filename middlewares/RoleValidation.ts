import { Request, Response, NextFunction } from 'express';
import logger from '@logger';
import config from '@config';
import { Role as RoleInterface } from "@interfaces/models/role"
const { badCredentials, notAuth } = config.message
import { Role } from "@models"
import { ModifiedRequest } from '@interfaces/global';

const ADMIN_ROLE = 'ADMIN_ROLE';
type PermissionOptions = 'createPermissions' | 'readPermissions' | 'updatePermissions' | 'deletePermissions'

export const UserRole = (...role: string[]) => {
    return (req: ModifiedRequest, res: Response, next: NextFunction) => {

        if (!req.user) return res.status(500).json(notAuth)
        if (!role.includes(req.user.role)) return res.status(401).json(badCredentials)
        next();
    }
}

export const permission = (permission: PermissionOptions, route: string) => {
    return async (req: ModifiedRequest, res: Response, next: NextFunction,) => {
        if (!req.user) return res.status(500).json(notAuth)
        if (!req.user.role) return res.status(500).json(notAuth)
        const role = await Role.findById(req.user.role) as RoleInterface
        if (!role) return res.status(500).json(notAuth)
        if (!(role[permission]?.length < 0) && (`${role.role}` != ADMIN_ROLE)) return res.status(500).json(notAuth)
        if (!role[permission]?.includes(route) && role.role != ADMIN_ROLE) return res.status(401).json(badCredentials)
        next();
        return;
    }
}