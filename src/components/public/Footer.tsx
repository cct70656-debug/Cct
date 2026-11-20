import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ShieldCheck, Lock } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#FAF9FF] border-t border-[#EEEAF5] text-[#77738A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7548F5] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-[#7548F5]/25">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#25213B]">SmartFin <span className="text-[#7548F5]">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed text-[#77738A] max-w-sm">
              Take Control. Grow Your Wealth. SmartFin AI is your intelligent personal finance management platform powered by Gemini AI.
            </p>
            <div className="flex items-center space-x-4 text-xs text-[#77738A] pt-2">
              <span className="flex items-center space-x-1.5"><ShieldCheck className="w-4 h-4 text-[#059669]" /><span>Bank-Grade Security</span></span>
              <span className="flex items-center space-x-1.5"><Lock className="w-4 h-4 text-[#7548F5]" /><span>End-to-End Encrypted</span></span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#25213B] uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/features" className="hover:text-[#7548F5] transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#7548F5] transition-colors">How It Works</Link></li>
              <li><Link to="/pricing" className="hover:text-[#7548F5] transition-colors">Pricing Plans</Link></li>
              <li><Link to="/login" className="hover:text-[#7548F5] transition-colors">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#25213B] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[#7548F5] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#7548F5] transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-[#7548F5] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#7548F5] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#25213B] uppercase tracking-wider mb-4">AI Intelligence</h4>
            <p className="text-xs text-[#77738A] mb-4">
              Powered by advanced Google Gemini models for personalized financial coaching, budgeting, and overspending detection.
            </p>
            <div className="px-4 py-3 rounded-xl bg-[#EDE7FF] border border-[#EEEAF5] text-xs text-[#25213B]">
              <span className="font-semibold text-[#7548F5]">Secure & Private</span> — Your financial records remain strictly confidential.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EEEAF5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77738A]">
          <p>© {new Date().getFullYear()} SmartFin AI Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-[#25213B]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#25213B]">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#25213B]">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
