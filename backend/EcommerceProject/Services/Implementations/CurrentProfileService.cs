using EcommerceProject.Services.Interfaces;
using System.Security.Claims;
public class CurrentProfileService : ICurrentProfileService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentProfileService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public int UserId
    {
        get
        {
            var userIdClaim = _httpContextAccessor.HttpContext?
                .User?
                .FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                throw new UnauthorizedAccessException("UserId claim missing");

            return int.Parse(userIdClaim);
        }
    }
}
