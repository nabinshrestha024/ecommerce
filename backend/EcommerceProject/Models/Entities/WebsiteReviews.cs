namespace EcommerceProject.Models.Entities
{
    public class WebsiteReviews
    {
        public int WebsiteReviewId { get; set; }
        public int UserId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public int Rating { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DeletedAt { get; set; }

    }
}
