CREATE OR ALTER PROCEDURE spDiscount_Update
    @DiscountId INT,
    @ProductId INT,
    @Percentage DECIMAL(5,2),
    @StartDate DATETIME,
    @EndDate DATETIME,
    @MaxUsage INT = NULL,
    @PerUserLimit INT = NULL
AS
BEGIN
    UPDATE Discounts
    SET
        ProductId = @ProductId,
        Percentage = @Percentage,
        StartDate = @StartDate,
        EndDate = @EndDate,
        MaxUsage = @MaxUsage,
        PerUserLimit = @PerUserLimit
    WHERE DiscountId = @DiscountId;
END