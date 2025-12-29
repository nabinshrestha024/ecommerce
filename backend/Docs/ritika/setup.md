# 🛒 EcommerceProject – Backend API

EcommerceProject is a backend API for an e-commerce system built using **ASP.NET Core**, **SQL Server**, **Dapper**, and **SignalR**.  
The project follows a **layered architecture** with clear separation between Controllers, Services, Repositories, and Database logic.

This repository focuses on:
- Order management
- Shipment lifecycle
- Real-time notifications
- Clean architecture & scalability

---

## 🧱 Tech Stack
- **Framework**: ASP.NET Core ( .NET 9)
- **Database**: SQL Server
- **ORM**: Dapper
- **Real-time**: SignalR
- **Authentication**: JWT
- **Validation**: FluentValidation
- **Architecture**: Controller → Service → Repository
- **Database Access**: Stored Procedures

---

## 📁 Project Structure
```
EcommerceProject
│
├── Controllers
│   └── v1
│
├── Database
│   ├── 01_Scripts
│   ├── 02_Procedures
│   ├── 03_SeedData
│   └── SqlConnectionFactory.cs
│
├── Filters
│   └── GlobalExceptionFilter.cs
│
├── Hubs
│   └── NotificationHub.cs
│
├── Middlewares
│   └── RateLimitingMiddleware.cs
│
├── Models
│   ├── Entities
│   └── DTOs
│
├── Repositories
│   ├── Interfaces
│   └── Implementations
│
├── Services
│   ├── Interfaces
│   └── Implementations
│
├── utils
│   └── PasswordHasher.cs
│
├── Program.cs
├── appsettings.json
└── EcommerceProject.http
```

---

## 🚀 Getting Started

### A) Create the Project

1. Open **Visual Studio**
2. Click **Create a new project**
3. Select **ASP.NET Core Web API**
4. Project Name: `EcommerceProject`
5. Choose Framework: **.NET 8 or .NET 9**
6. (Optional) ✔ Use Controllers
7. Click **Create**

---

## 📂 B) Create Folders (Solution Explorer)

Right-click the project → **Add → New Folder**  
Create the following folders **exactly as shown**:

### Root folders
- Controllers  
- Database  
- Filters  
- Hubs  
- Middlewares  
- Models  
- Repositories  
- Services  
- utils  

### Subfolders

**Controllers**
- `v1`

**Database**
- `01_Scripts`
- `02_Procedures`
- `03_SeedData`

**Models**
- `Entities`
- `DTOs`

**Repositories**
- `Interfaces`
- `Implementations`

**Services**
- `Interfaces`
- `Implementations`

(Optional)
- `wwwroot` (only if serving files/images)

---

## 🧩 C) Create Required Files

### 1️⃣ Database

**Database/SqlConnectionFactory.cs**

Purpose: Centralized SQL connection creation for Dapper.

---

### 2️⃣ Filters

**Filters/GlobalExceptionFilter.cs**

Purpose:
- Centralized exception handling
- Converts exceptions into proper HTTP responses

---

### 3️⃣ Middleware

**Middlewares/RateLimitingMiddleware.cs**

Purpose:
- Throttle excessive requests
- Return HTTP `429 Too Many Requests`

---

### 4️⃣ SignalR Hub

**Hubs/NotificationHub.cs**

Purpose:
- Real-time notifications
- Admin & customer notifications

---

### 5️⃣ Models

#### Entities
Example: 
- Models/Entities/Product.cs
- Models/Entities/Order.cs
- Models/Entities/Shipment.cs


Purpose:
- Represent database structure

#### DTOs
Example:
- Models/DTOs/Product/ProductDto.cs
- Models/DTOs/Orders/OrderDetailDto.cs
- Models/DTOs/Shipments/ShipmentDto.cs


Purpose:
- Shape API request/response models

---

### 6️⃣ Repositories

#### Interfaces
- Repositories/Interfaces/IProductRepository.cs
- Repositories/Interfaces/IOrderRepository.cs


#### Implementations
- Repositories/Implementations/ProductRepository.cs
- Repositories/Implementations/OrderRepository.cs


Purpose:
- Execute stored procedures
- Database-only logic (no business rules)

---

### 7️⃣ Services

#### Interfaces
- Services/Interfaces/IProductService.cs
- Services/Interfaces/IOrderService.cs


#### Implementations
- Services/Implementations/ProductService.cs
- Services/Implementations/OrderService.cs


Purpose:
- Business logic
- Validation
- Orchestration between modules

---

### 8️⃣ Controllers

**Controllers/v1/ProductsController.cs**

- API Controller – Empty
- Handles HTTP requests
- Calls service layer

---

### 9️⃣ Utils

**utils/PasswordHasher.cs**

Purpose:
- Password hashing
- Security utility

---

## ⚙️ D) Configuration

### appsettings.json

Ensure it contains:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=EcommerceDB;Trusted_Connection=True;"
  },
  "Jwt": {
    "Issuer": "EcommerceApp",
    "Audience": "EcommerceAppUsers",
    "Key": "your-secret-key"
  }
}
```
