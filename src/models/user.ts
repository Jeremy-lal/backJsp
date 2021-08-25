import { Note } from './note';
export class User {
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public username!: string;
    public pwd!: string;
    public status!: string;
    public note: Note[] = [];
    public imgURL!: string;

    constructor(input: User) {
        Object.assign(this, input);
    }
}
