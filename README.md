# 🛍️ E-Commerce MERN Project

This project is a full-stack **E-Commerce Website** built with the **MERN stack** (MongoDB, Express.js, ReactJS, Node.js) and **Vite** for fast frontend development.  
It allows users to browse products, add them to the cart, make secure payments, and lets admins manage products and orders.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- ⚛️ **ReactJS + Vite** – modern frontend with fast HMR (Hot Module Replacement)
- 🌐 **React Router DOM** – client-side routing
- 💅 **CSS / SCSS / Bootstrap / TailwindCSS** *(if used)* – responsive UI design
- ⚙️ **Axios** – communicate with backend APIs
- 🧩 **Redux / Context API** *(if used)* – state management

### 🗄️ Backend
- 🟢 **Node.js + Express.js** – RESTful API backend
- 🍃 **MongoDB + Mongoose** – database management
- 🔐 **JWT Authentication** – secure login and user roles
- 🔒 **BcryptJS** – password encryption
- 📦 **Multer / Cloudinary** *(if used)* – image upload handling

### 🚀 Deployment
- ☁️ **Render / Vercel / Netlify / Railway** – hosting frontend and backend
- 🗂️ **MongoDB Atlas** – cloud database storage

---

## ✨ Features

### 👤 User Features
- 🔑 Register / Login / Forgot Password  
- 🛒 Browse and filter products by **price, category, brand**
- ❤️ Add to **Wishlist** and **Shopping Cart**
- 💳 Checkout and payment integration (**VNPay** supported)
- 📦 View purchase history

### 🧑‍💻 Admin Features
- 🧾 Manage products (CRUD)
- 👥 Manage users and orders
- 📊 Dashboard with revenue statistics and order tracking

### 🧰 Other Features
- 📱 **Responsive Design** – mobile & desktop support  
- 🔔 **Toast Notifications** & **Loading Indicators**  
- 🧹 **Clean Code Structure:** MVC pattern, separated **frontend & backend**  
- 🧑‍💻 Easy to maintain and scale  

---

## 🧑‍💻 Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/your-repo-name.git

# Move to backend
cd backend
npm install
npm run dev

# Move to frontend
cd ../frontend
npm install
npm run dev
