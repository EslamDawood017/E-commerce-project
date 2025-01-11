using Store.DTOS.OrderDetails;
using Store.Models;
using Store.Repository;

namespace Store.DtoMapper
{
    public static class OrderDetailsMapper
    {
        public static OrderDetail DtoToOrderDetails(this OrderDetailsDto dto)
        {
            return new OrderDetail
            {
                OrderId = dto.OrderId,
                Price = dto.Price,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,

            };
        }
        public static GetOrderDetails OrderDetailsToDTO(this OrderDetail orderDetail)
        {
            return new GetOrderDetails
            {
                productName = orderDetail.product.Name,
                price = orderDetail.Price,
                quantity = orderDetail.Quantity,
                orderId = orderDetail.OrderId,

            };
        }
    }
}
