using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.DTOS.User;
using Store.Interfaces;
using Store.Models;

namespace Store.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserRepository(AppDbContext context , UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<User> CreateUserAsync(User user)
        {
            await _context.Users.AddAsync(user);

            _context.SaveChanges();

            return user;
        }

        public bool DeleteUser(int userId)
        {
            var user = _context.Users.Find(userId);

            if (user != null) 
            {
                user.IsDeleted = true;
                _context.SaveChanges();
                return true;
            }
                return false;
        }

        public async Task<ICollection<User>> GetAllUsersAsync()
        {
            return await _context.Users.Where(U => U.IsDeleted == false).ToListAsync();
        }

        public Task<User> GetByUserNameAsync(string username)
        {
            return _userManager.FindByNameAsync(username);
        }

        public async Task<User> GetUserById(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public bool IsUserExist(int userId)
        {
             return _context.Users.Find(userId) != null ? true : false;
  
        }

        public async Task<bool> UpdateUser(UpdateUserInfo info)
        {
            var user = _context.Users.Find(info.Id);

            if (user == null)
                return false;


            user.UserName = info.UserName;
            user.Email = info.UserEmail;
            user.Role = info.role;

            if (!string.IsNullOrWhiteSpace(info.Password))
            {
                user.PasswordHash = _userManager.PasswordHasher.HashPassword( user, info.Password);
            }

            var result = await  _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return false;
            }

            return true;
        }

        public int UserCount()
        {
            int count =  _context.Users.Count();

            return count;
        }
    }
}
