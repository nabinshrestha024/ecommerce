### EcommerceProject – Backend API Setup Guide

This repository contains the backend API for an Ecommerce system built using ASP.NET Core, SQL Server, Dapper, and SignalR, following a layered architecture with Controllers, Services, and Repositories.

## A) Create the Project

Open Visual Studio

Create a new project

Select ASP.NET Core Web API

Name: EcommerceProject

Choose framework (ex: .NET 8 / .NET 9)

(Optional) Check Use controllers

Create

## B) Create Folders (Solution Explorer)

Right click on the project EcommerceProject → Add → New Folder

Create these folders (exact names like your structure):

Controllers

inside Controllers create folder: v1

Database

inside Database create folders:

01_Scripts

02_Procedures

03_SeedData

Filters

Hubs

Middlewares

Models

inside Models create folders:

DTOs

inside DTOs create folder: Product (and more later)

Entities

Repositories

inside Repositories create folders:

Interfaces

Implementations

Services

inside Services create folders:

Interfaces

Implementations

utils

(Optional static content) wwwroot (only if you serve files/images)

## C) Create Files (Where + How)

Right click the folder → Add → Class… (or New Item…) and create these files.

1) Database

Database/SqlConnectionFactory.cs

Add → Class → SqlConnectionFactory

Purpose: create SQL connections for Dapper.

2) Filters

Filters/GlobalExceptionFilter.cs

Add → Class → GlobalExceptionFilter

Purpose: centralized exception handling.

3) Middlewares

Middlewares/RateLimitingMiddleware.cs

Add → Class → RateLimitingMiddleware

Purpose: throttle requests, return 429.

4) Hubs (SignalR)

Hubs/NotificationHub.cs

Add → Class → NotificationHub

Purpose: real-time notifications via SignalR.

5) Models
Entities

Models/Entities/Product.cs

Add → Class → Product

Purpose: DB entity model.

DTOs

Models/DTOs/Product/ProductDto.cs

In Models/DTOs create folder Product

Add → Class → ProductDto

Purpose: what API returns/accepts.

6) Repositories
Interface

Repositories/Interfaces/IProductRepository.cs

Add → Interface → IProductRepository

Implementation

Repositories/Implementations/ProductRepository.cs

Add → Class → ProductRepository

Purpose: DB/stored-procedure calls.

7) Services
Interface

Services/Interfaces/IProductService.cs

Add → Interface → IProductService

Implementation

Services/Implementations/ProductService.cs

Add → Class → ProductService

Purpose: business logic + mapping entity ↔ dto.

8) Controller

Controllers/v1/ProductsController.cs

Right click Controllers/v1 → Add → Controller

Choose API Controller - Empty

Name: ProductsController

Purpose: HTTP endpoints.

9) Utils

utils/PasswordHasher.cs

Add → Class → PasswordHasher

Purpose: password hashing helper.

## D) Add Configuration Files
appsettings.json

Already exists. Ensure it includes:

ConnectionStrings:DefaultConnection

Rate limit settings (optional)

EcommerceProject.http

Right click project → Add → New Item → HTTP File
Name: EcommerceProject.http

## E) Wire Everything in Program.cs (Important)

You must register dependencies and middleware.

1) Register DI

In Program.cs add:

SqlConnectionFactory

Repository

Service

SignalR

Example structure (high-level):

builder.Services.AddScoped<IProductRepository, ProductRepository>();

builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddSignalR();

2) Use middleware

app.UseMiddleware<RateLimitingMiddleware>();

3) Map controllers and hubs

app.MapControllers();

app.MapHub<NotificationHub>("/hubs/notifications");

## F) Order You Should Build Modules (Recommended)

When adding a new feature like Category / Brand / Order, follow this order:

Entity (Models/Entities)

DTO (Models/DTOs)

Repository Interface

Repository Implementation

Service Interface

Service Implementation

Controller endpoint

Test in .http



