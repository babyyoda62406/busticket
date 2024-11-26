import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

interface CustomError {
    code: number;   
    keyPattern: {
        [key: string]: number;
    };
    keyValue: {
        [key: string]: number;
    };
}


const errorMDBHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500; 
    let message = 'Internal Server Error'; 

    if (err.name === 'MongoServerError') {
        const error: MongooseError & CustomError = err; 

        switch (error.code) {
            case 11000:
                statusCode = 409; 
                message = `${Object.keys(error.keyPattern)[0]} ${error.keyValue[Object.keys(error.keyPattern)[0]]} already exists`;
                break;
            case 121: 
                statusCode = 422; 
                message = 'Validation failed';
                break;
            case 16755: 
                statusCode = 422; 
                message = 'Validation error occurred';
                break;
            case 13: 
                statusCode = 403;
                message = 'Unauthorized access';
                break;
            case 50:
                statusCode = 504; 
                message = 'Request timed out';
                break;
            case 18: 
                statusCode = 503; 
                message = 'Not a master node for write operation';
                break;
            default:
                statusCode = 503; 
                console.log(error); 
                message = 'DB Service Unavailable';
                break;
        }

        res.status(statusCode).json({
            message: message,
            details: error.message || "Not aditional information",
        });

    } else {
        res.status(statusCode).json({
            message: message, // Mensaje por defecto para otros errores
        });
    }
};

export default errorMDBHandler;
