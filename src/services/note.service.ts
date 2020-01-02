import { NoteRepository } from '../repository/note.repository';
import { Note } from '../models/note';

export class NoteService {

    private repository: NoteRepository;

    constructor() {
        this.repository = new NoteRepository();
    }

    async getAll() {
        const all = await this.repository.findAll();
        return all;
    }

    async getById(id: number) {
        if (!Number.isInteger(id)) {
            throw new Error('error');
        }

        return await this.repository.findByUserId(id);
    }

    async upload(Note: Note) {
        return this.repository.save(Note);
    }

    async modifyNote(Note: Note, id: number) {
        return this.repository.modify(Note, id);
    }

    async deleteNote(id: number) {
        return this.repository.delete(id);
    }
}

