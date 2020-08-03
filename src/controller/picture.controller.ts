import express, { Router, Request, Response, Application, NextFunction } from 'express';
import multer from 'multer';
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export const PictureController = (app: Application) => {

  const pictureRouter: Router = express.Router();

  pictureRouter.post('/', upload.single('picture'), (req: Request, res: Response, next: NextFunction) => {
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

  pictureRouter.get('/:nameFile', upload.single('picture'), (req: Request, res: Response, next: NextFunction) => {
    const name = req.params.nameFile;

    try {
        res.sendFile(path.resolve(`images/${name}`))
      } catch (error) {
      res.send(error);
    }
  });

  app.use('/picture', pictureRouter);
};