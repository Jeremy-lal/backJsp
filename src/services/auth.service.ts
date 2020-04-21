import { environment } from './../environment';
import { UserService } from './user.service';
import { UserRepository } from './../repository/user.repository';
import { NoteRepository } from './../repository/note.repository';
import { TokenService } from './token.service';
import { User } from 'src/models/user';
import { Token } from '../models/token';
import { hash, verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import * as nodemailer from 'nodemailer';

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

  async changePwd(userPass: User, pwd: string, newPwd: string) {
    const user = await this.repository.findByUsername(userPass.username);
    if (pwd === newPwd) {
      return 'Mot de passe actuel et nouveau identique';
    }
    if (user) {
      const isValid = await verify(user.pwd, pwd); ///verify if pwd enter is the same in the bdd
      if (isValid) {
        user.pwd = await hash(newPwd);
        this.repository.changePwd(user);
        return 'Mot de passe bien changé.';
      } else {
        return 'Mot de passe actuel erroné.';
      }
    } else {
      return 'Utilisateur non valide.';
    }
  }

  async changeLostPwd(mail: string, identifiant: string) {
    const userMail = await this.repository.findByEmail(mail);
    if (!userMail) {
      return 'L\'email renseigné n\'existe pas';
    }

    const userIdent = await this.repository.findByUsername(identifiant);
    if (!userIdent) {
      return 'L\'utilisateur renseigné n\'existe pas';
    }

    const newPwd = this.generatePwd();
    console.log(newPwd);



    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'test33700@gmail.com',
        pass: 'bzEm0LbSHfvfmGi13pUu'
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"JSP Mérignac" <jsp-merignac@gmail.com>', // sender address
      to: `${userIdent.email}`, // list of receivers
      subject: "Réinitialisation mot de passe", // Subject line
      text: `Vous recevez ce mail suite à la perte de votre mot de passe. Votre nouveau mot de passe est: ${newPwd}`, // plain text body
      html: `<p> Vous recevez ce mail suite à la perte de votre mot de passe. Votre nouveau mot de passe est: ${newPwd} </p>` // html body
    });

    // await this.changeUserPwd(userIdent, newPwd);

    return 'pwd change';

  }

  async changeUserPwd(user: User, pwd: string) {
    user.pwd = await hash(pwd);
    this.repository.changePwd(user);
  };

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generatePwd() {
    const characters = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN()/_{}';
    let newPwd = '';
    for (let i = 0; i < 16; i++) {
      const positionCharacter = this.getRandomInt(0, characters.length);
      newPwd += characters[positionCharacter];
    }
    return newPwd;
  }



}




