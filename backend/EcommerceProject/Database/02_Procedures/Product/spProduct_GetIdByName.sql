USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProduct_GetIdByName
    @Name VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT ProductId
    FROM Products
    WHERE Name = @Name
END
GO
