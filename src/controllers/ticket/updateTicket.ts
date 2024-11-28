import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../../db/models';

export const updateTicket = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { price, ...trash } = req.body;
    if (Object.keys(trash).length > 0) {
        res.status(400).json({ message: 'Invalid data', trash })
    } else {

        try {
            let tempTicket = await Ticket.findById(id);

            if (tempTicket) {
                tempTicket.price = price || tempTicket.price;
                await tempTicket.save();
                res.status(200).json({ message: 'Ticket updated successfully', ticket: tempTicket });
            } else {
                res.status(404).json({ message: `Ticket with id ${id} not found` });
            }
        } catch (error) {
            next(error);
        }

    }
};