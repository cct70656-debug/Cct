import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings, Shield, Sparkles } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-[#25213B]">Application Settings</h2>
        <p className="text-xs text-[#77738A]">Appearance, security, and account preferences</p>
      </div>

      <div className="p-8 rounded-3xl fintech-card space-y-6">
        <h3 className="text-lg font-bold text-[#25213B] flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#7548F5]" />
          <span>Appearance Mode</span>
        </h3>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F7F5FF] border border-[#EEEAF5]">
          <div>
            <h4 className="font-semibold text-[#25213B] text-sm">Theme Preference</h4>
            <p className="text-xs text-[#77738A]">Currently using SmartFin AI Luxury Light & Lavender Theme</p>
          </div>
          <span className="px-4 py-2 rounded-xl bg-[#EDE7FF] text-[#7548F5] text-xs font-semibold">
            Light Mode Only
          </span>
        </div>
      </div>

      <div className="p-8 rounded-3xl fintech-card space-y-6">
        <h3 className="text-lg font-bold text-[#25213B] flex items-center space-x-2">
          <Shield className="w-5 h-5 text-[#7548F5]" />
          <span>Subscription & Plan</span>
        </h3>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F7F5FF] border border-[#EEEAF5]">
          <div>
            <h4 className="font-semibold text-[#25213B] text-sm capitalize">{userProfile?.plan || 'Free'} Plan</h4>
            <p className="text-xs text-[#77738A]">Access to standard budgeting & AI insights</p>
          </div>
          <a
            href="/pricing"
            className="px-5 py-2.5 rounded-xl gradient-btn text-white text-xs font-semibold"
          >
            Upgrade Plan
          </a>
        </div>
      </div>
    </div>
  );
};
