
export class Product {
    idProduct?:number;
    titulo:string;
    img:string;
    descrip:string;
    brand:string;
    color:string;
    mostrar:boolean;
    price:number;
    type:number;
    constructor(titulo:string,img:string, descrip:string,brand:string,color:string,mostrar:boolean,price:number,type:number){
        this.titulo=titulo;
        this.img=img;
        this.descrip=descrip;
        this.brand=brand;
        this.color=color;
        this.mostrar=mostrar;
        this.price=price;
        this.type=type;
    }
}
