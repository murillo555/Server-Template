import { Router } from 'express';
import { check } from "express-validator"
import { validationFields } from "@middlewares/validation-fields";
import login from "controllers/auth/login"

const router = Router();

router.post("/login", [
    check("email", "The email is invalid").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validationFields,
], login);

export default router;