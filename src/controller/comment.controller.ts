import { environment } from '../environment';
import { CommentService } from './../services/comment.service';
import express, { Router, Request, Response, Application } from 'express';
import jwt = require('express-jwt');

export const CommentController = (app: Application) => {

    const commentRouter: Router = express.Router();
    const commentService = new CommentService();

    if (environment.JWT_SECRET) {
        commentRouter.use(jwt({ secret: environment.JWT_SECRET }));
    } else {
        throw new Error('Secret is not defined');
    }


    commentRouter.get('/', async (req: Request, res: Response) => {

        try {
            if ((req as any).user) {
                const result = await commentService.getAll();
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send('Une erreur s\'est produite');
        }
    });

    commentRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            if ((req as any).user) {
                const result = await commentService.getById(id);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    commentRouter.get('/grp/:group', async (req: Request, res: Response) => {
        const group = req.params.group;

        try {
            if ((req as any).user) {
                const result = await commentService.getByGroup(group);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('Le groupe' + group + 'n\'a pas été trouvé');
        }
    });

    commentRouter.get('/response/grp/:group', async (req: Request, res: Response) => {
        const group = req.params.group;

        try {
            if ((req as any).user) {
                const result = await commentService.getResponseByGroup(group);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('Le groupe' + group + 'n\'a pas été trouvé');
        }
    });

    commentRouter.get('/response/:messageId', async (req: Request, res: Response) => {
        const messageId = parseInt(req.params.messageId, 10);

        try {
            if ((req as any).user) {
                const result = await commentService.getResponseByCommentID(messageId);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });

    commentRouter.get('/response/number/:messageId', async (req: Request, res: Response) => {
        const messageId = parseInt(req.params.messageId, 10);

        try {
            if ((req as any).user) {
                const result = await commentService.getNumberResponse(messageId);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });

    commentRouter.post('/', (req: Request, res: Response) => {
        const comment = req.body;
        try {
            if ((req as any).user) {
                commentService.upload(comment);
                res.send(comment);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });

    commentRouter.put('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const comment = req.body;

        try {
            if ((req as any).user) {
                const result = await commentService.modifycomment(comment, id);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }
    });

    commentRouter.delete('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            if ((req as any).user) {
                const result = await commentService.deletecomment(id);;
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send(error);
        }

    });

    app.use(environment.baseUrl + '/comments', commentRouter);
};