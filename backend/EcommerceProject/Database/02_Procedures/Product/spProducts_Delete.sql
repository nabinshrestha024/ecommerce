USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spProducts_Delete
(
    @ProductId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Products WHERE ProductId = @ProductId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
