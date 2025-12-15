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
    public class GetCategoryByIdQuery : IRequest<CategoryDto?>
    {
        public int CategoryId { get; }
        public GetCategoryByIdQuery(int id) => CategoryId = id;
    }

}
