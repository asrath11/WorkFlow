# WorkFlow - Employee Management System

A modern full-stack web application for managing employees with authentication and role-based access control.

## Features

- **User Authentication**

  - Email/Password login
    - Demo Account Credentials: Email: demo@gmail.com, Password: demo@123
  - Social login (Google, Facebook)
  - JWT-based authentication
  - Protected routes

- **Employee Management**

  - Add, view, edit, and delete employee records
  - Search and filter functionality
  - Data visualization with Recharts

- **Modern UI**
  - Responsive design
  - Dark/light mode support
  - Intuitive dashboard

## Tech Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **State Management**: React Hooks + Context API
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v7
- **UI Components**: Radix UI Primitives
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Date Handling**: date-fns
- **Build Tool**: Vite

### Backend

- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js (JWT, Google OAuth, Facebook OAuth)
- **Security**: Helmet, CORS, rate limiting
- **Data Validation**: Express Validator
- **Logging**: Morgan

## Project Structure

```
WorkFlow/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── api/           # API service layer
│       ├── assets/        # Images, fonts, etc.
│       ├── components/    # Reusable UI components
│       └── ...
│
└── server/                # Backend Node.js application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── utils/            # Utility functions
    ├── app.js            # Express app setup
    └── ...
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd WorkFlow
   ```

2. Install backend dependencies

   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies

   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables
   - Create `.env` files in both `server` and `client` directories
   - Refer to `.env.example` for required variables

### Running the Application

1. Start the backend server

   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server

   ```bash
   cd ../client
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

### Server (`.env` in server directory)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### Client (`.env` in client directory)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Deployment

### Backend

1. Set up a production MongoDB database
2. Configure environment variables in production
   ```bash
   npm install -g nodemon
   nodemon start app.js
   ```

### Frontend

1. Build the production bundle
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to your preferred static hosting service (Netlify, Vercel, etc.)

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request
