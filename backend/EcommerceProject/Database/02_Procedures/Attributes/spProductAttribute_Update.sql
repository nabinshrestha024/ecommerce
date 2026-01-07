USE EcommerceDb;
GO

CREATE OR ALTER PROCEDURE spProductAttribute_Update
(
    @AttributeId INT,
    @Name VARCHAR(100),
    @IsVariant BIT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE ProductAttributes
    SET
        Name = @Name,
        IsVariant = @IsVariant
    WHERE AttributeId = @AttributeId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
