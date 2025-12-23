USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_DeleteSocialLink
    @SocialLinkId INT
AS
BEGIN
    DELETE FROM UserSocialLinks WHERE SocialLinkId = @SocialLinkId;
END;
GO
