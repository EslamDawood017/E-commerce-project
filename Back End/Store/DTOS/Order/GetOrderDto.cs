using System.ComponentModel.DataAnnotations.Schema;

namespace Store.DTOS.Order
{
    public class GetOrderDto
    {
        public int orderId { get; set; }
        public string cutomerName { get; set; }
        public DateTime orderDate { get; set; }
        public string status { get; set; }
        public decimal totalAmount { get; set; }

    }
}
