using System.ComponentModel.DataAnnotations;

namespace Store.DTOS.Authentication
{
    public class RegisterDto : BaseUser
    {
        [Required]
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
        public string? Email { get; set; }
        public string? Adress {  get; set; }
        [Required]
        [RegularExpression("Admin|Customer|admin|customer", ErrorMessage = "Role must be either 'Admin' or 'Customer'.")]
        public string Role { get; set; }

    }
}
