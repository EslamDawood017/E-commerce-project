using Store.Models;

namespace Store.Interfaces
{
    public interface IcategoryRepository
    {
        Task<ICollection<Category>> GetAllCategoryAsync();
    }
}
