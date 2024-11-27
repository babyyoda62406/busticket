import { Router } from "express";
import addBus from "../controllers/bus/addBus";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/FieldValidator";
import { verifyJWT } from "../middlewares/jwtService";
import { verifySessionOpen } from "../middlewares/verifySessionOpen";
import { isAdmin } from "../middlewares/rolVerified";
import { updateBus } from "../controllers/bus/updateBus";
import { deleteBus } from "../controllers/bus/deleteBus";

const app = Router();

app.post('/', [
    verifyJWT,
    verifySessionOpen,
    isAdmin,
    check('name').not().isEmpty().withMessage('Name is required'),
    check('description').not().isEmpty().withMessage('Description is required'),
    check('capacity').not().isEmpty().withMessage('Capacity is required').isNumeric().withMessage('Capacity must be a Number'),
    check('start').not().isEmpty().withMessage('Start time is required').isNumeric().withMessage('Start time must be a Number').isInt({ min: 0, max: 23 }).withMessage('Start time must be between 0 and 23'),
    check('end').not().isEmpty().withMessage('End time is required').isNumeric().withMessage('End time must be a Number').isInt({ min: 0, max: 23 }).withMessage('End time must be between 0 and 23'),
    validarCampos
], addBus);

app.put('/:id', [
    verifyJWT,
    verifySessionOpen,
    isAdmin,
    check('name').optional().not().isEmpty().withMessage('Name cannot be empty'),
    check('description').optional().not().isEmpty().withMessage('Description cannot be empty'),
    check('capacity').optional().isNumeric().withMessage('Capacity must be a Number'),
    check('start').optional().isNumeric().withMessage('Start time must be a Number').isInt({ min: 0, max: 23 }).withMessage('Start time must be between 0 and 23'),
    check('end').optional().isNumeric().withMessage('End time must be a Number').isInt({ min: 0, max: 23 }).withMessage('End time must be between 0 and 23'),
    validarCampos
], updateBus);


app.delete('/:id', [
    verifyJWT,
    verifySessionOpen,
    isAdmin
],deleteBus)



export default app;