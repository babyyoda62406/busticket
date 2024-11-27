import { NextFunction, Request, Response } from 'express';
import { Bus } from '../../db/models';

export const updateBus = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, capacity, start, end, ...trash } = req.body;
    if (Object.keys(trash).length > 0) {
        res.status(400).json({ message: 'Invalid data', trash })
    }else {
        let tempBus = await Bus.findById(id);
        if(tempBus){
            tempBus.name = name || tempBus.name;
            tempBus.description = description || tempBus.description;
            tempBus.capacity = capacity || tempBus.capacity;
            tempBus.timePeriod.start = start || tempBus.timePeriod.start;
            tempBus.timePeriod.end = end || tempBus.timePeriod.end;
            try {
                await tempBus.save();
                res.status(200).json({ message: 'Bus updated successfully', bus: tempBus });
            } catch (error) {
                next(error);
            }
        }else{
            res.status(404).json({ message: `Bus with id ${id} not found` });
        }
    }

};  