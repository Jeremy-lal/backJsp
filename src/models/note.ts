import { User } from "./user";

export class Note {
    public id!: number;
    public title!: string;
    public valeur!: number;
    public user_id!: User;

    constructor(input: Note) {
        Object.assign(this, input);
    }
  }
  