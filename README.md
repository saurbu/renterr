# 🚗 Renter — Car Rental Platform

Renter is a full-stack **car rental platform** that connects customers looking to rent cars with car owners/businesses who want to list and manage their vehicles.

The platform provides separate experiences for **rental users** and **car owners/businesses**, with features such as car listing, search, booking management, authentication, image uploads, and automated booking-status updates.

## ✨ Features

### 👤 User Side

* User registration and login
* JWT-based authentication
* Browse available cars
* Search and explore cars
* View car details
* Book a car
* Upload driving licence information
* View booking details
* Track booking status
* Booking status updates

### 🏢 Business / Owner Side

* Business/owner authentication
* Add and list cars
* Upload multiple car images
* Manage listed cars
* View incoming bookings
* Accept or reject booking requests
* View pending, approved, completed and cancelled bookings
* Automatically update expired bookings
* Manage car availability

### 🔐 Authentication & Security

* JWT authentication
* Protected API routes
* Authentication middleware
* Secure password handling
* Authorized booking and car-management operations

### 📸 Image Management

Car and document images are uploaded using an external image-storage service rather than storing Base64 data directly in MongoDB.

### ⏰ Automated Booking Management

The backend includes a scheduled job that checks accepted bookings and automatically changes them to **completed** after the rental period ends.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* Node-Cron

### Services & Tools

* MongoDB Atlas
* ImageKit / Cloudinary
* Postman
* Git
* GitHub
* npm

---


## 🔄 How Renter Works

```text
                 ┌──────────────────┐
                 │      Renter      │
                 └────────┬─────────┘
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
     ┌───────────────┐         ┌────────────────┐
     │     User      │         │ Business/Owner │
     └───────┬───────┘         └────────┬───────┘
             │                          │
             │ Browse Cars              │ Add Cars
             │ Book Car                 │ Manage Cars
             │ Track Booking            │ Manage Bookings
             │                          │
             └────────────┬─────────────┘
                          │
                          ▼
                  ┌──────────────┐
                  │   Backend    │
                  │ Node/Express │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │   MongoDB    │
                  └──────────────┘
```

---

## 📋 Booking Flow

1. User logs into Renter.
2. User browses available cars.
3. User selects a car.
4. User provides rental and licence details.
5. Booking request is created with `pending` status.
6. Car owner receives the booking request.
7. Owner can **accept** or **reject** the booking.
8. Accepted bookings remain active during the rental period.
9. A scheduled backend job checks expired bookings.
10. Expired accepted bookings are automatically marked as `completed`.

### Booking Status

```text
pending
   │
   ├──► accepted ──► completed
   │
   └──► rejected

accepted ──► cancelled
```

---

## 🗄️ Database

Renter uses **MongoDB** with **Mongoose** for database management.

### Car

A car contains information such as:

```text
owner
brand
model
pricePerDay
gearType
engineType
seats
state
district
images
```

### Booking

A booking contains information such as:

```text
user
owner
car
name
email
number
licenceNumber
licencePhoto
date
days
totalAmount
status
```


## 🔌 API Structure

The backend exposes REST APIs for authentication, users, cars and bookings.

### Authentication

```text
/api/auth
```

Used for user authentication and account-related operations.

### User

```text
/api/user
```

Used for user-related operations.

### Cars & Bookings

```text
/api/car
```

Examples:

```text
GET  /api/car/mycars
POST /api/car/addCar
GET  /api/car/bookings
```

The exact available endpoints may vary as the project evolves.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Renter
```

### 2. Install backend dependencies

```bash
cd backend-user
npm install
```

### 3. Install user frontend dependencies

```bash
cd ../renterr-user
npm install
```

### 4. Install business frontend dependencies

```bash
cd ../renterr-business
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

> Never commit your `.env` file or expose secret keys publicly.

---

## ▶️ Running the Project

### Start Backend

```bash
cd backend-user
npm run dev
```

Backend will run on:

```text
http://localhost:8000
```

### Start User Frontend

```bash
cd renterr-user
npm run dev
```

### Start Business Frontend

```bash
cd renterr-business
npm run dev
```

---

## 🧪 API Testing

APIs can be tested using **Postman**.

For protected routes, send the JWT token in the request header:

```text
Authorization: Bearer <your-token>
```

---

## 📱 Responsive Design

The frontend is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

Tailwind CSS is used for responsive layouts and UI styling.

---

## 🔒 Security

The application implements:

* JWT authentication
* Protected backend routes
* Authentication middleware
* Environment variables for sensitive credentials
* Authorization checks for protected operations
* Secure API communication patterns

---

## 🚀 Future Improvements

Possible future improvements include:

* Online payment integration
* Google/OTP authentication
* Real-time booking notifications
* Customer reviews and ratings

---

## 🎯 Project Objective

The main goal of Renter is to provide a simple and efficient platform where:

**Users can easily find and rent cars, while car owners can list vehicles and manage rental bookings from a dedicated dashboard.**

---

## 👨‍💻 Developer

**Saurav Sharma**

Full Stack Developer | MERN Stack

### Technologies Used

```text
HTML
CSS
JavaScript
React.js
Tailwind CSS
Node.js
Express.js
MongoDB
Mongoose
JWT
Git
GitHub
```

---

## 📄 License

This project is developed for educational and portfolio purposes.

You may modify and improve the project according to your requirements.
