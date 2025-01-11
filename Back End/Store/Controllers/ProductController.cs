using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.DtoMapper;
using Store.DTOS.Product;
using Store.Interfaces;
using Store.Models;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _ProductRepository;
        public ProductController(IProductRepository productRepository)
        {
            _ProductRepository = productRepository;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> GetAll()
        {
            var Products = await _ProductRepository.GetAllAsyn();    
            
            if(Products == null)
                return NotFound();

            var ProductDto = Products.Select(x => x.ProductToGetProductDto());

            return Ok(ProductDto);
        }
        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> CreateProduct([FromForm]CreateProductDto productDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            Product NewProduct = productDto.PrtoductDtoToProduct();            

            await _ProductRepository.CreateAsync(NewProduct);

            return Ok(productDto);

        }
        [HttpGet("Count")]
        public ActionResult Count()
        {
            int count = _ProductRepository.Count();

            return Ok(count);
        
        }
        [HttpGet()]
        [Route("categoryId")]
        public async Task<IActionResult> GetProductByCategoryId(int CategoryId)
        {
            var Products = await _ProductRepository.GetAllProductByCategoryId(CategoryId);

            if (Products == null)
                return NotFound();

            var ProductDto = Products.Select(x => x.ProductToGetProductDto());

            return Ok(ProductDto);
        }
        [HttpGet("Id")]
        public IActionResult getProductById(int Id)
        {
            var Product = _ProductRepository.GetProductById(Id);

            if (Product == null) 
                return NotFound("No Product Was Found");

            

            return Ok(Product.ProductToGetProductDto());
        }
        [HttpPut("{id}")]
        [Authorize]
        public ActionResult UpdateProduct(int id ,[FromBody] UpdateProductDto updatedProduct) 
        {
            if (id != updatedProduct.id)
                return BadRequest("Product ID mismatch.");

            var product = _ProductRepository.GetProductById(id);

            if (product == null)
                return NotFound($"Product with ID {id} not found.");

            try
            {
                _ProductRepository.Update(updatedProduct);
                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }
        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        public ActionResult DeleteProduct(int id) 
        {
            var product = _ProductRepository.GetProductById(id);

            if (product == null)
                return NotFound("Product not found.");

            _ProductRepository.Delete(id);

            return Ok(new { message = "Product deleted successfully." });
        }


    }
}
