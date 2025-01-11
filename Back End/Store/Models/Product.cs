using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        [Required]
        [MaxLength(100)]
        [Column(TypeName = "nvarchar(300)")]
        public string Name {  get; set; }
        public string Description { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int CategoryId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ProductImage { get; set; }
        public bool IsDeleted { get; set; }



        //navigation prop 

        [ForeignKey("CategoryId")]
        public Category category { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<CartItem> CartItems { get; set; }

    }
}
