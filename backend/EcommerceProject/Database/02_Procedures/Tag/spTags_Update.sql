USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spTags_Update
(
    @TagId INT,
    @Name VARCHAR(300)
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Tags
    SET Name = @Name
    WHERE TagId = @TagId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
