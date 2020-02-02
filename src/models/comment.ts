import { User } from './user';

export class Comment {
  public id!: number;
  public user_id!: User;
  public create_at!: Date;
  public title!: string;
  public content!: string;
  public grp!: string;
  public comment_id!: number;

  constructor(input: Comment) {
    Object.assign(this, input);
}
}
