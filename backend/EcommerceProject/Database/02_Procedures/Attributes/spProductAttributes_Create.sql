USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductAttributes_Create
(
    @Name VARCHAR(100),
    @IsVariant BIT
)
AS
BEGIN
    INSERT INTO ProductAttributes (Name, IsVariant)
    VALUES (@Name, @IsVariant);

    SELECT SCOPE_IDENTITY() AS AttributeId;
END
GO
