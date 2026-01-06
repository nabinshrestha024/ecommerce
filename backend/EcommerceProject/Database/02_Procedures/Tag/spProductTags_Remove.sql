USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductTags_Remove
(
    @ProductId INT,
    @TagId INT
)
AS
BEGIN
    DELETE FROM ProductTags
    WHERE ProductId = @ProductId
      AND TagId = @TagId;
END
GO
