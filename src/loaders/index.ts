import expressLoader from './express';
import mysqlLoader from './mysql';
import { Application } from 'express';

export default async (app: Application ) => {
  await expressLoader(app);
  console.log('Express Intialized');

  await mysqlLoader();
  console.log('MySQL Intialized');

};