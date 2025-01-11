using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Interfaces;
using Store.Models;

namespace Store.Repository
{
    public class CategoryRepository : IcategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Category>> GetAllCategoryAsync()
        {
            return await _context.Categorys.ToListAsync();
        }
    }
}
