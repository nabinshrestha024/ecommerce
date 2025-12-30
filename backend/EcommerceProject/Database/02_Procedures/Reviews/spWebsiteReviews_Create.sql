USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spWebsiteReviews_Create
    @UserId INT,
    @Title VARCHAR(250),
    @Content VARCHAR(4000),
    @Rating TINYINT
AS
BEGIN
    INSERT INTO WebsiteReviews (UserId, Title, Content, Rating)
    VALUES (@UserId, @Title, @Content, @Rating);
END
GO
