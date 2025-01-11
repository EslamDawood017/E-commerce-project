using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Store.DtoMapper;
using Store.DTOS.Authentication;
using Store.Interfaces;
using Store.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Store.Repository
{
    public class AthenticationRepo : IAthentication
    {
        private readonly UserManager<User> _userManger;
        private readonly IConfiguration _configuration;

        public AthenticationRepo(UserManager<User> userManger , IConfiguration configuration)
        {
            _userManger = userManger;
            _configuration = configuration;
        }
        public async Task<IdentityResult> CreateUser(RegisterDto user)
        {
            var AddedUser = user.DtoToUser();

            IdentityResult result = await _userManger.CreateAsync(AddedUser , AddedUser.PasswordHash);

            return result;
        }

        public string GenerateJwtToken(BaseUser user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                jwtSettings["Issuer"],
                jwtSettings["Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(double.Parse(jwtSettings["ExpirationMinutes"])),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> isEmailExist(string email)
        {
            if (await _userManger.FindByEmailAsync(email) != null)
                return true;
            else
                return false;
        }

        public async Task<bool> isUserNameExist(string userName)
        {
            if (await _userManger.FindByNameAsync(userName) != null)
                return true;
            else
                return false;
        }

        public async Task<string> Login(loginDto loginDto)
        {
            var user = await _userManger.FindByNameAsync(loginDto.UserName);

            if(user != null && await _userManger.CheckPasswordAsync(user,loginDto.Password))
            {
                var token = GenerateJwtToken(loginDto);
                return token.ToString();
            }

           
            return "";
        }
    }
}
