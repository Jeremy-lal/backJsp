import { UsersBygroup } from './../models/usersBygroup';
import { UserRepository } from '../repository/user.repository';
import { User } from '../models/user';
import { NoteRepository } from '../repository/note.repository';

export class UserService {

    private repository: UserRepository;
    private repositoryNote: NoteRepository;

    constructor() {
        this.repository = new UserRepository();
        this.repositoryNote = new NoteRepository();
    }

    async getAll() {
        const all: User[] = await this.repository.findAll();
        try {
            for (let i = 0; i < all.length; i++) {
                all[i].note = (await this.repositoryNote.findByUserId(all[i].id));
            }
        } catch (error) {
            console.log(error);
        }

        return all;
    }

    async getAllByGroups() {
        let usersBygroup= { }
        const status = ['Jsp1', 'Jsp2', 'Jsp3', 'Jsp4', 'admin', 'superAdmin'];
        let i =0;
        try {
            for ( i = 0; i < status.length ; i++) {
                ((usersBygroup as any)[status[i]] = await this.repository.findByStatus(status[i]));
                for (let user of  (usersBygroup as any)[status[i]]) {
                    user.note = (await this.repositoryNote.findByUserId(user.id));
                    }
            }
        } catch (error) {
            console.log(error);
        }
        return usersBygroup;
    }

    async getById(id: number) {
        if (!Number.isInteger(id)) {
            throw new Error('error');
        }
        const user = await this.repository.findById(id);
        try {
            if (user) {
                user.note = (await this.repositoryNote.findByUserId(id));
                return user;
            }
        } catch (error) {
            return error;
        }
    }

    async getByStatus(status: string) {
        const all = await this.repository.findByStatus(status);
        try {
            for (let i = 0; i < all.length; i++) {
                all[i].note = (await this.repositoryNote.findByUserId(all[i].id));
            }
        } catch (error) {
            console.log(error);
        }
        return all;
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

    async modifyUserPicture(user: User, id: number) {
        return this.repository.changePicture(user, id);
    }

    async deleteUser(id: number) {
        return this.repository.delete(id);
    }
}

