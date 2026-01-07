USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spTags_GetAll
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        TagId,
        Name
    FROM Tags
    ORDER BY Name;
END
GO
