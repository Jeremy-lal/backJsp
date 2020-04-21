import { DbHandler } from './db.handler';
import { User } from '../models/user';

export class UserRepository {

    private GET_ALL = 'SELECT * FROM user;';
    private GET_BY_ID = 'SELECT * FROM user WHERE user.id = ?;';
    private GET_BY_STATUS = 'SELECT * from user WHERE status = ?;';
    private GET_BY_USERNAME = 'SELECT * FROM user WHERE username = ?;';
    private GET_BY_MAIL = 'SELECT * FROM user WHERE email = ?;';
    private POST_BY_ID = 'INSERT INTO user SET ?;';
    private PUT_BY_ID = 'UPDATE user SET ? WHERE id = ?;';
    private PUT_PICTURE_BY_ID = 'UPDATE user SET imgURL = ? WHERE id = ?;';
    private PUT_PWD_BY_ID = 'UPDATE user SET pwd = ? WHERE id = ?;';
    private DEL_BY_ID = 'DELETE FROM user WHERE id = ?;';

    private db: DbHandler;

    constructor() {
        this.db =  DbHandler.getInstance();

    }

    async findAll() {
        const result = await this.db.query(this.GET_ALL) as Promise<User[]>;
        return result;
    }

    async findById(id: number) {
        const user = await (this.db.query(this.GET_BY_ID , id) as Promise<User[]>);
        return user[0]|| null;
    }
    async findByStatus(status: string) {
        const users = await this.db.query(this.GET_BY_STATUS , status) as Promise<User[]>;
        return users;
    }

    async findByUsername(username: string) {
        const users = await (this.db.query(this.GET_BY_USERNAME , username) as Promise<User[]>);
        return users[0]|| null;
    }

    async findByEmail(email: string) {
        const users = await (this.db.query(this.GET_BY_MAIL , email) as Promise<User[]>);
        return users[0]|| null;
    }

    async save(user: User): Promise<any> {
        const postUser = await (this.db.query(this.POST_BY_ID, user) as Promise<User>);
        return postUser;
    }

    async modify(user: User, id: number) {
        const modifyUser = await this.db.query(this.PUT_BY_ID, [user, id]);
        return modifyUser;
    }

    async changePicture(user: User, id: number) {
        const modifyUser = await this.db.query(this.PUT_PICTURE_BY_ID, [user.imgURL, id]);
        return modifyUser;
    }

    async changePwd(user: User) {
        const modifyUser = await this.db.query(this.PUT_PWD_BY_ID, [user.pwd, user.id]);
        return modifyUser;
    }

    async delete(id: number) {
        const deleteUser = await this.db.query(this.DEL_BY_ID , id);
        return deleteUser;
    }
}