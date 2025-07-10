import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Play, Zap, Target, Users, ChevronRight, Star, CheckCircle, ArrowRight, Menu, X, Layers, MessageCircle, BookOpen, User, LogOut } from 'lucide-react';
import OnboardingTour from '../components/OnboardingTour';
import Lottie from 'lottie-react';
import chatDemoAnimation from '../assets/chat-demo.json';
import { Typewriter } from 'react-simple-typewriter';

const navLinks = [
  { name: 'Home', to: '/', icon: null },
  { name: 'Dashboard', to: '/dashboard', icon: Layers },
  { name: 'Chat', to: '/chat', icon: MessageCircle },
  { name: 'Sessions', to: '/sessions', icon: BookOpen },
];

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [robotEyes, setRobotEyes] = useState({ x: 0, y: 0 });
  const [robotExpression, setRobotExpression] = useState('happy');
  const [floatingElements, setFloatingElements] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Robot eye tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyeX = (e.clientX - window.innerWidth / 2) / 100;
      const eyeY = (e.clientY - window.innerHeight / 2) / 100;
      setRobotEyes({ x: eyeX, y: eyeY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Robot expression changes
  useEffect(() => {
    const expressions = ['happy', 'excited', 'thinking', 'winking'];
    const interval = setInterval(() => {
      setRobotExpression(expressions[Math.floor(Math.random() * expressions.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Floating elements animation
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: ['cyan', 'purple', 'pink', 'blue'][Math.floor(Math.random() * 4)]
    }));
    setFloatingElements(elements);
    const animateElements = () => {
      setFloatingElements(prev => prev.map(el => ({
        ...el,
        y: el.y <= -10 ? 110 : el.y - el.speed,
        rotation: el.rotation + el.rotationSpeed
      })));
    };
    const timer = setInterval(animateElements, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowOnboarding(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute w-4 h-4 opacity-20`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `rotate(${element.rotation}deg) scale(${element.size / 20})`,
            transition: 'all 0.05s linear'
          }}
        >
          <div className={`w-full h-full bg-gradient-to-r from-${element.color}-400 to-${element.color}-600 rounded-full shadow-lg`}></div>
        </div>
      ))}
    </div>
  );

  const features = [
    {
      icon: Target,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your responses and provide personalized feedback',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Real Interview Scenarios',
      description: 'Practice with realistic questions from top companies and industries',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get immediate insights on your performance and areas for improvement',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Star,
      title: 'Progress Tracking',
      description: 'Monitor your improvement over time with detailed analytics',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Interviews Practiced', color: 'text-cyan-400' },
    { number: '95%', label: 'Success Rate', color: 'text-green-400' },
    { number: '24/7', label: 'AI Availability', color: 'text-purple-400' },
    { number: '500+', label: 'Companies', color: 'text-pink-400' }
  ];

  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <FloatingElements />
        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex items-center pt-24">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300 text-sm">AI-Powered Interview Coach</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  <span className="inline-block w-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Ace Your Next Interview
                  </span>
                </h1>
                <p className="mt-4 text-2xl md:text-3xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent min-h-[2.5rem]">
                  <Typewriter
                    words={[
                      'Practice. Improve. Succeed.',
                      'Technical, Behavioral, Leadership, and More!',
                      'AI-Powered Feedback Instantly.',
                      'Boost Your Confidence for Any Role.'
                    ]}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={25}
                    deleteSpeed={18}
                    delaySpeed={900}
                  />
                </p>
                <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                  Transform your interview skills with our advanced AI coach. Get personalized feedback, 
                  practice with realistic scenarios, and boost your confidence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/chat" className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                    <span className="flex items-center gap-2">
                      Start Practicing
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <button
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20"
                    onClick={() => setShowOnboarding(true)}
                  >
                    <span className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </span>
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="w-80 md:w-[420px] lg:w-[520px] h-80 md:h-[420px] lg:h-[520px] mx-auto">
                  <Lottie animationData={chatDemoAnimation} style={{ width: '100%', height: '100%' }} loop={true} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all transform hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Our AI-powered platform provides everything you need to excel in your interviews
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all transform hover:scale-105 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
                Ready to Transform Your Interview Skills?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of successful candidates who've improved their interview performance with our AI coach
              </p>
              <Link to="/chat" className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                Start Your Journey Today
              </Link>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.1" />
                  <path d="M10 22c0-3.313 2.687-6 6-6s6 2.687 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="16" cy="13" r="3" fill="#fff" fillOpacity="0.7" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">MockBot</span>
            </div>
            <p className="text-gray-400">© 2024 MockBot. All rights reserved.</p>
          </div>
        </footer>
        {showOnboarding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <OnboardingTour onComplete={() => setShowOnboarding(false)} />
          </div>
        )}
      </div>
    );
  }

  // Placeholder for app/interview mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-80 md:w-[420px] lg:w-[520px] h-80 md:h-[420px] lg:h-[520px] mx-auto">
            <Lottie animationData={chatDemoAnimation} style={{ width: '100%', height: '100%' }} loop={true} />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Interview Practice Mode</h2>
        <p className="text-gray-400 mb-8">This is where the interview application would be loaded</p>
        <button 
          onClick={() => setCurrentPage('landing')}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
        >
          Back to Landing
        </button>
      </div>
    </div>
  );
};

export default LandingPage; 