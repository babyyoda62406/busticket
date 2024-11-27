import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== 'Admin') {
        res.status(403).json({ message: 'You need to be an Admin to access this route' });
    }else{
        next();
    }    
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== 'User') {
        res.status(403).json({ message: 'You need to be an User to access this route' });
    }else{
        next();
    }    
};