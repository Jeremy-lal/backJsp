import { DbHandler } from './db.handler';
import { Note } from '../models/note';

export class NoteRepository {

    private GET_ALL = 'SELECT * FROM note;';
    private GET_BY_USER_ID = 'SELECT * FROM note WHERE user_id = ?';
    private POST_BY_ID = 'INSERT INTO note SET ?';
    private PUT_BY_ID = 'UPDATE note SET ? WHERE id = ?';
    private DEL_BY_ID = 'DELETE FROM note WHERE id = ?';

    private db: DbHandler;

    constructor() {
        this.db =  DbHandler.getInstance();
    }

    async findAll() {
        const result = await this.db.query(this.GET_ALL);
        return result;
    }

    async findByUserId(id: number) {
        const note = await this.db.query(this.GET_BY_USER_ID , id);
        return note;
    }

    async save(note: Note) {
        const postnote = await this.db.query(this.POST_BY_ID, note);
        return postnote;
    }

    async modify(note: Note, id: number) {
        const modifynote = await this.db.query(this.PUT_BY_ID, [note, id]);
        return modifynote;
    }

    async delete(id: number) {
        const deletenote = await this.db.query(this.DEL_BY_ID , id);
        return deletenote;
    }
}