using EcommerceProject.Models.Entities;

namespace EcommerceProject.Services.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateJwtToken(User user);
    }
}
