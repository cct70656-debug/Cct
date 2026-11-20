import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Bot, Send, User, Sparkles, Plus, Trash2 } from 'lucide-react';

export const AIChatPage: React.FC = () => {
  const { 
    chatSessions, 
    currentChatMessages, 
    activeSessionId, 
    setActiveSessionId, 
    createChatSession, 
    sendChatMessage, 
    deleteChatSession 
  } = useFinance();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeSessionId) return;
    const text = input;
    setInput('');
    setLoading(true);
    await sendChatMessage(text);
    setLoading(false);
  };

  const handleNewSession = async () => {
    await createChatSession('Financial Strategy Chat');
  };

  return (
    <div className="h-[calc(100vh-10rem)] grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sessions Sidebar */}
      <div className="hidden lg:flex flex-col rounded-3xl bg-[#191B35] border border-[#252849] p-4 overflow-y-auto">
        <button
          onClick={handleNewSession}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/25 flex items-center justify-center space-x-2 mb-4 hover:opacity-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        <div className="space-y-2 flex-grow">
          {chatSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setActiveSessionId(session.id || null)}
              className={`p-3 rounded-xl cursor-pointer flex items-center justify-between text-sm transition-all ${activeSessionId === session.id ? 'bg-[#8056F5] text-white font-semibold shadow' : 'bg-[#101225] text-slate-300 hover:bg-[#202342]'}`}
            >
              <span className="truncate">{session.title}</span>
              <button
                onClick={(e) => { e.stopPropagation(); session.id && deleteChatSession(session.id); }}
                className="text-slate-400 hover:text-red-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3 rounded-3xl bg-[#191B35] border border-[#252849] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[#252849] flex items-center justify-between bg-[#101225]/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">SmartFin AI Assistant</h3>
              <p className="text-xs text-slate-400">Contextual financial guidance powered by Gemini</p>
            </div>
          </div>
        </div>

        <div className="flex-grow p-6 overflow-y-auto space-y-4">
          {currentChatMessages.length > 0 ? (
            currentChatMessages.map((msg, i) => (
              <div key={i} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white ${msg.sender === 'user' ? 'bg-[#8056F5]' : 'bg-[#101225] border border-[#252849] text-[#A78BFA]'}`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-[#8056F5] text-white' : 'bg-[#101225] text-slate-200 border border-[#252849]'}`}>
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">
              Ask any question about your budget, expenses, or savings goals.
            </div>
          )}
          {loading && (
            <div className="flex items-center space-x-3 text-slate-400 text-sm animate-pulse">
              <Bot className="w-5 h-5 text-[#A78BFA]" />
              <span>SmartFin AI is thinking...</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-[#252849] bg-[#101225]/50 flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask AI about your finances..."
            className="flex-grow px-4 py-3 rounded-xl bg-[#101225] border border-[#252849] text-white text-sm focus:outline-none focus:border-[#8056F5]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center space-x-2"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
