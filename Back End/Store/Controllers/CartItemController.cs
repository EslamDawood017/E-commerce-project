using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.DtoMapper;
using Store.DTOS.CartItem;
using Store.Interfaces;
using Store.Models;
using System.Collections.Generic;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IshoppingCartRepository shoppingCartRepository;
        private readonly IProductRepository productRepository;

        public CartItemController(ICartItemRepository cartItemRepository ,
            IshoppingCartRepository shoppingCartRepository,
            IProductRepository productRepository)
        {
            _cartItemRepository = cartItemRepository;
            this.shoppingCartRepository = shoppingCartRepository;
            this.productRepository = productRepository;
        }
        [HttpGet("GetAllCartItemsByShoppingCartId")]
        public async Task<IActionResult> GetAllCartItems(int CartId) 
        { 
            var shoppingCart = shoppingCartRepository.GetShoppingCartById(CartId);

            if (shoppingCart == null)
                return NotFound("Shopping cart Not Found");

            var Cartitems = await _cartItemRepository.GetAllCartItemByCartId(CartId);

            if (Cartitems == null)
                return NotFound("No Items Were Found");

            var dtos = Cartitems.Select(x => x.CartItemToDto());

            return Ok(dtos);

        }
        [HttpPost("Create")]
        public IActionResult Create(List<CartItemDto> dtoList)
        {
            if(!ModelState.IsValid) 
              BadRequest(ModelState);

            if (shoppingCartRepository.GetShoppingCartById(dtoList[0].CartId) == null)
                return BadRequest($"No shopping cart with id {dtoList[0].CartId}");

            foreach (var item in dtoList)
            {
                if (!productRepository.isProductExist(item.ProductId))
                    return BadRequest($"No product with id {item.ProductId}");

                var CartItem = item.CreateCartItemDto();

                _cartItemRepository.Create(CartItem);

            }
           
            return Ok(dtoList);
        }
        [HttpDelete]
        public IActionResult Delete(int CartItemId)
        {
            var cartItem = _cartItemRepository.GetCartItemById(CartItemId);

            if (cartItem == null)
                return NotFound("Item not Found");

            if (_cartItemRepository.DeleteCartItem(CartItemId))
                return Ok(CartItemId);
            else
                return BadRequest();
        }
    }
}
