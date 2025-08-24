# MockBot 🤖

A modern, AI-powered mock interview chatbot with an enhanced, sophisticated interface built with the MERN stack (MongoDB, Express, React, Node.js) and Gemini AI integration.

## ✨ Features

### 🎯 **Core Interview Features**
- **🤖 AI-Powered Interviews**: Practice with Gemini AI for realistic interview scenarios
- **🎯 Multiple Skill Areas**: Technical, Behavioral, Leadership, and Presentation skills
- **💾 Session Management**: Save and resume your interview sessions with smart recovery
- **📊 Progress Tracking**: Monitor your interview practice statistics and improvements

### 🎨 **Enhanced UI/UX**
- **📱 Modern Glassmorphic Design**: Sophisticated backdrop blur effects and transparency
- **🎭 Responsive Layout**: Optimized for all screen sizes with intelligent spacing
- **✨ Smooth Animations**: Subtle transitions, hover effects, and visual feedback
- **🎨 Clean Interface**: Streamlined design with efficient use of screen space
- **📱 Mobile-First Design**: Optimized experience across all devices

### 🎤 **Advanced Voice Features**
- **🎙️ Smart Voice Controls**: Consolidated voice input/output management
- **🎵 Voice-Only Mode**: Dedicated voice interaction for hands-free practice
- **🔊 Auto-Speak Toggle**: Control when MockBot reads responses aloud
- **⏯️ Speech Controls**: Play, pause, resume, and stop speech playback
- **🎯 Real-time Voice Input**: Live speech-to-text with visual feedback

### 📚 **Intelligent Learning**
- **💡 Pro Tips Section**: Contextual interview advice and best practices
- **🔄 Next Steps Actions**: Practice again, try harder questions, review tips
- **📄 Export Options**: Save sessions as PDF or JSON for review
- **🎓 Onboarding Tour**: Guided tour for new users with interactive elements

### 🔐 **Security & Management**
- **🔐 User Authentication**: Secure login and registration system
- **📊 Dashboard**: Personalized stats, achievements, and recent activity
- **💾 Data Export**: Download your interview sessions for offline review

## 🚀 Live Demo

