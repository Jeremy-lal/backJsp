import { Note } from './note';
export class User {

    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public birthday!: Date;

    public username!: string;
    public pwd!: string;

    public tel!: string;
    public email!: string;
    public status!: string;

    public adress!: string;

    public note: Note[] = [];

    public imgURL!: string;

    constructor(input: User) {
        Object.assign(this, input);
    }
}
