using Store.DTOS.Product;
using Store.Models;

namespace Store.DtoMapper
{
    public static class ProductMapper
    {
        public static Product PrtoductDtoToProduct(this CreateProductDto dto)
        {
            return new Product
            {
                
                Name = dto.Name,
                ProductImage = dto.ProductImage,
                StockQuantity = dto.StockQuantity,
                CategoryId = dto.CategoryId,
                Price = dto.Price,
                Description = dto.Description,
                CreatedAt = DateTime.Now,
                IsDeleted = false,
                ProductId = 0


            };
        }
        public static GetProductDto ProductToGetProductDto(this Product product)
        {
            return new GetProductDto
            {
                Id = product.ProductId,
                Name = product.Name,
                ProductImage = product.ProductImage,
                StockQuantity = product.StockQuantity,
                CategoryId = product.CategoryId,
                categoryName = product.category.CategoryName,
                Price = product.Price,
                Description = product.Description,
            };        
        }
    }
}
