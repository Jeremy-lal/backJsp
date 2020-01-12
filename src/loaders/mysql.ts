import mysql from 'mysql';
import { DbHandler } from '../repository/db.handler';

export default async () => {


    const connexion = mysql.createConnection({
        host: 'localhost', // address of the server
        user: process.env.user_mysql, // username
        password: process.env.pwd_mysql,
        database: process.env.db_mysql_jsp,
    });

    DbHandler.getInstance(connexion);

    connexion.connect(function (err) {
        if (err) { throw err; }
        console.log('Connected!');
    });

    return connexion;
};