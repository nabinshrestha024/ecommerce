namespace EcommerceProject.Models.DTOs.User
{
    public class UserPagedOrderSummaryDto
    {
        public int Userid { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }
        public string Address { get; set; }
        public bool Role { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public int TotalOrders {  get; set; }

        public int CompletedOrders { get; set; }

        public int CancelledOrders { get; set; }


    }
}
