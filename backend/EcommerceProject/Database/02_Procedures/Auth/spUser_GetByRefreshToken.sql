USE [EcommerceDB]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROCEDURE [dbo].[spUser_GetByRefreshToken] 
(
	@refreshToken varchar(max)
)
AS 
BEGIN 
	IF NOT EXISTS(
		SELECT 1 FROM
		Users
		WHERE 
		refreshToken = @refreshToken
	)
	RETURN;

	SELECT 
	*
	FROM
	Users
	WHERE refreshToken = @refreshToken
END


