import React from 'react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col">
      <PublicNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow space-y-6">
        <h1 className="text-4xl font-extrabold text-white">Terms & Conditions</h1>
        <p className="text-slate-400 text-sm">Last updated: November 19, 2026</p>
        <p className="text-slate-300 leading-relaxed">
          Welcome to SmartFin AI. By accessing or using our SaaS platform, you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, you may not access our services.
        </p>
        <h2 className="text-2xl font-bold text-white pt-4">Financial Advice Disclaimer</h2>
        <p className="text-slate-300 leading-relaxed">
          SmartFin AI provides AI-powered financial analytics, budgeting tools, and educational insights. The platform does not provide certified financial, legal, or tax advice. Users are solely responsible for their financial decisions.
        </p>
      </div>
      <PublicFooter />
    </div>
  );
};
