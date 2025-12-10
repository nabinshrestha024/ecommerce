# E-Commerce Platform – Module Architecture (Dapper + Stored Procedures + .NET 9)

This document describes the backend and domain architecture for the e-commerce platform.

- Backend: **ASP.NET Core 9**, **Dapper**, **SQL Server**, **Stored Procedures**
- Frontend: **Next.js/React** (customer + admin panels)
- Payments: **eSewa, Khalti** (plus optional COD)
- Domain: Multi-role system with **Admin** and **Customer** (future: Vendor portal)

---

## 1. Authentication & Authorization Module

### Responsibilities

- Register and authenticate **Admins** and **Customers**
- Issue and validate **JWT access tokens**
- Manage **roles** (`Admin`, `Customer`)
- Support **password reset** and **basic account security**

### Major Use Cases

- Admin login/logout
- Customer signup, login, logout
- Forgot password & reset


### Backend Components

- **Controllers**
  - `AuthController`
    - `POST /auth/register`
    - `POST /auth/login`
    - `POST /auth/refresh` (optional)
    - `POST /auth/logout`
    - `POST /auth/forgot-password`
    - `POST /auth/reset-password`
  - `UsersController`
    - `GET /users/me`
    - Admin-only: `GET /admin/users`, `PUT /admin/users/{id}/block`


## 2. Catalog (Category & Product) Module

### Responsibilities

- Manage **categories**, **products**, **brands** and related metadata
- Provide **customer-facing catalog APIs** for listing/searching products
- Provide **admin-facing APIs** for CRUD operations

### Major Use Cases

- Admin:
  - Create/edit/delete categories
  - Create/edit/delete products
  - Manage product images and SEO fields
- Customer:
  - Browse products by category
  - Search and filter products
  - View product details

### Backend Components

- **Customer-facing**
  - `GET /products`
    - Filters: `categoryId`, `search`, `minPrice`, `maxPrice`, `sort`, `page`,`brand`, `pageSize`
  - `GET /products/{slugOrId}`
  - `GET /categories`

- **Admin-facing**
  - `POST /admin/categories`
  - `PUT /admin/categories/{id}`
  - `DELETE /admin/categories/{id}`
  - `POST /admin/products`
  - `PUT /admin/products/{id}`
  - `DELETE /admin/products/{id}`

## 3. Inventory & Vendor/Procurement Module

### Responsibilities

- Maintain **stock levels** for products
- Model **vendors** and **purchase orders** for inbound stock
- Manage stock adjustments and **low-stock alerts**

### Major Use Cases

- Admin:
  - Create purchase orders to vendors
  - Receive stock (GRN)
  - Adjust stock manually (e.g., inventory correction)
  - See low-stock list

### Backend Components

- **Admin APIs**
  - `POST /admin/vendors`
  - `GET /admin/vendors`
  - `POST /admin/purchase-orders`
  - `PUT /admin/purchase-orders/{id}/receive`
  - `GET /admin/stock`
  - `POST /admin/stock/adjust` (manual adjustments)
## 4. Cart & Wishlist Module

### Responsibilities

- Manage **shopping cart** per customer
- Manage **wishlist** per customer

### Major Use Cases

- Customer:
  - Add/remove/update items in cart
  - Add/remove items from wishlist

### Backend Components

- **Cart APIs**
  - `GET /cart`
  - `POST /cart` (add item)
  - `PUT /cart/{cartItemId}` (update qty)
  - `DELETE /cart/{cartItemId}`

- **Wishlist APIs**
  - `GET /wishlist`
  - `POST /wishlist` (add product)
  - `DELETE /wishlist/{wishlistItemId}`


## 5. Checkout, Orders & Shipping Module

### Responsibilities

- Convert cart into **orders**
- Store **order details** and **shipping address snapshot**
- Manage **order statuses** and **shipping updates**
- Provide **customer order history**

### Major Use Cases

- Customer:
  - Checkout with cart
  - Choose address and payment method (eSewa, Khalti, COD)
  - View order details and status
- Admin:
  - View and update orders (status: processing, shipped, delivered, cancelled)
  - Manage shipping info

### Backend Components

- **Customer APIs**
  - `POST /orders` (create from cart + address + paymentMethod)
  - `GET /orders/me`
  - `GET /orders/{orderId}` (if belongs to user)

- **Admin APIs**
  - `GET /admin/orders`
  - `GET /admin/orders/{orderId}`
  - `PUT /admin/orders/{orderId}/status` (update status)
  - Optional: `PUT /admin/orders/{orderId}/shipping` (tracking info)

## 6. Payment Integration Module (eSewa, Khalti)

### Responsibilities

- Initiate payments with **eSewa** and **Khalti**
- Handle **success/failure callbacks**
- Update **order payment status**


### Backend Components

- `PaymentsController`
  - `POST /payments/initiate` (create payment for given order)
  - `POST /payments/esewa/callback`
  - `POST /payments/khalti/callback`

- Integration Steps
  - On checkout:
    - Create order (status `PendingPayment`)
    - Initiate payment with provider
    - Redirect or return payment URL/token
  - On callback:
    - Verify payment with provider API
    - Update `Payments` record
    - Update `Orders.PaymentStatus` to `Paid` / `Failed`
    - Trigger notifications

## 7. Discount & Promotion Module

### Responsibilities

- Apply **discounts** to products or cart

## 8. Notification Module

### Responsibilities

- Generate notifications on events for **Admin** and **Customer**
- Provide **in-app notification list**
- Integrate **email**

### Key Events

- Customer:
  - Order placed
  - Payment success/failure
  - Order shipped / delivered
- Admin:
  - New order placed
  - Low stock alert
  - New customer sign-up

### Backend Components

- `NotificationsController`
  - `GET /notifications` (current user)
  - `PUT /notifications/{id}/read`

- Notification service:
  - Called from:
    - Order creation
    - Payment callbacks
    - Stock low events

## 9. Customer Profile Module

### Responsibilities

- Manage **customer profile** data
- Manage **addresses**
- Expose **purchase history**

### Backend Components

- `ProfileController`
  - `GET /profile`
  - `PUT /profile`
  - `PUT /profile/change-password`

- `AddressController`
  - `GET /addresses`
  - `POST /addresses`
  - `PUT /addresses/{id}`
  - `DELETE /addresses/{id}`
  - `PUT /addresses/{id}/set-default`

- `OrdersController` (customer-side)
  - `GET /orders/me`
  - `GET /orders/{id}`

---

## 10. Reporting & Analytics Module

### Responsibilities

- Provide **sales & operational reports** to Admin
- Support dashboard views with aggregated metrics

### Example Reports

- Total sales by date range
- Orders per status
- Sales by category
- Top-selling products
- Revenue per payment method
- Low-stock product list

### Backend Components

- `ReportsController`
  - `GET /admin/reports/sales-overview?from&to`
  - `GET /admin/reports/top-products?from&to`
  - `GET /admin/reports/category-sales?from&to`
  - `GET /admin/reports/low-stock`

## 11. System Admin & Configuration Module

### Responsibilities

- Manage **global settings**
- Handle **audit logging**
- Expose **health checks**

### Backend Components

- `SettingsController` (admin)
  - `GET /admin/settings`
  - `PUT /admin/settings`

- Health endpoint:
  - `GET /health` (DB connectivity check, etc.)

## 12. Cross-Cutting Concerns

- **Logging**
  - Request logging (minimal in production)
  - Error logging with correlation IDs
- **Validation**
  - FluentValidation or manual validation for DTOs

---
