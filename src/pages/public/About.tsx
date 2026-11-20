import React from 'react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col">
      <PublicNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow">
        <h1 className="text-4xl font-extrabold text-white mb-6">About SmartFin AI</h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          SmartFin AI was founded with a singular mission: to democratize elite wealth management through cutting-edge artificial intelligence and pristine user experience design.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-6">
          We believe that financial freedom is achievable for everyone when armed with real-time analytics, intelligent budgeting, and personalized AI coaching. Our platform combines bank-grade security with advanced machine learning models from Google Gemini.
        </p>
      </div>
      <PublicFooter />
    </div>
  );
};
