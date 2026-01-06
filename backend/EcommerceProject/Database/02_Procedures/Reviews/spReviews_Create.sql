USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReviews_Create
    @ProductId INT,
    @UserId INT,
    @Content VARCHAR(4000),
    @Rating TINYINT
AS
BEGIN
    INSERT INTO Reviews (ProductId, UserId, Content, Rating)
    VALUES (@ProductId, @UserId, @Content, @Rating);
END
GO
