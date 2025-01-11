using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.DtoMapper;
using Store.DTOS.Order;
using Store.Interfaces;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserRepository _userRepository;

        public OrderController(IOrderRepository orderRepository, IUserRepository userRepository)
        {
            _orderRepository = orderRepository;
            _userRepository = userRepository;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create(OrderDto orderDto)
        {
            if (!_userRepository.IsUserExist(orderDto.UserId))
                return BadRequest($"No User Found with id {orderDto.UserId}");

            var order = orderDto.DtoToOrder();

            int orderId = await _orderRepository.CreateOrder(order);

            return Ok(orderId);
        }
        [HttpGet("UserId")]
        public async Task<IActionResult> GetOrderByUserId(int UserId)
        {
            if (!_userRepository.IsUserExist(UserId))
                return BadRequest($"No User Found with id {UserId}");

            var orders = await _orderRepository.GetOrderByUserIdAsync(UserId);

            if (orders == null)
                return NotFound("No Orders was found");

            var dto = orders.Select(x => x.OrderToDto()).ToList();

            return Ok(dto);
        }
        [HttpGet("Count")]
        public ActionResult GetCount()
        {
            int count = _orderRepository.Count();

            return Ok(count);
        }
        [HttpGet("All")]
        public async Task<ActionResult> GetAllOrders()
        {
            var Orders = await _orderRepository.GetAllOrdersAsync();

            var orderDtos = Orders.Select(O => O.OrderToDto()).ToList();

            return Ok(orderDtos);
        }
        [HttpGet()]
        [Route("{id}")]
        public ActionResult GetOrderById(int id)
        {
            var order = _orderRepository.GetOrderById(id);

            if (order == null)
                return NotFound("Order Not Found");

            return Ok(order.OrderToDto());
        }
        [HttpPut("{OrderId}")]
        public ActionResult UpdateOrderStatus(int OrderId, [FromQuery] int StatusId)
        {
            var order = _orderRepository.GetOrderById(OrderId);

            if (order == null)
                return NotFound("Order Not Found");
            try
            {
                _orderRepository.UpdateOrderStatus(OrderId, StatusId);
                return Ok(new { mag = "Status updated successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest($"no status with id {StatusId}");
            }
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _orderRepository.GetOrderById(id);

            if (order == null)
                return NotFound("Order Not Found");

            try
            {
                _orderRepository.DeleteOrder(id);
                return Ok(new { msg = "Order Deleted Successfully." });
            }
            catch 
            {
                return BadRequest("An error occure during deleting the item.");
            }
        }
    }
}
