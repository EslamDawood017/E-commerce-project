using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models
{
    public class Review
    {
        public int ReviewId { get; set; }  
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        [ForeignKey("UserId")]
        public User user { get; set; }
        [ForeignKey("ProductId")]
        public Product product { get; set; }

    }
}
