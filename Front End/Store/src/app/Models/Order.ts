export class Order {

    constructor(public orderId : number ,
        public  cutomerName : string , 
        public orderDate : Date , 
        public status : string , 
        public totalAmount : number
    ) {}
}