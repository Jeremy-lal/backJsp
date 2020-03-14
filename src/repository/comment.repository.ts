import { DbHandler } from './db.handler';
import { Comment } from '../models/comment';

export class CommentRepository {

    private GET_ALL = 'SELECT * FROM comment;';
    private GET_BY_ID = 'SELECT * FROM comment where id = ?';
    private GET_BY_GROUP = 'SELECT c.*, u.id AS userID, u.firstname, u.lastname, u.status, u.imgURL, u.status FROM comment AS c  JOIN user AS u ON c.user_id= u.id WHERE grp = ? and comment_id  IS NULL ORDER BY c.create_at DESC;';
    private GET_RESPONSE_BY_GROUP = 'SELECT c.*, u.id AS userID, u.firstname, u.lastname, u.status, u.imgURL, u.status FROM comment AS c  JOIN user AS u ON c.user_id= u.id WHERE grp = ? and comment_id IS NOT NULL;';
    private POST_BY_ID = 'INSERT INTO comment SET ?';
    private PUT_BY_ID = 'UPDATE comment SET ? WHERE id = ?';
    private DEL_BY_ID = 'DELETE FROM comment WHERE id = ?';

    private db: DbHandler;

    constructor() {
        this.db =  DbHandler.getInstance();

    }

    async findAll() {
        const result = await this.db.query(this.GET_ALL);
        return result;
    }

    async findById(id: number) {
        const comment = await this.db.query(this.GET_BY_ID , id);
        return comment;
    }
    async findByGroup(grp: string) {
        const comments = await this.db.query(this.GET_BY_GROUP , grp);
        return comments;
    }

    async findResponseByGroup(grp: string) {
        const comments = await this.db.query(this.GET_RESPONSE_BY_GROUP , grp);
        return comments;
    }

    async save(comment: Comment) {
        const postComment = await this.db.query(this.POST_BY_ID, comment);
        return postComment;
    }

    async modify(comment: Comment, id: number) {
        const modifyComment = await this.db.query(this.PUT_BY_ID, [comment, id]);
        return modifyComment;
    }

    async delete(id: number) {
        const deleteComment = await this.db.query(this.DEL_BY_ID , id);
        return deleteComment;
    }
}