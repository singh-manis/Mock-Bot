import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, Play, Target, History, TrendingUp, BookOpen, Layers, Sparkles, Award, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    totalSessions: 0,
    totalMessages: 0,
    averageSessionLength: 0,
    lastActive: null,
    skillsPracticed: [],
    rolesPracticed: [],
    streak: 0
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: 'Interview Pro',
    email: 'user@example.com'
  });

  useEffect(() => {
    loadUserStats();
    loadUserInfo();
    loadRecentSessions();
  }, []);

  const loadUserStats = () => {
    const sessions = localStorage.getItem('mockbot-sessions');
    if (sessions) {
      try {
        const parsedSessions = JSON.parse(sessions);
        const sessionsArray = Array.isArray(parsedSessions) ? parsedSessions : [parsedSessions];
        const totalMessages = sessionsArray.reduce((sum, session) => sum + (session.messages?.length || 0), 0);
        const skillsPracticed = [...new Set(sessionsArray.map(s => s.skill).filter(Boolean))];
        const rolesPracticed = [...new Set(sessionsArray.map(s => s.role).filter(Boolean))];
        const lastActive = sessionsArray.length > 0 ? new Date(Math.max(...sessionsArray.map(s => new Date(s.timestamp || 0)))) : null;
        // Simple streak logic: count unique days with sessions
        const days = new Set(sessionsArray.map(s => new Date(s.timestamp).toDateString()));
        setUserStats({
          totalSessions: sessionsArray.length,
          totalMessages,
          averageSessionLength: sessionsArray.length > 0 ? Math.round(totalMessages / sessionsArray.length) : 0,
          lastActive,
          skillsPracticed,
          rolesPracticed,
          streak: days.size
        });
      } catch (error) {
        console.error('Error loading user stats:', error);
      }
    }
  };

  const loadUserInfo = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserInfo({
          name: userData.name || 'Interview Pro',
          email: userData.email || 'user@example.com'
        });
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    }
  };

  const loadRecentSessions = () => {
    const sessions = localStorage.getItem('mockbot-sessions');
    if (sessions) {
      try {
        const parsedSessions = JSON.parse(sessions);
        const sessionsArray = Array.isArray(parsedSessions) ? parsedSessions : [parsedSessions];
        // Sort by timestamp descending
        const sorted = [...sessionsArray].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setRecentSessions(sorted.slice(0, 5));
      } catch (error) {
        setRecentSessions([]);
      }
    }
  };

  const handleStartSkillPractice = () => {
    window.location.href = '/chat';
  };
  const handleStartRolePractice = () => {
    window.location.href = '/role-selector';
  };
  const handleResumeSession = (session) => {
    localStorage.setItem('mockbot-resume-session', JSON.stringify(session));
    window.location.href = '/chat';
  };

  const handleCopyAchievement = () => {
    const text = "I unlocked the Rising Star badge on MockBot! 🚀 Try it yourself at https://your-app-url.com";
    navigator.clipboard.writeText(text);
    toast.success("Achievement copied to clipboard!");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in p-4">
        <div className="glass bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-5xl w-full border border-white/10">
          {/* Personalized Welcome */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-1 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Welcome back, {userInfo.name}!
              </h1>
              <p className="text-gray-400 text-sm">{userInfo.email}</p>
              <p className="text-cyan-300 text-sm mt-2">Ready to ace your next interview? 🚀</p>
            </div>
            {/* Quick Actions */}
            <div className="flex flex-col gap-3 items-center md:items-end">
              <button onClick={handleStartSkillPractice} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg">
                <Play className="w-5 h-5" /> Start Skill Practice
              </button>
              <button onClick={handleStartRolePractice} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
                <Target className="w-5 h-5" /> Start Role Practice
              </button>
              {recentSessions.length > 0 && (
                <button onClick={() => handleResumeSession(recentSessions[0])} className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-cyan-500/20 text-white rounded-xl font-semibold transition-all shadow-lg">
                  <History className="w-5 h-5" /> Resume Last Session
                </button>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center">
              <TrendingUp className="w-8 h-8 text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{userStats.totalSessions}</div>
              <div className="text-xs text-gray-400">Sessions</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center">
              <BookOpen className="w-8 h-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{userStats.totalMessages}</div>
              <div className="text-xs text-gray-400">Questions Answered</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center">
              <Layers className="w-8 h-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{userStats.skillsPracticed.length}</div>
              <div className="text-xs text-gray-400">Skills Practiced</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center">
              <Award className="w-8 h-8 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{userStats.streak}</div>
              <div className="text-xs text-gray-400">Practice Streak (days)</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              Recent Sessions
            </h3>
            {recentSessions.length === 0 ? (
              <div className="text-gray-400 text-center">No recent sessions yet. Start practicing to see your progress!</div>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session, idx) => (
                  <div key={session.id} className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                    <div>
                      <div className="font-semibold text-white">Session {recentSessions.length - idx}</div>
                      <div className="text-xs text-gray-400">{new Date(session.timestamp).toLocaleString()}</div>
                      <div className="text-xs text-cyan-300 mt-1">{session.skill ? `Skill: ${session.skill}` : session.role ? `Role: ${session.role}` : ''}</div>
                    </div>
                    <button onClick={() => handleResumeSession(session)} className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all">
                      <ChevronRight className="w-4 h-4" /> Resume
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center">
              <Sparkles className="w-8 h-8 text-cyan-300 mb-2" />
              <div className="text-lg font-bold text-cyan-300 mb-2">Pro Interview Tip</div>
              <div className="text-sm text-gray-300 text-center">Practice out loud, record your answers, and review them to improve your delivery and confidence.</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center">
              <Award className="w-8 h-8 text-yellow-400 mb-2" />
              <div className="text-lg font-bold text-yellow-400 mb-2">Achievement Unlocked</div>
              <div className="text-sm text-gray-300 text-center">
                Complete 5 sessions to earn the <span className="font-semibold text-yellow-300">Rising Star</span> badge!
              </div>
              <button
                onClick={handleCopyAchievement}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all"
              >
                Copy Achievement
              </button>
              <button
                onClick={() => {
                  const text = encodeURIComponent("I unlocked the Rising Star badge on MockBot! 🚀 Try it yourself at https://your-app-url.com");
                  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://your-app-url.com')}&summary=${text}`;
                  window.open(url, "_blank");
                }}
                className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all"
              >
                Share on LinkedIn
              </button>
              <button
                onClick={() => {
                  const text = encodeURIComponent("I unlocked the Rising Star badge on MockBot! 🚀 Try it yourself at https://your-app-url.com");
                  const url = `https://wa.me/?text=${text}`;
                  window.open(url, "_blank");
                }}
                className="mt-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-green-700 transition-all"
              >
                Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 