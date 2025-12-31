USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_PostSocialLink
    @UserId INT,
    @Platform VARCHAR(50),
    @ProfileLinkUrl VARCHAR(300)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @SocialLinkId INT;

    SELECT @SocialLinkId = SocialLinkId
    FROM UserSocialLinks
    WHERE UserId = @UserId AND Platform = @Platform;

    IF @SocialLinkId IS NOT NULL
    BEGIN
        UPDATE UserSocialLinks
        SET ProfileLinkUrl = @ProfileLinkUrl
        WHERE SocialLinkId = @SocialLinkId;

        SELECT @SocialLinkId AS SocialLinkId;   
        RETURN;
    END

    INSERT INTO UserSocialLinks (UserId, Platform, ProfileLinkUrl, CreatedAt)
    VALUES (@UserId, @Platform, @ProfileLinkUrl, SYSUTCDATETIME());

    SET @SocialLinkId = CAST(SCOPE_IDENTITY() AS INT);

    SELECT @SocialLinkId AS SocialLinkedId;     
END;
GO
