import mysql from 'mysql';
import { DbHandler } from '../repository/db.handler';

export default async () => {


    const connexion = mysql.createConnection({
        host: 'localhost', // address of the server
        user: 'root', // username
        password: '!Jeremy5',
        database: 'jsp',
    });

    DbHandler.getInstance(connexion);

    connexion.connect(function (err) {
        if (err) { throw err; }
        console.log('Connected!');
    });

    return connexion;
};