import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';
import { formatMoney } from '../../utils/currency';
import { PieChart, Plus, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';

export const BudgetsPage: React.FC = () => {
  const { budgets, expenses, saveBudget, deleteBudget } = useFinance();
  const { userProfile } = useAuth();
  const currencySymbol = userProfile?.currency || 'USD ($)';
  const [category, setCategory] = useState('Grocery');
  const [limitAmount, setLimitAmount] = useState('');
  const currentMonth = new Date().toISOString().slice(0, 7);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!limitAmount) return;
    await saveBudget({
      category,
      limitAmount: parseFloat(limitAmount),
      month: currentMonth,
      alertThreshold75: true,
      alertThreshold90: true,
      alertThreshold100: true
    });
    setLimitAmount('');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Monthly Budget Planner</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Set spending limits and monitor category utilization for {currentMonth}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Budget Form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Create Category Budget</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              >
                {['Food', 'Grocery', 'Transport', 'Shopping', 'Education', 'Medical', 'Rent', 'Electricity', 'Internet', 'Entertainment', 'Travel', 'Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Monthly Limit</label>
              <input
                type="number"
                required
                min="1"
                value={limitAmount}
                onChange={e => setLimitAmount(e.target.value)}
                placeholder="500"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-btn text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Save Budget</span>
            </button>
          </form>
        </div>

        {/* Budget List & Utilization */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Active Budgets</h3>
          {budgets.length > 0 ? (
            budgets.map((bgt, idx) => {
              const spent = expenses
                .filter(e => e.category === bgt.category)
                .reduce((s, e) => s + e.amount, 0);
              const pct = Math.min(100, Math.round((spent / bgt.limitAmount) * 100));
              let statusColor = 'bg-emerald-500';
              let badge = <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">On Track</span>;

              if (pct >= 100) {
                statusColor = 'bg-[#EF6464]';
                badge = <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> Exceeded</span>;
              } else if (pct >= 90) {
                statusColor = 'bg-amber-500';
                badge = <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">High Alert (90%)</span>;
              } else if (pct >= 75) {
                statusColor = 'bg-yellow-500';
                badge = <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-medium">Warning (75%)</span>;
              }

              return (
                <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{bgt.category}</h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Month: {bgt.month}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {badge}
                      <button
                        onClick={() => bgt.id && deleteBudget(bgt.id)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        title="Delete Budget"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">Spent: <strong className="text-slate-900 dark:text-white">{formatMoney(spent, currencySymbol)}</strong></span>
                    <span className="text-slate-600 dark:text-slate-300">Limit: <strong className="text-slate-900 dark:text-white">{formatMoney(bgt.limitAmount, currencySymbol)}</strong></span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#090b14] overflow-hidden">
                    <div className={`h-full ${statusColor} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 text-slate-400">
              No budgets created for this month. Use the form to set a category spending limit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
