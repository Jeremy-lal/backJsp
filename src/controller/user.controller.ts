import { UserService } from './../services/user.service';
import express, { Router, Request, Response, Application } from 'express';
import jwt = require('express-jwt')

export const UserController = (app: Application) => {

    const userRouter: Router = express.Router();
    const userService = new UserService();

    userRouter.get('/', async (req: Request, res: Response) => {
        const result = await userService.getAll();
        res.send(result);
    });

    userRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            const result = await userService.getById(id);
            res.send(result);
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    userRouter.get('/username/:username', async (req: Request, res: Response) => {
        const username = req.params.username;
        const result = await userService.getByUsername(username);
        res.send(result);
    });

    if (!process.env.WILD_JWT_SECRET) {
        throw new Error('Secret is not defined');
      }

    userRouter.use(jwt({ secret: process.env.WILD_JWT_SECRET }));

    userRouter.get('/user/me', async (req: Request, res: Response) => {
        const user = await userService.getById((req as any).user.id);
        
        if (!user) {
            res.status(400).send('Aucun utilisateur trouvé pour ce token');
        }
        res.send(user);
    });

    userRouter.get('/role/:status', async (req: Request, res: Response) => {
        const status = req.params.status;

        try {
            const result = await userService.getByStatus(status);
            res.send(result);
        } catch (error) {
            res.status(404).send('Le status n\'a pas été trouvé' + status);
        }
    });

    userRouter.get('/auth/:username', async (req: Request, res: Response) => {
        const username = req.params.username;

        try {
            const result = await userService.getByUsername(username);
            res.send(result);
        } catch (error) {
            res.status(404).send( username + 'n\'a pas été trouvé');
        }
    });

    userRouter.post('/', (req: Request, res: Response) => {
        const user = req.body;
        userService.upload(user);
        res.send(user);
    });

    userRouter.put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const user = req.body;
        userService.modifyUser(user, id);
        res.send(user);
    });

    userRouter.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        userService.deleteUser(id);
        res.send();
    });

    app.use('/users', userRouter);
};