using Store.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.DTOS.CartItem
{
    public class CartItemDto
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int quantity { get; set; }

    }
}
