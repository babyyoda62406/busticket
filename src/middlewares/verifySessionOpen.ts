import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models';

declare global {
    namespace Express {
        interface Request {
            role: "Admin" | "User"
        }
    }
}

export const verifySessionOpen = async (req: Request, res: Response, next: NextFunction) => {
    const { payload } = req;
    if (payload) {
        const { uid } = payload;
        try {
            const tempUser = await User.findById(uid);
            if (!tempUser) {
                res.status(404).json({ message: 'User not Found' });
            } else {
                if (tempUser.sessionToken  === req.headers.token) {
                    req.role = tempUser.role
                    next();
                } else {
                    res.status(401).json({ message: 'This session are closed, please provide the token of your last session' });
                }
            }
        } catch (err) {
            res.status(503).json({ message: 'I can not verify the session contact with the administrator', err });
        }
    } else {
        res.status(401).json({ message: 'You are not logged in' });
    }
}