import { GalleryRepository } from './../repository/gallery.repository';
import { Gallery } from './../models/gallery';

export class GalleryService {

    private repository: GalleryRepository;

    constructor() {
        this.repository = new GalleryRepository();
    }

    async getAll() {
        const all = await this.repository.findAll();
        return all;
    }

    async upload(img: Gallery) {
        return this.repository.save(img);
    }

    async delete(id: number) {
        return this.repository.delete(id);
    }
}

