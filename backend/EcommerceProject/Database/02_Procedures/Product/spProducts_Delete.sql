USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spProducts_Delete
(
    @ProductId INT
)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Products
SET IsActive = 0,
    UpdatedAt = SYSUTCDATETIME()
WHERE ProductId = @ProductId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
