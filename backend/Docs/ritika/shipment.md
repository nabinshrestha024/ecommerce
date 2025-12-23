# 🚚 Shipment Module

## 1. Overview

The **Shipment Module** manages the shipping lifecycle of orders in the e-commerce system.  
It is responsible for creating shipments after an order is processed, tracking shipment progress, and exposing shipment status to customers and administrators.

The module is tightly integrated with the **Order Module** but remains logically separate to ensure clarity, scalability, and audit safety.

---

## 2. Responsibilities

### Core Responsibilities
- Create a shipment for an order (admin-controlled)
- Track shipment lifecycle and timestamps
- Store shipping cost and notes
- Allow customers to view shipment status
- Allow admins to manage shipment status

### Explicitly NOT Allowed
- Creating or modifying orders
- Deleting shipments
- Editing shipment history
- Customer-side shipment updates

---

## 3. Database Design

### Shipments Table

Stores shipment-level information.

| Column | Description |
|------|-------------|
| ShipmentId | Unique shipment identifier |
| OrderId | Associated order |
| Status | Shipment lifecycle status |
| ShippedAt | Timestamp when shipment was dispatched |
| DeliveredAt | Timestamp when shipment was delivered |
| ShippingCost | Cost of shipping |
| Notes | Internal shipment notes |
| CreatedAt | Shipment creation time (UTC) |
| UpdatedAt | Last status update time |


Status values:
- Pending, Packed, Shipped, InTransit, Delivered, Returned
- A shipment is always linked to a single order.
- Orders may exist without shipments, but shipments cannot exist without orders.

---

## 5. API Endpoints
### Get Shipment by Order
- GET /v1/shipments/order/{orderId}
- Returns shipment details for the given order.
### Create Shipment
- POST /v1/admin/shipments
- After order placemetn is done, admin send the order for shipment
### Update Shipment Status
- PUT /v1/admin/shipments/{shipmentId}/status
- Only predefined statuses are allowed
- Invalid transitions are blocked
- Timestamps (ShippedAt, DeliveredAt) are set automatically

## 6. Validation Rules
### Shipment Creation Validation
- OrderId must be valid
- Shipping cost must be zero or positive
- Notes length is limited

### Shipment Status Validation
- Status must be one of the allowed values
- Lifecycle transitions must be valid
Validation is implemented using FluentValidation.

## 7. Design Decisions & Best Practices
### Why shipments are not deleted
- Shipment records are operational and auditable
- Required for delivery tracking and dispute resolution
### Why customers cannot update shipment status
- Prevents tampering with logistics flow
- Ensures system integrity
### Why shipment lifecycle is separate from orders
- Enables independent scaling
- Supports advanced logistics integrations
