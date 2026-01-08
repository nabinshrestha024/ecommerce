USE [EcommerceDB]
GO


CREATE OR ALTER PROCEDURE [dbo].[spDiscount_Update]
(
    @DiscountId INT,
    @DiscountName NVARCHAR(100),
    @DiscountType NVARCHAR(20),      -- Flat | Percentage
    @DiscountValue DECIMAL(18,2),
    @StartDate DATETIME,
    @EndDate DATETIME,
    @IsActive BIT
)
AS
BEGIN
    SET NOCOUNT ON;
  
        UPDATE Discounts
        SET
            DiscountName = @DiscountName,
            DiscountType = @DiscountType,
            DiscountValue = @DiscountValue,
            StartDate = @StartDate,
            EndDate = @EndDate,
            IsActive = @IsActive
        WHERE DiscountId = @DiscountId;

END
