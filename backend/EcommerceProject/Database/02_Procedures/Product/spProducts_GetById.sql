CREATE OR ALTER PROCEDURE spProducts_GetById
    @ProductId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT TOP 1 *
    FROM dbo.Products
    WHERE ProductId = @ProductId;
END
GO

