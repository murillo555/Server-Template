import { Request, Response } from 'express';
import config from '@config';
const { dataBase } = config.message;
import logger from "@logger"
import { User as UserInterface } from "@interfaces/models/user"
import dayjs from 'dayjs';
import { TimeLine } from '@models';

interface RequestBody extends Request {
    user: UserInterface
}


const getTimeLineActionsPerUserController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, getTimeLineActionsPerUserController]', `User:${req.user.email} action: Get timeline actions per user by Id`);
    const { userId } = req.params;
    let page = req.query.page || 1;
    const { limit = 10, target, description, startdate, enddate, actiontype } = req.query;
    let query = []
    page = Number(page) - 1;
    const since = page * 10;
    console.log("Fechas: ", startdate, enddate)
    if (description) query.push({ $or: [{ actionDescription: { $regex: `${description}`, $options: 'i' } }] })
    if (startdate && enddate) query.push({ date: { $gte: dayjs(`${startdate}`).toISOString(), $lte: dayjs(`${enddate}`).toISOString() } })
    if (target) query.push({ target: target })
    if (actiontype) query.push({ actionType: actiontype })
    query.push({ actionBy: userId })

    try {
        const [total, actions] = await Promise.all([
            TimeLine.countDocuments({ $and: query }),
            TimeLine.find({ $and: query }).populate('actionBy', '-__v')
                .skip(Number(since))
                .limit(Number(limit))
        ])
        logger.info('[Users, getTimeLineActionsPerUserController] Succesfully')
        res.json({ total, actions })
    } catch (error) {
        logger.error('[Users, getTimeLineActionsPerUserController]', ` User:${req.user.email} `, error)
        res.json(dataBase);
    }
}


export default getTimeLineActionsPerUserController