import { NoteService } from './../services/note.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Le controller vous servira à réceptionner les requêtes associées aux utilisateurs
 *
 * @param app l'application express
 */
export const NoteController = (app: Application) => {

    const noteRouter: Router = express.Router();
    const noteService = new NoteService();

    
    noteRouter.get('/', async (req: Request, res: Response) => {
        const result = await noteService.getAll();
        res.send(result);
    });

    noteRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            const result = await noteService.getById(id);
            res.send(result);
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    noteRouter.post('/', (req: Request, res: Response) => {
        const note = req.body;
        noteService.upload(note);
        res.send(note);
    });

    noteRouter.put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const note = req.body;
        noteService.modifyNote(note, id);
        res.send(note);
    });

    noteRouter.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        noteService.deleteNote(id);
        res.send();
    });

    app.use('/notes', noteRouter);
};