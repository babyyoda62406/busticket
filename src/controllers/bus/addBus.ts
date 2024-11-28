
import { NextFunction, Request, Response } from 'express';
import { Bus } from '../../db/models';

const addBus = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, capacity, start, end } = req.body;
    if(start > end){res.status(400).json({ message: 'Start time must be less than end time' });return;}
    const bus = new Bus({ name, description, capacity, timePeriod: { start, end } });
    try {
        await bus.save();
        res.status(201).json({ message: 'Bus added successfully' , bus });
    } catch (error) {
        next(error);
    }
    
};

export default addBus;