- **Frontend**: [https://mock-bot-orcin.vercel.app](https://mock-bot-orcin.vercel.app)
- **Backend**: [https://mock-bot-kynz.onrender.com](https://mock-bot-kynz.onrender.com)

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
   cp env.template .env
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
2. Complete the onboarding tour with interactive tips
3. Select your preferred role/skill area
4. Start your first interview session

### Interview Practice
1. **Select a Skill**: Choose from Technical, Behavioral, Leadership, or Presentation
2. **Start Chatting**: The AI will ask relevant questions based on your skill area
3. **Use Voice Input**: Click the single microphone button for voice interaction
4. **Voice Controls**: Toggle between voice-only and mixed modes
5. **Save Progress**: Save your session to resume later
6. **Export Results**: Download your session as a PDF for review

### Advanced Features
- **Voice-Only Mode**: Switch to hands-free interview practice
- **Auto-Speak**: Control when MockBot reads responses aloud
- **Speech Controls**: Manage speech playback during interviews
- **Smart Tips**: Access contextual interview advice and best practices

### Session Management
- **View Sessions**: Check your saved sessions in the Sessions page
- **Resume Sessions**: Continue where you left off with smart recovery
- **Delete Sessions**: Remove sessions you no longer need
- **Track Progress**: Monitor your statistics and improvements in the Dashboard

## 🛠️ Technical Stack

### Frontend
- **React 18** - UI framework with modern hooks
- **Vite** - Build tool and dev server for fast development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Lucide React** - Beautiful, consistent icon set
- **React Router** - Client-side navigation
- **jsPDF** - PDF export functionality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework with middleware support
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - ODM for MongoDB
- **JWT** - Secure authentication tokens
- **Axios** - HTTP client for external API calls
- **Gemini AI** - Advanced AI integration for realistic interviews

### Key Technical Features
- **Glassmorphic Design** - Modern UI with backdrop blur effects and transparency
- **Responsive Layout** - Mobile-first design that works on all devices
- **Real-time Chat** - Smooth conversation flow with typing indicators
- **Error Handling** - Comprehensive error management and user feedback
- **Accessibility** - Keyboard navigation and screen reader support
- **Performance** - Optimized rendering and smooth animations

## 📁 Project Structure

```
MockBot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ChatInput.jsx      # Enhanced input with voice support
│   │   │   ├── ChatMessages.jsx   # Clean message display
│   │   │   ├── Header.jsx         # Navigation header
│   │   │   ├── Layout.jsx         # Main layout wrapper
│   │   │   └── OnboardingTour.jsx # User onboarding
│   │   ├── pages/         # Page components
│   │   │   ├── Chat.jsx           # Main interview interface
│   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   ├── LandingPage.jsx    # Welcome page
│   │   │   ├── Login.jsx          # Authentication
│   │   │   ├── Profile.jsx        # User profile
│   │   │   ├── Register.jsx       # User registration
│   │   │   ├── RoleSelector.jsx   # Role selection
│   │   │   └── Sessions.jsx       # Session history
│   │   ├── assets/        # Static assets and demo data
│   │   ├── App.jsx        # Main app component
│   │   ├── config.js      # API configuration
│   │   ├── index.css      # Global styles and custom classes
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   ├── tailwind.config.js # Tailwind configuration
│   └── vite.config.js     # Vite configuration
├── server/                # Backend Node.js application
│   ├── routes/           # API routes and endpoints
│   ├── models/           # Database models and schemas
│   ├── middleware/       # Custom middleware (auth, validation)
│   ├── utils/            # Utility functions (Cloudinary, etc.)
│   ├── index.js          # Server entry point
│   ├── package.json
│   └── env.template      # Environment variables template
└── README.md             # This file
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

### UI Styling & Components
- **Global Styles**: Modify `client/src/index.css` for custom CSS classes
- **Tailwind Classes**: Update utility classes in components
- **Color Scheme**: Customize colors and gradients in `tailwind.config.js`
- **Component Styling**: Modify individual component appearance

### Voice Features
- **Voice Controls**: Extend voice functionality in the voice controls section
- **Speech Settings**: Modify voice behavior and auto-speak options
- **Input Modes**: Customize voice-only and mixed mode behaviors

### AI Prompts
- **System Prompts**: Edit the system prompt in `server/routes/chat.js`
- **Response Styles**: Adjust generation parameters for different response styles
- **Skill Context**: Customize prompts for different interview skill areas

## 🚀 Recent Updates (v2.0)

### **UI Enhancement & Streamlining**
- ✅ **Streamlined Voice Controls**: Single microphone button for all voice interactions
- ✅ **Clean Message Layout**: Distinct styling for user and bot messages with proper alignment
- ✅ **Removed Redundancy**: Eliminated duplicate speaker icons and voice input buttons
- ✅ **Enhanced Visual Hierarchy**: Better spacing, consistent styling, and improved readability
- ✅ **Responsive Design**: Optimal content width (`max-w-4xl`) for better user experience
- ✅ **Custom CSS Classes**: Added utility classes for consistent styling across components

### **Voice Interface Improvements**
- ✅ **Consolidated Controls**: Single voice input button with smart mode toggles
- ✅ **Voice-Only Mode**: Dedicated hands-free interview practice experience
- ✅ **Auto-Speak Toggle**: User control over when MockBot reads responses
- ✅ **Speech Playback Controls**: Play, pause, resume, and stop functionality
- ✅ **Status Indicators**: Clear visual feedback for all voice states

### **Layout & Spacing Optimization**
- ✅ **Efficient Spacing**: Consistent spacing using custom Tailwind utilities
- ✅ **Message Alignment**: User messages right-aligned, bot messages left-aligned
- ✅ **Content Containment**: Proper width constraints to prevent over-stretching
- ✅ **Visual Balance**: Improved proportions and component relationships

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

4. **Voice features not working**
   - Check browser permissions for microphone access
   - Ensure HTTPS in production (required for voice features)
   - Verify speech recognition API support

5. **Session not saving**
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

### Development Guidelines
- Follow the existing code style and structure
- Test voice features thoroughly
- Ensure responsive design works on all screen sizes
- Maintain accessibility standards

## 🙏 Acknowledgments

- **Google Gemini AI** for providing advanced AI capabilities
- **Lucide** for the beautiful, consistent icon set
- **Tailwind CSS** for the utility-first styling framework
- **The React and Node.js communities** for excellent tooling and support

---

**Happy Interviewing! 🎉** 

---

## 🛠️ Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com) with automatic deployments
- **Backend**: Deployed on [Render](https://render.com) with health monitoring

## 🌐 Environment Variables

See `env.template` in the server folder for required variables and configuration options. 