USE [EcommerceDB]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 CREATE OR ALTER PROCEDURE [dbo].[spDiscount_GetDiscountUsage]
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
