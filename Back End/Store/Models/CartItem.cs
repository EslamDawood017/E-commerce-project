using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models
{
    public class CartItem
    {
        public int CartItemID { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int quantity { get; set; }

        [ForeignKey("CartId")]
        public ShoppingCart shoppingCart { get; set; }
        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
