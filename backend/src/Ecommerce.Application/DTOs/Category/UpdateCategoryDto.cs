using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Category
{
    public class UpdateCategoryDto
    {
        public int CategoryId { get; set; }
        public int ParentCategoryId { get; internal set; }
        public string Name { get; internal set; }
        public string Slug { get; internal set; }
        public string CategoryImage { get; internal set; }
        public bool IsFeatured { get; internal set; }
        public int DisplayOrder { get; internal set; }
        public int SortOrder { get; internal set; }
        public string Description { get; internal set; }
        public bool IsActive { get; internal set; }
    }
}
