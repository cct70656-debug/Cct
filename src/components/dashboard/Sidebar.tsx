import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Receipt, 
  PieChart, 
  Target, 
  Sparkles, 
  Bot, 
  FileText, 
  Bell, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <aside className="w-64 bg-[#FAF9FF] border-r border-[#EEEAF5] flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#EEEAF5] flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7548F5] to-[#A78BFA] flex items-center justify-center shadow-lg shadow-[#7548F5]/25">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-[#25213B]">SmartFin <span className="text-[#7548F5]">AI</span></span>
          <span className="block text-[9px] tracking-widest text-[#77738A] uppercase font-semibold">Wealth Intelligence</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow px-4 py-6 space-y-1.5 text-sm">
        <div className="px-3 pb-2 text-[10px] font-bold text-[#77738A] uppercase tracking-widest">Main Menu</div>
        
        <NavLink 
          to="/dashboard" 
          end
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/dashboard/budget" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <PieChart className="w-4 h-4" />
          <span>My Budget</span>
        </NavLink>

        <NavLink 
          to="/dashboard/income" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <ArrowUpRight className="w-4 h-4 text-[#059669]" />
          <span>Income</span>
        </NavLink>

        <NavLink 
          to="/dashboard/expenses" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <ArrowDownRight className="w-4 h-4 text-[#E45B68]" />
          <span>Expenses</span>
        </NavLink>

        <NavLink 
          to="/dashboard/transactions" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <Receipt className="w-4 h-4" />
          <span>Transactions</span>
        </NavLink>

        <NavLink 
          to="/dashboard/analytics" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <PieChart className="w-4 h-4" />
          <span>Analytics</span>
        </NavLink>

        <NavLink 
          to="/dashboard/savings" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <Target className="w-4 h-4 text-[#7548F5]" />
          <span>Savings Goals</span>
        </NavLink>

        <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-[#77738A] uppercase tracking-widest">AI Intelligence</div>

        <NavLink 
          to="/dashboard/ai-advisor" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <Sparkles className="w-4 h-4 text-[#7548F5]" />
          <span>AI Financial Advisor</span>
        </NavLink>

        <NavLink 
          to="/dashboard/ai-chat" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <Bot className="w-4 h-4 text-[#7548F5]" />
          <span>AI Budget Assistant</span>
        </NavLink>

        <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-[#77738A] uppercase tracking-widest">Reports & Account</div>

        <NavLink 
          to="/dashboard/reports" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <FileText className="w-4 h-4" />
          <span>Financial Reports</span>
        </NavLink>

        <NavLink 
          to="/dashboard/notifications" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </NavLink>

        <NavLink 
          to="/dashboard/profile" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <User className="w-4 h-4" />
          <span>My Profile</span>
        </NavLink>

        <NavLink 
          to="/dashboard/settings" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </NavLink>

        <NavLink 
          to="/dashboard/support" 
          className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all ${isActive ? 'bg-[#7548F5] text-white shadow-lg shadow-[#7548F5]/30' : 'text-[#77738A] hover:bg-[#EDE7FF] hover:text-[#25213B]'}`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Help & Support</span>
        </NavLink>

        {isAdmin && (
          <div className="pt-2">
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => `flex items-center space-x-3 px-3.5 py-3 rounded-xl font-medium transition-all bg-[#EDE7FF] text-[#7548F5] border border-[#A78BFA]/30 ${isActive ? 'ring-2 ring-[#7548F5]' : ''}`}
            >
              <ShieldAlert className="w-4 h-4 text-[#7548F5]" />
              <span>Admin Panel</span>
            </NavLink>
          </div>
        )}
      </div>

      {/* User Footer Profile & Logout */}
      <div className="p-4 border-t border-[#EEEAF5]">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7548F5] to-[#A78BFA] flex items-center justify-center font-bold text-white text-sm shadow">
              {userProfile?.fullName?.[0] || 'U'}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-semibold text-[#25213B] truncate max-w-[110px]">{userProfile?.fullName || 'User'}</h4>
              <span className="text-[10px] text-[#7548F5] capitalize">{userProfile?.plan || 'Free'} Plan ({userProfile?.currency || 'USD'})</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-white text-[#77738A] hover:text-[#E45B68] hover:bg-red-50 border border-[#EEEAF5] transition-all text-xs font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
