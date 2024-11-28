import express, { Application } from 'express';
import cors from 'cors';
import connectDB from '../db/conection';
import errorMDBHandler from '../middlewares/errorMDBHandler';

import authRoute from '../routes/auth.route';
import adminRoute from '../routes/admin.route';
import userRoute from '../routes/user.route';

class Server {
    private app: Application;
    private PORT: number;

    private prefix: string = 'api';
    private version: string = 'v1';

    private routes: { [key: string]: string } = {
        auth: 'auth',
        admin: 'admin',
        user: '',
    };

    constructor(port: number) {
        this.PORT = port;
        this.app = express();
        this.middlewares();
        this.loadDB()
        this.loadRoutes();
        this.app.use(errorMDBHandler);
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async loadDB(): Promise<void> {
        connectDB();
    }

    private loadRoutes(): void {
        this.app.use(`/${this.prefix}/${this.version}/${this.routes.auth}`, authRoute);
        this.app.use(`/${this.prefix}/${this.version}/${this.routes.admin}`,  adminRoute);
        this.app.use(`/${this.prefix}/${this.version}/${this.routes.user}`, userRoute);
    }

    public run(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}


export default Server;
