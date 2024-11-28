import { Router } from "express";
import { validarCampos } from "../middlewares/FieldValidator";
import { verifyJWT } from "../middlewares/jwtService";
import { verifySessionOpen } from "../middlewares/verifySessionOpen";
import { getAvalilableBuses } from "../controllers/bus/getAvailablesBuses";
import { isUser } from "../middlewares/rolVerified";
import { check, query } from "express-validator";
import { getAvailableTickets } from "../controllers/bus/getAvailableTickets";
import { purchaseTicket } from "../controllers/ticket/purchase";

const app = Router();

app.get('/buses', [
    verifyJWT,
    verifySessionOpen,
    isUser,
    query('start').optional().isInt().withMessage('Start time must be a Number').isInt({ min: 0, max: 23 }).withMessage('Start time must be between 0 and 23'),
    query('end').optional().isInt().withMessage('End time must be a Number').isInt({ min: 0, max: 23 }).withMessage('End time must be between 0 and 23'),
    validarCampos
], getAvalilableBuses)

app.get('/tickets', [
    verifyJWT,
    verifySessionOpen,
    isUser,
    query('start').optional().isInt().withMessage('Start time must be a Number').isInt({ min: 0, max: 23 }).withMessage('Start time must be between 0 and 23'),
    query('end').optional().isInt().withMessage('End time must be a Number').isInt({ min: 0, max: 23 }).withMessage('End time must be between 0 and 23'),
    validarCampos],
    getAvailableTickets
)

app.post('/tickets/purchase' ,[
    verifyJWT,
    verifySessionOpen,
    isUser,
    check('busId').not().isEmpty().withMessage('BusId is required'),
    validarCampos
] , purchaseTicket)


export default app;