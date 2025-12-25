USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spDiscount_ToggleStatus
    @DiscountId INT,
    @IsActive BIT
AS
BEGIN
    UPDATE Discounts
    SET IsActive = @IsActive
    WHERE DiscountId = @DiscountId;
END
GO