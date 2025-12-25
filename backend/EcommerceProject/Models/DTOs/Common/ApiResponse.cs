namespace EcommerceProject.Models.DTOs.Common
{
    public class ApiResponse<T>
    {
        public ApiMeta Meta { get; set; } = default!;
        public T Data { get; set; } = default!;
    }

    public class ApiMeta
    {
        public string BaseUrl { get; set; } = default!;
    }

}
