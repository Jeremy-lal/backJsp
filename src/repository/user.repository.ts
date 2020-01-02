import { DbHandler } from './db.handler';
import { User } from '../models/user';

export class UserRepository {

    private GET_ALL = 'SELECT * FROM user;';
    private GET_BY_ID = 'SELECT u.*, n.title, n.valeur, n.id AS nodeId FROM note AS n  JOIN user AS u ON n.user_id= u.id WHERE u.id = ?';
    private GET_BY_STATUS = 'SELECT * from user WHERE status = ?';
    private POST_BY_ID = 'INSERT INTO user SET ?';
    private PUT_BY_ID = 'UPDATE user SET ? WHERE id = ?';
    private DEL_BY_ID = 'DELETE FROM user WHERE id = ?';

    private db: DbHandler;

    constructor() {
        this.db =  DbHandler.getInstance();

    }

    async findAll() {
        const result = await this.db.query(this.GET_ALL);
        return result;
    }

    async findById(id: number) {
        const user = await this.db.query(this.GET_BY_ID , id);
        return user;
    }
    async findByStatus(status: string) {
        const user = await this.db.query(this.GET_BY_STATUS , status);
        return user;
    }

    async save(user: User) {
        const postUser = await this.db.query(this.POST_BY_ID, user);
        return postUser;
    }

    async modify(user: User, id: number) {
        const modifyUser = await this.db.query(this.PUT_BY_ID, [user, id]);
        return modifyUser;
    }

    async delete(id: number) {
        const deleteUser = await this.db.query(this.DEL_BY_ID , id);
        return deleteUser;
    }
}