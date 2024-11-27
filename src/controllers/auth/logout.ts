import { NextFunction, Request, Response } from 'express';
import { User } from '../../db/models';

export const Logout = async (req: Request, res: Response, next: NextFunction) => {
    const { payload } = req;
    const { uid } = payload;
    try {
        let tempUser = await User.findById(uid);
        if (tempUser) {
            tempUser.sessionToken = undefined;
            await tempUser.save();
            res.status(200).json({ message: 'Logout successful'});
        }else{
            res.status(404).json({ message: 'User not found' });
        }

    } catch (err) {
        next(err);
    }
}