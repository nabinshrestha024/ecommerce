USE EcommerceDB;
Go

CREATE OR ALTER PROCEDURE spProducts_GetRelatedIdsByCategory
(
    @CategoryId INT,
    @ExcludeProductId INT,
    @Take INT = 5
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP (@Take) p.ProductId
    FROM Products p
    WHERE p.CategoryId = @CategoryId
      AND p.ProductId <> @ExcludeProductId
      AND p.IsActive = 1
    ORDER BY NEWID();  -- random 5 products
END
GO
