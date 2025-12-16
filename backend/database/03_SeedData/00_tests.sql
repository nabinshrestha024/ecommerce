USE EcommerceDB;
GO

SELECT 
    s.name AS SchemaName,
    p.name AS ProcedureName
FROM sys.procedures p
JOIN sys.schemas s ON p.schema_id = s.schema_id
WHERE p.name = 'Inventory_GetLowStock';
