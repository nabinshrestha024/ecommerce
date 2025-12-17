namespace EcommerceProject.Models.DTOs
{
    namespace EcommerceProject.Models.DTOs
    {
        public sealed record PagedResult<T>
        {
            public IReadOnlyList<T> Items { get; init; } = Array.Empty<T>();
            public int Page { get; init; }
            public int PageSize { get; init; }
            public int TotalCount { get; init; }

            public PagedResult(
                IReadOnlyList<T> items,
                int page,
                int pageSize,
                int totalCount)
            {
                Items = items;
                Page = page;
                PageSize = pageSize;
                TotalCount = totalCount;
            }
        }

    }

}
