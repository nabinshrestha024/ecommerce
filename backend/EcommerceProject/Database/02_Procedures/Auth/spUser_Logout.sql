USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[spUser_Logout]    Script Date: 12/19/2025 10:50:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE OR ALTER PROCEDURE [dbo].[spUser_Logout]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE UserRefreshTokens
    SET IsRevoked = 1
    WHERE UserId = @UserId;

END;
