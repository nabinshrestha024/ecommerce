USE EcommerceDB;
GO


CREATE OR ALTER PROCEDURE spDiscount_GetAll
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        d.DiscountId,
        d.ProductId,
        p.Name AS ProductName,
        d.Percentage,
        d.StartDate,
        d.EndDate,
        d.MaxUsage,
        d.PerUserLimit,
        d.IsActive
    FROM Discounts d
    INNER JOIN Products p ON d.ProductId = p.ProductId;
END
GO