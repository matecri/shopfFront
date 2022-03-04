
export class Productxsize{
    id?:number;
    total_amount:number;
    product_idproduct:number;
    size_idsize:number;
    constructor(total_amount:number,product:number,size:number){
        this.total_amount=total_amount;
        this.product_idproduct=product;
        this.size_idsize=size;
    }
}