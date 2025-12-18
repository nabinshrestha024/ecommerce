CREATE OR ALTER PROCEDURE spProducts_GetById
    @ProductID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT TOP 1 *
    FROM dbo.Products
    WHERE ProductID = @ProductID;
END
GO

