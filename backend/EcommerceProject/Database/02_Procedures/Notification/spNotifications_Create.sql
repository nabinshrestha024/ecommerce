USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spNotifications_Create
    @UserId INT = NULL,
    @Title VARCHAR(200),
    @Message VARCHAR(500),
    @OrderId INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Notifications(UserId, Title, Message, IsRead, CreatedAt, OrderId)
    VALUES (@UserId, @Title, @Message, 0, SYSUTCDATETIME(), @OrderId);

    SELECT SCOPE_IDENTITY() AS NotificationId;
END
GO
