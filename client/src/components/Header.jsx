import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, MessageCircle, Home, Layers, BookOpen, Target } from "lucide-react";

const navLinks = [
  { name: "Home", to: "/", icon: Home },
  { name: "Dashboard", to: "/dashboard", icon: Layers },
  { name: "Chat", to: "/chat", icon: MessageCircle },
  { name: "Sessions", to: "/sessions", icon: BookOpen },
  { name: "Roles", to: "/role-selector", icon: Target },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear all session-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("mockbot-sessions");
    localStorage.removeItem("mockbot-session");
    localStorage.removeItem("mockbot-resume-session");
    localStorage.removeItem("selectedRole");
    
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 backdrop-blur bg-black/60 shadow-lg px-4 md:px-8 py-2 flex items-center justify-between rounded-b-2xl">
      {/* Logo and Brand */}
      <Link to="/" className="flex items-center gap-3 group" id="navbar-logo">
        {/* SVG Logo */}
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.1" />
            <path d="M10 22c0-3.313 2.687-6 6-6s6 2.687 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="13" r="3" fill="#fff" fillOpacity="0.7" />
          </svg>
        </span>
        <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
          MockBot
        </span>
      </Link>
      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map(({ name, to, icon: Icon }) => (
          <Link
            key={name}
            to={to}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-white/80 hover:text-cyan-300 hover:bg-white/10 transition-colors font-medium ${location.pathname === to ? 'text-cyan-400 bg-white/10' : ''}`}
            id={name === 'Chat' ? 'navbar-chat' : name === 'Sessions' ? 'navbar-sessions' : undefined}
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
      {/* Profile & Logout */}
      <div className="flex items-center gap-2">
        <Link to="/profile" id="navbar-profile" className={`p-2 rounded-full transition-colors ${location.pathname === '/profile' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/10 hover:bg-cyan-500/20 text-white'}`}>
          <User className="w-6 h-6" />
        </Link>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 transition-colors"
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-white" />
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </header>
  );
} 