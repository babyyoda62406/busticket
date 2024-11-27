import { Router } from 'express';
import Register from '../controllers/auth/register';
import { validarCampos } from '../middlewares/FieldValidator';
import { check } from 'express-validator';
import Login from '../controllers/auth/login';
import { Logout } from '../controllers/auth/logout';
import { verifyJWT } from '../middlewares/jwtService';
import { verifySessionOpen } from '../middlewares/verifySessionOpen';
const app = Router();

app.post('/register', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validarCampos], Register)


app.post('/login', [
    check('email').not().isEmpty().withMessage('Email is required'),
    check('email').isEmail().withMessage('Email is invalid'),
    check('password').not().isEmpty().withMessage('Password is required'),
    validarCampos], Login)

app.post('/logout', [verifyJWT, verifySessionOpen], Logout)

export default app;