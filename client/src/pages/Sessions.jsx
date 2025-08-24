import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { RotateCcw, Trash2, Plus, MessageCircle, Calendar, Clock, TrendingUp } from 'lucide-react';
import { API_ENDPOINTS } from '../config';
import { toast } from 'react-toastify';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please log in to view your sessions');
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
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast.error('Failed to load sessions');
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResume = (session) => {
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

  const handleDelete = (session) => {
    setSessionToDelete(session);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!sessionToDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.SESSIONS}/${sessionToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete session');
      }

      // Remove from local state
      setSessions(prev => prev.filter(s => s._id !== sessionToDelete._id));
      toast.success('Session deleted successfully');
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session');
    } finally {
      setShowConfirm(false);
      setSessionToDelete(null);
    }
  };

  const getSkillName = (skillId) => {
    const skillMap = {
      'technical': 'Technical Skills',
      'behavioral': 'Behavioral Questions',
      'leadership': 'Leadership & Management',
      'presentation': 'Presentation Skills'
    };
    return skillMap[skillId] || skillId;
  };

  const getSessionStats = (session) => {
    const userMessages = session.messages?.filter(m => m.sender === 'user') || [];
    const botMessages = session.messages?.filter(m => m.sender === 'bot') || [];
    return {
      totalMessages: session.messages?.length || 0,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      duration: session.messages?.length > 1 ? 'Active' : 'Started'
    };
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in p-4">
          <div className="glass bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-4xl w-full border border-white/10">
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Loading Sessions...</h3>
              <p className="text-gray-400">Please wait while we fetch your interview sessions.</p>
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              My Sessions
            </h1>
            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{sessions.length} session{sessions.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session, index) => {
                const stats = getSessionStats(session);
                return (
                  <div 
                    key={session._id || index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 interactive"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                        {stats.duration}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {getSkillName(session.role)}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{session.createdAt ? new Date(session.createdAt).toLocaleDateString() : 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{session.createdAt ? new Date(session.createdAt).toLocaleTimeString() : 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>{stats.totalMessages} messages</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleResume(session)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all text-sm"
                      >
                        <RotateCcw className="w-4 h-4" /> Resume
                      </button>
                      <button 
                        onClick={() => handleDelete(session)}
                        className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Sessions Yet</h3>
              <p className="text-gray-400 mb-6">Start practicing interviews to save your sessions here.</p>
              <button 
                onClick={() => window.location.href = '/chat'}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                Start Your First Session
              </button>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/10 animate-fade-in">
              <h3 className="text-xl font-bold text-white mb-4">Delete Session?</h3>
              <p className="text-gray-300 mb-6">
                This action cannot be undone. The session will be permanently deleted.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Sessions; 