import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserPlus, Sliders, Bot, TrendingUp } from 'lucide-react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';

export const HowItWorks: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-widest bg-[#191B35] px-4 py-1.5 rounded-full border border-[#252849]">
            Simple & Seamless
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 mb-6">How SmartFin AI Works</h1>
          <p className="text-slate-300 text-lg">
            Get started in under 60 seconds and transform your personal finance management in 4 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] relative">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-[#8056F5]/30">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Create Account</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sign up securely with email or Google in seconds. Choose your currency and preferred timezone.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] relative">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-[#8056F5]/30">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Track & Budget</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Log your income and expenses effortlessly. Set category monthly budgets with real-time alert thresholds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] relative">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-[#8056F5]/30">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Consult AI Advisor</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Let Google Gemini analyze your spending patterns, detect savings opportunities, and answer questions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] relative">
            <div className="w-12 h-12 rounded-2xl bg-[#8056F5] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-lg shadow-[#8056F5]/30">
              4
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Grow Wealth</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Achieve your savings goals, monitor your net worth growth, and export professional financial reports.
            </p>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};
