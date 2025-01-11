using Store.DTOS.Shopping_Card;
using Store.Models;

namespace Store.DtoMapper
{
    public static class ShoppingCardMapper
    {
        public static ShoppingCardDTO ToShoppingCardDto(this ShoppingCart cart)
        {
            return new ShoppingCardDTO
            {
                UserId = cart.UserId,
                CreatedAt = cart.CreatedAt,
                ShoppingCartId = cart.ShoppingCartId,
            };
        }
    }
}
