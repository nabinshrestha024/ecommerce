using System.Security.Claims;

namespace EcommerceProject.utils
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("UserId  not found in token.");
            }

            return int.Parse(userId);

        }
    }
}
