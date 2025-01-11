using Store.DTOS.User;
using Store.Models;

namespace Store.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> CreateUserAsync(User user);
        public Task<ICollection<User>> GetAllUsersAsync();
        public Task<User> GetByUserNameAsync(string username);
        public bool IsUserExist(int userId);
        public Task<User> GetUserById(int userId);
        public Task<bool> UpdateUser(UpdateUserInfo info);
        public int UserCount();
        public bool DeleteUser(int userId);
    }
}
