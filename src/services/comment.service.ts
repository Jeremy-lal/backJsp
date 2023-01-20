import { CommentRepository } from '../repository/comment.repository';
import { Comment } from '../models/comment';

export class CommentService {

    private repository: CommentRepository;

    constructor() {
        this.repository = new CommentRepository();
    }

    async getAll() {
        const all = await this.repository.findAll();
        return all;
    }

    async getById(id: number) {
        if (!Number.isInteger(id)) {
            throw new Error('error');
        }

        return (await this.repository.findById(id))[0];
    }

    async getByGroup(group: string) {
        return await this.repository.findByGroup(group);
    }

    async getNumberResponse(messageId: number) {
        return (await this.repository.getNumberResponse(messageId))[0];
    }

    async getResponseByCommentID(messageId: number) {
        return (await this.repository.getResponseByCommentID(messageId));
    }

    async getResponseByGroup(group: string) {
        return await this.repository.findResponseByGroup(group);
    }

    async upload(comment: Comment) {
        return this.repository.save(comment);
    }

    async modifycomment(comment: Comment, id: number) {
        return await this.repository.modify(comment, id);
    }

    async deletecomment(id: number) {
        return await this.repository.delete(id);
    }
}

