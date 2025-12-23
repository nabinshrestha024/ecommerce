USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_GetSocialLinks
    @UserId INT
AS
BEGIN
    SELECT SocialLinkId, Platform, ProfileUrl, CreatedAt
    FROM UserSocialLinks
    WHERE UserId = @UserId;
END;
