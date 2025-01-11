using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Store.DtoMapper;
using Store.Interfaces;
using Store.Models;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class shoppingCartController : ControllerBase
    {
        private readonly IshoppingCartRepository _shoppingCartRepo;
        private readonly IUserRepository _userRepository;

        public shoppingCartController(IshoppingCartRepository shoppingCartRepo , IUserRepository userRepository)
        {
            _shoppingCartRepo = shoppingCartRepo;
            _userRepository = userRepository;
        }
        [HttpPost]
        public async Task<IActionResult> CreateShoppingCart(int UserID)
        {
            if (!_userRepository.IsUserExist(UserID))
            {
                return NotFound("User Not Exist");
            }


            if (_shoppingCartRepo.IsUserHasShoppingCart(UserID))
            {
                return BadRequest("the user is already has shopping cart");
            }

            var addedShoppingcart =  await _shoppingCartRepo.CreateShoppingCartAsync(UserID);

            
            return Ok(addedShoppingcart.ToShoppingCardDto());

        }
    }
}
