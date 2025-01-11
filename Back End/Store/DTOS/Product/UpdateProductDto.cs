using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Store.Models;

namespace Store.DTOS.Product
{
    public class UpdateProductDto
    {
       
        public int id { get; set; }
        [Required(ErrorMessage = "Product name is required.")]
        [MaxLength(100, ErrorMessage = "Product name must not exceed 100 characters.")]

        public string Name { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [MaxLength(500, ErrorMessage = "Description must not exceed 500 characters.")]
        public string Description { get; set; }
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = "Stock cannot be negative.")]
        public int StockQuantity { get; set; }
        public int categoryId { get; set; }
        public string categoryName { get; set; }
        public string? ProductImage { get; set; }
    }
}
