USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spUsers_GetPagedWithOrderSummary
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;
    -- Paged Data
    SELECT 
        u.UserId,
        u.FullName,
        u.Email,
        u.Address,
        u.Role,
        u.Phone,
        u.IsActive,
        u.IsDeleted,

        COUNT(o.OrderId) AS TotalOrders,
        SUM(CASE WHEN o.Status = 'Completed' THEN 1 ELSE 0 END) AS CompletedOrders,
        SUM(CASE WHEN o.Status = 'Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders

    FROM Users u
    LEFT JOIN Orders o ON o.UserId = u.UserId
    GROUP BY 
        u.UserId, u.FullName, u.Email,u.Address,u.Role,u.Phone, u.IsActive,u.IsDeleted,u.CreatedAt
    ORDER BY userId ASC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    -- Total Count
    SELECT COUNT(*) FROM Users;
END
