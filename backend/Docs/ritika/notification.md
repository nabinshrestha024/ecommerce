# 🔔 Notification Module

## 1. Overview

The **Notification Module** is responsible for delivering real-time and in-app notifications to users and administrators based on key business events in the e-commerce system.

It supports:
- In-app notifications (stored in database)
- Real-time notifications using **SignalR**
- Optional email notifications
- Event-driven integration with other modules (Order, Payment, Stock, User)

The module follows a **publish-on-event** design, where business services trigger notifications after successful operations.

---

## 2. Responsibilities

### Core Responsibilities
- Generate notifications for customers and admins
- Persist notifications for in-app viewing
- Push real-time notifications via SignalR
- Mark notifications as read
- Integrate email delivery (optional)

### Explicitly NOT Allowed
- Business logic inside the notification module
- Direct DB access from controllers
- Triggering notifications from repositories or SQL

---

## 3. Database Design

### Notifications Table

Stores in-app notifications.

| Column | Description |
|------|-------------|
| NotificationId | Unique notification identifier |
| UserId | Target user (nullable for system/admin notifications) |
| Title | Short notification title |
| Message | Notification message |
| IsRead | Read status flag |
| CreatedAt | UTC timestamp |
| OrderId | Related order (optional) |


UserId = NULL → system/admin notification
Design Note
Notifications are immutable records.
Read status (IsRead) is the only mutable field.

---

## 4. API Endpoints
### Get Notifications
- GET /v1/notifications
- Returns all notifications for the authenticated user, ordered by latest first.

### Mark notification as Read
- PUT /v1/notifications/{id}/read
- Marks a notification as read.
- The notification must belong to the current user.
###Response

{
  "message": "Marked as read."
}

---

## 5. Email Integration
### Design
- Implemented via IEmailSender
- Called only from NotificationService


### Why Email is in Service Layer
- Controllers handle HTTP only
- Repositories handle DB only
- Email is an external delivery channel
- This ensures clean separation of concerns.

---

## 6. Integration with other module
### Order Module
- Order placed → customer + admin notification
- Order cancelled → customer notification
### Shipment Module
- Shipment shipped → customer notification
- Shipment delivered → customer notification
### Payment Module
- Payment success → customer notification
- Payment failure → customer notification
### Product/Stock Module
- Low stock → admin notification
### User Module
- New user registration → admin notification

---

## 7. Design Decisions & Best Practices
### Why notifications are stored
- Allows in-app notification history
- Supports offline users
- Enables read/unread state

### Why SignalR is used
- Real-time user experience
- Reduces polling
- Scales well with groups

### Why notifications are event-driven
- Loose coupling between modules
- Easy to extend
- Clean business orchestration