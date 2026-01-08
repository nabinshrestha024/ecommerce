using EcommerceProject.Models.DTOs.ProductAttribute;
using EcommerceProject.Models.Validators.ProductAttribute;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using FluentValidation;
using Microsoft.Data.SqlClient;

namespace EcommerceProject.Services.Implementations
{
    public class ProductAttributeService : IProductAttributeService
    {
        private readonly IProductAttributeRepository _repo;

        public ProductAttributeService(IProductAttributeRepository repo)
        {
            _repo = repo;
        }

        public async Task<int> CreateAttributeAsync(UpsertAttributeDto dto, CancellationToken ct)
        {
            await new UpsertAttributeDtoValidator().ValidateAndThrowAsync(dto, ct);
            try
            {
                return await _repo.CreateAttributeAsync(dto.Name.Trim(), dto.IsVariant, ct);
            }
            catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601)
            {
                throw new ValidationException(new[]
                    {
        new FluentValidation.Results.ValidationFailure(
            "Name",
            "Attribute already registered."
        )
    });
            }


        }

        public async Task<int> CreateValueAsync(int attributeId,UpsertAttributeValueDto dto, CancellationToken ct)
        {
            await new UpsertAttributeValueDtoValidator().ValidateAndThrowAsync(dto, ct);
            try
            {
                return await _repo.CreateValueAsync(attributeId, dto.Value.Trim(), ct);
            }
            catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601)
            {
                throw new ValidationException(new[]
                {
            new FluentValidation.Results.ValidationFailure(
                "Value",
                "Attribute value already exists."
            )
        });
            }
        }

        public async Task<bool> UpdateAttributeAsync( int attributeId, UpsertAttributeDto dto,CancellationToken ct)
        {
            await new UpsertAttributeDtoValidator().ValidateAndThrowAsync(dto, ct);
            try
            {
                return await _repo.UpdateAttributeAsync(
                attributeId,
                dto.Name.Trim(),
                dto.IsVariant,
                ct
            );
            }
            catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601)
            {
                throw new ValidationException(new[]
                    {
        new FluentValidation.Results.ValidationFailure(
            "Name",
            "Attribute already registered."
        )
    });
            }

        }

        public async Task<bool> UpdateValueAsync(int attributeValueId,UpsertAttributeValueDto dto,CancellationToken ct)
        {
            await new UpsertAttributeValueDtoValidator().ValidateAndThrowAsync(dto, ct);
            try
            {
                return await _repo.UpdateValueAsync(attributeValueId, dto.Value.Trim(), ct);
            }
            catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601)
            {
                throw new ValidationException(new[]
                {
            new FluentValidation.Results.ValidationFailure(
                "Value",
                "Attribute value already exists."
            )
        });
            }

        }

        public Task<List<ProductAttributeDto>> GetAllAsync(CancellationToken ct)
        {
            return _repo.GetAllAsync(ct);
        }
           
    }

}
