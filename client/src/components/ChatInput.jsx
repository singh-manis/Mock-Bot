import React from 'react';
import { Send, Download, Save } from 'lucide-react';

export default function ChatInput({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleMicClick,
  handleExport,
  handleSaveSession,
  isListening,
  voiceOnlyMode = false
}) {
  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
      <div className="flex items-end gap-3">
        {!voiceOnlyMode ? (
          <>
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Start typing your response or use voice input..."
              className="input-clean flex-1 resize-none focus:outline-none transition-all"
              rows={3}
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
              className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 voice-only-container rounded-2xl">
            <div className="text-center">
              <div className="text-gradient-primary font-semibold text-xl mb-3">Voice-Only Mode</div>
              <div className="text-gray-300 text-base">Click the microphone above to speak your answer</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Action buttons row - simplified */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="btn-secondary p-2 rounded-lg flex items-center gap-2"
            title="Export Chat as PDF"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs">Export</span>
          </button>
          <button
            onClick={handleSaveSession}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 rounded-lg transition-all shadow-lg flex items-center gap-2"
            title="Save Session"
          >
            <Save className="w-4 h-4" />
            <span className="text-xs">Save Draft</span>
          </button>
        </div>
        
        <div className="text-xs text-gray-400">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
} 