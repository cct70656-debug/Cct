import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';

export const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-widest bg-[#191B35] px-4 py-1.5 rounded-full border border-[#252849]">
            Transparent Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 mb-6">Invest in Your Financial Future</h1>
          <p className="text-slate-300 text-lg">
            Choose the plan that fits your wealth management needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {/* Free Plan */}
          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Starter</span>
              <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">$0 <span className="text-sm font-normal text-slate-400">/ forever</span></h3>
              <p className="text-slate-400 text-sm mb-8">Essential tools for basic income and expense tracking.</p>
              
              <ul className="space-y-4 text-sm text-slate-300 mb-8">
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Basic Income & Expense Tracking</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>1 Monthly Budget</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Basic Dashboard Analytics</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Community Support</span></li>
              </ul>
            </div>
            <Link to="/signup" className="w-full py-3 rounded-xl bg-[#202342] text-white font-medium text-center hover:bg-[#282c57] transition-colors">
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-3xl bg-[#191B35] border-2 border-[#8056F5] flex flex-col justify-between relative shadow-2xl shadow-[#8056F5]/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-bold text-[#A78BFA] uppercase tracking-widest">Professional</span>
              <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">$12 <span className="text-sm font-normal text-slate-400">/ month</span></h3>
              <p className="text-slate-400 text-sm mb-8">Advanced insights and unlimited budgets for serious wealth builders.</p>
              
              <ul className="space-y-4 text-sm text-slate-300 mb-8">
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Unlimited Budgets & Categories</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Advanced Financial Analytics & Charts</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Gemini AI Financial Insights</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Savings Goals & Milestones</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>PDF & Excel Report Exports</span></li>
              </ul>
            </div>
            <Link to="/signup" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-medium text-center shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all">
              Upgrade to Pro
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Enterprise / Premium</span>
              <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">$29 <span className="text-sm font-normal text-slate-400">/ month</span></h3>
              <p className="text-slate-400 text-sm mb-8">Maximum AI power, extended reporting, and VIP priority support.</p>
              
              <ul className="space-y-4 text-sm text-slate-300 mb-8">
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Everything in Pro Plan</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Advanced AI Chatbot Assistant</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Extended Multi-Year Financial Reports</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>Higher AI Request Limits</span></li>
                <li className="flex items-center space-x-3"><Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /><span>24/7 Priority VIP Support</span></li>
              </ul>
            </div>
            <Link to="/signup" className="w-full py-3 rounded-xl bg-[#202342] text-white font-medium text-center hover:bg-[#282c57] transition-colors">
              Get Premium
            </Link>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};
