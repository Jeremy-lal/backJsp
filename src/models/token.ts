export class Token {

   public id?: number;
   public user_id!: number;
   public value!: string;

   constructor(input: Token) {
      Object.assign(this, input);
   }

}
