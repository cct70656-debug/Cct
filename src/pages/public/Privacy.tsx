import React from 'react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col">
      <PublicNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow space-y-6">
        <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-slate-400 text-sm">Last updated: November 19, 2026</p>
        <p className="text-slate-300 leading-relaxed">
          At SmartFin AI, we take your financial data privacy with utmost seriousness. All personal financial records are encrypted at rest and in transit using industry-standard protocols. We never sell your personal or financial data to third parties.
        </p>
        <h2 className="text-2xl font-bold text-white pt-4">Data Collection & Usage</h2>
        <p className="text-slate-300 leading-relaxed">
          We collect information you provide directly when creating an account, recording incomes, expenses, budgets, and savings goals. This data is used solely to provide and improve your personalized financial intelligence dashboard.
        </p>
      </div>
      <PublicFooter />
    </div>
  );
};
