CREATE PROCEDURE spDiscount_AddDiscountUsage
    @DiscountId INT,
    @UserId INT
AS
BEGIN
    INSERT INTO DiscountUsages (DiscountId, UserId)
    VALUES (@DiscountId, @UserId)
END
