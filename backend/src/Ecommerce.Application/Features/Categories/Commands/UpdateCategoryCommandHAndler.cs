using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Domain.Entities;
using MediatR;

namespace Ecommerce.Application.Features.Categories.Commands
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, bool>
    {
        private readonly ICategoryRepository _repository;

        public UpdateCategoryCommandHandler(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var dto = request.Category;

            var category = new Category
            {
                CategoryId = dto.CategoryId,
                ParentCategoryId = dto.ParentCategoryId,
                Name = dto.Name,
                Slug = dto.Slug,
                CategoryImage = dto.CategoryImage,
                IsFeatured = dto.IsFeatured,
                DisplayOrder = dto.DisplayOrder,
                SortOrder = dto.SortOrder,
                Description = dto.Description,
                IsActive = dto.IsActive
            };

            return await _repository.UpdateAsync(category);
        }
    }
}
