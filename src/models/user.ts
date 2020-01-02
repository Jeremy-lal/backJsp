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

    public adress!: {
        street: string;
        postcode: number;
        city: string;
    };

    public imgURL!: string;

    constructor(input: User) {
        Object.assign(this, input);
    }
}
