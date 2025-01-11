using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Interfaces;
using Store.Models;
using System.Runtime.InteropServices;

namespace Store.Repository
{
    public class CartItemRepository : ICartItemRepository
    {
        private readonly AppDbContext context;
        private readonly IshoppingCartRepository _shoppingCartRepository;

        public CartItemRepository(AppDbContext context )
        {
            this.context = context;
        }
        
        

        public async Task Create(CartItem cartItems)
        {
            await context.CartItems.AddAsync(cartItems);
            context.SaveChanges();   
        }

        public bool DeleteCartItem(int CartItemId)
        {

            var deletedCartItem = context.CartItems.Find(CartItemId);

            if (deletedCartItem == null)
                return false;

            context.CartItems.Remove(deletedCartItem);
            context.SaveChanges();
            return true;
        }

        public async Task<ICollection<CartItem>> GetAllCartItemByCartId(int CartId)
        {
            var shoppingCart = context.ShoppingCarts.Find(CartId);

            if (shoppingCart == null)
                return null;

            var items = await context.CartItems.Where(p=>p.CartId == CartId).ToListAsync();

            return items;

          
        }

        public CartItem GetCartItemById(int CartItemId)
        {
            var cartItem = context.CartItems.Find(CartItemId);

            return cartItem;
        }
    }
}
