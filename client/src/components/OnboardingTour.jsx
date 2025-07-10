import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, MessageCircle, Save, Download, User, Home, Award, Play, Target } from 'lucide-react';
import Lottie from 'lottie-react';
import chatDemoAnimation from "../assets/chat-demo.json";

const OnboardingTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to MockBot! 🎉',
      description: 'Your AI-powered interview coach is here to help you ace your next interview. Let\'s take a quick tour!',
      icon: Sparkles,
      position: 'center'
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Track your progress, see stats, and quick start your next session.',
      icon: Home,
      position: 'top',
      target: 'dashboard'
    },
    {
      id: 'chat',
      title: 'Practice Interviews',
      description: 'Practice with AI. Choose a skill or a role and get instant feedback.',
      icon: MessageCircle,
      position: 'center',
      target: 'chat-save'
    },
    {
      id: 'sessions',
      title: 'Save & Resume',
      description: 'Review, resume, or export your past interviews.',
      icon: Save,
      position: 'center',
      target: 'chat-save'
    },
    {
      id: 'profile',
      title: 'Profile & Achievements',
      description: 'Manage your info and earn badges for your progress.',
      icon: User,
      position: 'center'
    },
    // Animated Demo Step
    {
      id: 'demo',
      title: 'See MockBot in Action!',
      description: 'Here\'s how a typical mock interview session looks. Type your answer, get instant AI feedback, and save your progress!',
      icon: MessageCircle,
      position: 'center',
      demo: true
    },
    // Pro Tips & Quick Start
    {
      id: 'tips',
      title: 'Pro Tips & Quick Start',
      description: 'Practice daily to build your streak and unlock achievements! Ready to begin?',
      icon: Award,
      position: 'center',
      quickStart: true
    }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      if (onComplete) onComplete();
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  const handleClose = () => {
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  const handleQuickStartSkill = () => {
    window.location.href = '/chat';
  };
  const handleQuickStartRole = () => {
    window.location.href = '/role-selector';
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
      <div className="bg-gradient-to-br from-cyan-900/80 to-blue-900/80 rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-white/10 relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-white/70 hover:text-red-400 transition-colors">
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            {step.icon && React.createElement(step.icon, { className: 'w-8 h-8 text-white' })}
          </div>
          <h2 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {step.title}
          </h2>
          <p className="text-gray-300 mb-4">{step.description}</p>

          {/* Animated Demo Step */}
          {step.demo && (
            <div className="w-full flex flex-col items-center mb-4">
              <Lottie animationData={chatDemoAnimation} style={{ width: 220, height: 220 }} loop={true} />
              <div className="text-xs text-cyan-200 mt-2">Watch how easy it is to practice with MockBot!</div>
            </div>
          )}

          {/* Pro Tips & Quick Start Step */}
          {step.quickStart && (
            <div className="w-full flex flex-col items-center gap-4 mt-4">
              <div className="bg-white/10 rounded-xl p-4 mb-2">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-1">
                  <Sparkles className="w-4 h-4" /> Pro Tip
                </div>
                <div className="text-sm text-gray-200">Practice out loud, record your answers, and review them to improve your delivery and confidence.</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 mb-2 flex flex-col items-center">
                <Award className="w-6 h-6 text-yellow-400 mb-1" />
                <div className="text-sm text-yellow-200 font-semibold">Achievement Unlocked</div>
                <div className="text-xs text-gray-200">Complete 5 sessions to earn the <span className="font-bold text-yellow-300">Rising Star</span> badge!</div>
              </div>
              <div className="flex gap-4 mt-2">
                <button onClick={handleQuickStartSkill} className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg">
                  <Play className="w-5 h-5" /> Start Skill Practice
                </button>
                <button onClick={handleQuickStartRole} className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
                  <Target className="w-5 h-5" /> Start Role Practice
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-8">
          <button onClick={handlePrev} disabled={currentStep === 0} className="px-4 py-2 rounded-xl bg-white/10 text-white/70 hover:bg-cyan-500/20 transition-all disabled:opacity-40">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all">
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-5 h-5 inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour; 