using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public int statusId { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal TotalAmount { get; set; }
        public bool IsDeleted { get; set; }

        [ForeignKey("UserId")]
        public User user { get; set; }
        [ForeignKey("statusId")]
        public OrderStatus status { get; set; }
        public ICollection<OrderDetail> orderDetails { get; set; }

    }
}
