USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spNotifications_GetByUser
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        NotificationId,
        UserId,
        Title,
        Message,
        IsRead,
        CreatedAt,
        OrderId
    FROM Notifications
    WHERE UserId = @UserId
    ORDER BY CreatedAt DESC;
END
GO
