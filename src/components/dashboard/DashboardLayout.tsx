import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { useAuth } from '../../context/AuthContext';
import { FinanceProvider } from '../../context/FinanceContext';

export const DashboardLayout: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5FF] flex items-center justify-center text-[#77738A]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#7548F5] border-t-transparent animate-spin" />
          <p className="text-sm font-medium">Loading SmartFin AI...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <FinanceProvider>
      <div className="min-h-screen bg-[#F7F5FF] text-[#25213B] flex">
        <Sidebar />
        <div className="flex-grow flex flex-col min-w-0">
          <TopNavbar />
          <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </FinanceProvider>
  );
};
