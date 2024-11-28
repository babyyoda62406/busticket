import { check } from "express-validator";
import { validarCampos } from "../middlewares/FieldValidator";
import { verifySessionOpen } from "../middlewares/verifySessionOpen";
import { Router } from "express";
import addTicket from "../controllers/ticket/addTicket";
import { verifyJWT } from "../middlewares/jwtService";
import { isAdmin } from "../middlewares/rolVerified";
import { updateTicket } from "../controllers/ticket/updateTicket";
import { deleteTicket } from "../controllers/ticket/deleteTicket";

const app = Router();

app.post('/' , [
    verifyJWT,
    verifySessionOpen,
    isAdmin,
    check('price').not().isEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a numeric value'),
    check('busId').not().isEmpty().withMessage('BusId is required'),
    validarCampos
] ,  addTicket)

app.put('/:id' , [
    verifyJWT,
    verifySessionOpen,
    isAdmin,
    check('price').optional().not().isEmpty().withMessage('Price cannot be empty').isNumeric().withMessage('Price must be a numeric value'),
    validarCampos
] , updateTicket )

app.delete('/:id' , [
    verifyJWT,
    verifySessionOpen,
    isAdmin
] ,  deleteTicket )

export default app;