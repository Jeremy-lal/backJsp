import { environment } from './../environment';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';

export default async (app: Application) => {

  app.get(environment.baseUrl + '/status', (req, res) => { res.status(200).end(); });
  app.head(environment.baseUrl + '/status', (req, res) => { res.status(200).end(); });

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  return app;
};
