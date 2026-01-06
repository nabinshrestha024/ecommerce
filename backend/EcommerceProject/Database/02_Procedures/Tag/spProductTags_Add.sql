USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductTags_Add
(
    @ProductId INT,
    @TagId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ProductTags (ProductId, TagId)
    VALUES (@ProductId, @TagId);
END
GO
