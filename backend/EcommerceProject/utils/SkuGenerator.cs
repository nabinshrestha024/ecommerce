namespace EcommerceProject.utils
{
    public static class SkuGenerator
    {
        public static string Generate()
        {
            return $"PRD-{DateTime.UtcNow.Year}-{Guid.NewGuid():N}".Substring(0, 18).ToUpper();
        }
    }
}
