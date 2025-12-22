using System.Security.Cryptography;
using System.Text;

namespace EcommerceProject.utils
{
    public class TokenHasher
    {
        public static string Hash(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new ArgumentException("Token cannot be null or empty", nameof(token));
            }
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(token);
            var hashBytes = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
           
        }


        public static bool Verify(string token, string hash)
        {
            if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(hash))
                return false;

            return Hash(token) == hash;
        }
    }
}
