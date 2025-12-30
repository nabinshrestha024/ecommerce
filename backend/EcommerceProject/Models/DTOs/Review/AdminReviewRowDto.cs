namespace EcommerceProject.Models.DTOs.Review
{
    public class AdminReviewRowDto
    {
        public int ReviewId { get; set; }
        public int? ProductId { get; set; }  
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public int Rating { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
