import { DbHandler } from './db.handler';
import { Gallery } from './../models/gallery';

export class GalleryRepository {

    private GET_ALL = 'SELECT * FROM gallery order by create_at desc;';
    private POST_BY_ID = 'INSERT INTO gallery SET ?';
    private DEL_BY_ID = 'DELETE FROM gallery WHERE id = ?';

    private db: DbHandler;

    constructor() {
        this.db =  DbHandler.getInstance();
    }

    async findAll() {
        return await this.db.query(this.GET_ALL);
    }

    async save(gallery: Gallery) {
        return await this.db.query(this.POST_BY_ID, gallery);
    }

    async delete(id: number) {
        return await this.db.query(this.DEL_BY_ID , id);
    }
}