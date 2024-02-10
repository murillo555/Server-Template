import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from 'express';
import logger from "@logger"

export const validationFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('(validation-fields)', errors)
        return res.status(400).json({ errors, status: false })
    }
    next();
}

export const validationFieldsFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('(validation-fields)', errors)
        return res.status(400).json({ errors, status: false })
    }
    next();
}