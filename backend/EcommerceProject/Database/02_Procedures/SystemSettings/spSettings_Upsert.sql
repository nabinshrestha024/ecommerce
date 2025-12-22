USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spSettings_Upsert
(
    @Key VARCHAR(100),
    @Value VARCHAR(1000),
    @UpdatedBy VARCHAR(100)
)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM SystemSettings WHERE [Key] = @Key)
    BEGIN
        UPDATE SystemSettings
        SET
            [Value] = @Value,
            UpdatedAt = SYSUTCDATETIME(),
            UpdatedBy = @UpdatedBy
        WHERE [Key] = @Key;
    END
    ELSE
    BEGIN
        INSERT INTO SystemSettings ([Key], [Value], UpdatedBy)
        VALUES (@Key, @Value, @UpdatedBy);
    END
END
GO
