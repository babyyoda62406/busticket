import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            payload: Record<string, any>;
        }
    }
}


export const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;
        if (token) {
            const payload = jwt.verify(token, String(process.env.SECRETORPRIVATEKEY)) as Record<string, any>;
            req.payload = payload;
            next();
        } else {
            res.status(403).json({ msg: "The token is not present" });
        }
    } catch (err) {
        res.status(403).json({ msg: "The token is not valid" });
    }
};

export const generateJWT = (arg: string) => {
    // This Method are thinking to recive the user ID and generate a JWT
    return new Promise((resolve, reject) => {
        try {
            const token = jwt.sign({uid: arg}, String(process.env.SECRETORPRIVATEKEY), {
                expiresIn: process.env.TOKENEXPIRATION ,
                algorithm: 'HS256'
            })
            resolve(token);
        } catch (err) {
            console.log(err);   
            reject(err);
        }
    });
};


