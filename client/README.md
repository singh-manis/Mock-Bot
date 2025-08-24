# MockBot Client (Vite + React)

This is the frontend for **MockBot** — an AI-powered mock interview chatbot with an enhanced, modern interface. Built with **Vite** and **React**, it features a sophisticated glassmorphic UI, advanced voice controls, intelligent interview practice, and a streamlined user experience.

## ✨ Key Features

### 🎯 **Interview Practice**
- **Skill-based Practice**: Technical, Behavioral, Leadership, and Presentation skills
- **Role-based Interviews**: Customized questions for specific job roles
- **Adaptive Difficulty**: Progressive question complexity based on performance
- **Session Management**: Resume previous sessions or start fresh

### 🎨 **Enhanced UI/UX**
- **Modern Glassmorphism**: Sophisticated backdrop blur effects and transparency
- **Responsive Design**: Optimized for all screen sizes with intelligent spacing
- **Clean Layout**: Streamlined interface with efficient use of screen space
- **Visual Hierarchy**: Clear distinction between different UI elements
- **Smooth Animations**: Subtle transitions and hover effects

### 🎤 **Advanced Voice Features**
- **Smart Voice Controls**: Consolidated voice input/output management
- **Voice-Only Mode**: Dedicated voice interaction for hands-free practice
- **Auto-Speak Toggle**: Control when MockBot reads responses aloud
- **Speech Controls**: Play, pause, resume, and stop speech playback
- **Real-time Voice Input**: Live speech-to-text with visual feedback

### 📊 **Intelligent Feedback**
- **Next Steps Actions**: Practice again, try harder questions, review tips
- **Pro Tips Section**: Contextual interview advice and best practices
- **Performance Tracking**: Session history and improvement metrics
- **Export Options**: Save sessions as PDF or JSON for review

### 🔧 **Technical Excellence**
- **Tailwind CSS**: Utility-first styling with custom design system
- **Component Architecture**: Modular, reusable React components
- **State Management**: Efficient React hooks and state handling
- **Performance Optimized**: Smooth animations and responsive interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- The MockBot backend running (see main README)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Project Structure
```
client/
├── public/
│   └── vite.svg         # Bot favicon/icon
├── src/
│   ├── assets/          # Images, Lottie files, demo data
│   ├── components/      # Reusable UI components
│   │   ├── ChatInput.jsx      # Enhanced input with voice support
│   │   ├── ChatMessages.jsx   # Clean message display
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Layout.jsx         # Main layout wrapper
│   │   └── OnboardingTour.jsx # User onboarding
│   ├── pages/           # App pages
│   │   ├── Chat.jsx           # Main interview interface
│   │   ├── Dashboard.jsx      # User dashboard
│   │   ├── LandingPage.jsx    # Welcome page
│   │   ├── Login.jsx          # Authentication
│   │   ├── Profile.jsx        # User profile
│   │   ├── Register.jsx       # User registration
│   │   ├── RoleSelector.jsx   # Role selection
│   │   └── Sessions.jsx       # Session history
│   ├── App.jsx          # Main app component
│   ├── config.js        # API configuration
│   ├── index.css        # Global styles and custom classes
│   └── main.jsx         # Entry point
├── index.html
├── tailwind.config.js
├── package.json
└── vite.config.js
```

## 🎨 **UI Improvements & Features**

### **Enhanced Message System**
- **Clean Message Bubbles**: Distinct styling for user and bot messages
- **Smart Alignment**: User messages right-aligned, bot messages left-aligned
- **Voice Controls**: Integrated speech controls within message context
- **Action Buttons**: Quick access to practice again, harder questions, and tips

### **Streamlined Voice Interface**
- **Single Voice Button**: Consolidated microphone input for all voice interactions
- **Mode Toggles**: Easy switching between voice-only and mixed modes
- **Status Indicators**: Clear visual feedback for listening, speaking, and thinking states
- **Smart Controls**: Context-aware voice controls that appear when needed

### **Responsive Layout**
- **Optimal Width**: Content properly contained with `max-w-4xl` for readability
- **Efficient Spacing**: Consistent spacing using custom Tailwind utilities
- **Mobile-First**: Responsive design that works on all devices
- **Visual Balance**: Proper proportions and visual hierarchy

### **Custom CSS Classes**
- **`.voice-controls-clean`**: Streamlined voice control styling
- **`.input-clean`**: Enhanced input field appearance
- **`.btn-clean`**: Consistent button styling
- **`.message-bubble.bot/user`**: Distinct message styling
- **`.card-clean`**: Enhanced card components

## 🔗 Full-Stack Setup
For backend/API setup, environment variables, and deployment, see the main [README.md](../README.md) in the project root.

## 📦 Build for Production
```bash
npm run build
```
The output will be in the `dist/` folder.

## 🧩 Customization

### **Styling & Theme**
- **Colors & Gradients**: Update in `tailwind.config.js`
- **Custom Classes**: Add new utilities in `src/index.css`
- **Component Styles**: Modify individual component styling

### **Features & Components**
- **New Interview Skills**: Add to skills array in `Chat.jsx`
- **Voice Controls**: Extend voice functionality in voice controls section
- **UI Elements**: Add new components in `src/components/`

### **Configuration**
- **API Endpoints**: Update in `src/config.js`
- **Voice Settings**: Modify voice behavior in voice controls
- **Session Management**: Customize session handling logic

## 🚀 **Recent Updates**

### **v2.0 UI Enhancement**
- ✅ Streamlined voice controls with single microphone button
- ✅ Removed redundant speaker icons from messages
- ✅ Improved message alignment and spacing
- ✅ Enhanced visual hierarchy and clean design
- ✅ Better responsive layout with optimal content width
- ✅ Consolidated voice input options
- ✅ Added custom CSS classes for consistent styling

---

For issues, contributions, or feature requests, see the main project repository.
