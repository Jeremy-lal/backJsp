import mysql from 'mysql';
import { environment } from '../environment';
import { DbHandler } from '../repository/db.handler';

export default async () => {


    const connexion = mysql.createConnection({
        host: environment.connexion.host, // address of the server
        // port: environment.connexion.port,
        user: environment.connexion.user, // username
        password: environment.connexion.pwd,
        database: environment.connexion.database,
        
    });

    DbHandler.getInstance(connexion);

    connexion.connect(function (err) {
        if (err) { throw err; }
        console.log('Connected!');
    });

    return connexion;
};