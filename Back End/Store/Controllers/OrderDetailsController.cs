using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.DtoMapper;
using Store.DTOS.OrderDetails;
using Store.Interfaces;
using System.Runtime.InteropServices;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IOrderDetailsRepository _orderDetails;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;

        public OrderDetailsController(IOrderDetailsRepository orderDetails, IProductRepository productRepository,IOrderRepository orderRepository)
        {
            _orderDetails = orderDetails;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create(List<OrderDetailsDto> dto)
        {
            if(!ModelState.IsValid) 
             return BadRequest(ModelState);

            foreach (var item in dto)
            {
                if (!_productRepository.isProductExist(item.ProductId))
                    return NotFound($"no Product with id {item.ProductId}");

                if (_orderRepository.GetOrderById(item.OrderId) == null)
                    return BadRequest($"no order was found with id {item.OrderId}");

                 await _orderDetails.CreateOrderDetails(item.DtoToOrderDetails());

            }
            return Ok(true);
        }

        [HttpGet()]
        public async Task<ActionResult> GetOrderDetails( [FromQuery]int OrderId)
        {
            var order = _orderRepository.GetOrderById(OrderId);

            if (order == null)
                return NotFound($"No order was found with id : {OrderId}");

            var orderDetails = await  _orderDetails.GetAllOrderDetails(OrderId);

            var DTOs = orderDetails.Select(x => x.OrderDetailsToDTO());



            return Ok(DTOs);
        }

    }
}
