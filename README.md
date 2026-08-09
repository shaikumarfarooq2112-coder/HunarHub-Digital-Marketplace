# HunarHub – Digital Marketplace for Local Micro-Entrepreneurs

## 📌 Project Overview

HunarHub is a web-based digital marketplace designed to connect local micro-entrepreneurs, artisans, and customers.

The platform allows entrepreneurs to showcase their skills, list handmade products, receive service requests, manage orders, and track earnings.

Customers can discover local entrepreneurs, purchase handmade products, request services, submit reviews, and raise complaints.

Administrators can manage entrepreneurs, monitor the platform, and handle customer complaints.

---

## 🎯 Problem Statement

Many local micro-entrepreneurs such as potters, tailors, cobblers, artisans, and small vendors depend mainly on local customers, word-of-mouth, and offline sales.

They often lack:

- Digital visibility
- Customer reach
- Online product listings
- Structured service requests
- Order management
- Customer feedback systems

HunarHub provides a centralized platform to digitally connect these entrepreneurs with customers.

---

## 🎯 Objectives

### Primary Objectives

- Digitally connect local entrepreneurs with customers
- Enable handmade product selling
- Enable service requests
- Promote traditional skills and craftsmanship
- Create additional income opportunities

### Secondary Objectives

- Support local businesses
- Reduce dependency on middlemen
- Provide simple digital tools
- Encourage sustainable local commerce

---

## ✨ Features

### 👤 Customer Features

- User registration
- User login
- Browse products
- Search products
- View product details
- Place product orders
- View order history
- Request entrepreneur services
- Track service request status
- Submit reviews and ratings
- Submit complaints

### 🧑‍🎨 Entrepreneur Features

- Entrepreneur registration/profile
- Manage entrepreneur profile
- Select skill category
- Add products
- Manage products
- View orders
- Confirm orders
- Complete orders
- Cancel orders
- Receive service requests
- Accept/reject service requests
- Manage availability
- View earnings
- View customer information

### 👨‍💼 Admin Features

- Admin login
- Admin dashboard
- View entrepreneurs
- Manage entrepreneur information
- Verify entrepreneurs
- Monitor platform activities
- View complaints
- Update complaint status
- Respond to customer complaints
- Monitor orders and service requests

---

## 🛠️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- Password hashing using bcrypt

### APIs

- REST APIs

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB

---

## 📂 Project Structure

```text
HunarHub/
│
├── client/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── products.html
│   ├── product-details.html
│   ├── add-product.html
│   ├── dashboard.html
│   ├── orders.html
│   ├── service-request.html
│   ├── complaints.html
│   ├── admin.html
│   └── admin-complaints.html
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── README.md
└── .gitignore