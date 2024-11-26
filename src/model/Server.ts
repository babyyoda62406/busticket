import express, { Application } from 'express';
import cors from 'cors';

class Server {
    private app: Application;
    private PORT: number;

    constructor(port: number) {
        this.PORT = port;
        this.app = express();
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async connectDB(): Promise<void> {
        
    }


    private routes(): void {
        
    }

    public run(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Server running on port ${this.PORT}`);
        });
    }
}


export default Server;
