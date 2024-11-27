import { NextFunction, Request, Response } from 'express';
import { User } from '../../db/models';
import * as bcrypt from 'bcryptjs';
import { generateJWT } from '../../middlewares/jwtService';

const Login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let tempUser ; 

    try {
        tempUser = await User.findOne({ email });
    } catch (err) {
        next(err);
    }

    if (!tempUser) {
        res.status(401).json({ message: 'Verify your credentials' });
    }

    else {
        if (!bcrypt.compareSync(password, tempUser.password)) {
            res.status(400).json({ message: 'Verify your credentials' });
        } else {
            let token = '';
            try {
                token = await generateJWT(tempUser.id) as string;
            } catch (err) {
                res.status(503).json({ message: 'I can not generate the token contact with the administrator', err });
            }
            tempUser.sessionToken = token;
            try{
                await tempUser.save();
                res.status(200).json({ message: 'Login successful', token });
            }catch(err){
                next(err);
            }
        }
    }
}

export default Login;