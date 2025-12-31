USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PutSocialLink
    @SocialLinkId INT,
    @Platform VARCHAR(50),
    @ProfileLinkUrl VARCHAR(300)
AS
BEGIN
    UPDATE UserSocialLinks
    SET Platform = @Platform,
        ProfileLinkUrl = @ProfileLinkUrl
    WHERE SocialLinkId = @SocialLinkId;
END;
GO