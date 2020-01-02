import { User } from './user';

export class Comment {
  public id!: number;
  public user_id!: User;
  public createAt!: Date;
  public title!: string;
  public content!: string;
  public grp!: string;

  constructor(input: Comment) {
    Object.assign(this, input);
}
}
