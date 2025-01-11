using Store.Models;

namespace Store.Interfaces
{
    public interface IshoppingCartRepository
    {
        public Task<ShoppingCart> CreateShoppingCartAsync(int UserID);
        public bool DeleteShoppingCartAsync(int UserId);
        public ICollection<ShoppingCart> GetAllShoppingCarts();
        public ShoppingCart GetShoppingCartById(int Id);
        public bool IsUserHasShoppingCart(int UserID);
    }
}