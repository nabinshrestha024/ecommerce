USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductAttributes_GetAll
AS
BEGIN
    SELECT
        a.AttributeId,
        a.Name,
        a.IsVariant
    FROM ProductAttributes a;

    SELECT
        v.AttributeValueId,
        v.AttributeId,
        v.Value
    FROM ProductAttributeValues v;
END
GO
