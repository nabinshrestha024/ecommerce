USE [EcommerceDB];
GO
--SELECT name, OBJECT_NAME(parent_object_id) AS TableName
--FROM sys.foreign_keys
--WHERE parent_object_id = OBJECT_ID('procure.Suppliers');
--
--
--USE [EcommerceDB];
--select * from procure.Suppliers
--ALTER TABLE procure.Suppliers
--DROP CONSTRAINT FK_Inventory_Warehouse;


SELECT
    TABLE_SCHEMA,
    TABLE_NAME
FROM
    INFORMATION_SCHEMA.TABLES
WHERE
    TABLE_TYPE = 'BASE TABLE';
