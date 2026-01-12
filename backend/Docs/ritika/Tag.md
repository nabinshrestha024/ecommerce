# 🏷️ Tag Module

## 1. Overview

The **Tag Module** manages product tags used for classification, filtering, and search optimization within the e-commerce system.

Tags allow products to be grouped logically (e.g., *Running*, *Shoes*, *New Arrival*) without affecting the core product hierarchy.  
They are lightweight, reusable, and fully admin-controlled.

The module supports:
- Tag creation and management (Admin)
- Assigning and removing tags from products
- Fetching tags by product
- Filtering products by tags in catalog APIs

---

## 2. Responsibilities

### Core Responsibilities
- Create and manage unique tags
- Assign tags to products
- Remove tag associations from products
- Fetch tags for a product
- Support tag-based product filtering

### Explicitly NOT Allowed
- Auto-assigning tags to products
- Hard deletion of tags without validation
- Product creation logic inside the tag module
- Direct SQL access from controllers

---

## 3. Database Design

### Tags Table

Stores unique tag definitions.

| Column | Description |
|------|-------------|
| TagId | Unique tag identifier |
| Name | Unique tag name |

```sql
CREATE TABLE Tags (
    TagId INT IDENTITY(1,1) PRIMARY KEY,
    Name  VARCHAR(300) NOT NULL UNIQUE
);
```

| Column | Description |
|------|-------------|
| ProductTagId|Unique Identifier |
| TagId | Associated tag  |
| ProductId | Associated product |

```sql
CREATE TABLE ProductTags (
    ProductTagId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId    INT NOT NULL,
    TagId        INT NOT NULL,

    CONSTRAINT FK_ProductTags_Product 
        FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,

    CONSTRAINT FK_ProductTags_Tag 
        FOREIGN KEY (TagId) REFERENCES Tags(TagId) ON DELETE CASCADE,

    CONSTRAINT UQ_ProductTags_Product_Tag UNIQUE (ProductId, TagId)
);
```
## 4. API Endpoint
## Admin Tag Management
### Create Tag
- **POST** `/v1/admin/tags`
```json
{
  "name": "Running"
}
```
### Get All Tags
- **GET** `/v1/admin/tags`
-Returns all tags for management and selection.

### Delete tag
- **DELETE** `/v1/admin/tags/{tagId}`
- Prevent deletion if tag is used by products
- OR remove associations before deletion

## Product-Tag Assignment(admin)

### Assign Tag to Product
- **POST** `/v1/admin/products/{productId}/tags/{tagId}`
- Creates a ProductTags record.

### Remove Tag from Product
- **DELETE** `/v1/admin/products/{productId}/tags/{tagId}`
- Removes only the association, not the tag itself.

### GET Tags by Product(for customer too)
- **GET** `/v1/admin/products/{productId}/tags`
```json
[
  {
    "tagId": 1,
    "name": "Running"
  }
]
```
## 5. Design Decision and Best Practices
### Why tags are separate from categories
- Categories define hierarchy
- Tags define behavior, features, or marketing labels
- Products can have many tags without structural complexity

### Why tags are not auto created?
- Prevents data pollution
- Keeps taxonomy controlled
- Allows reuse and consistency

### Why many-to-many design?
- One product → many tags
- One tag → many products
- Industry-standard modeling





