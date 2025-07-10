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
    <div className="flex flex-col gap-4">
      {messages.map((msg, idx) => (
        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`} style={{ animationDelay: `${idx * 0.05}s` }}>
          <div className={`rounded-2xl px-4 py-3 max-w-xs md:max-w-md shadow-lg ${msg.type === 'user' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-white/10 text-white border border-white/10'} ${speakingIdx === idx ? 'ring-2 ring-cyan-400' : ''}`}>
            {msg.content}
            {/* Voice controls for bot messages */}
            {msg.type === 'bot' && (
              <div className="mt-2 flex gap-2 items-center">
                {speakingIdx !== idx && (
                  <button
                    onClick={() => handleListen(msg.content, idx)}
                    className="p-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all"
                    title="Listen"
                  >
                    <span role="img" aria-label="Listen">🔊</span>
                  </button>
                )}
                {speakingIdx === idx && !isPaused && (
                  <>
                    <button
                      onClick={handlePause}
                      className="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 transition-all"
                      title="Pause"
                    >
                      <span role="img" aria-label="Pause">⏸️</span>
                    </button>
                    <button
                      onClick={handleStop}
                      className="p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all"
                      title="Stop"
                    >
                      <span role="img" aria-label="Stop">⏹️</span>
                    </button>
                  </>
                )}
                {speakingIdx === idx && isPaused && (
                  <>
                    <button
                      onClick={handleResume}
                      className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all"
                      title="Resume"
                    >
                      <span role="img" aria-label="Resume">▶️</span>
                    </button>
                    <button
                      onClick={handleStop}
                      className="p-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all"
                      title="Stop"
                    >
                      <span role="img" aria-label="Stop">⏹️</span>
                    </button>
                  </>
                )}
              </div>
            )}
            {/* Next Steps Buttons after latest bot message */}
            {isLatestBotMessage(idx) && msg.type === 'bot' && (
              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={handlePracticeAgain}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all"
                >
                  Practice Again
                </button>
                <button
                  onClick={handleHarderQuestion}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  Try a Harder Question
                </button>
                <button
                  onClick={() => setShowTips(v => !v)}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all"
                >
                  {showTips ? 'Hide Tips' : 'Review Tips'}
                </button>
                {showTips && (
                  <div className="mt-2 p-3 bg-white/10 rounded-xl text-cyan-200 text-sm">
                    <ul className="list-disc pl-5">
                      <li>Be specific and detailed in your answers</li>
                      <li>Use real examples from your experience</li>
                      <li>Ask for clarification if needed</li>
                      <li>Practice active listening and responding thoughtfully</li>
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