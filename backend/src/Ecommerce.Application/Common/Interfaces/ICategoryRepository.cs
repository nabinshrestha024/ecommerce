using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Application.DTOs.Category;
using Ecommerce.Domain.Entities;

namespace Ecommerce.Application.Common.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync(CategoryFilterDto filter);
        Task<Category?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateCategoryDto category);
        Task<bool> UpdateAsync(UpdateCategoryDto category);
        Task<bool> DeleteAsync(int id);
    }
}
