USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProducts_Create
(
    @CategoryId         INT,
    @Name               VARCHAR(200),
    @Slug               VARCHAR(200),
    @Description        VARCHAR(MAX) = NULL,
    @ShortDescription   VARCHAR(500) = NULL,
    @HasVariants        BIT = 0,
    @IsActive           BIT = 1,
    @AttributeIds       VARCHAR(MAX) = NULL 
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        INSERT INTO Products (CategoryId, Name, Slug, Description, ShortDescription, HasVariants, IsActive)
        VALUES (@CategoryId, @Name, @Slug, @Description, @ShortDescription, @HasVariants, @IsActive);

        DECLARE @ProductId INT = SCOPE_IDENTITY();

        IF (@AttributeIds IS NOT NULL AND LEN(@AttributeIds) > 0)
        BEGIN
            INSERT INTO ProductAttributeRequirements (ProductId, AttributeId)
            SELECT @ProductId, CAST(value AS INT)
            FROM STRING_SPLIT(@AttributeIds, ',');
        END

        COMMIT TRANSACTION;
        SELECT @ProductId;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
PRINT 'Stored Procedure spProducts_Create created or altered successfully.';