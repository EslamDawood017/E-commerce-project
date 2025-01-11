using Store.DTOS.Product;
using Store.Models;

namespace Store.Interfaces
{
    public interface IProductRepository
    {
        public Task<ICollection<Product>> GetAllAsyn();
        public Task<Product> CreateAsync(Product product);
        public Task<ICollection<Product>> GetAllProductByCategoryId(int CategoryId);
        public bool isProductExist(int productId);
        public Product GetProductById(int productId);
        public Task<int> GetProductCountAsync();
        public int Count();
        public int Update(UpdateProductDto product);
        public void Delete(int productId);

    }
}
