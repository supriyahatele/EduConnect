# EduConnect-




<img src="./frontend/public/ShopCart_Logo.png" width="150px">



## Introduction
EduConnect is an innovative education platform designed to facilitate interactive learning experiences, connecting students, educators, and educational content creators. Inspired by platforms like Coursera and Udemy, EduConnect aims to offer a wide range of courses, personalized learning paths to enhance the learning journey. EduConnect is to provide a centralized platform for high-quality online education, allowing users to enroll in courses, track their progress, and participate in collaborative learning activities.

## Team Members

    - Team Lead: [Supriya Hatele] 
    - Team Members: 
        [Supriya Hatele] 
        [Praveen Kumar] 
        [Sujeet ]
       

## Project Type
Frontend | Backend | Fullstack

## Deplolyed App
    Frontend: https://shop-cart-flame.vercel.app/
    Backend: https://shop-cart-backend-ok10.onrender.com/


## Directory Structure
      Educoonect/
      ├─.
      ├── server
      │   ├── config
      │   ├── controllers
      │   ├── middlewares
      |   ├── models
      |   ├── routes
      |   ├── uploads
      |   ├──.gitignore
      │   ├── index.js
      │   ├── package-lock.json
      │   └── package.json
      └── frontend
            ├── public
            │   └── ...
            │
            └── src
                │
                ├── assets
                │   └── ...
                │
                ├── components
                │   ├── Assignmnets
                │   ├── Videos
                         ├── CourseCreate.jsx
                         ├── MyCourseCard.jsx
                         ├── MyCourse.jsx
                         ├── UpdateCourse.jsx
                    ├── Products
                │   ├── Logout.tsx
                │   ├── PrivateRoute.tsx
                │   ├── SearchBarHome.tsx
                │   └── WildCard.tsx
                │
                ├── contexts
                │   └── AuthContextProvider.jsx
                │── navbar
                     ├── navbar.jsx
                ├── pages
                   ├── About.jsx
                   ├── Assignmnet.jsx
                   ├── Courses.jsx
                   ├── Footer.jsx
                   ├── Home.jsx
                   ├── Profile.jsx
                   ├── QuizData.jsx
                   ├──  Signup.jsx
                   ├── SingleCourse.jsx
                   ├── Videos.jsx
                ├── redux
                │   ├── actionTypes
                │   ├── actions
                │   ├── reducers
                │   └── utils
                │── routes
                     ├── AllRoutes
                     ├── PrivateRoute.jsx
                ├── App.css
                ├── App.jsx
                ├── index.css
                ├── main.tsx
                ├── vite-env.d.ts
                ├── index.html




### Features:
- **Search Functionality:** Users can easily find products they're looking for directly from the home page. The search feature allows quick access to desired items for a convenient shopping experience.

- **Product Listing and Filtering:** The products page showcases a variety of items and enables users to filter products by subcategories. This helps users to narrow down their search and discover relevant products effortlessly.

- **Cart Management:** Users can add products to their cart for later purchase. The cart functionality allows users to review their selected items, modify quantities, and proceed to checkout seamlessly.

- **Order Management:** Our platform supports order processing and payment, ensuring a smooth transaction process for users. Users can view their order history and track their purchases conveniently.

- **Admin Panel with CRUD Operations:** The admin panel provides comprehensive control over product management with Create, Read, Update, and Delete (CRUD) operations. Admins can easily add new products, update existing ones, and remove items as needed.

- **Order Tracking:** Admins can monitor and manage orders efficiently through the orders page. This includes tracking orders, managing payments, and updating order statuses to keep customers informed.

- **User Account Management:** Users can create accounts, manage their profiles, and view their order history. This enhances the overall user experience and facilitates personalized shopping journeys.

- **Responsive Design:** Our website is designed to be responsive, ensuring optimal user experience across devices. The navigation bar adapts to mobile screens, providing easy access to essential pages through a hamburger menu.

- **Navigation and Pages:** The navigation bar includes links to essential pages such as Home, Cart, Products, Orders, Contact, and Login. This intuitive navigation system enhances user accessibility and engagement.
- **User Authentication:** Allows registered users have access to add products to cart and purchase the products.



## Installation Usage:
1. Clone the repository:

git clone 

2. Navigate to the project directory:

### Frontend:
```bash
cd EduConnect/client
npm install i
npm run dev
```

### Backend:
```bash
cd EduConnect/server
npm run server

```

3. Access the Application: "Once both the backend and frontend servers are running, you can access the application by opening your web browser and navigating to http://localhost:3000 (assuming the frontend server is running on port 3000). You should see the shop-cart clone interface where you can explore Products from various categories."

## Screenshots:

### SignupPage/RegisterPage

<img src="./ScreenShots/Signup.png" height="250px" width="700px">

### LoginPage

<img src="./ScreenShots/Login Page.png" height="250px" width="700px">

### HomePage

<img src="./ScreenShots/Home page.png" height="1750px" width="700px">

### ProductsPage

<img src="./ScreenShots/Products page.png" height="1050px" width="700px">

### CartPage

<img src="./ScreenShots/Cart page.png" height="800px" width="700px">

### OrdersPage

<img src="./ScreenShots/Orders page.png" height="650px" width="700px">

## Credentials:

To access authenticated pages, you can use the following credentials:

{
  "email": "user@gmail.com",
  "password": "1234"
},



## Technologies Used:
- **Frontend:**  ChakraUI, React, redux
- **Backend:** Node.js,Express.js,Mongodb
- **Deployment:** Vercel , Render


## Contributing:
Contributions are welcome! If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/improvement`).
6. Create a new Pull Request.
