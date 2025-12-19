# Admin Inventory & Procurement API Documentation

**Base URL:** `/v1/admin`

**Scope:** Vendor Management, Purchase Orders, Stock & Inventory
---

## Common Response Structure

All APIs return a consistent response envelope:

```
{
  "Success": true,
  "Message": "Optional message",
  "Data": {}
}
```

### Error Responses

| HTTP Code | Description                        |
| --------- | ---------------------------------- |
| 400       | Validation error / invalid request |
| 404       | Resource not found                 |
| 500       | Internal server error              |

---

## Vendor Management APIs

### 1. Get All Vendors

**GET** `/vendors`

**Query Params**

| Name     | Type    | Required | Description                    |
| -------- | ------- | -------- | ------------------------------ |
| isActive | boolean | No       | Filter active/inactive vendors |

**Response Example**

```
{
  "Success": true,
  "Data": [
    {
      "vendorId": 1,
      "name": "ABC Suppliers",
      "email": "abc@vendor.com",
      "phone": "9800000000",
      "isActive": true
    }
  ]
}
```

---

### 2. Create Vendor

**POST** `/vendors`

**Request Body**

````json
{
  "name": "string",
  "contactPerson": "string",
  "phone": "string",
  "email": "string",
  "address": "string"
}
```
{
  "name": "ABC Suppliers",
  "email": "abc@vendor.com",
  "phone": "9800000000",
  "address": "Kathmandu"
}
````

**Response** `201 Created`

```
{
  "success": true,
  "message": "Vendor created successfully",
  "data": {
    "vendorId": 6,
    "name": "ABC Suppliers",
    "contactPerson": null,
    "phone": "9800000000",
    "email": "abc@vendor.com",
    "address": "Kathmandu",
    "isActive": true,
    "createdAt": "2025-12-19T15:26:47.947"
  }
}
```

---

### 3. Get Vendor By ID

**GET** `/vendors/{id}`

**Response**

```
{
  "Success": true,
  "Data": {
    "vendorId": 1,
    "name": "ABC Suppliers",
    "isActive": true
  }
}
```

---

### 4. Update Vendor

**PUT** `/vendors/{id}`

**Request Body**

````
{
  "name": "string",
  "contactPerson": "string",
  "phone": "string",
  "email": "string",
  "address": "string",
  "isActive": true
}
```
{
  "name": "ABC Suppliers Pvt Ltd",
  "email": "updated@vendor.com",
  "phone": "9811111111"
}
````

**Response**

```
{
  "success": true,
  "message": "Vendor updated successfully",
  "data": {
    "vendorId": 6,
    "name": "ABC Suppliers Pvt Ltd",
    "contactPerson": null,
    "phone": "9811111111",
    "email": "updated@vendor.com",
    "address": "Kathmandu",
    "isActive": true,
    "createdAt": "2025-12-19T15:26:47.947"
  }
}
```

---

### 5. Delete Vendor (Soft Delete)

**DELETE** `/vendors/{id}`

> Vendor is marked inactive, not permanently deleted.

**Response**

```json
{
  "Success": true,
  "Message": "Vendor set inactive successfully"
}
```

---

## Purchase Order APIs

### 6. Create Purchase Order

**POST** `/purchase-orders`

**Request Body**

````
{
  "vendorId": 0,
  "notes": "string",
  "items": [
    {
      "productId": 0,
      "quantity": 0,
      "unitCost": 0
    }
  ]
}

{
  "vendorId": 1,
  "expectedDeliveryDate": "2025-01-10",
  "items": [
    {
      "productId": 101,
      "quantity": 50,
      "unitPrice": 120.50
    }
  ]
}
````

**Response**

```json
{
  "Success": true,
  "Message": "Purchase order created successfully",
  "Data": {
    "purchaseOrderId": 10,
    "status": "Pending"
  }
}
```

---

### 7. Get All Purchase Orders

**GET** `/purchase-orders`

**Query Params**

| Name   | Type   | Required | Description                   |
| ------ | ------ | -------- | ----------------------------- |
| page   | int    | No       | Default = 1                   |
| size   | int    | No       | Default = 10                  |
| status | string | No       | Pending / Approved / Received |

**Response**

```json
{
  "Success": true,
  "Data": {
    "items": [],
    "page": 1,
    "size": 10,
    "totalCount": 100
  }
}
```

---

### 8. Get Purchase Order By ID

**GET** `/purchase-orders/{id}`

**Response**

```json
{
  "Success": true,
  "Data": {
    "purchaseOrderId": 10,
    "vendorId": 1,
    "status": "Approved",
    "items": []
  }
}
```

---

### 9. Update Purchase Order Status

**PUT** `/purchase-orders/{id}/status`

**Request Body** (`UpdatePurchaseOrderStatusRequestDto`)

```json
{
  "status": "Approved"
}
```

**Response**

```json
{
  "Success": true,
  "Message": "Purchase order status updated successfully",
  "Data": { "purchaseOrderId": 10 }
}
```

---

### 10. Receive Purchase Order (GRN)

**PUT** `/purchase-orders/{id}/receive`

**Request Body**

````json
{
  "receivedItems": [
    {
      "poItemId": 0,
      "receivedQuantity": 0
    }
  ]
}
```json
{
  "receivedDate": "2025-01-05",
  "remarks": "All items received"
}
````

> **Note**: Only **Approved** purchase orders can be received.

**Response**

```json
{
  "Success": true,
  "Message": "Purchase order received successfully",
  "Data": { "purchaseOrderId": 10 }
}
```

---

## Stock & Inventory APIs

### 11. Get All Stock

**GET** `/stock`

**Response**

```json
{
  "Success": true,
  "Data": [
    {
      "productId": 101,
      "productName": "iPhone 15",
      "quantity": 120,
      "reorderLevel": 20
    }
  ]
}
```

---

### 12. Adjust Stock (Manual Adjustment)

**POST** `/stock/adjust`

**Request Body**

````json
{
  "productId": 0,
  "adjustmentQuantity": 0,
  "reason": "string",
  "notes": "string"
}
```json
{
  "productId": 101,
  "quantityChange": -5,
  "reason": "Damaged items"
}
````

**Response**

```json
{
  "Success": true,
  "Message": "Stock adjusted successfully",
  "Data": {
    "productId": 101,
    "newQuantity": 115
  }
}
```

---

### 13. Low Stock Alerts

**GET** `/stock/low-stock`

**Response**

```json
{
  "Success": true,
  "Data": [
    {
      "productId": 102,
      "productName": "USB Cable",
      "quantity": 5,
      "reorderLevel": 10
    }
  ]
}
```

---

## Notes

* All admin APIs are versioned under `/v1/admin`
* Pagination is implemented for purchase orders
* Soft delete is used for vendors
* Purchase Order lifecycle: `Pending → Approved → Received`
* Stock quantity automatically increases when Purchase Order is received

---

**Contact Backend Team for DTO field-level validations if needed.**
