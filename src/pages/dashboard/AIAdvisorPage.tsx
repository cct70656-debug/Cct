import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Sparkles, Bot, RefreshCw, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIAdvisorPage: React.FC = () => {
  const { insights, generateAIInsights } = useFinance();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleRefresh = async () => {
    setLoading(true);
    await generateAIInsights();
    setLoading(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-[#A78BFA]" />
            <span>AI Financial Advisor</span>
          </h2>
          <p className="text-xs text-slate-400">Powered by Google Gemini AI to analyze spending behavior and optimize wealth</p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Analyzing...' : 'Generate New Insights'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.length > 0 ? (
          insights.map((ins, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#191B35] border border-[#252849] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-[#A78BFA]" />
                  <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-wider">{ins.category} Insight</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full capitalize font-medium ${ins.severity === 'high' ? 'bg-red-500/20 text-red-400' : ins.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {ins.severity} priority
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{ins.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{ins.description}</p>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 p-12 text-center rounded-3xl bg-[#191B35] border border-[#252849] text-slate-400">
            No AI insights generated yet. Click "Generate New Insights" above to analyze your financial records.
          </div>
        )}
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#191B35] to-[#101225] border border-[#252849] flex flex-col sm:flex-row items-center justify-between">
        <div className="space-y-2 mb-4 sm:mb-0">
          <h3 className="text-xl font-bold text-white">Have specific questions about your budget?</h3>
          <p className="text-slate-300 text-sm max-w-xl">
            Chat in real-time with our AI Budget Assistant to plan expenditures, calculate savings targets, and review monthly expenses.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/ai-chat')}
          className="px-6 py-3.5 rounded-xl bg-[#8056F5] text-white font-semibold text-sm hover:bg-[#7046e5] transition-colors shadow-lg shadow-[#8056F5]/30 flex-shrink-0"
        >
          Open AI Chat
        </button>
      </div>
    </div>
  );
};
