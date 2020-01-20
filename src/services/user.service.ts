import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user';

export class UserService {

    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
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

    async getByStatus(status: string) {
        return await this.repository.findByStatus(status);
    }

    async getByUsername(username: string) {
        return await this.repository.findByUsername(username);
    }

    async upload(user: User) {
        return this.repository.save(user);
    }

    async modifyUser(user: User, id: number) {
        return this.repository.modify(user, id);
    }

    async deleteUser(id: number) {
        return this.repository.delete(id);
    }
}

