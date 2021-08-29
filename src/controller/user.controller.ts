import { environment } from '../environment';
import { UserService } from './../services/user.service';
import express, { Router, Request, Response, Application } from 'express';
import jwt = require('express-jwt')

export const UserController = (app: Application) => {

    const userRouter: Router = express.Router();
    const userService = new UserService();

    if (environment.JWT_SECRET) {
        userRouter.use(jwt({ secret: environment.JWT_SECRET }));
    } else {
        throw new Error('Secret is not defined');
    }

    userRouter.get('/', async (req: Request, res: Response) => {

        try {
            if((req as any).user) {
                const result = await userService.getAll();
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send('Une erreur s\'est produite');
        }
    });

    userRouter.get('/groups', async (req: Request, res: Response) => {
        try {
            if((req as any).user) {
                const result = await userService.getAllByGroups();
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            console.log(error); 
        }   
    });

    userRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            if((req as any).user) {
                const result = await userService.getById(id);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    userRouter.get('/username/:username', async (req: Request, res: Response) => {
        const username = req.params.username;

        try {
            if((req as any).user) {
                const result = await userService.getByUsername(username);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });


    userRouter.get('/role/:status', async (req: Request, res: Response) => {
        const status = req.params.status;

        try {
            if((req as any).user) {
                const result = await userService.getByStatus(status);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('Le status n\'a pas été trouvé' + status);
        }
    });

    userRouter.get('/auth/:username', async (req: Request, res: Response) => {
        const username = req.params.username;

        try {
            if((req as any).user) {
                const result = await userService.getByUsername(username);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send( username + 'n\'a pas été trouvé');
        }
    });

    userRouter.post('/', (req: Request, res: Response) => {
        const user = req.body;

        try {
            if((req as any).user) {
                userService.upload(user);
                res.send(user);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });

    userRouter.put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const user = req.body;

        try {
            if((req as any).user) {
                userService.modifyUser(user, id);
                res.send(user);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });

    userRouter.put('/picture/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const user = req.body;      
        
        try {
            if((req as any).user) {
                userService.modifyUserPicture(user, id);
                res.send(user);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });

    userRouter.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            if((req as any).user) {
                userService.deleteUser(id);
                res.send();
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });


    userRouter.get('/user/me', async (req: Request, res: Response) => {
        const user = await userService.getById((req as any).user.id);
        console.log((req as any).user);
        
        // console.log(user);
        
        
        if (!user) {
            res.status(400).send('Aucun utilisateur trouvé pour ce token');
        }
        res.send(user);
    });

    app.use(environment.baseUrl +  '/users', userRouter);
};