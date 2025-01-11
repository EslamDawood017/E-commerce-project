using Store.DTOS.Authentication;
using Store.DTOS.User;
using Store.Models;

namespace Store.DtoMapper
{
    public static class UserMapper
    {
        public static User DtoToUser(this RegisterDto dto)
        {
            return new User()
            {      
                UserName = dto.UserName,
                Email = dto.Email,
                PasswordHash = dto.Password,
                Role = dto.Role,
                CreatedAt = DateTime.Now,
            };
        }
        public static GetUserInfo UserToUserInfo(this User user)
        {
            return new GetUserInfo
            {
                id = user.Id,
                UserName = user.UserName,
                userEmail = user.Email,
                Role = user.Role,
            };
        }
    }
}
