# 📝 Review Module

## 1. Overview

The **Review Module** manages customer feedback for both **products** and the **overall website** in the e-commerce system.  
It allows customers to submit ratings and written feedback, while enabling administrators to moderate reviews for quality, abuse, and policy compliance.

The module follows **real-world e-commerce standards**, including **soft deletion**, **role-based access**, and **pagination for admin moderation**.

---

## 2. Responsibilities

### Core Responsibilities
- Allow customers to submit product reviews
- Allow customers to submit website reviews
- Store ratings (1–5) with optional title and content
- Enable customers to delete their own reviews
- Enable admins to view and moderate all reviews
- Support pagination for admin review listings
- Soft-delete reviews for audit safety

### Explicitly NOT Allowed
- Hard deletion of reviews
- Admin creation or editing of reviews
- Mixing product and website reviews in the same domain logic
- Frontend-controlled moderation logic

---

## 3. Database Design

### Product Reviews Table (`Reviews`)

Stores reviews related to individual products.

| Column | Description |
|------|-------------|
| ReviewId | Unique review identifier |
| ProductId | Reviewed product |
| UserId | Review author |
| Title | Short review summary |
| Content | Detailed feedback |
| Rating | Rating (1–5) |
| IsDeleted | Soft-delete flag |
| DeletedAt | Deletion timestamp |
| CreatedAt | Review creation time |

---

### Website Reviews Table (`WebsiteReviews`)

Stores feedback about the overall platform.

| Column | Description |
|------|-------------|
| WebsiteReviewId | Unique website review identifier |
| UserId | Review author |
| Title | Short feedback title |
| Content | Detailed feedback |
| Rating | Rating (1–5) |
| IsDeleted | Soft-delete flag |
| DeletedAt | Deletion timestamp |
| CreatedAt | Review creation time |

---

### Constraints & Rules
- `Rating` must be between **1 and 5**
- Reviews are **never physically deleted**
- `IsDeleted = 1` marks a review as removed
- Customers only see active reviews

---

## 4. Review Structure

### Review Fields
- **Rating**: Numeric score (mandatory)
- **Title**: Short summary (optional)
- **Content**: Detailed explanation (optional)

### Why Title & Content are Optional
- Supports quick star-only reviews
- Improves UX flexibility
- Matches industry platforms (Amazon, Google Reviews)

---

## 5. API Endpoints

---

## 🔐 Admin Review APIs

Base Routes:
- `/v1/admin/reviews`
- `/v1/admin/website-reviews`


---

### Get All Product Reviews (Admin)

- **GET** `/v1/admin/reviews`

**Query Parameters**
- `page`
- `pageSize`

**Behavior**
- Returns paginated product reviews
- Includes deleted reviews
- Used for moderation and auditing

---

### Get All Website Reviews (Admin)

- **GET** `/v1/admin/website-reviews`

**Query Parameters**
- `page`
- `pageSize`

**Behavior**
- Returns paginated website reviews
- Includes deleted reviews
- Used for platform feedback analysis

---

### Delete Product Review (Admin)

- **DELETE** `/v1/admin/reviews/{reviewId}`

**Behavior**
- Soft-deletes any product review
- Used for moderation

---

### Delete Website Review (Admin)

- **DELETE** `/v1/admin/website-reviews/{reviewId}`

**Behavior**
- Soft-deletes any website review
- Used for moderation

---

## 🌐 Customer Review APIs

---

### Create Product Review

- **POST** `/v1/products/{productId}/reviews`

**Request Body**
```json
{
  "content": "Works as expected",
  "rating": 4
}
```
**Behavior**
- Review linked to product and user
- Validation enforced using FluentValidation

### Get Product Reviews (Public)
- **GET** `/v1/products/{productId}/reviews`

**Behavior**
- Returns only active (non-deleted) reviews
- Used by product detail pages

### Delete Own Product Review
- **DELETE** `/v1/reviews/{reviewId}`

**Behavior**
-Only review owner can delete
-Soft-delete applied

### Create Website Review
- **Post** `/v1/website-reviews`

### Get Website Reviews (Public)
- **GET** `/v1/website-reviews`

**Behavior**

- Returns only active reviews
- Used for testimonials and feedback sections

### Delete Own Website Review
- **DELETE** `/v1/website-reviews/{reviewId}`

## 6. Design Decision and Best Practices

### Why Product & Website Reviews are Separate
- Different domains and business rules
- Avoids conditional logic
- Cleaner moderation workflows

### Why Soft Delete is Used?
- Prevents data loss
- Supports auditing
- Matches production-grade systems

### Why Admin and Customer API are Separated?
- Improves security
- Simplifies authorization
- Enables independent scaling



