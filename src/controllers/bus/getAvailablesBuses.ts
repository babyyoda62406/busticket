import { NextFunction, Request, Response } from 'express';
import { Bus } from '../../db/models';
export const getAvalilableBuses = async (req: Request, res: Response, next: NextFunction) => {
    let start: number = Number(req.query.start) || 0;
    let end: number = Number(req.query.end) || 23;
    if(start > end){res.status(400).json({ message: 'Start time must be less than end time' });return;}
    try {
        const buses = await Bus.find();
        if (!buses) {
            res.status(204).json({ message: 'There are no buses availables' });
        } else {
            const availablesBuses = buses.filter(bus => bus.timePeriod.start <= start   && bus.timePeriod.end >= end );
            if (availablesBuses.length === 0) {
                res.status(200).json({ message: `Any bus cover the time period ${start} to ${end}`, metadata: {
                    help: 'You can try get buses with the start and end parameters in following format /buses?start=8&end=18',
                    periods: buses.map(bus => bus.timePeriod)
                } });
            } else {
                res.status(200).json({ message: 'Buses availables', buses: availablesBuses });
            }
        }
    } catch (error) {
        next(error);
    }
};