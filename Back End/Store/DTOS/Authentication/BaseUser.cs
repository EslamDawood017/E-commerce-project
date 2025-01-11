using System.ComponentModel.DataAnnotations;

namespace Store.DTOS.Authentication
{
    public class BaseUser
    {
        [Required(ErrorMessage = "UserName is required")]
        [StringLength(50, ErrorMessage = "username must be between 3 characters and 50 characters ", MinimumLength = 3)]
        public string UserName { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, ErrorMessage = "Password must be between 6 and 100 characters.", MinimumLength = 6)]
        public string Password { get; set; }
    }
}
