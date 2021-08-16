import { DbHandler } from './db.handler';
import { File } from '../models/file';

export class FileRepository {

    private GET_ALL = 'SELECT * FROM file;';
    private GET_BY_ID = 'SELECT * FROM file WHERE user_id = ?';
    private POST_BY_ID = 'INSERT INTO file SET ?';
    private DEL_BY_ID = 'DELETE FROM file WHERE id = ?';

    private db: DbHandler;

    constructor() {
        this.db =  DbHandler.getInstance();
    }

    async findAll() {
        const result = await this.db.query(this.GET_ALL);
        return result;
    }

    async findById(id: number) {
        const file = await this.db.query(this.GET_BY_ID , id) as Promise<never>;
        return file;
    }

    async save(file: File) {
        const postfile = await this.db.query(this.POST_BY_ID, file);
        return postfile;
    }

    async delete(id: number) {
        const deletefile = await this.db.query(this.DEL_BY_ID , id);
        return deletefile;
    }
}