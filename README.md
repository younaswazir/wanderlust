# 🌍 Wanderlust — Property Listing Platform

A full-featured web application for discovering, listing, and reviewing properties worldwide. Built with **Node.js**, **Express**, **MongoDB**, and **EJS**, this platform enables users to browse listings by category, search by country, upload images via Cloudinary, and interact through a review system — all secured with robust authentication and authorization.

---

## 🚀 Features

- **User Authentication & Authorization** — Secure signup, login, and logout powered by Passport.js with local strategy and session management.
- **Property Listings** — Create, view, edit, and delete property listings with title, description, price, location, country, and category.
- **Category Filtering** — Browse listings by categories: Trending, Rooms, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, and Arctic.
- **Search & Filter** — Search listings by country name with case-insensitive regex matching.
- **Geolocation Integration** — Automatic geocoding of property locations using OpenStreetMap Nominatim API for map-based coordinates.
- **Image Uploads** — Upload and store listing images securely on Cloudinary with Multer middleware.
- **Review System** — Add and delete reviews with ratings (1–5) and comments. Only authors can delete their own reviews.
- **Flash Messages** — User-friendly success and error notifications across redirects.
- **Session Management** — Persistent sessions stored in MongoDB with secure cookies (7-day expiry).
- **Input Validation** — Server-side schema validation using Joi for listings and reviews.
- **Error Handling** — Centralized custom error handling with ExpressError and async wrapper utilities.
- **Ownership Protection** — Middleware ensures only listing owners can edit or delete their properties.
- **Responsive UI** — Clean, modern EJS templates with reusable layouts via `ejs-mate`.

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| **Backend**  | Node.js, Express.js                 |
| **Database** | MongoDB Atlas (Mongoose ODM)        |
| **Frontend** | EJS, HTML5, CSS3, Bootstrap         |
| **Auth**     | Passport.js, express-session        |
| **Storage**  | Cloudinary (image hosting)          |
| **Validation**| Joi schema validation              |
| **Maps**     | OpenStreetMap Nominatim API         |
| **File Upload** | Multer + multer-storage-cloudinary |

---

## 📂 Project Structure

```
project/
├── config/
│   ├── cloud.js           # Cloudinary configuration & storage
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── listing.controllers.js
│   └── review.controllers.js
├── models/
│   ├── listing.js         # Listing schema with GeoJSON support
│   ├── review.js          # Review schema
│   └── user.js            # User schema with passport-local-mongoose
├── routes/
│   ├── listing.routes.js
│   ├── review.routes.js
│   └── user.routes.js
├── utils/
│   ├── ExpressError.js    # Custom error class
│   └── wrapAsync.js       # Async error wrapper
├── views/                 # EJS templates
├── public/                # Static assets (CSS, JS, images)
├── middleware.js          # Auth, validation, ownership checks
├── schema.js              # Joi validation schemas
└── server.js              # Application entry point
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v22.x
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   yarn add
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   ATLAS_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust
   SECRET=your-session-secret-key
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret
   ```

4. **Run the development server**
   ```bash
   node server.js
   ```

   The app will be available at `http://localhost:5000`

---

## 📡 API Endpoints

### Listings

| Method | Route                | Description              | Auth Required |
|--------|----------------------|--------------------------|---------------|
| GET    | `/listings`          | Get all listings         | No            |
| GET    | `/listings/new`      | Render new listing form  | Yes           |
| POST   | `/listings`          | Create a new listing     | Yes           |
| GET    | `/listings/:id`      | View listing details     | No            |
| GET    | `/listings/:id/edit` | Render edit form         | Yes (Owner)   |
| PUT    | `/listings/:id`      | Update listing           | Yes (Owner)   |
| DELETE | `/listings/:id`      | Delete listing           | Yes (Owner)   |

### Reviews

| Method | Route                           | Description     | Auth Required       |
|--------|---------------------------------|-----------------|---------------------|
| POST   | `/listings/:id/reviews`         | Add a review    | Yes                 |
| DELETE | `/listings/:id/reviews/:reviewId`| Delete a review | Yes (Review Author) |

---

## 🧪 Design Patterns & Best Practices

- **MVC Architecture** — Clean separation of Models, Views, and Controllers.
- **DRY Principle** — Reusable async wrapper (`wrapAsync`) eliminates repetitive try-catch blocks.
- **Middleware Separation** — Auth, validation, and ownership logic isolated in `middleware.js`.
- **Schema Validation** — Joi schemas enforce strict input validation for listings and reviews.
- **Cascading Deletes** — Mongoose post-hook ensures reviews are deleted when a listing is removed.
- **Security** — HTTP-only cookies, session storage in MongoDB, and owner/author checks prevent unauthorized access.

---


## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Muhammad Younas**  
Full-Stack Developer

---

## 🙏 Acknowledgments

- Built with ❤️ for learning and real-world practice

---

> ⭐ If you find this project helpful or interesting, please consider giving it a star!
