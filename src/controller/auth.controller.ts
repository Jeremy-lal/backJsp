import { User } from 'src/models/user';
import express, { Router, Request, Response, Application } from 'express';
import { AuthService } from '../services/auth.service';


export const AuthController = (app: Application) => {

    const authService = new AuthService();
    const authRouter: Router = express.Router();

    
    authRouter.post('/signin', async (req: Request, res: Response) => {
        const user: User = req.body;
        try {
            await authService.signIn(user.email, user.pwd);
            res.send(user);
        } catch (error) {
            res.status(404).send('Connexion impossible');
        }
    });

    authRouter.post('/signup', async (req: Request, res: Response) => {
        const user = req.body;
        try {
            await authService.signUp(user);
            res.send('Record Ok');

        } catch (error) {
            res.status(409).send('Email déjà existant');
        }
    });

    app.use('/auth', authRouter);
};