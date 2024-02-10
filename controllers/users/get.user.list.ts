import { Request, Response } from 'express';
const ObjectId = require('mongoose').Types.ObjectId
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import { User } from '@models';

interface RequestBody extends Request {
    user: UserInterface
}


/**
 * This method is for get a list of Users
 * @param {number} since
 * @param {number} limit
 * @param {boolean} status   
 * @return {json} json String
 */

const listUsersController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, listUsersController]', `User:${req.user.email} action:Get User List`)
    let page = req.query.page || 1;
    const { limit = 10, search = "", role = "" } = req.query;
    let query = []
    page = Number(page) - 1;
    const since = page * 10;
    if (search) query.push({ $or: [{ firstName: { $regex: `${search}`, $options: 'i' } }, { lastName: { $regex: `${search}`, $options: 'i' } }, { email: { $regex: `${search}`, $options: 'i' } }] })
    if (ObjectId.isValid(role)) { query.push({ role: role }) }
    query.push({ status: true })
    const [total, users] = await Promise.all([
        User.countDocuments({ $and: query }),
        User.find({ $and: query }).populate('role', '-__v')
            .skip(Number(since))
            .limit(Number(limit))
    ])
    logger.info('[Users, listUsersController] Succesfully')
    res.json({ total, users });
}

export default listUsersController;