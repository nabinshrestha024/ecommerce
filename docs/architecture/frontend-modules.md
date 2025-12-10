# E-Commerce Platform – Frontend Module Architecture (Next.js + React)

This document describes the **frontend architecture** for the e-commerce platform.

- Frontend: **Next.js (App Router) + React + TypeScript**
- UI: Tailwind CSS / UI library (e.g. shadcn/Ant Design) – to be finalized
- State/Data: React Query (TanStack Query) for server state, React Context/Zustand for app state
- Clients:
  - **Customer panel** (shop, cart, checkout, profile)
  - **Admin panel** (catalog, inventory, orders, reports, system settings)

The modules here align with the backend modules defined in  
`/docs/architecture/modules.md`.

---

## 1. App Shell & Navigation Module

### Responsibilities

- Provide global layout and navigation structure for **customer** and **admin** areas.
- Handle **public vs authenticated vs admin** route separation.
- Provide shared **header, footer, sidebar**, and **responsive layouts**.

### Main UX Areas

- Customer layout:
  - Header with logo, search, category dropdown, cart icon, profile menu.
  - Footer with links (about, help, terms, etc.).
- Admin layout:
  - Left sidebar with navigation to admin modules.
  - Top bar with admin profile and notifications.
- Responsive behavior:
  - Collapsing nav, mobile menus.

## 2. Authentication & Authorization UI Module

### Responsibilities

- Provide all UI flows for **Admin** and **Customer** authentication.
- Integrate with backend auth APIs.
- Enforce **protected routes** on frontend.

### Screens

- `/login`
- `/register`
- `/forgot-password`
- `/reset-password?token=...`

### Backend Integration

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /users/me`

---

## 3. Catalog (Category & Product) UI Module

### Responsibilities

- Customer-facing product browsing, searching, and detail view.
- Admin-facing category & product management UI.

## 4. Inventory & Vendor/Procurement UI Module

### Responsibilities

- Admin interfaces for:
  - Vendors
  - Purchase orders (POs)
  - Stock overview & adjustments

## 6. Checkout, Orders & Shipping UI Module

### Responsibilities

- Guide user through checkout steps.
- Handle address selection.
- Show order confirmation and history.

### Checkout Flow Screens

- `/checkout`
  - Multi-step:
    1. Address selection / entry
    2. Payment method selection (eSewa, Khalti, COD)
    3. Order review → Place Order

- `/order-confirmation/[orderId]`
  - Show final summary after successful order creation/payment.

### Customer Order Screens

- `/account/orders`
  - List user orders with status, total, created date.
- `/account/orders/[orderId]`
  - Order details:
    - Items, shipping address, status, payment info, timeline.


## 7. Payment Integration UI Module (eSewa, Khalti)

### Responsibilities

- Expose payment options in checkout.
- Redirect or embed eSewa/Khalti UI.
- Handle success/failure UX.


## 8. Discount UI Module

### Responsibilities

- Show product discounts and cart-level discounts.

### UX Elements

- Product cards:
  - Show discounted price, original price, and discount badge (e.g., “-20%”).
- Cart/checkout:
  - Display applied discount amounts.

## 9. Notification UI Module

### Responsibilities

- Display **in-app notifications** for customers and admins.
- Provide notification lists and read/unread behavior.

### UX

- Notification bell in header:
  - Shows count badge for unread notifications.
  - Click reveals dropdown with recent notifications.

### Integration Points

- Called after:
  - Successful order creation.
  - Payment status changes.
  - Order status updates.
- Admin sees:
  - New order notifications.
  - Low-stock notifications.

---

## 10. Customer Profile & Account UI Module

### Responsibilities

- Manage profile details.
- Manage addresses.
- Show order history (linked with Orders module).
- Support change password.

## 11. Admin Dashboard, Reporting & Settings UI Module

### Responsibilities

- Provide admin overview dashboard.
- Show key metrics and charts.

