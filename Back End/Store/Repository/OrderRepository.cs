using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.DTOS.Order;
using Store.Interfaces;
using Store.Models;
using System.Runtime.InteropServices;

namespace Store.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order.OrderId;
        }

        public Order GetOrderById(int id)
        {
            return _context.Orders.
                Include(o => o.user).
                Include(o => o.status).
                Where(o => o.IsDeleted == false).
                FirstOrDefault(o => o.OrderId == id);
        }

        public async Task<ICollection<Order>> GetOrderByUserIdAsync(int userId)
        {
           return await _context.Orders.Where(x => x.UserId == userId).ToListAsync();

        }

        public async Task<int> GetOrdersCountAsync()
        {
            return await _context.Orders.Where(o=>o.IsDeleted == false).CountAsync();
        }

        public async Task<int> GetCountPendingOrdersAsync()
        {
            return await _context.Orders.CountAsync(o => o.statusId == (int)eOrderStatus.Pending);
        }

        public async Task<int> GetCountCompletedOrdersAsync()
        {
            return await _context.Orders.CountAsync(o => o.statusId == (int)eOrderStatus.Delivered);
        }
        public async Task<decimal> GetTotalRevenueAsync()
        {
            return await _context.Orders.Where(o => o.statusId == (int)eOrderStatus.Delivered)
                .SumAsync(o => o.TotalAmount);
        }

        public int Count()
        {
            return _context.Orders.Where(o => o.IsDeleted == false).Count();
        }

        public async Task<List<Order>> GetAllOrdersAsync()
        {
            var Orders = await _context.Orders
                .Include(O => O.orderDetails)
                .Include(O => O.status)
                .Include(U => U.user)
                .Where(O => O .IsDeleted == false)
                .ToListAsync();

            return Orders;
        }

        public bool UpdateOrderStatus(int orderId, int statusId)
        {
            var order = _context.Orders.Find(orderId);

            if (order == null)
                return false;

            order.statusId = statusId;
            _context.SaveChanges();

            return true;

        }

        public void DeleteOrder(int OrderId)
        {
            var order = _context.Orders.Find(OrderId);

            if (order == null)
                return;

            order.IsDeleted = true;
            _context.SaveChanges();

        }
    }
}
