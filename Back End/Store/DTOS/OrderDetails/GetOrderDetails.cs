namespace Store.DTOS.OrderDetails
{
    public class GetOrderDetails
    {
        public int orderId {  get; set; }
        public string productName {  get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }


    }
}
