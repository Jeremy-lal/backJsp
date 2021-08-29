import { User } from 'src/models/user';
import express, { Router, Request, Response, Application } from 'express';
import { AuthService } from '../services/auth.service';
import jwt = require('express-jwt');
import { environment } from '../environment';


export const AuthController = (app: Application) => {

    const authService = new AuthService();
    const authRouter: Router = express.Router();

    authRouter.get('/', (req, res) => {
        res.send('Hello auth');
      });


    authRouter.post('/signin', async (req: Request, res: Response) => {
        const userB = req.body;

        try {
            const { token, user } = await authService.signIn(userB.username, userB.pwd);
            res.set('access-control-expose-headers', 'JWT-TOKEN');
            res.set('JWT-TOKEN', token);
            user.pwd = 'null';
            res.send(user);
        } catch (error) {
            console.log(error);
            res.status(400).send('L\'email ou le mot de passe est erroné');
        }
    });


    if (environment.JWT_SECRET) {
        authRouter.use(jwt({ secret: environment.JWT_SECRET }));
    } else {
        throw new Error('Secret is not defined');
    }


    authRouter.post('/signup', async (req: Request, res: Response) => {
        const userTosign = req.body;
        
        try {
            if ((req as any).user.status === 'admin' || (req as any).user.status === 'superAdmin') {
                await authService.signUp(userTosign);
                res.send('Record Ok');
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(409).send('Impossible d\'enregistrer cet utilisateur');
        }
    });

    authRouter.put('/pwd', async (req: Request, res: Response) => {
        const user = req.body.user;
        const pwd = req.body.pwd;
        const newPwd = req.body.newPwd;
        try {
            const result = await authService.changePwd(user, pwd, newPwd);
            res.send(JSON.stringify(result));
        } catch (error) {
            res.status(409).send('pb');
        }
    });

    app.use(environment.baseUrl + '/auth', authRouter);
};