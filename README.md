# Supe AI - Full Stack Application

A modern full-stack AI-powered company assistant built with Next.js, Express.js, and Google Gemini AI.

## 🌟 Features

- **Multilingual AI Chat**: Intelligent chatbot supporting English, Hindi, Tamil, and Malayalam
- **Time-Aware Greetings**: Context-aware responses based on time of day
- **Firebase Authentication**: Google Sign-In integration
- **Contact Management**: Email notifications and Google Sheets integration
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion
- **Secure**: Environment-based configuration with proper CORS setup

## 📁 Project Structure

```
supe1.4/
├── backend/                    # Express.js API server
│   ├── app.js                  # Main server file
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── chat.js            # Gemini AI chat integration
│   │   ├── contact.js         # Contact form handling
│   │   └── users.js           # User management
│   ├── config/
│   │   └── firebase.js        # Firebase Admin SDK setup
│   └── package.json
│
└── frontend/                   # Next.js application
    ├── src/
    │   ├── app/               # App router pages
    │   │   ├── page.js        # Home page
    │   │   ├── chat/          # Chat interface
    │   │   ├── contact/       # Contact page
    │   │   └── auth/          # Authentication pages
    │   └── contexts/
    │       └── AuthContext.js # Authentication context
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Firebase project setup
- Google Gemini API key
- Google Sheets API credentials (for contact form)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Gemini AI
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_DATABASE_URL=your_database_url
   
   # Alternatively, place your Firebase service account JSON file in the backend folder
   # Named: your-project-firebase-adminsdk-xxxxx.json
   
   # CORS Configuration
   ALLOWED_ORIGINS=http://localhost:3000,https://your-production-domain.com
   
   # Email Configuration (Nodemailer)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Google Sheets Integration
   GOOGLE_API_KEY=your_google_api_key
   GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
   GOOGLE_APPS_SCRIPT_URL=your_apps_script_url
   ```

4. Start the server:
   ```bash
   npm start
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   # Backend API
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   
   # Firebase Client SDK
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/google` - Google Sign-In
- `GET /auth/session` - Get current session
- `POST /auth/logout` - User logout

### Chat
- `POST /api/chat` - Send message to AI assistant
  - Supports multilingual conversations
  - Time-aware greetings
  - Company-focused responses only

### Contact
- `POST /api/contact` - Submit contact form
  - Sends email notification
  - Logs to Google Sheets

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /` - Server health check
- `GET /api/ping` - API ping test

## 🤖 AI Chat Features

The Gemini-powered chat assistant includes:

1. **Multilingual Support**: Automatically detects and responds in:
   - English
   - Hindi (हिंदी)
   - Tamil (தமிழ்)
   - Malayalam (മലയാളം)

2. **Context-Aware Responses**:
   - Time-based greetings (Good Morning/Afternoon/Evening)
   - Varied pleasantries ("How are you?" responses)

3. **Topic Restriction**:
   - Strictly answers questions about Supe AI services
   - Politely redirects off-topic queries

## 🔐 Security

- Environment variables for sensitive data
- Firebase service account keys excluded from Git
- CORS configuration for allowed origins
- Session-based authentication
- HTTP-only cookies

## 🛠️ Development

### Running Both Servers Concurrently

Backend:
```bash
cd backend && npm start
```

Frontend (in a new terminal):
```bash
cd frontend && npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
npm start
```

Backend:
```bash
cd backend
NODE_ENV=production npm start
```

## 📝 Environment Variables Reference

### Required Backend Variables
- `GEMINI_API_KEY` - Google Gemini API key
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

### Required Frontend Variables
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL
- `NEXT_PUBLIC_FIREBASE_API_KEY` - Firebase client API key
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Firebase project ID

## 🐛 Troubleshooting

### Backend won't start
- Check that `.env` file exists in `backend/` directory
- Verify `GEMINI_API_KEY` is set correctly
- Ensure Firebase credentials are properly configured

### Chat not working
- Verify Gemini API key is valid
- Check backend logs for error messages
- Ensure `ALLOWED_ORIGINS` includes your frontend URL

### Authentication issues
- Verify Firebase configuration in both frontend and backend
- Check that Firebase service account JSON is in the backend folder
- Ensure Firebase Authentication is enabled in Firebase Console

## 📄 License

This project is private and proprietary.

## 🤝 Support

For issues or questions, contact the development team.