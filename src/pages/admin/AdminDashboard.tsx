import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Users, CreditCard, Bot, HelpCircle, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  if (userProfile?.role !== 'admin') {
    return (
      <div className="p-12 text-center text-slate-400 space-y-4">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Access Denied</h2>
        <p className="text-sm">You do not have administrative privileges to view this area.</p>
        <p className="text-xs text-slate-500">Tip: To test admin features, sign up with email: <code className="text-[#A78BFA]">admin@smartfin.ai</code></p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <ShieldAlert className="w-6 h-6 text-purple-400" />
          <span>Admin Control Center</span>
        </h2>
        <p className="text-xs text-slate-400">Platform telemetry, user management, and subscription analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#191B35] border border-[#252849]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
          <h3 className="text-3xl font-extrabold text-white mt-2">1,284</h3>
          <span className="text-xs text-emerald-400 mt-2 block">+14% this month</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#191B35] border border-[#252849]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pro Subscriptions</span>
          <h3 className="text-3xl font-extrabold text-white mt-2">342</h3>
          <span className="text-xs text-[#A78BFA] mt-2 block">Active MRR: $4,104</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#191B35] border border-[#252849]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI API Requests</span>
          <h3 className="text-3xl font-extrabold text-white mt-2">48,920</h3>
          <span className="text-xs text-purple-400 mt-2 block">Gemini 2.5 Flash</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#191B35] border border-[#252849]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Tickets</span>
          <h3 className="text-3xl font-extrabold text-white mt-2">7</h3>
          <span className="text-xs text-amber-400 mt-2 block">Pending response</span>
        </div>
      </div>
    </div>
  );
};
