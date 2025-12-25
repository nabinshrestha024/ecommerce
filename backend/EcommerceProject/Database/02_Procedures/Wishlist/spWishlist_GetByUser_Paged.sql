USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spWishlist_GetByUser_Paged
    @UserId INT,
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    SELECT 
        w.WishlistId,
        w.ProductId,
        p.Name        AS ProductName,
        p.Slug        AS Slug,
        pi.ImageUrl   AS ProductImageUrl,
        p.Description,
        p.Price,
        w.AddedDate
    FROM Wishlists w
    INNER JOIN Products p 
        ON w.ProductId = p.ProductId
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
GO
