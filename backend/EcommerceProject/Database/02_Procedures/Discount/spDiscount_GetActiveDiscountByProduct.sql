USE EcommerceDB;

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE spDiscount_GetActiveDiscountsByProduct
    @ProductId INT
AS
BEGIN
    SELECT *
    FROM Discounts
    WHERE ProductId = @ProductId
      AND IsActive = 1
      AND GETDATE() BETWEEN StartDate AND EndDate
END;
