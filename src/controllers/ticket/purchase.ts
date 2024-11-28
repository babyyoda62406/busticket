import { NextFunction, Request, Response } from 'express';
import { Bus, Ticket } from '../../db/models';
import mongoose from 'mongoose';

export const purchaseTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { busId } = req.body;
    try {
        const bus = await Bus.findById(busId);
        if (!bus) {
            res.status(404).json({ message: `Bus with id ${busId} not found` });
            return;
        }
        const allTickets = await Ticket.find({ busId });
        const tikets = allTickets.filter(ticket => ticket.userId === null);
        if (tikets.length === 0) {
            res.status(404).json({ message: `Bus with id ${busId} has no tickets available` });
            return;
        }
        const ticket = tikets[0];
        ticket.userId = req.user_id as unknown as mongoose.Types.ObjectId;
        ticket.save();
        await ticket.save();
        res.status(201).json({ message: 'Ticket purchased', ticket });
    } catch (error) {
        next(error);
    }
}

