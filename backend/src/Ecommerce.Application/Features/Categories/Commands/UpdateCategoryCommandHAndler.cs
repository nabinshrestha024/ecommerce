using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.Common.Interfaces;
using Ecommerce.Application.DTOs.Category;
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
            

            return await _repository.UpdateAsync(request.Category);
        }
    }
}
