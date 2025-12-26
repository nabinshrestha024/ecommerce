USE [EcommerceDB]
GO

 CREATE OR ALTER PROCEDURE spDiscount_GetDiscountUsage
    @DiscountId INT,
    @UserId INT
AS
BEGIN
    SELECT 
        COUNT(*) AS UserUsage,
        (SELECT COUNT(*) FROM DiscountUsages WHERE DiscountId = @DiscountId) AS TotalUsage
    FROM DiscountUsages
    WHERE DiscountId = @DiscountId AND UserId = @UserId
END
GO
