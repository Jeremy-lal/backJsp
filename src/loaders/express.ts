import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';

export default async ( app: Application) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  return app;
};
