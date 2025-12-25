using System.Text.RegularExpressions;

namespace EcommerceProject.utils
{
    public static class SlugGenerator
    {
        public static string Generate(string name)
        {
            var slug = name.ToLowerInvariant();
            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
            slug = Regex.Replace(slug, @"\s+", "-").Trim('-');
            return slug;
        }
    }
}
