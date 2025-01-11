using Store.Models;
using System.Collections.Generic;

namespace Store.Interfaces
{
    public interface ICartItemRepository
    {
        public Task Create(CartItem cartItem);
        public Task<ICollection<CartItem>> GetAllCartItemByCartId(int CartId);
        public bool DeleteCartItem(int CartItemId);
        public CartItem GetCartItemById(int CartItemId);

    }
}
