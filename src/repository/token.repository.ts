import { DbHandler } from './db.handler';
import { Token } from '../models/token';

export class TokenRepository {

    private GET_BY_ID_TOKEN = 'SELECT * FROM token WHERE value = ?';
    private POST_BY_ID = 'INSERT INTO token SET ?';

    private db: DbHandler;

    constructor() {
        this.db =  DbHandler.getInstance();

    }

    async save(token: Token) {
        const posttoken = await this.db.query(this.POST_BY_ID, token);
        return posttoken;
    }

    async getByValue(str: string) {
        const result = await this.db.query(this.GET_BY_ID_TOKEN , str);
        return result;
    }
}