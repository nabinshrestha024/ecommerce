USE EcommerceDB;
GO

CREATE PROCEDURE spDiscount_GetActive
AS
BEGIN
    SELECT *
    FROM Discounts
    WHERE IsActive = 1
      AND GETDATE() BETWEEN StartDate AND EndDate;
END