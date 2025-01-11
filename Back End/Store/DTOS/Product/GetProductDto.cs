using System.ComponentModel.DataAnnotations;

namespace Store.DTOS.Product
{
    public class GetProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int CategoryId { get; set; }
        public string? ProductImage { get; set; }
        public string categoryName { get; set; }
    }
}
