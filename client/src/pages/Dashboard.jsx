import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { User, Play, Target, History, TrendingUp, BookOpen, Layers, Sparkles, Award, ChevronRight, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadUserStats(),
        loadUserInfo(),
        loadRecentSessions()
      ]);
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to view your stats');
        return;
      }

      const response = await fetch(API_ENDPOINTS.SESSIONS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // If token is invalid, clear it and redirect to login
        if (response.status === 401 && errorData.error === 'Invalid token') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Session expired. Please log in again.');
          window.location.href = '/login';
          return;
        }
        
        throw new Error(errorData.error || 'Failed to fetch sessions');
      }

      const data = await response.json();
      const sessions = data.sessions || [];
      
      const totalMessages = sessions.reduce((sum, session) => sum + (session.messages?.length || 0), 0);
      const skillsPracticed = [...new Set(sessions.map(s => s.role).filter(Boolean))];
      const rolesPracticed = [...new Set(sessions.map(s => s.role).filter(Boolean))];
      const lastActive = sessions.length > 0 ? new Date(Math.max(...sessions.map(s => new Date(s.createdAt || 0)))) : null;
      
      // Simple streak logic: count unique days with sessions
      const days = new Set(sessions.map(s => new Date(s.createdAt).toDateString()));
      
      setUserStats({
        totalSessions: sessions.length,
        totalMessages,
        averageSessionLength: sessions.length > 0 ? Math.round(totalMessages / sessions.length) : 0,
        lastActive,
        skillsPracticed,
        rolesPracticed,
        streak: days.size
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
      toast.error('Failed to load user statistics');
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

  const loadRecentSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setRecentSessions([]);
        return;
      }

      const response = await fetch(API_ENDPOINTS.SESSIONS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }

      const data = await response.json();
      const sessions = data.sessions || [];
      
      // Sort by createdAt descending and take the first 5
      const sorted = [...sessions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentSessions(sorted.slice(0, 5));
    } catch (error) {
      console.error('Error loading recent sessions:', error);
      setRecentSessions([]);
    }
  };

  const handleStartSkillPractice = () => {
    window.location.href = '/chat';
  };
  
  const handleStartRolePractice = () => {
    window.location.href = '/role-selector';
  };
  
  const handleResumeSession = (session) => {
    // Convert server session format to client format
    const clientSession = {
      id: session._id,
      skill: session.role,
      messages: session.messages.map(msg => ({
        id: msg._id || Date.now(),
        type: msg.sender === 'user' ? 'user' : 'bot',
        content: msg.text,
        timestamp: new Date(msg.timestamp).toISOString()
      })),
      timestamp: new Date(session.createdAt).toISOString()
    };
    
    localStorage.setItem('mockbot-resume-session', JSON.stringify(clientSession));
    window.location.href = '/chat';
  };

  const handleCopyAchievement = () => {
    const text = "I unlocked the Rising Star badge on MockBot! 🚀 Try it yourself at https://your-app-url.com";
    navigator.clipboard.writeText(text);
    toast.success("Achievement copied to clipboard!");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in p-4">
          <div className="glass bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-4xl w-full border border-white/10">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Layers className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Loading Dashboard...</h3>
              <p className="text-gray-400">Please wait while we fetch your interview data.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in p-4">
        <div className="glass bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-4xl w-full border border-white/10">
          {/* User Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {userInfo.name}!</h1>
                <p className="text-gray-400">{userInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={handleStartSkillPractice}
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all interactive"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Practice Skills</h3>
                <p className="text-gray-400 text-sm">Start a skill-based interview</p>
              </div>
            </button>

            <button
              onClick={handleStartRolePractice}
              className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all interactive"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Role Practice</h3>
                <p className="text-gray-400 text-sm">Practice for specific roles</p>
              </div>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-400">Sessions</span>
              </div>
              <div className="text-2xl font-bold text-white">{userStats.totalSessions}</div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">Messages</span>
              </div>
              <div className="text-2xl font-bold text-white">{userStats.totalMessages}</div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Streak</span>
              </div>
              <div className="text-2xl font-bold text-white">{userStats.streak}</div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-400">Skills</span>
              </div>
              <div className="text-2xl font-bold text-white">{userStats.skillsPracticed.length}</div>
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
                  <div key={session._id} className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                    <div>
                      <div className="font-semibold text-white">Session {recentSessions.length - idx}</div>
                      <div className="text-xs text-gray-400">{new Date(session.createdAt).toLocaleString()}</div>
                      <div className="text-xs text-cyan-300 mt-1">{session.role ? `Role: ${session.role}` : ''}</div>
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
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Achievement Unlocked!</h3>
              </div>
              <p className="text-gray-300 mb-4">Rising Star - You've completed your first interview session!</p>
              <button
                onClick={handleCopyAchievement}
                className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 rounded-xl transition-all text-sm"
              >
                Share Achievement
              </button>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-white">Pro Tips</h3>
              </div>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Practice regularly to improve your skills</li>
                <li>• Review your sessions to identify areas for improvement</li>
                <li>• Try different interview styles and questions</li>
                <li>• Use voice mode for more realistic practice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 