# MockBot 🤖

A modern, AI-powered mock interview chatbot built with the MERN stack (MongoDB, Express, React, Node.js) and Gemini AI integration.

## ✨ Features

- **🤖 AI-Powered Interviews**: Practice with Gemini AI for realistic interview scenarios
- **🎯 Multiple Skill Areas**: Technical, Behavioral, Leadership, and Presentation skills
- **💾 Session Management**: Save and resume your interview sessions
- **📱 Modern UI/UX**: Beautiful glassmorphic design with smooth animations
- **🎤 Voice Input**: Speak your answers using browser speech recognition
- **📄 Export to PDF**: Download your interview sessions for review
- **📊 Progress Tracking**: Monitor your interview practice statistics
- **🎓 Onboarding Tour**: Guided tour for new users
- **🔐 User Authentication**: Secure login and registration system

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MockBot
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In the server directory, create a .env file
   cd ../server
   cp env.example .env
   ```

   Edit the `.env` file with your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/mockbot
   JWT_SECRET=your_jwt_secret_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

4. **Get Gemini AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the client**
   ```bash
   cd client
   npm run dev
   ```

3. **Test the API**
   ```bash
   cd server
   node test-api.js
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🎯 Usage Guide

### First Time Setup
1. Register a new account
2. Complete the onboarding tour
3. Select your preferred role/skill area
4. Start your first interview session

### Interview Practice
1. **Select a Skill**: Choose from Technical, Behavioral, Leadership, or Presentation
2. **Start Chatting**: The AI will ask relevant questions based on your skill area
3. **Use Voice Input**: Click the microphone button to speak your answers
4. **Save Progress**: Save your session to resume later
5. **Export Results**: Download your session as a PDF for review

### Session Management
- **View Sessions**: Check your saved sessions in the Sessions page
- **Resume Sessions**: Continue where you left off
- **Delete Sessions**: Remove sessions you no longer need
- **Track Progress**: Monitor your statistics in the Dashboard

## 🛠️ Technical Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Router** - Navigation
- **jsPDF** - PDF export

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Axios** - HTTP client
- **Gemini AI** - AI integration

### Key Features
- **Glassmorphic Design** - Modern UI with backdrop blur effects
- **Responsive Layout** - Works on desktop and mobile
- **Real-time Chat** - Smooth conversation flow
- **Error Handling** - Comprehensive error management
- **Accessibility** - Keyboard navigation and screen reader support

## 📁 Project Structure

```
MockBot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Static assets
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Node.js application
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Custom middleware
│   ├── index.js          # Server entry point
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `PORT` | Server port (default: 5000) | No |

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/chat` - Chat with AI
- `GET /api/sessions` - Get user sessions
- `POST /api/sessions` - Save session
- `GET /api/health` - Health check

## 🎨 Customization

### Adding New Skill Areas
1. Update the `skills` array in `client/src/pages/Chat.jsx`
2. Add corresponding prompts in `server/routes/chat.js`
3. Update skill mapping in session management

### Styling
- Modify `client/src/index.css` for global styles
- Update Tailwind classes in components
- Customize color scheme in `tailwind.config.js`

### AI Prompts
- Edit the system prompt in `server/routes/chat.js`
- Adjust generation parameters for different response styles

## 🐛 Troubleshooting

### Common Issues

1. **AI not responding**
   - Check if `GEMINI_API_KEY` is set correctly
   - Verify API key has proper permissions
   - Check server logs for error messages

2. **Database connection issues**
   - Ensure MongoDB is running
   - Verify `MONGO_URI` is correct
   - Check network connectivity

3. **Frontend not loading**
   - Ensure both server and client are running
   - Check browser console for errors
   - Verify port configurations

4. **Session not saving**
   - Check browser localStorage permissions
   - Verify session data structure
   - Check for JavaScript errors

### Debug Mode
Run the API test script to verify all endpoints:
```bash
cd server
node test-api.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Lucide for the beautiful icons
- Tailwind CSS for the styling framework
- The React and Node.js communities

---

**Happy Interviewing! 🎉** 