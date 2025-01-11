using Store.Models;
using System.ComponentModel.DataAnnotations;

namespace Store.DTOS.User
{
    public class CreateUserDto
    {
        
        [Required]
        public string UserName { get; set; }
        [Required]
        [MinLength(6)]
        [MaxLength(10)]
        public string Password { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        public string? Role { get; set; }

    }
}
