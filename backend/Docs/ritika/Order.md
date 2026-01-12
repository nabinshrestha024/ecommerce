# 📦 Order Module

## 1. Overview

The **Order Module** manages the complete lifecycle of customer orders in the e-commerce system.  
It converts a customer’s cart into an immutable order record, stores checkout-time snapshots, and allows controlled status updates by administrators.

The module follows **industry best practices**:
- Orders are immutable financial records
- No hard deletion of orders
- Clear separation of Customer and Admin responsibilities
- Audit-safe and payment-safe design

---

## 2. Responsibilities

### Core Responsibilities
- Convert cart into an order (atomic transaction)
- Store shipping address snapshot at checkout time
- Store product price snapshot at checkout time
- Manage order status lifecycle
- Provide customer order history
- Allow order cancellation under strict rules

### Explicitly NOT Allowed
- Admin creating orders
- Deleting orders
- Editing order details after creation

---

## 3. Database Design

### Orders Table
Stores order-level information.

| Column | Description |
|------|-------------|
| OrderId | Unique order identifier |
| UserId | Customer who placed the order |
| OrderDate | UTC timestamp of order creation |
| TotalAmount | Calculated from cart at checkout |
| Status | Order lifecycle status |
| ShippingName | Name at delivery time |
| ShippingAddress | Address snapshot |
| ShippingCity | City snapshot |
| ShippingPhone | Phone snapshot |
| PaymentMethodId | Selected payment method |
| PaymentStatus | Pending / Paid / Failed |
| PaymentGateway | Optional gateway name |
| Notes | Optional customer notes |

### OrderItems Table
Stores item-level snapshots.

| Column | Description |
|------|-------------|
| OrderItemId | Unique item identifier |
| OrderId | Parent order |
| ProductId | Product reference |
| Quantity | Quantity ordered |
| UnitPrice | Price at checkout time |

> **Design Note**  
> Product prices and shipping details are stored as snapshots to ensure historical accuracy even if data changes later.

---

## 4.APIs
# Get My Order
- GET /v1/orders/me
- Returns the authenticated customer’s order history.

# Get Order Details
- GET /v1/orders/{orderId}
- Returns order details only if the order belongs to the requesting customer.

# Cancel Order
- PUT /v1/orders/{orderId}/cancel
- Rules:
- Only the owner can cancel the order
- Only orders with status Pending can be cancelled
- Cancellation updates the order status to Cancelled

# Get All Orders (Paginated)
- GET /v1/admin/orders
- return all the orders with page and pageSize

# Get Order By Id
- GET /v1/admin/orders/{orderId}
- Returns full order details including items.

# Update Order Status
- PUT /v1/admin/orders/{orderId}/status
- Only predefined statuses are allowed
- Invalid status transitions are blocked
---

## 5. Validation Rules
# Customer Order Validation
- Shipping address, city, and phone are required
- Payment method must be valid
- Phone number format is validated
- Field length constraints enforced
#Admin Status Validation
- Status must be one of the allowed values
- Status transitions must follow lifecycle rules
- Validation is implemented using FluentValidation at the Service layer.

---

## 6. Design Decision adn Best Practice
# Why orders are not deleted
- Orders are financial records
- Required for audit, analytics, and accounting
- Industry standard practice
# Why admin cannot create orders
- Orders represent customer intent
- Prevents data corruption and fraud
# Why order data is immutable
- Ensures historical accuracy
- Prevents reconciliation issues

