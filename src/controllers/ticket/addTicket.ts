import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../../db/models';
import { Bus } from '../../db/models';

const addTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { price, busId } = req.body;
    try {
        let busIdIsValid;
        busIdIsValid = await Bus.findById(busId);
        if (!busIdIsValid) {
            res.status(404).json({ message: `Bus with id ${busId} not found` });
        } else {
            const ticket = new Ticket({ price, busId });
            await ticket.save();
            res.status(201).json({ message: 'Ticket added successfully', ticket });
        }

    } catch (error) {
        next(error);
    }


};

export default addTicket;