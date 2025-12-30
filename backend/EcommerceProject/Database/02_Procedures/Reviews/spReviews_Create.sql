USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReviews_Create
    @ProductId INT,
    @UserId INT,
    @Title VARCHAR(250),
    @Content VARCHAR(4000),
    @Rating TINYINT
AS
BEGIN
    INSERT INTO Reviews (ProductId, UserId, Title, Content, Rating)
    VALUES (@ProductId, @UserId, @Title, @Content, @Rating);
END
GO
