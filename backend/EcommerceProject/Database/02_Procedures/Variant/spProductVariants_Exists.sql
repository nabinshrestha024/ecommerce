USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spProductVariants_Exists
    @VariantId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM ProductVariants
            WHERE VariantId = @VariantId
              AND IsActive = 1
        )
        THEN 1 ELSE 0
    END;
END
