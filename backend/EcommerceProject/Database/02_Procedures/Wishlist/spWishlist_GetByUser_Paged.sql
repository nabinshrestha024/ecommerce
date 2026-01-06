USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE [dbo].[spWishlist_GetByUser_Paged]
    @UserId INT,
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    SELECT 
        w.WishlistId,
        w.VariantId,

        p.ProductId,
        p.Name        AS ProductName,
        p.Slug        AS Slug,

        pv.SKU,
        pv.Price,

        pi.ImageUrl   AS ProductImageUrl,
        p.Description,
        pv.Price,
        w.AddedDate
    FROM Wishlists w
    INNER JOIN ProductVariants pv
    ON w.VariantId =pv.VariantId
    INNER JOIN Products p 
        ON pv.ProductId = p.ProductId
    LEFT JOIN ProductImages pi 
        ON pi.ProductId = p.ProductId 
        AND pi.IsPrimary = 1
    WHERE w.UserId = @UserId
    ORDER BY w.AddedDate DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;

    SELECT COUNT(*)
    FROM Wishlists
    WHERE UserId = @UserId;
END
