namespace EcommerceProject.Models.DTOs.Wishlist
{
    public class PagedResult<T>
    {

        public IEnumerable<T> Items { get; set; }

        public int TotalCount { get; set; }

        public int PageNumber { get; set; }

        public int Pagesize { get; set; }
    }
}
