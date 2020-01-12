import { TokenRepository } from '../repository/token.repository';
import { Token } from 'src/models/token';

export class TokenService {

    repository = new TokenRepository() ;

    constructor() {}


    async create(token: Token) {
        return await this.repository.save(token);
    }

    getByValue(value: string) {
        return this.repository.getByValue(value);
    }

}

