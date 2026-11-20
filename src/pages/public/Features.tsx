import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Bot, TrendingUp, ShieldCheck, FileText, Bell, Smartphone, ArrowRight, Zap } from 'lucide-react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';

export const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-widest bg-[#191B35] px-4 py-1.5 rounded-full border border-[#252849]">
            Comprehensive Platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 mb-6">Powerful Features for Elite Wealth Management</h1>
          <p className="text-slate-300 text-lg">
            Discover all the advanced capabilities built into SmartFin AI to help you track income, conquer budgets, and grow your net worth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6">
              <PieChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Budgeting</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Create monthly category limits, track spending utilization in real-time, and get automatic warnings at 75%, 90%, and 100% budget thresholds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Financial Advisor</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leverage Google Gemini AI to analyze your spending behavior, detect overspending patterns, and receive personalized savings recommendations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Savings Goals & Milestones</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Set target goals for laptops, real estate, or retirement. Add contributions, track progress percentages, and estimate exact completion dates.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Professional Reports</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Export your complete financial records into professional PDF reports and Excel worksheets with one click for tax and accounting.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Intelligent Notifications</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stay informed with real-time alerts for budget limits, recurring bill reminders, and monthly summary digests.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Bank-Grade Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your data is secured with Firebase Authentication, strict Firestore Security Rules, and enterprise-grade encryption.
            </p>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};
