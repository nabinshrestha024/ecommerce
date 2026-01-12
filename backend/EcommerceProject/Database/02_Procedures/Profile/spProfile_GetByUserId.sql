USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spProfile_GetByUserId
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        u.UserId,
        u.Email,
        u.FullName,
        u.Phone,
        u.Address,
        u.City,
        u.ProfileImageUrl,
        u.Status,
        u.CreatedAt,

        up.DateOfBirth,
        up.Gender,
        up.Bio
    FROM Users u
    LEFT JOIN UserProfiles up ON u.UserId = up.UserId
    WHERE u.UserId = @UserId
        AND u.DeletedAt IS NULL;
    
    SELECT 
        SocialLinkId,
        Platform,
        ProfileLinkUrl,
        CreatedAt
    FROM UserSocialLinks
    WHERE UserId = @UserId
    ORDER BY CreatedAt ASC;
END
GO