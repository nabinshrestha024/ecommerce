USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spNotifications_MarkRead
    @UserId INT,
    @NotificationId INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Notifications
    SET IsRead = 1
    WHERE NotificationId = @NotificationId AND UserId = @UserId;

    IF @@ROWCOUNT = 0
        RAISERROR('Notification not found.', 16, 1);
END
GO

