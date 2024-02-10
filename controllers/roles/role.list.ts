import { Request, Response } from 'express';
import { User as UserInterface } from "@interfaces/models/user"
import { Role } from '@models';
import logger from '@logger';


interface RequestWithUser extends Request {
    user: UserInterface
}


const roleList = async (req: RequestWithUser, res: Response) => {
    logger.verbose('[Roles, rolesList]', 'Get Roles List');
    let page = req.query.page || 1;
    const { limit = 10 } = req.query;
    page = Number(page) - 1;
    const since = page * Number(limit);

    const [total, roles] = await Promise.all([
        Role.countDocuments(),
        Role.find()
            .skip(Number(since))
            .limit(Number(limit))
    ])
    const complete = await Role.find();
    logger.debug(`Total Roles: ${total}`);
    res.json({ total, roles, complete });
};

export default roleList