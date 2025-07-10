import React from 'react';
import Header from './Header';
import OnboardingTour from './OnboardingTour';

// FloatingElements animation logic (reuse from LandingPage)
import { useState, useEffect } from 'react';

const FloatingElements = () => {
  const [floatingElements, setFloatingElements] = useState([]);
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
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
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
};

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    {/* <OnboardingTour /> Removed to prevent showing on all pages */}
    <FloatingElements />
    <Header />
    <main className="relative z-10 pt-24 pb-8 px-4 md:px-8">
      {children}
    </main>
  </div>
);

export default Layout; 