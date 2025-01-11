using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.DtoMapper;
using Store.Interfaces;
using Store.Repository;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IcategoryRepository _categoryRepo;

        public CategoryController(IcategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }
        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAllCategory()
        {
            var categories = await _categoryRepo.GetAllCategoryAsync();

            var categoryDto = categories.Select(x => x.CategoryToCategoryDto());



            if (categories == null)
            {
                return NotFound("no categories were found");
            }

            return Ok(categoryDto);
        }
    }
}
