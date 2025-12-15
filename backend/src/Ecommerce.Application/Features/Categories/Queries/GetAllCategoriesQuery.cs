using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.DTOs.Category;
using Ecommerce.Domain.Entities;
using MediatR;

namespace Ecommerce.Application.Features.Categories.Queries
{
    public class GetAllCategoriesQuery : IRequest<IEnumerable<CategoryDto>>
    {
        public CategoryFilterDto Filter { get; set; } = new();
    }
}
