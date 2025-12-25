USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spCategories_GetById
(
    @CategoryId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Categories
    WHERE CategoryId = @CategoryId;
END
GO
