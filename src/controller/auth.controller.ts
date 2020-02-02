import { User } from 'src/models/user';
import express, { Router, Request, Response, Application } from 'express';
import { AuthService } from '../services/auth.service';


export const AuthController = (app: Application) => {

    const authService = new AuthService();
    const authRouter: Router = express.Router();

    
    authRouter.post('/signin', async (req: Request, res: Response) => {
        const userB= req.body;
        try {
          const { token, user } = await authService.signIn(userB.username, userB.pwd);
          res.set('access-control-expose-headers', 'JWT_TOKEN');
          res.set('JWT_TOKEN', token);
          res.send(user);
        } catch (error) {
            console.log(error);
            res.status(400).send('L\'email ou le mot de passe est erroné');
          }
      });

      authRouter.post('/signup', async (req: Request, res: Response) => {
        const user = req.body;
        try {
            await authService.signUp(user);
            res.send('Record Ok');
  
        } catch (error) {
            console.error(error)
            res.status(409).send('Email déjà existant');
        }
    });

    app.use('/auth', authRouter);
};