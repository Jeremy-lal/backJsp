import { Connection } from 'mysql';

export class DbHandler {

    static instance: DbHandler;
    private connection: Connection;

    static getInstance(connection?: Connection) {
        if (!this.instance && connection != null) {
            this.instance = new DbHandler(connection);
        }
        return this.instance;
    }

    private constructor(connection: Connection) {
        this.connection = connection;
    }

    query( sql: string, args?: any ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err ) {
                    return reject( err );
                }
                resolve( rows );
            } );
        } );
    }

    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err ) {
                    return reject( err );
                }
                resolve();
            } );
        } );
    }

}

