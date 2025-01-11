using Microsoft.EntityFrameworkCore;
using Store.Data;
using Store.Interfaces;
using Store.Models;

namespace Store.Repository
{
    public class OrderDetailsRepository : IOrderDetailsRepository
    {
        private readonly AppDbContext _context;

        public OrderDetailsRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateOrderDetails(OrderDetail orderDetail)
        {
            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();
            return  orderDetail.OrderId;
        }

        public async Task<List<OrderDetail>> GetAllOrderDetails(int orderId)
        {
            var orderDetails = await  _context.OrderDetails
                .Where(od => od.OrderId == orderId)
                .Include(od => od.product)
                .ToListAsync();

            return orderDetails;
        }
    }
}
