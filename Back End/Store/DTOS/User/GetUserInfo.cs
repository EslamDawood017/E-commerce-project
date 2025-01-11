using System.ComponentModel.DataAnnotations;

namespace Store.DTOS.User
{
    public class GetUserInfo
    {
        public int id { get; set; }
        public string UserName { get; set; }
        public string? userEmail { get; set; }
        public string? Role { get; set; }
    }
}
