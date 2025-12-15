using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.DTOs.Category;
using MediatR;
namespace Ecommerce.Application.Features.Categories.Commands
{
    public class CreateCategoryCommand :IRequest<int>
    {
        public CreateCategoryDto Category { get; set; } = null!;
    }

}
