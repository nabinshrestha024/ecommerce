USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spWebsiteReviews_Create
    @UserId INT,
    @Content VARCHAR(4000),
    @Rating TINYINT
AS
BEGIN
    INSERT INTO WebsiteReviews (UserId, Content, Rating)
    VALUES (@UserId, @Content, @Rating);
END
GO
