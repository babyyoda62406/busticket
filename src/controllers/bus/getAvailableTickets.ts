import { NextFunction, Request, Response } from 'express';
import { IBus, Ticket } from '../../db/models';

export const getAvailableTickets = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const tickets = await Ticket.find().populate('busId');
        if (!tickets || tickets.length === 0) {
            res.status(204).json({ message: 'There are no tickets available' });
            return;
        }

        const availableTickets = tickets.filter(ticket => {
            return !ticket.userId ;
        });

        res.status(200).json({ message: 'Available tickets', tickets: availableTickets });
    } catch (error) {
        next(error);
    }
};


