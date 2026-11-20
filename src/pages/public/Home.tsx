import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, PieChart, Bot, CheckCircle2, Star, ChevronRight } from 'lucide-react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col selection:bg-[#8056F5] selection:text-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#8056F5]/20 to-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#191B35] border border-[#252849] text-xs font-medium text-[#A78BFA] mb-8 shadow-inner">
            <Sparkles className="w-4 h-4 text-[#8056F5]" />
            <span>Introducing SmartFin AI 2.0 • Advanced Financial Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            Your Money. Your Goals. <span className="bg-gradient-to-r from-[#A78BFA] via-[#8056F5] to-purple-400 bg-clip-text text-transparent">Your Financial Future.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Take control of your finances with intelligent budgeting, real-time expense tracking and personalized AI-powered financial insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 mb-16">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold text-base shadow-xl shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center justify-center space-x-3 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#191B35] text-slate-200 font-semibold text-base border border-[#252849] hover:bg-[#202342] transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Features</span>
            </Link>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="max-w-5xl mx-auto rounded-3xl bg-[#191B35]/90 border border-[#252849] p-4 sm:p-6 shadow-2xl shadow-black/60 backdrop-blur-xl relative">
            <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-[#8056F5] text-white text-[11px] font-bold uppercase tracking-wider">
              Live SaaS Dashboard Preview
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 pt-4">
              <div className="bg-[#101225] border border-[#252849] p-4 rounded-2xl text-left">
                <span className="text-xs text-slate-400 font-medium">Total Income</span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">$6,700.00</p>
                <span className="text-[10px] text-emerald-500 flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1" /> +12% this month</span>
              </div>
              <div className="bg-[#101225] border border-[#252849] p-4 rounded-2xl text-left">
                <span className="text-xs text-slate-400 font-medium">Total Expenses</span>
                <p className="text-2xl font-bold text-[#EF6464] mt-1">$2,470.00</p>
                <span className="text-[10px] text-slate-400 mt-1">Within monthly budget</span>
              </div>
              <div className="bg-[#101225] border border-[#252849] p-4 rounded-2xl text-left">
                <span className="text-xs text-slate-400 font-medium">Available Balance</span>
                <p className="text-2xl font-bold text-white mt-1">$4,230.00</p>
                <span className="text-[10px] text-[#A78BFA] mt-1">Ready for wealth growth</span>
              </div>
              <div className="bg-[#101225] border border-[#252849] p-4 rounded-2xl text-left">
                <span className="text-xs text-slate-400 font-medium">Savings Rate</span>
                <p className="text-2xl font-bold text-[#A78BFA] mt-1">63.1%</p>
                <span className="text-[10px] text-emerald-400 mt-1">Excellent financial health</span>
              </div>
            </div>

            <div className="bg-[#101225] border border-[#252849] rounded-2xl p-6 text-left flex flex-col md:flex-row items-center justify-between">
              <div className="space-y-2 mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-[#A78BFA]" />
                  <h3 className="font-semibold text-white text-base">Gemini AI Financial Insight</h3>
                </div>
                <p className="text-sm text-slate-300 max-w-xl">
                  "Your shopping expenses decreased by 15% compared to last month. You are on track to achieve your MacBook Pro savings goal 2 weeks early!"
                </p>
              </div>
              <Link to="/signup" className="px-5 py-2.5 rounded-xl bg-[#8056F5] text-white text-sm font-medium hover:bg-[#7046e5] transition-colors">
                Try AI Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-[#0d0f20] border-t border-[#252849]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Need to Master Your Money</h2>
            <p className="text-slate-400 text-base">Designed with elite fintech aesthetics and driven by state-of-the-art AI intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PieChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intelligent Budgeting</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Set category-specific monthly spending limits with automated alert thresholds at 75%, 90%, and 100% utilization.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Financial Advisor</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Chat naturally with your personal AI wealth assistant to analyze expenses, detect overspending, and plan savings targets.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] hover:border-[#8056F5]/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[#8056F5]/20 text-[#A78BFA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Savings Goals & Milestones</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Create multiple financial goals, track contributions, calculate remaining targets, and visualize completion dates effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#101225] border-t border-[#252849]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Trusted by Smart Savers Worldwide</h2>
            <p className="text-slate-400 text-base">See how SmartFin AI is transforming personal finance management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#191B35] border border-[#252849] flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm italic mb-6">
                  "SmartFin AI helped me cut unnecessary subscriptions and save over $4,000 in just three months. The AI advisor feels like having a private CPA in my pocket."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#252849]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white">
                  JS
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Jessica Sterling</h4>
                  <span className="text-xs text-slate-400">Product Designer, SF</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#191B35] border border-[#252849] flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm italic mb-6">
                  "The cleanest fintech dashboard I have ever used. Generating PDF financial reports for my tax planning takes literally one click."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#252849]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white">
                  MR
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Marcus Reynolds</h4>
                  <span className="text-xs text-slate-400">Software Engineer, NY</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#191B35] border border-[#252849] flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm italic mb-6">
                  "Budget tracking was always tedious until I started using SmartFin AI. The automated alerts saved me from exceeding my dining budget twice."
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-4 border-t border-[#252849]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white">
                  AL
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Amanda Lin</h4>
                  <span className="text-xs text-slate-400">Marketing Director, Austin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-tr from-[#191B35] to-[#101225] border-t border-[#252849] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Ready to Take Control of Your Financial Future?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of smart savers and wealth builders. Get started in under 60 seconds.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold text-lg shadow-xl shadow-[#8056F5]/40 hover:opacity-95 transition-all"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};
