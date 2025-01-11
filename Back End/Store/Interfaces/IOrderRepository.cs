using Store.Models;
using System.Collections.Generic;

namespace Store.Interfaces
{
    public interface IOrderRepository
    {
        public Task<int> CreateOrder(Order order);
        public Task<ICollection<Order>> GetOrderByUserIdAsync(int userId);
        public Order GetOrderById(int id);
        public Task<int> GetOrdersCountAsync();
        public Task<int> GetCountPendingOrdersAsync();
        public Task<int> GetCountCompletedOrdersAsync();
        public Task<decimal> GetTotalRevenueAsync();
        public Task<List<Order>> GetAllOrdersAsync();
        public bool UpdateOrderStatus(int  orderId, int statusId);
        public void DeleteOrder(int OrderId);
        public int Count();
    }
}
