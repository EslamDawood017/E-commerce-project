export class CreateOrderDetails{
    constructor(public orderId : number ,
        public productId : number,
        public quantity : number,
        public price : number){}
}