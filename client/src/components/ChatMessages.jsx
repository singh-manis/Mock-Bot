import React from 'react';

export default function ChatMessages({
  messages,
  speakingIdx,
  isLatestBotMessage,
  handleListen,
  handlePause,
  handleResume,
  handleStop,
  isPaused,
  handlePracticeAgain,
  handleHarderQuestion,
  showTips,
  setShowTips
}) {
  return (
    <div className="space-y-6">
      {messages.map((msg, idx) => (
        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`message-bubble ${msg.type === 'user' ? 'user' : 'bot'} ${speakingIdx === idx ? 'speaking-glow' : ''}`}>
            {/* Message content - clean and simple */}
            <div className="text-base leading-relaxed">
              {msg.content}
            </div>
            
            {/* Voice controls for bot messages - only show when speaking */}
            {msg.type === 'bot' && speakingIdx === idx && (
              <div className="mt-3 flex gap-2 items-center">
                {!isPaused ? (
                  <>
                    <button
                      onClick={handlePause}
                      className="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg hover:scale-110"
                      title="Pause speech"
                    >
                      <span role="img" aria-label="Pause">⏸️</span>
                    </button>
                    <button
                      onClick={handleStop}
                      className="p-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:scale-110"
                      title="Stop speech"
                    >
                      <span role="img" aria-label="Stop">⏹️</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleResume}
                      className="p-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:scale-110"
                      title="Resume speech"
                    >
                      <span role="img" aria-label="Resume">▶️</span>
                    </button>
                    <button
                      onClick={handleStop}
                      className="p-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:scale-110"
                      title="Stop speech"
                    >
                      <span role="img" aria-label="Stop">⏹️</span>
                    </button>
                  </>
                )}
              </div>
            )}
            
            {/* Next Steps Buttons after latest bot message */}
            {isLatestBotMessage(idx) && msg.type === 'bot' && (
              <div className="next-steps">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={handlePracticeAgain}
                    className="btn-primary flex items-center justify-center gap-2 py-3"
                  >
                    <span role="img" aria-label="Practice">🔄</span>
                    Practice Again
                  </button>
                  <button
                    onClick={handleHarderQuestion}
                    className="btn-secondary flex items-center justify-center gap-2 py-3"
                  >
                    <span role="img" aria-label="Harder">⚡</span>
                    Try a Harder Question
                  </button>
                  <button
                    onClick={() => setShowTips(v => !v)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white rounded-xl font-semibold py-3 px-4 transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-105"
                  >
                    <span role="img" aria-label="Tips">💡</span>
                    {showTips ? 'Hide Tips' : 'Review Tips'}
                  </button>
                </div>
                
                {showTips && (
                  <div className="tips-section bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 mt-4">
                    <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <span role="img" aria-label="Lightbulb">💡</span>
                      Pro Interview Tips
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-200">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span>Be specific and detailed in your answers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span>Use real examples from your experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span>Ask for clarification if needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span>Practice active listening and responding thoughtfully</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 