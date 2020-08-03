import { NoteService } from './../services/note.service';
import express, { Router, Request, Response, Application } from 'express';
import jwt = require('express-jwt');


export const NoteController = (app: Application) => {

    const noteRouter: Router = express.Router();
    const noteService = new NoteService();

    if(process.env.WILD_JWT_SECRET) {
        noteRouter.use(jwt({ secret: process.env.WILD_JWT_SECRET}));
    } else {
        throw new Error('Secret is not defined');
    }

    
    noteRouter.get('/', async (req: Request, res: Response) => {
        try {
            if((req as any).user) {
                const result = await noteService.getAll();
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.send('Une erreur s\'est produite');
        }
    });

    noteRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            if((req as any).user) {
                const result = await noteService.findByUserId(id);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    noteRouter.post('/', (req: Request, res: Response) => {
        const note = req.body;

        try {
            if((req as any).user) {
                noteService.upload(note);
                res.send(note);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('erreur lors de l\'enregistrement de la note');;
        }
    });

    noteRouter.put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const note = req.body;

        try {
            if((req as any).user) {
                noteService.modifyNote(note, id);
                res.send(note);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    noteRouter.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        try {
            if((req as any).user) {
                noteService.deleteNote(id);
                res.send();
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });

    app.use('/notes', noteRouter);
};