import { CommentService } from './../services/comment.service';
import express, { Router, Request, Response, Application } from 'express';

export const CommentController = (app: Application) => {

    const commentRouter: Router = express.Router();
    const commentService = new CommentService();

    
    commentRouter.get('/', async (req: Request, res: Response) => {
        const result = await commentService.getAll();
        res.send(result);
    });

    commentRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            const result = (await commentService.getById(id));
            res.send(result);
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    commentRouter.get('/grp/:group', async (req: Request, res: Response) => {
        const group = req.params.group;

        try {
            const result = await commentService.getByGroup(group);
            res.send(result);
        } catch (error) {
            console.log(error);
            
            res.status(404).send('Le groupe' + group + 'n\'a pas été trouvé');
        }
    });

    commentRouter.get('/response/grp/:group', async (req: Request, res: Response) => {
        const group = req.params.group;

        try {
            const result = await commentService.getResponseByGroup(group);
            res.send(result);
        } catch (error) {
            res.status(404).send('Le groupe' + group + 'n\'a pas été trouvé');
        }
    });

    commentRouter.get('/response/:messageId', async (req: Request, res: Response) => {
        const messageId = parseInt(req.params.messageId, 10);

        try {
            const result = await commentService.getResponseByCommentID(messageId);
            res.send(result);
        } catch (error) {
            console.log(error);
            
            res.sendStatus(404).send('erreur nb response');
        }
    });

    commentRouter.get('/response/number/:messageId', async (req: Request, res: Response) => {
        const messageId = parseInt(req.params.messageId, 10);

        try {
            const result = await commentService.getNumberResponse(messageId);
            res.send(result);
        } catch (error) {
            console.log(error);
            
            res.sendStatus(404).send('erreur nb response');
        }
    });

    commentRouter.post('/', (req: Request, res: Response) => {
        const comment = req.body;
        try {
            commentService.upload(comment);
            res.send(comment);
        } catch (error) {
            console.log(error);
        }
    });

    commentRouter.put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const comment = req.body;
        commentService.modifycomment(comment, id);
        res.send(comment);
    });

    commentRouter.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        commentService.deletecomment(id);
        res.send();
    });

    app.use('/comments', commentRouter);
};