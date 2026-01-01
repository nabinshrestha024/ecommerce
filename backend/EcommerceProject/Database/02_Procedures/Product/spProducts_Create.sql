USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spProducts_Create
(
    @CategoryId INT,
    @Name VARCHAR(200),
    @Slug VARCHAR(200),
    @Description VARCHAR(MAX) = NULL,
    @ShortDescription VARCHAR(500) = NULL,
    @IsActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Products
    (
        CategoryId,
        Name,
        Slug,
        Description,
        ShortDescription,
        HasVariants,
        IsActive
    )
    VALUES
    (
        @CategoryId,
        @Name,
        @Slug,
        @Description,
        @ShortDescription,
        0,
        @IsActive
    );

    SELECT SCOPE_IDENTITY() AS ProductId;
END
GO
