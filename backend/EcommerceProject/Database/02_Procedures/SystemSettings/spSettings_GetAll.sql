USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spSettings_GetAll
AS
BEGIN
    SELECT [Key], [Value], UpdatedAt, UpdatedBy
    FROM SystemSettings
    ORDER BY [Key];
END
GO
