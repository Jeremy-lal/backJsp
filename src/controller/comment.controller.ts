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
            const result = await commentService.getById(id);
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
            res.status(404).send('Le groupe' + group + 'n\'a pas été trouvé');
        }
    });

    commentRouter.post('/', (req: Request, res: Response) => {
        const comment = req.body;
        commentService.upload(comment);
        res.send(comment);
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