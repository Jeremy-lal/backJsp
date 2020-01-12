import { UserService } from './../services/user.service';
import express, { Router, Request, Response, Application } from 'express';


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

    userRouter.get('/role/:status', async (req: Request, res: Response) => {
        const status = req.params.status;

        try {
            const result = await userService.getByStatus(status);
            res.send(result);
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + status);
        }
    });

    userRouter.get('/auth/:email', async (req: Request, res: Response) => {
        const email = req.params.email;

        try {
            const result = await userService.getByEmail(email);
            res.send(result);
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + email);
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