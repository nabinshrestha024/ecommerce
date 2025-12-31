USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PostSocialLink
    @UserId INT,
    @Platform VARCHAR(50),
    @ProfileLinkUrl VARCHAR(300)
AS
BEGIN
    INSERT INTO UserSocialLinks (UserId, Platform, ProfileLinkUrl)
    VALUES (@UserId, @Platform, @ProfileLinkUrl);

    SELECT CAST(SCOPE_IDENTITY() AS INT) AS SocialLinkId;
END;
GO