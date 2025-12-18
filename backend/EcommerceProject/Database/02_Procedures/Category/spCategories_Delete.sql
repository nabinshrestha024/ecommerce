USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spCategories_Delete
(
    @CategoryId INT
)
AS
BEGIN
    UPDATE Categories
    SET IsActive = 0
    WHERE CategoryId = @CategoryId;
END
GO
