import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Bell, CheckCircle2, Trash2 } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, deleteNotification } = useFinance();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white">Notifications</h2>
        <p className="text-xs text-slate-400">Budget warnings, spending alerts, and account updates</p>
      </div>

      <div className="space-y-4 max-w-4xl">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} className={`p-6 rounded-3xl bg-[#191B35] border ${n.isRead ? 'border-[#252849]' : 'border-[#8056F5]/50 shadow-lg shadow-[#8056F5]/10'} flex items-start justify-between`}>
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${n.type === 'success' ? 'bg-emerald-500/15 text-emerald-400' : n.type === 'warning' ? 'bg-amber-500/15 text-amber-400' : 'bg-purple-500/15 text-[#A78BFA]'}`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{n.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!n.isRead && (
                  <button
                    onClick={() => n.id && markNotificationRead(n.id)}
                    className="p-2 rounded-xl bg-purple-500/10 text-[#A78BFA] hover:bg-purple-500/20 transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => n.id && deleteNotification(n.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-3xl bg-[#191B35] border border-[#252849] text-slate-400">
            No notifications found.
          </div>
        )}
      </div>
    </div>
  );
};
