import { Request, Response } from 'express';
import logger from "@logger"
import config from '@config';
const { dataBase, badAuth } = config.message;
import { User } from '@models';
import bcrypt from "bcryptjs"
import TokenGenerator from './jwtGenerate';


const login = async (req: Request, res: Response) => {
    logger.verbose('[Auth, login]', 'method to login into application')
    const { email, password } = req.body
    try {
        //Email Verification
        const user = await User.findOne({ email })
        if (!user || !user.status) return res.status(400).json(badAuth)
        //Password Verification
        const passwordValidation = bcrypt.compareSync(password, user.password)
        if (!passwordValidation) return res.status(400).json(badAuth)
        //Jwt Generation
        const token = await TokenGenerator(user.id)
        res.json({ token, status: true })
    } catch (error) {
        logger.error('[Auth, login]', 'method to login into application')
        return res.status(500).json(dataBase)
    }
}

export default login