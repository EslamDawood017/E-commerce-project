using Store.Data;
using Store.Interfaces;
using Store.Models;

namespace Store.Repository
{
    public class shoppingCartRepository : IshoppingCartRepository
    {
        private readonly AppDbContext _context;

        public shoppingCartRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ShoppingCart> CreateShoppingCartAsync(int UserID)
        {
            var IsUserExist = _context.Users.Find(UserID);
            if (IsUserExist == null)
            {
                return null;
            }

            ShoppingCart addedObject = new ShoppingCart { UserId = UserID , CreatedAt = DateTime.Now };
            await _context.ShoppingCarts.AddAsync(addedObject);
            _context.SaveChanges();
            return addedObject;
        }

        public bool DeleteShoppingCartAsync(int UserId)
        {
            var shoppingCart = _context.ShoppingCarts.FirstOrDefault(x => x.UserId == UserId);

            if (shoppingCart == null)
                return false;

            _context.ShoppingCarts.Remove(shoppingCart);
            _context.SaveChanges();
            return true;
        }

        public ICollection<ShoppingCart> GetAllShoppingCarts()
        {
            return _context.ShoppingCarts.ToList();
        }

        public ShoppingCart GetShoppingCartById(int Id)
        {
            return _context.ShoppingCarts.Find(Id);
        }

        public bool IsUserHasShoppingCart(int UserID)
        {
            var shoppingCard = _context.ShoppingCarts.FirstOrDefault(sh=> sh.UserId == UserID);

            if (shoppingCard == null)
                return false;
            else
                return true;
        }
    }
}
