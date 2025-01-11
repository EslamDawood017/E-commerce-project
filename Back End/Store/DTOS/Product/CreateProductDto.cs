using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Store.DTOS.Product
{
    public class CreateProductDto
    {
       
        [Required]
        [MaxLength(100 ,ErrorMessage = "Name of product can't be more than 100 charachers")]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(1, 100000)]
        public decimal Price { get; set; }
        [Required]
        [Range(1, 1000)]
        public int StockQuantity { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public string? ProductImage { get; set; }

    }
}
