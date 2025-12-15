using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ecommerce.Application.DTOs.Category
{
    public class CategoryFilterDto
    {
        public bool? IsActive { get; set; }   
        public string? Name { get; set; }     
    }

}
