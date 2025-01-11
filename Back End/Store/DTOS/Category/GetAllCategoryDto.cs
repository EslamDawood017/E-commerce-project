
using System.ComponentModel.DataAnnotations;

namespace Store.DTOS.Categoryy
{
    public class GetAllCategoryDto
    {
        [Required]
        public int CategoryId { get; set; }
        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; }

    }
}
