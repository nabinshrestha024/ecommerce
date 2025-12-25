USE [EcommerceDB]
GO


CREATE OR ALTER   PROCEDURE [spProduct_GetIdByName]
    @ProductName VARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT ProductId
    FROM Products
    WHERE Name = @ProductName
END