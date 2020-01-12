import { UserService } from './user.service';
import { UserRepository } from './../repository/user.repository';
import { TokenService } from './token.service';
import { User } from 'src/models/user';
import { Token } from '../models/token';
import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';

export class AuthService {

    private repository: UserRepository;
    private tokenService: TokenService;
    private userService: UserService;

    constructor() {
        this.repository = new UserRepository();
        this.tokenService = new TokenService();
        this.userService = new UserService();

     }

    async signUp(user: User) {
        const userEmail = await this.repository.findByEmail(user.email);

        if (userEmail) {
            throw new Error('Mail already used');
        } else {
            user.pwd = await hash(user.pwd);

            const all = await this.repository.save(user);

            const tokenString = randomBytes(12).toString('hex');
            const token = new Token({user_id : all.insertId, value : tokenString});

            await this.tokenService.create(token);
        }
    }

    async signIn(email: string, password: string) {
        const user = await this.repository.findByEmail(email);
        const error = new Error('Invalid credentials');

        if (!user) {
            throw error;
        }
        const isValid = await verify(user.pwd, password);
        if (!isValid) {
            throw error;
        }
        const payload = { id: user.id, email: user.email, firstname: user.firstname, status: user.status, lastname: user.lastname, username: user.username, birthday: user.birthday };
        if (!process.env.WILD_JWT_SECRET) {
            throw new Error('Server is not correctly configured');
        }
        const token = sign (payload, process.env.WILD_JWT_SECRET as string);
        
        return token;
    }
}




