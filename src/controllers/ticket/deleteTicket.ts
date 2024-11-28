import { NextFunction, Request, Response } from 'express';
import { Ticket } from '../../db/models';

export const deleteTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        let tempTicket = await Ticket.findById(id);
        if (tempTicket) {
            await tempTicket.deleteOne();
            res.status(200).json({ message: 'Ticket deleted successfully' });
        } else {
            res.status(404).json({ message: `Ticket with id ${id} not found` });
        }
    } catch (error) {
        next(error);
    }
};