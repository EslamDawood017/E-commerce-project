using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.DTOS.Product;
using Store.Interfaces;
using Store.Models;
using System.Linq;

namespace Store.Business
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public int Count()
        {
            return _context.Products.Count();
        }

        public async Task<Product> CreateAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return product;
        }

        public void Delete(int productId)
        {
            var product = _context.Products.Find(productId);

            if (product != null)
            {
                product.IsDeleted = true;
                _context.SaveChanges();
            }
        }

        public async Task<ICollection<Product>> GetAllAsyn()
        {
            var Product =  await _context.Products.Where(p=>p.IsDeleted == false).Include(p=>p.category).ToListAsync();

            return Product;
        }

        public async Task<ICollection<Product>> GetAllProductByCategoryId(int CategoryId)
        {
            var product = await _context.Products.Include(p=>p.category).Where(p => p.CategoryId == CategoryId && p.IsDeleted == false).ToListAsync();

            return product;
        }

        public Product GetProductById(int productId)
        {
            return _context.Products.Find(productId);
        }

        public async Task<int> GetProductCountAsync()
        {
            return await _context.Products.CountAsync();
        }

        public bool isProductExist(int productId)
        {
            return _context.Products.Any(p => p.ProductId == productId);
        }

        public int Update(UpdateProductDto product)
        {
            var oldProduct = _context.Products.Find(product.id);

            if (oldProduct != null) 
            { 
                oldProduct.ProductImage = product.ProductImage;
                oldProduct.Price = product.Price;
                oldProduct.StockQuantity = product.StockQuantity;
                oldProduct.Description = product.Description;
                oldProduct.Name = product.Name;
                oldProduct.CategoryId = product.categoryId;
                return _context.SaveChanges();
            }
            return 0;
        }
    }
}
