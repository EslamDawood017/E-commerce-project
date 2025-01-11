using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models
{
    public class ShoppingCart
    {
        public int ShoppingCartId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        [ForeignKey("UserId")]
        public User user { get; set; }
        public ICollection<CartItem> cartItems { get; set; }
    }
}
