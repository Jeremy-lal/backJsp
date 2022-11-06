import { GalleryService } from './../services/gallery.service';
import { environment } from './../environment';
import express, { Router, Request, Response, Application, NextFunction } from 'express';
import multer from 'multer';
const fs = require('fs');
const path = require('path');
import jwt = require('express-jwt');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'gallery/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

export const GalleryController = (app: Application) => {

    const galleryRouter: Router = express.Router();
    const galleryService = new GalleryService();

    galleryRouter.get('/', async (req, res) => {
        try {
            const result = await galleryService.getAll();
            res.send(result);

        } catch (error) {
            res.send('Une erreur s\'est produite');
        }
    });

    galleryRouter.get('/:nameFile', upload.single('picture'), (req: Request, res: Response, next: NextFunction) => {
        const name = req.params.nameFile;

        try {
            res.sendFile(path.resolve(`gallery/${name}`))
        } catch (error) {
            res.send(error);
        }
    });

    galleryRouter.post('/img', upload.single('picture'), (req: Request, res: Response, next: NextFunction) => {
        const file = req.file;

        try {
            if (!file) {
                const error = new Error('PLease upload a file');
                return next(error);
            }
            res.send(file)
        } catch (error) {
            res.send(error);
        }
    });

    if (environment.JWT_SECRET) {
        galleryRouter.use(jwt({ secret: environment.JWT_SECRET }));
    } else {
        throw new Error('Secret is not defined');
    }


    galleryRouter.post('/', async (req: Request, res: Response) => {
        const img = req.body;

        try {
            if ((req as any).user.status === 'admin' || (req as any).user.status === 'superAdmin') {
                const result = await galleryService.upload(img);
                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send(error);
            // res.status(404).send('Erreur lors de la requête');
        }
    });

    galleryRouter.post('/delete', async (req: Request, res: Response, next: NextFunction) => {
        const id = parseInt(req.body.id, 10);
        const name = req.body.name;

        try {
            if ((req as any).user.status === 'admin' || (req as any).user.status === 'superAdmin') {
                const result = await galleryService.delete(id);

                if (result) {
                    fs.unlinkSync('gallery/' + name)
                }

                res.send(result);
            } else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        } catch (error) {
            res.status(404).send('Erreur lors de la requête');
        }
    });



    app.use(environment.baseUrl + '/gallery', galleryRouter);
};