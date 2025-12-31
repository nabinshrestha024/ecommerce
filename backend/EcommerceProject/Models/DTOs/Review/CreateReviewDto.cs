namespace EcommerceProject.Models.DTOs.Review
{
    public class CreateReviewDto
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public int Rating { get; set; }
    }
}
