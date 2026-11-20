import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Menu, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PublicNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-[#EEEAF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#7548F5] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-[#7548F5]/25 group-hover:scale-105 transition-transform">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#25213B]">SmartFin <span className="text-[#7548F5]">AI</span></span>
            <span className="block text-[10px] tracking-widest text-[#77738A] uppercase font-semibold">Wealth Intelligence</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-[#77738A] hover:text-[#25213B] transition-colors">Home</Link>
          <Link to="/features" className="text-sm font-medium text-[#77738A] hover:text-[#25213B] transition-colors">Features</Link>
          <Link to="/how-it-works" className="text-sm font-medium text-[#77738A] hover:text-[#25213B] transition-colors">How It Works</Link>
          <Link to="/pricing" className="text-sm font-medium text-[#77738A] hover:text-[#25213B] transition-colors">Pricing</Link>
          <Link to="/about" className="text-sm font-medium text-[#77738A] hover:text-[#25213B] transition-colors">About Us</Link>
          <Link to="/contact" className="text-sm font-medium text-[#77738A] hover:text-[#25213B] transition-colors">Contact</Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl gradient-btn text-white font-medium text-sm flex items-center space-x-2"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login"
                className="px-4 py-2 text-sm font-medium text-[#77738A] hover:text-[#25213B] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-xl gradient-btn text-white font-medium text-sm flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-[#FAF9FF] text-[#25213B] border border-[#EEEAF5]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#EEEAF5] px-6 py-6 space-y-4 shadow-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-base font-medium text-[#25213B]">Home</Link>
          <Link to="/features" onClick={() => setIsOpen(false)} className="block text-base font-medium text-[#25213B]">Features</Link>
          <Link to="/how-it-works" onClick={() => setIsOpen(false)} className="block text-base font-medium text-[#25213B]">How It Works</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)} className="block text-base font-medium text-[#25213B]">Pricing</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-base font-medium text-[#25213B]">About Us</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-base font-medium text-[#25213B]">Contact</Link>
          
          <div className="pt-4 border-t border-[#EEEAF5] flex flex-col space-y-3">
            {currentUser ? (
              <button
                onClick={() => { setIsOpen(false); navigate('/dashboard'); }}
                className="w-full py-3 rounded-xl gradient-btn text-white font-medium text-center shadow-lg"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 text-center text-[#25213B] font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 rounded-xl gradient-btn text-white font-medium text-center shadow-lg"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
