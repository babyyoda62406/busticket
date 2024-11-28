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
            if(busIdIsValid.capacity <= 0 ){
                res.status(404).json({ message: `Bus with id ${busId} is full` });
                return;
            }
            const ticket = new Ticket({ price, busId });
            await ticket.save();
            busIdIsValid.capacity--;
            await busIdIsValid.save();
            
            res.status(201).json({ message: 'Ticket added successfully', ticket });
        }

    } catch (error) {
        next(error);
    }


};

export default addTicket;