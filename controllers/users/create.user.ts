import { Request, Response } from 'express';
import config from '@config';
const { entityCreate, dataBase } = config.message;
import logger from "@logger"
import { CreateUserBody } from '@interfaces/requests/user';
import { User as UserInterface } from "@interfaces/models/user"
import { User } from '@models';
import { TimeLine } from '@models';
import bcrypt from "bcryptjs"
import dayjs = require('dayjs');

interface RequestBody extends Request {
    body: CreateUserBody,
    user: UserInterface
}

const createUserController = async (req: RequestBody, res: Response) => {
    logger.verbose('[Users, createUserController]', `User:${req.user.email} action:Create a user on the admin panel`)
    const { firstName, lastName, email, password, role, birthDate, entryDate } = req.body;
    const dateBirthDate = dayjs(birthDate).toDate()
    const dateEntryDate = dayjs(entryDate).toDate()
    try {
        const user = new User({ firstName, lastName, email, password, role, birthDate: dateBirthDate, entryDate: dateEntryDate });
        const salt = await bcrypt.genSaltSync();
        user.password = await bcrypt.hashSync(password, salt);
        await user.save()

        const event = {
            date: dayjs().toDate(),
            actionType: 'CREATE',
            target: 'User',
            actionBy: req.user._id,
            actionDescription: `Usuario ${user.firstName} ${user.lastName} Creado`,
            es: `Usuario ${user.firstName} ${user.lastName} Creado`,
            en: `User ${user.firstName} ${user.lastName} was created`
        }
        logger.info('[Users, createUserController] Succesfully')
        await TimeLine.create(event);
        return res.status(200).json(entityCreate)
    } catch (error) {
        logger.error('[Users, createUserController]', ` User:${req.user.email} `, error)
        res.status(400).json(dataBase)
    }
}

export default createUserController;




