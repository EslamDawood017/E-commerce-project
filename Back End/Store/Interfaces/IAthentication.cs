using Microsoft.AspNetCore.Identity;
using Store.DTOS.Authentication;

namespace Store.Interfaces
{
    public interface IAthentication
    {
        public Task<IdentityResult> CreateUser(RegisterDto user);
        public Task<string> Login(loginDto user);
        public string GenerateJwtToken(BaseUser user);
        public Task<bool> isUserNameExist(string userName);
        public Task<bool> isEmailExist(string email);

    }
}
