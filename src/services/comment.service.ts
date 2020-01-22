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

        return await this.repository.findById(id);
    }

    async getByGroup(group: string) {
        return await this.repository.findByGroup(group);
    }

    async getResponseByGroup(group: string) {
        return await this.repository.findResponseByGroup(group);
    }

    async upload(comment: Comment) {
        return this.repository.save(comment);
    }

    async modifycomment(comment: Comment, id: number) {
        return this.repository.modify(comment, id);
    }

    async deletecomment(id: number) {
        return this.repository.delete(id);
    }
}

