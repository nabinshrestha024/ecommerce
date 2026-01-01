USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductImages_DeleteByProductId
(
    @ProductId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM ProductImages
    WHERE ProductId = @ProductId;

    SELECT @@ROWCOUNT AS Deleted;
END
GO
