import { NextFunction, Request, Response } from "express";
import { User } from "../../db/models";
import * as bcrypt from 'bcryptjs';


const Register = async (req: Request, res: Response, next: NextFunction) => {

    const body = req.body;
    const { name, email } = body;

    let password = body.password;

    let role: 'Admin' | 'User';
    const count = await User.countDocuments();
    if (count > 0) role = 'User'; 
    else role = 'Admin';
    password =  bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    const tempUser = new User({ name, email, password, role });

    try {
        const userReference = await tempUser.save();
        res.status(200).json({ message: 'User has been registered'});
    } catch (err) {
        next(err)
    }

}

export default Register;