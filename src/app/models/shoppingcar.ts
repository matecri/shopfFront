

export class Shoppingcar{
    idshopping?:number;
    amount:number;
    bought:boolean;
    user:string;
    productxsize:number;
    constructor(amount:number,bought:boolean,user:string,productxsize:number){
        this.amount=amount;
        this.bought=bought;
        this.user=user;
        this.productxsize=productxsize;
    }

}