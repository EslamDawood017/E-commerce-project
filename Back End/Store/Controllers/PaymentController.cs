using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.DTOS.Payment;
using Stripe;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly string _StripSecretKey;
        public PaymentController(IConfiguration configuration)
        {
            _StripSecretKey = configuration["Stripe:SecretKey"];
            StripeConfiguration.ApiKey = _StripSecretKey;
        }
   
        [HttpPost]
        public IActionResult ProcessPayment([FromBody] PaymentRequest paymentRequest) 
        {
            var options = new ChargeCreateOptions
            {
                Amount = paymentRequest.Amount * 100,
                Currency = "usd",
                Source = paymentRequest.Token, // Token from frontend
                Description = "E-commerce Payment"
            };

            var service = new ChargeService();

            try
            {
                var charge = service.Create(options);
                return Ok(new { success = true, charge });
            }
            catch (StripeException ex)
            {
                return BadRequest(new { success = false, error = ex.Message });
            }
        }
    }
    public class PaymentRequest
    {
        public string Token { get; set; }
        public int Amount { get; set; }
    }
}
