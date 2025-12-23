USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PutSocialLink
    @SocialLinkId INT,
    @Platform VARCHAR(50),
    @ProfileUrl VARCHAR(300)
AS
BEGIN
    UPDATE UserSocialLinks
    SET Platform = @Platform,
        ProfileUrl = @ProfileUrl
    WHERE SocialLinkId = @SocialLinkId;
END;
GO