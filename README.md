# UrbanThreadz 🧥

> Premium streetwear e-commerce platform built with React + json-server.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwind-css)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=react-router)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        — Navigation + cart icon
│   ├── Footer.jsx        — Links, social, copyright
│   ├── ProductCard.jsx   — Product display + add-to-cart / admin actions
│   ├── ProductForm.jsx   — Create & Update form with validation
│   └── Cart.jsx          — Cart items, quantity, totals
├── pages/
│   ├── Home.jsx          — Hero, categories, featured products
│   ├── Products.jsx      — Full listing with filter & search
│   ├── Admin.jsx         — Dashboard with CRUD controls
│   └── EditProduct.jsx   — Edit form for a single product
├── services/
│   └── api.js            — All fetch calls (GET, POST, PATCH, DELETE)
├── context/
│   └── CartContext.jsx   — Global cart state via Context API
├── App.jsx               — Routes
├── main.jsx              — Entry point
└── index.css             — Tailwind + custom styles
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the mock API (json-server)
```bash
npm run server
# Runs on http://localhost:3001
```

### 3. Start the React app (new terminal)
```bash
npm run dev
# Runs on http://localhost:3000
```

---

## 🗺 Routes

| Route        | Page            | Description               |
|-------------|-----------------|---------------------------|
| `/`          | Home            | Hero, featured products   |
| `/products`  | Products        | Full catalog + filter     |
| `/cart`      | Cart            | Shopping cart             |
| `/admin`     | Admin           | CRUD dashboard            |
| `/edit/:id`  | Edit Product    | Edit a product by ID      |

---

## 📡 API Endpoints (json-server)

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| GET    | /products           | Fetch all products |
| GET    | /products/:id       | Fetch one product  |
| POST   | /products           | Create product     |
| PATCH  | /products/:id       | Update product     |
| DELETE | /products/:id       | Delete product     |

---

## 👥 Group Task Distribution

| Member   | Role                              | Files                                      |
|----------|-----------------------------------|--------------------------------------------|
| Member 1 | UI/UX Designer                    | Figma, index.css, color system             |
| Member 2 | Frontend (Routing & Layout)       | Navbar.jsx, Footer.jsx, App.jsx            |
| Member 3 | Frontend (Products & CRUD)        | ProductCard.jsx, ProductForm.jsx, api.js   |
| Member 4 | Cart & State Management           | Cart.jsx, CartContext.jsx                  |
| Member 5 | QA, API Testing & Deployment      | README, Postman, Vercel config, db.json    |

---

## 📦 Product Data Shape

```json
{
  "id": 1,
  "name": "Urban Oversized Hoodie",
  "price": 65,
  "category": "Hoodies",
  "description": "Premium heavyweight cotton blend.",
  "image": "https://...",
  "stock": 15,
  "featured": true
}
```

---

## 🎨 Color Palette

| Token        | Hex       | Usage              |
|-------------|-----------|---------------------|
| Black        | `#0A0A0A` | Background          |
| Gray         | `#1C1C1C` | Cards               |
| Light Gray   | `#2A2A2A` | Inputs              |
| Red          | `#E63946` | CTAs, accents       |
| White        | `#F5F5F0` | Primary text        |
| Beige        | `#C9B99A` | Secondary accents   |

---

## ✅ Submission Checklist

- [ ] Figma Link (view access enabled)
- [ ] Trello/Jira Board Screenshot
- [ ] GitHub Repository URL + README
- [ ] Live Vercel Deployment Link
- [ ] `db.json` file included
- [ ] Postman Collection exported

---

## 🔮 Future Improvements

- User authentication (Firebase / Auth0)
- Payment integration (Stripe)
- Wishlist feature
- Product reviews & ratings
- Dark/Light mode toggle
- Search autocomplete
