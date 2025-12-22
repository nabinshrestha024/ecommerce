using System.Security.Cryptography;

namespace EcommerceProject.utils
{
    public class TokenGenerator
    {
        public static string GenerateRefreshToken()
        {
            var ramdomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(ramdomBytes);
            return Convert.ToBase64String(ramdomBytes);
        }
    }
}
