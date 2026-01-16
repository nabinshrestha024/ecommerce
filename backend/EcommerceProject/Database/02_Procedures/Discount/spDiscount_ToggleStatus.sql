USE [EcommerceDB]
GO


CREATE OR ALTER   PROCEDURE [dbo].[spDiscount_ToggleStatus]
    @DiscountId INT,
    @IsActive BIT
AS
BEGIN
    SET NOCOUNT ON;

   
    UPDATE Discounts
    SET IsActive = @IsActive
    WHERE DiscountId = @DiscountId;

   
    IF @IsActive = 0
    BEGIN
        UPDATE ProductVariants
        SET DiscountId = NULL
        WHERE DiscountId = @DiscountId;
    END
END
GO
