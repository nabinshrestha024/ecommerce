using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.DTOs.Category;
using Ecommerce.Domain.Entities;
using MediatR;

namespace Ecommerce.Application.Features.Categories.Queries
{
    public class GetCategoryByIdQueryHandler
        : IRequestHandler<GetCategoryByIdQuery, CategoryDto?>
    {
        private readonly ICategoryRepository _repository;

        public GetCategoryByIdQueryHandler(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<CategoryDto?> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            var c = await _repository.GetByIdAsync(request.CategoryId);
            if (c == null) return null;

            return new CategoryDto
            {
                CategoryId = c.CategoryId,
                ParentCategoryId = c.ParentCategoryId,
                Name = c.Name,
                Slug = c.Slug,
                CategoryImage = c.CategoryImage,
                IsFeatured = c.IsFeatured,
                DisplayOrder = c.DisplayOrder,
                SortOrder = c.SortOrder,
                Description = c.Description,
                IsActive = c.IsActive
            };
        }
    }
}
