using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Store.DTOS.Authentication;
using Store.Interfaces;
using Store.Models;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAthentication athenticationRepos;

        public AuthenticationController(IAthentication athentication)
        {
            this.athenticationRepos = athentication;
        }
        [HttpPost]
        [Route("Register")]
        
        public async Task<IActionResult> Register([FromBody]RegisterDto userDto)
        {
            if(!ModelState.IsValid) 
            { 
                return BadRequest(ModelState);
            }

            IdentityResult result = await athenticationRepos.CreateUser(userDto);

            if(result.Succeeded)
            {
                var token = athenticationRepos.GenerateJwtToken(userDto);

                return Ok(new { token });
            }
            else
            {
                foreach(var errorItem in result.Errors)
                {
                    ModelState.AddModelError("", errorItem.Description);
                }
                return BadRequest(ModelState);
            }
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] loginDto loginDto)
        {
            string token = await athenticationRepos.Login(loginDto);

            if(token == "")
            {
                return Unauthorized("invalid username or password");
            }
            return Ok(new { token });
        }
        [HttpGet("isUserExist")]
        public async Task<IActionResult> isUserNameExist(string UserName)
        {
            if(await athenticationRepos.isUserNameExist(UserName))
                return Ok(true);
            else
                return Ok(false);

        }
        [HttpGet("isEmailExist")]
        public async Task<IActionResult> isEmailExist(string email)
        {
            if (await athenticationRepos.isEmailExist(email))
                return Ok(true);
            else
                return Ok(false);

        }


    }
}
