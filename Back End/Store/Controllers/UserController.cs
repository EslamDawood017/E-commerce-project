using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Store.DtoMapper;
using Store.DTOS.Authentication;
using Store.DTOS.User;
using Store.Interfaces;
using Store.Models;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Store.Controllers
{
  
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;


        public UserController(IUserRepository UserRepository ) 
        { 
            _userRepository = UserRepository;
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> CreateUserAsync(RegisterDto userDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("invalid user inforamtion");
            }

            var User = userDto.DtoToUser();

            var AddUser = await _userRepository.CreateUserAsync(User);

            if (AddUser == null)
            {
                return BadRequest("Error user not added");
            }

            return Ok(AddUser);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllUserAsync()
        {
            var Users = await _userRepository.GetAllUsersAsync();

            if(Users == null)
            {
                return NotFound("No Users Was Found");
            }
            var usersDto = Users.Select(u => u.UserToUserInfo()).ToList();

            return Ok(usersDto);
        }
        [HttpGet("GetByUserName")]
        public async Task<IActionResult> getUserByUserName(string userName)
        {
            var user = await _userRepository.GetByUserNameAsync(userName);

            if (user == null)
                return NotFound("User Not Found");

            return Ok(user.UserToUserInfo());
        }
        [HttpGet("GetUserByUserId")]
        public async Task<IActionResult> GetUserById(int Id)
        {
            var user = await _userRepository.GetUserById(Id);

            if (user == null)
                return NotFound("User Not Found");


            return Ok(user.UserToUserInfo()
                );
        }
        [HttpPut("UpdateProfile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserInfo UserInfo)
        {
            var user = await _userRepository.GetUserById(UserInfo.Id);

            if (user == null)
                return NotFound("User Not Found");

            var Result = await _userRepository.UpdateUser(UserInfo);

            if(Result)
                return Ok(new { Message = "Profile updated successfully!" });
            else
                return BadRequest();
        }
        [HttpGet("Count")]
        public ActionResult UsersCount()
        {
            int Count = _userRepository.UserCount();

            return Ok(Count);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var user = await _userRepository.GetUserById(id);

            if (user == null)
                return NotFound("User Not Found.");

            var Result = _userRepository.DeleteUser(id);

            if (Result == false)
                BadRequest("User Not Deleted.");

           return Ok(new { mag = "User deleted successfully." });

        }

    }
}
