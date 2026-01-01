USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spUsers_GetByIdWithOrderSummary
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        u.UserId,
        u.FullName,
        u.Email,
        u.Address,
        u.Role,
        u.Phone,
        u.IsActive,

        COUNT(o.OrderId) AS TotalOrders,
        SUM(CASE WHEN o.Status = 'Completed' THEN 1 ELSE 0 END) AS CompletedOrders,
        SUM(CASE WHEN o.Status = 'Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders

    FROM Users u
    LEFT JOIN Orders o ON o.UserId = u.UserId
    WHERE u.UserId = @UserId
    GROUP BY 
        u.UserId,
        u.FullName,
        u.Email,
        u.Address,
        u.Role,
        u.Phone,
        u.IsActive;
END
