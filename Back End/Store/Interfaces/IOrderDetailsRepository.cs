using Store.Models;

namespace Store.Interfaces
{
    public interface IOrderDetailsRepository
    {
        public Task<int> CreateOrderDetails(OrderDetail orderDetail);
        public Task<List<OrderDetail>> GetAllOrderDetails(int orderId);
    }
}
