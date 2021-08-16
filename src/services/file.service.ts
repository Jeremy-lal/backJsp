import { FileRepository } from './../repository/file.repository';
import { File } from '../models/file';

export class FileService {

    private repository: FileRepository;

    constructor() {
        this.repository = new FileRepository();
    }

    async getAll() {
        const all = await this.repository.findAll();
        return all;
    }

    async findById(id: number) {
        if (!Number.isInteger(id)) {
            throw new Error('error');
        }

        return await this.repository.findById(id);
    }

    async save(file: File) {
        return this.repository.save(file);
    }

    async deletefile(id: number) {
        return this.repository.delete(id);
    }
}

