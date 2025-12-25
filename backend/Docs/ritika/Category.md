# 🗂️ Category Module

## 1. Overview

The **Category Module** manages product categories in the e-commerce system.  
It is responsible for creating, updating, listing, and deactivating categories, as well as exposing categories to customers for browsing and filtering products.

Categories are **admin-controlled**, while customers can only **view active categories**.  
Each category has a **system-generated slug** used for SEO-friendly URLs and internal referencing.

---

## 2. Responsibilities

### Core Responsibilities
- Create and manage product categories (admin)
- Automatically generate unique category slugs
- Upload and associate category images
- Support pagination and search
- Expose active categories to customers
- Soft-delete (deactivate) categories

### Explicitly NOT Allowed
- Frontend-controlled slug generation
- Hard deletion of categories
- Customer-side category creation or updates
- Editing category identifiers directly

---

## 3. Database Design

### Categories Table

Stores category-level information.

| Column | Description |
|------|-------------|
| CategoryId | Unique category identifier |
| Name | Category name |
| Slug | SEO-friendly unique slug |
| CategoryImageURL | Category image URL |
| Description | Category description |
| IsFeatured | Featured category flag |
| SortOrder | Display order |
| IsActive | Category visibility |
| CreatedAt | Creation timestamp (UTC) |

### Constraints & Rules
- `Slug` is **NOT NULL + UNIQUE**
- `IsActive = 0` represents soft-deleted categories
- Categories are never physically deleted

---

## 4. Slug Strategy

### Slug Rules
- Generated automatically from category name
- Lowercase, hyphen-separated
- Incremented when duplicates exist
- Regenerated only when category name changes

Examples: 
- electronics
- electronics-1
- electronics-2


### Why slug is backend-generated
- Prevents URL tampering
- Ensures SEO consistency
- Avoids duplicate conflicts
- Keeps frontend simple

---

## 5. API Endpoints

---

## 🔐 Admin Category APIs

Base Route: /v1/admin/categories
- 
All admin endpoints require: [Authorize(Roles = "Admin")]


---

### Get All Categories (Admin)

- **GET** `/v1/admin/categories`

**Query Parameters**
- `search`
- `isActive`
- `page`
- `pageSize`

**Behavior**
- Returns paginated categories
- Supports filtering by name and active status
- Includes inactive categories if requested

---

### Upload Category Image

- **POST** `/v1/admin/categories/upload-image`
- Content-Type: `multipart/form-data`

**Request**
- `file` (jpg, jpeg, png, webp)

**Behavior**
- Saves image to `/wwwroot/images/categories`
- Returns image URL
- Used before creating or updating a category

**Response**
{
  "imageUrl": "/images/categories/abc123.png"
}

### Create Category

- POST /v1/admin/categories

Request Body

{
  "name": "Electronics",
  "categoryImageURL": "/images/categories/electronics.png",
  "description": "Electronic items",
  "isFeatured": true,
  "sortOrder": 1,
  "isActive": true
}
### Behavior
- Slug generated automatically
- Validation enforced using FluentValidation
- Category stored as active by default

### Update Category
- PUT /v1/admin/categories/{id}
### Behavior
- Slug regenerated only if name changes
- Existing slug preserved otherwise
- Category updated safely

### Delete Category 
-DELETE /v1/admin/categories/{id}
### Behavior
-Sets IsActive = 0
- Category is hidden from customers
- Data remains for audit safety

## 🌐 Public Category APIs

- Base Route: /v1/categories
- Accessible by: [Authorize(Roles = "Admin, Customer")]
### Get Categories (Public)
- GET /v1/categories

**Query Parameters**
- `search`
- `onlyActive`
- `page`
- `pageSize`
**Behavior**
- Returns only active categories by default
- Supports pagination and search
- Used by frontend for category listing

## 6. Validation Rules
### Category Creation & Update Validation
-Name is required
- Slug must not be empty (generated internally)
- SortOrder must be valid
- Image URL length is limited

## 7. Design Decisions & Best Practices
### Why categories are soft-deleted
- Prevents breaking product references
- Required for auditing
- Safer for production systems

### Why slug is not accepted from frontend
- Prevents conflicts
- Ensures SEO consistency
- Keeps logic centralized

### Why admin & public APIs are separated
- Improves security
- Simplifies frontend usage
- Allows independent scaling