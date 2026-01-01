USE EcommerceDB;
GO


CREATE OR ALTER PROCEDURE spProducts_Update
(
    @ProductId INT,
    @CategoryId INT,
    @Name VARCHAR(200),
    @Slug VARCHAR(200),
    @Description VARCHAR(MAX) = NULL,
    @ShortDescription VARCHAR(500) = NULL,
    @IsActive BIT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Products
    SET
        CategoryId = @CategoryId,
        Name = @Name,
        Slug = @Slug,
        Description = @Description,
        ShortDescription = @ShortDescription,
        IsActive = @IsActive,
        UpdatedAt = SYSUTCDATETIME()
    WHERE ProductId = @ProductId;

    SELECT @@ROWCOUNT AS Affected;
END
GO

