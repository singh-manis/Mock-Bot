# MockBot Client (Vite + React)

This is the frontend for **MockBot** — an AI-powered mock interview chatbot. Built with **Vite** and **React**, it features a modern glassmorphic UI, voice input/output, onboarding tour, export/share, and more.

## ✨ Key Features
- Modern, glassmorphic design with Tailwind CSS
- Role-based and skill-based interview practice
- Voice input (speech-to-text) and voice output (text-to-speech)
- Onboarding tour with Lottie animation and pro tips
- Dashboard with personalized stats, achievements, and recent activity
- Export chat sessions as PDF/JSON, share achievements
- Actionable AI feedback with "Next Steps" buttons
- Responsive and accessible UI

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
│   ├── assets/         # Images, Lottie files
│   ├── components/     # Reusable UI components
│   ├── pages/          # App pages (Chat, Dashboard, etc.)
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html
├── tailwind.config.js
├── package.json
└── vite.config.js
```

## 🔗 Full-Stack Setup
For backend/API setup, environment variables, and deployment, see the main [README.md](../README.md) in the project root.

## 📦 Build for Production
```bash
npm run build
```
The output will be in the `dist/` folder.

## 🧩 Customization
- Update theme/colors: `tailwind.config.js`
- Change logo/icon: `public/vite.svg`
- Add new pages/components: `src/pages/`, `src/components/`

---

For issues or contributions, see the main project repository.
