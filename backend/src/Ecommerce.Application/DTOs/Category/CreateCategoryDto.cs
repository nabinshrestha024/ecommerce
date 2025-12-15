using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Category
{
    public class CreateCategoryDto
    {
        public int ParentCategoryId { get; set; }
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public string? CategoryImage { get; set; }
        public bool IsFeatured { get; set; }
        public int DisplayOrder { get; set; }
        public int SortOrder { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; }


    }
}
