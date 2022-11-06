import { environment } from '../environment';
import express, { Router, Request, Response, Application, NextFunction } from 'express';
import { FileService } from '../services/file.service';
import jwt = require('express-jwt');
const path = require('path');
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export const FilesController = (app: Application) => {

  const fileRouter: Router = express.Router();
  const fileService = new FileService();

  fileRouter.post('/', upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
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

  fileRouter.get('/:nameFile', upload.single('picture'), (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.nameFile;

    try {
      res.sendFile(path.resolve(`files/${name}`))
    } catch (error) {
      res.send(error);
    }
  });


  if (environment.JWT_SECRET) {
    fileRouter.use(jwt({ secret: environment.JWT_SECRET }));
  } else {
    throw new Error('Secret is not defined');
  }


  fileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
      if ((req as any).user) {
        const result = await fileService.getAll();
        res.send(result);
      } else {
        res.send('Vous n\'êtes pas authorisé à faire cette requête.');
      }
    } catch (error) {
      res.send(error);
    }
  });

  fileRouter.get('/by/user', async (req: Request, res: Response, next: NextFunction) => {

    try {
      const user = (req as any).user;

      if (user) {
        const isAdmin = ['admin', 'superAdmin'].includes(user.status);
        const result = isAdmin ? await fileService.getAll() : await fileService.getUserFile(user.status)
        res.send(result);
      } else {
        res.send('Vous n\'êtes pas authorisé à faire cette requête.');
      }
    } catch (error) {
      res.send(error);
    }
  });

  fileRouter.post('/file', async (req: Request, res: Response, next: NextFunction) => {
    const file = req.body;

    try {
      if ((req as any).user) {
        const result = await fileService.save(file);
        res.send(result);
      } else {
        res.send('Vous n\'êtes pas authorisé à faire cette requête.');
      }
    } catch (error) {
      res.send(error);
    }
  });

  fileRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    try {
      if ((req as any).user) {
        fileService.deletefile(id);
        res.send();
      } else {
        res.send('Vous n\'êtes pas authorisé à faire cette requête.');
      }
    } catch (error) {
      res.status(404).send('L\'id n\'a pas été trouvé' + id);
    }
  });


  app.use(environment.baseUrl + '/files', fileRouter);
};