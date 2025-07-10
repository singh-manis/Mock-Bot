import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { RotateCcw, Trash2, Plus, MessageCircle, Calendar, Clock, TrendingUp } from 'lucide-react';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const saved = localStorage.getItem('mockbot-sessions');
    if (saved) {
      try {
        const parsedSessions = JSON.parse(saved);
        setSessions(Array.isArray(parsedSessions) ? parsedSessions : [parsedSessions]);
      } catch (error) {
        console.error('Error loading sessions:', error);
        setSessions([]);
      }
    }
  };

  const handleResume = (session) => {
    // Store the selected session for the Chat page to pick up
    localStorage.setItem('mockbot-resume-session', JSON.stringify(session));
    window.location.href = '/chat';
  };

  const handleDelete = (session) => {
    setSessionToDelete(session);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      const updatedSessions = sessions.filter(s => s.id !== sessionToDelete.id);
      localStorage.setItem('mockbot-sessions', JSON.stringify(updatedSessions));
      setSessions(updatedSessions);
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
    const userMessages = session.messages?.filter(m => m.type === 'user') || [];
    const botMessages = session.messages?.filter(m => m.type === 'bot') || [];
    return {
      totalMessages: session.messages?.length || 0,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      duration: session.messages?.length > 1 ? 'Active' : 'Started'
    };
  };

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
                    key={session.id || index}
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
                      {getSkillName(session.skill)}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{session.timestamp ? new Date(session.timestamp).toLocaleDateString() : 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{session.timestamp ? new Date(session.timestamp).toLocaleTimeString() : 'Unknown'}</span>
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