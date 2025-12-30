using EcommerceProject.Services.Interfaces;

namespace EcommerceProject.Services.Implementations
{
    public class UrlService : IUrlService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UrlService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? ToAbsoluteUrl(string? path)
        {
            if (string.IsNullOrWhiteSpace(path))
                return path;

            if (Uri.IsWellFormedUriString(path, UriKind.Absolute))
                return path;

            if (!path.StartsWith("/"))
                path = "/" + path;

            var request = _httpContextAccessor.HttpContext?.Request;
            if (request == null)
                return path;

            return $"{request.Scheme}://{request.Host}{path}";
        }
    }
}
