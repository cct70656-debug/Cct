import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../../context/FinanceContext';

export const TopNavbar: React.FC = () => {
  const { userProfile } = useAuth();
  const { notifications, generateAIInsights } = useFinance();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-[#EEEAF5] px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-bold text-[#25213B]">Welcome back, {userProfile?.fullName || 'User'} 👋</h1>
          <p className="text-xs text-[#77738A]">Here is your financial overview and intelligence summary today.</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={async () => {
            await generateAIInsights();
            navigate('/dashboard/ai-advisor');
          }}
          className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#EDE7FF] border border-[#A78BFA]/40 text-[#7548F5] text-xs font-semibold hover:bg-[#E2D8FF] transition-all shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#7548F5]" />
          <span>Run AI Analysis</span>
        </button>

        <button 
          onClick={() => navigate('/dashboard/notifications')}
          className="p-2.5 rounded-xl bg-white text-[#77738A] hover:text-[#25213B] border border-[#EEEAF5] transition-all relative shadow-sm"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E45B68] text-white text-[10px] font-bold flex items-center justify-center shadow">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-[#EEEAF5]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7548F5] to-[#A78BFA] flex items-center justify-center font-bold text-white shadow-md">
            {userProfile?.fullName?.[0] || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
};
