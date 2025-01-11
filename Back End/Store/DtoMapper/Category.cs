using Store.DTOS.Categoryy;
using Store.Models;

namespace Store.DtoMapper
{
    public static class CategoryMapper
    {
        public static GetAllCategoryDto CategoryToCategoryDto(this Category category)
        {
            return new GetAllCategoryDto
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName,
            };
        }

    }
}
