import React from 'react';
import { Send, Download, Save } from 'lucide-react';

export default function ChatInput({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleMicClick,
  handleExport,
  handleSaveSession,
  isListening
}) {
  return (
    <div className="flex items-end gap-2 mt-2">
      <textarea
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Type your answer..."
        className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
        rows={2}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <button
        onClick={handleSendMessage}
        disabled={!inputValue.trim()}
        className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={handleMicClick}
        className={`p-3 rounded-xl transition-all ml-1 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-white/10 hover:bg-cyan-500/20'}`}
        title={isListening ? 'Listening...' : 'Start Voice Input'}
      >
        {isListening ? (
          <span role="img" aria-label="Listening">🎤</span>
        ) : (
          <span role="img" aria-label="Mic">🎙️</span>
        )}
      </button>
      <button
        onClick={handleExport}
        className="p-3 rounded-xl bg-white/10 hover:bg-cyan-500/20 transition-all ml-1"
        title="Export Chat as PDF"
        id="chat-save"
      >
        <Download className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={handleSaveSession}
        className="p-3 rounded-xl bg-white/10 hover:bg-green-500/20 transition-all ml-1"
        title="Save Session"
        id="chat-save"
      >
        <Save className="w-5 h-5 text-white" />
      </button>
    </div>
  );
} 