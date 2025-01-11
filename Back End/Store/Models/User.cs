using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Store.Models
{
    public class User : IdentityUser<int>
    {   
        public string? Role {  get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<Order> Orders { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ShoppingCart? ShoppingCart { get; set; }
    }
}
