import { Router } from 'express';
import Register from '../controllers/auth/register';
import { validarCampos } from '../middlewares/FieldValidator';
import { check } from 'express-validator';
const app = Router();

app.post('/register', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validarCampos], Register)


export default app;