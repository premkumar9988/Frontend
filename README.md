# 📚 Online Bookstore Application

> A modern online bookstore where users can browse, search, and purchase books with a seamless shopping experience. Includes cart functionality and a powerful admin dashboard.

---

## 🌐 Overview

The **Online Bookstore** is a full-stack application designed to deliver a smooth and user-friendly book shopping experience.

- 👤 Users can browse, search, and purchase books
- 🛒 Manage cart and checkout
- 🛠 Admins can manage inventory, orders, and users

---

## 🎥 Live Demo

| Environment | URL |
|-------------|-----|
| Frontend | http://localhost:3000 |
| Authentication | http://localhost:3000/auth |
| Payment | http://localhost:3000/payment |
| Admin Panel | http://localhost:3000/admin |

---

## 🛠 Tech Stack

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | Next.js |
| Library | React |
| Styling | Tailwind CSS / CSS |
| State Management | Context API |
| Routing | App Router |

---

## 🔒 Security Features

- 🔐 Protected admin routes
- 🛡 Authentication checks
- 🔑 Role-based access control

---

## ✨ Features

### 👤 User Features

| Feature | Description |
|---------|-------------|
| 📖 Browse | Explore the full book catalog |
| 🔍 Search & Filter | Find books by title, author, or genre |
| 🛒 Cart | Add and manage items before checkout |
| 💳 Checkout | Clean and intuitive payment UI |
| 📦 Order Tracking | Track order status in real time |
| 🔐 Auth | Login and Register with secure flows |

---

## 🛠 Admin Features

#### 📚 Book Management
- ➕ Add new books to the catalog
- ✏️ Edit existing book details
- ❌ Delete books
- 📦 Manage stock levels

#### 🛒 Order Management
- 📦 View all orders
- 🚚 Update order status:
  - 🔵 Pending
  - 🟡 Shipped
  - 🟢 Delivered
- 📊 View analytics

#### 👥 User Management
- 👀 View all registered users
- ❌ Remove or block users
- 🔐 Manage roles and permissions

#### 📊 Dashboard Overview
- Total users
- Total orders
- Total books
- Sales insights

---

## 🧩 Admin Workflow

```
📦 Manage Inventory → 🛒 Monitor Orders → 🚚 Update Status → 👥 Manage Users
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/bookstore.git

# Navigate into the project
cd bookstore

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📁 Project Structure

```
bookstore/
├── /app                  # Next.js App Router pages and layouts
├── /components           # Reusable UI components
├── /context              # React Context API providers
├── /hooks                # Custom React hooks
├── /lib                  # Utility libraries and configs
├── /public               # Static assets (images, icons, etc.)
├── /services             # API service functions
├── /styles               # Global and module styles
├── /utils                # Helper functions
├── .env.local            # Environment variables
├── next.config.mjs       # Next.js configuration
├── package.json          # Project metadata and scripts
└── README.md             # Project documentation
```

---

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:

| Document | Description |
|----------|-------------|
| Overview | High-level project summary |
| Installation | Setup and configuration guide |
| Project Structure | Folder and file breakdown |
| User Flow | End-user journey walkthrough |
| Admin Flow | Admin panel walkthrough |
| Features | Full feature reference |
| Tech Stack | Technology details |

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE.md](LICENSE.md) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — React Framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Lucide React](https://lucide.dev/) — Icon library