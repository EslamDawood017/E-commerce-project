using Store.DTOS.CartItem;
using Store.Models;

namespace Store.DtoMapper
{
    public static class CartItemMapper
    {
        public static CartItemDto CartItemToDto(this CartItem cartItem)
        {
            return new CartItemDto
            {
                CartId = cartItem.CartId,
                ProductId = cartItem.ProductId,
                quantity = cartItem.CartId
            };
        }
        public static CartItem CreateCartItemDto(this  CartItemDto dto)
        {
            return new CartItem
            {
                CartId = dto.CartId,
                ProductId = dto.ProductId,
                quantity = dto.quantity,
            };
        }
    }
}
