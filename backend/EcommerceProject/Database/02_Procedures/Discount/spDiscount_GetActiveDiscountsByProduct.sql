USE EcommerceDB;

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
