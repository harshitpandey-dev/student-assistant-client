# Student Assistant - Frontend

A modern React-based web application designed for college students to buy and sell used items like books, furniture, vehicles, and other campus essentials. This platform facilitates peer-to-peer marketplace transactions within the campus community with real-time chat functionality.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [Support](#support)

## 🎯 Overview

Student Assistant is a comprehensive marketplace platform built specifically for college students. It addresses the common need for buying and selling second-hand items within campus communities, featuring secure authentication through college IDs and real-time communication between buyers and sellers.

## ✨ Features

### 🛒 Marketplace

- **Product Listings**: Students can list items with custom prices, detailed descriptions, and images
- **Advanced Search**: Find products by category, price range, and keywords
- **Product Management**: Edit, update, and delete product listings
- **Wishlist**: Save items for later consideration
- **Shopping Cart**: Add multiple items for potential purchase

### 💬 Real-time Communication

- **Live Chat**: Socket.io powered real-time messaging between buyers and sellers
- **Price Negotiation**: Direct communication for price discussions
- **Chat History**: Persistent conversation records
- **Emoji Support**: Enhanced messaging experience with emoji picker

### 👤 User Management

- **College ID Authentication**: Secure login restricted to college email addresses
- **User Profiles**: Customizable profiles with profile pictures
- **Account Management**: Update personal information and change passwords
- **Admin Panel**: Administrative controls for user and product management

### 🔐 Security & Authentication

- **JWT Token Authentication**: Secure API communication
- **Password Reset**: Forgot password functionality
- **Protected Routes**: Role-based access control
- **Input Validation**: Client-side and server-side validation

## 📸 Screenshots

### Homepage

![Homepage Screenshot](./screenshots/homepage.png)
_Main landing page showcasing featured products_

### Product Listing

![Product Listing Screenshot](./screenshots/product-listing.png)
_Browse and search through available products_

### Real-time Chat

![Chat Interface Screenshot](./screenshots/chat-interface.png)
_Real-time messaging between buyers and sellers_

### User Profile

![User Profile Screenshot](./screenshots/user-profile.png)
_User profile management and settings_

### Admin Dashboard

![Admin Dashboard Screenshot](./screenshots/admin-dashboard.png)
_Administrative interface for managing users and products_

## 🛠 Tech Stack

### Frontend Framework

- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **Vite 5.2.0** - Fast build tool and development server

### State Management

- **Redux Toolkit 2.2.2** - Predictable state container
- **React Redux 9.1.0** - Official React bindings for Redux

### Routing & Navigation

- **React Router Dom 6.22.3** - Declarative routing for React applications
- **React Router Bootstrap 0.26.0** - Bootstrap components for React Router

### UI Components & Styling

- **Bootstrap 5.3.3** - Popular CSS framework
- **React Bootstrap 1.6.8** - Bootstrap components for React
- **Mantine Core 7.7.0** - Modern React components library
- **React Icons 5.0.1** - Popular icon libraries for React

### Real-time Communication

- **Socket.io Client 4.7.5** - Real-time bidirectional event-based communication

### HTTP Client & Authentication

- **Axios 1.6.8** - Promise-based HTTP client
- **JWT Decode 4.0.0** - JWT token decoding library

### Development Tools

- **ESLint 8.57.0** - JavaScript linting utility
- **Vite Plugin React 4.2.1** - Official Vite plugin for React

### Additional Libraries

- **React Lottie 1.2.4** - Render After Effects animations
- **Emoji Picker React 4.9.2** - Emoji picker component
- **React Helmet 6.1.0** - Document head management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (version 7.0.0 or higher) or **yarn** (version 1.22.0 or higher)
- **Git** for version control

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/harshitpandey-dev/student-assistant-client.git
   cd student-assistant-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   VITE_API_URL=your_backend_api_url
   VITE_SOCKET_URL=your_socket_server_url
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🎮 Usage

### For Students

1. **Registration**: Sign up using your college email address
2. **Login**: Access your account with college credentials
3. **Browse Products**: Explore available items in various categories
4. **List Items**: Create listings for items you want to sell
5. **Chat**: Communicate with potential buyers/sellers in real-time
6. **Manage Wishlist**: Save items you're interested in purchasing

### For Administrators

1. **User Management**: View and manage registered users
2. **Product Oversight**: Monitor and moderate product listings
3. **System Administration**: Access administrative controls and analytics

## 📁 Project Structure

```
src/
├── actions/           # Redux action creators
│   ├── chatActions.js
│   ├── messageAction.js
│   ├── productActions.js
│   └── userActions.js
├── components/        # Reusable React components
│   ├── chat/         # Chat-related components
│   ├── common/       # Shared components
│   ├── product/      # Product-related components
│   └── user/         # User-related components
├── contexts/         # React context providers
├── reducers/         # Redux reducers
├── screens/          # Page components
│   ├── About/
│   ├── Admin/
│   ├── Auth/
│   ├── Chat/
│   └── Product/
├── types/            # Constants and type definitions
├── animations/       # Lottie animation files
└── App.jsx          # Main application component
```

## 🔗 API Integration

This frontend application communicates with a backend API for:

- **Authentication**: User registration, login, and JWT token management
- **Product Management**: CRUD operations for product listings
- **User Management**: Profile updates and user administration
- **Real-time Chat**: WebSocket connections for live messaging
- **File Upload**: Image uploads for product listings and profile pictures

### API Endpoints

The application is configured to proxy API requests to:

- **Production**: `https://studentassistant.duckdns.org/api`
- **Development**: `http://localhost:8000/api`

## 🤝 Contributing

We welcome contributions from the community! To contribute:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all linting checks pass

### Code Style

- Use ESLint configuration provided in the project
- Follow React best practices and hooks guidelines
- Maintain consistent naming conventions
- Write meaningful component and function names

## 🐛 Issues & Bug Reports

If you encounter any issues or bugs:

1. Check the [existing issues](https://github.com/harshitpandey-dev/student-assistant-client/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce the problem
4. Provide browser and OS information

## 📞 Support

For support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/harshitpandey-dev/student-assistant-client/issues)
- **Documentation**: Check this README and code comments
- **Community**: Engage with other contributors

## 🔄 Deployment

### Production Build

```bash
npm run build
# or
yarn build
```

This creates a `dist` folder with optimized production files.

### Deployment Platforms

This application can be deployed on:

- **Vercel** (configured with `vercel.json`)
- **Netlify**
- **AWS S3 + CloudFront**
- **GitHub Pages**

---

**Made with ❤️ for the student community**
