import { UserService } from './user.service';
import { UserRepository } from './../repository/user.repository';
import { NoteRepository } from './../repository/note.repository';
import { TokenService } from './token.service';
import { User } from 'src/models/user';
import { Token } from '../models/token';
import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

export class AuthService {

  private repository: UserRepository;
  private repositoryNote: NoteRepository;
  private tokenService: TokenService;
  private userService: UserService;

  constructor() {
    this.repository = new UserRepository();
    this.repositoryNote = new NoteRepository();
    this.tokenService = new TokenService();
    this.userService = new UserService();

  }

  async signUp(user: User) {
    const username = await this.repository.findByUsername(user.username);

    if (username == null || undefined) {
      user.pwd = await hash(user.pwd);

      randomBytes(12).toString('hex');

      const all = await this.repository.save(user);

      const tokenString = randomBytes(12).toString('hex');
      const token = new Token({ user_id: all.insertId, value: tokenString });

      await this.tokenService.create(token);
    } else {
      throw new Error('Mail already used ');
    }
  }


  async signIn(username: string, password: string) {
    const labelError = new Error('Invalide crendentials');
    const user = await this.repository.findByUsername(username);
    try {
      user.note = (await this.repositoryNote.findByUserId(user.id));
    } catch (error) {
      console.log(error);
    }

    if (!user) {
      throw new Error('NOT ACTIVE');
    }

    if (!user) {
      throw labelError;
    }
    const isValid = await verify(user.pwd, password);
    if (!isValid) {
      throw labelError;
    }

    const secret1 = process.env.WILD_JWT_SECRET;
    if (!secret1) {
      throw new Error('Pas de secret SETUP');
    }
    const token = sign(
      { id: user.id, username: user.username, email: user.email },
      secret1);
    return { token, user };
  }
}




