import { NextFunction, Request, Response } from 'express';
import { Bus } from '../../db/models';

export const deleteBus = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const bus = await Bus.findById(id);
        if(bus){
            await bus.deleteOne();
            res.status(200).json({ message: 'Bus deleted successfully' });
        }else{
            res.status(404).json({ message: `Bus with id ${id} not found` });
        }
    } catch (error) {
        next(error);
    }
};