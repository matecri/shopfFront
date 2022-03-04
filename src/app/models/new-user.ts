export class NewUser {
    name:string ;
    lastname:string ;
    mail:string ;
    pass:string ;
    address:string ;
    document:string ;
    type_document:string ;
    constructor(name:string,lastname:string,mail:string,pass:string,addres:string,document:string,type_document:string){
        this.name=name;
        this.lastname=lastname;
        this.mail=mail;
        this.pass=pass;
        this.address=addres;
        this.document=document;
        this.type_document=type_document;
    }
}
