import express, { Router, Request, Response, Application, NextFunction } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
      cb(null,'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
const upload = multer({storage: storage});

export const PictureController = (app: Application) => {

    const pictureRouter: Router = express.Router();

    pictureRouter.post('/', upload.single('picture'), (req: Request, res: Response, next: NextFunction) => {        
        const file = req.file;
        console.log(file.filename);
        if(!file) {
            const error = new Error('PLease upload a file');
            return next(error);

        }
        res.send(file)
    })


    app.use('/picture', pictureRouter);
};