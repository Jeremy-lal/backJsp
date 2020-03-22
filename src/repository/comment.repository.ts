import { DbHandler } from './db.handler';
import { Comment } from '../models/comment';
import { CountResponse } from 'src/models/countResponse';

export class CommentRepository {

    private GET_ALL = 'SELECT * FROM comment;';
    private GET_BY_ID = 'SELECT * FROM comment where id = ?';
    private GET_BY_GROUP = 'SELECT c.*, u.firstname, u.lastname, u.status, u.imgURL, u.status FROM comment AS c  JOIN user AS u ON c.user_id= u.id WHERE grp = ? and comment_id  IS NULL;';
    private GET_RESPONSE_BY_GROUP = 'SELECT c.*, u.id AS userID, u.firstname, u.lastname, u.status, u.imgURL, u.status FROM comment AS c  JOIN user AS u ON c.user_id= u.id WHERE grp = ? and comment_id IS NOT NULL;';
    private GET_COMMENT_RESPONSE = 'SELECT c.*, u.id AS userID, u.firstname, u.lastname, u.status, u.imgURL, u.status FROM comment AS c  JOIN user AS u ON c.user_id= u.id WHERE comment_id = ?;';
    private GET_NUMBER_RESPONSE = 'SELECT COUNT(*) AS count FROM comment where comment_id = ?';
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
        const comment = await this.db.query(this.GET_BY_ID , id) as Promise<Comment[]>;
        return comment;
    }
    async findByGroup(grp: string) {
        const comments = await this.db.query(this.GET_BY_GROUP , grp);
        return comments;
    }

    async getResponseByCommentID(messageId: number) {
        return await this.db.query(this.GET_COMMENT_RESPONSE, messageId) as Promise<Comment[]>;
    }
    async getNumberResponse(messageId: number) {
        return await this.db.query(this.GET_NUMBER_RESPONSE, messageId) as Promise<CountResponse[]>;
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

// "grp": "Commun",
// "grp": "Commun",