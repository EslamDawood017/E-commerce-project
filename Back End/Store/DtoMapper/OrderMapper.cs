using Store.DTOS.Order;
using Store.Models;

namespace Store.DtoMapper
{
    public static class OrderMapper
    {
        
        public static Order DtoToOrder(this OrderDto dto)
        {
            return new Order
            {
                UserId = dto.UserId,
                TotalAmount = dto.TotalAmount,
                statusId = (int)eOrderStatus.Pending,
                OrderDate = DateTime.Now,
            };
        }
        public static GetOrderDto OrderToDto(this Order order)
        {
            return new GetOrderDto
            {
                orderId = order.OrderId,
                cutomerName = order.user.UserName,
                totalAmount = order.TotalAmount,
                orderDate = order.OrderDate,
                status = order.status.Name

            };
        }
    }
}
