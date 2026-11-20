import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';
import { formatMoney } from '../../utils/currency';
import { ArrowUpRight, ArrowDownRight, Receipt, Search } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { incomes, expenses } = useFinance();
  const { userProfile } = useAuth();
  const currencySymbol = userProfile?.currency || 'USD ($)';
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const allTransactions = [
    ...incomes.map(i => ({ ...i, type: 'income' as const })),
    ...expenses.map(e => ({ ...e, type: 'expense' as const }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filtered = allTransactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    if (filterType === 'income') return matchesSearch && t.type === 'income';
    if (filterType === 'expense') return matchesSearch && t.type === 'expense';
    return matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Unified Transactions</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Complete consolidated ledger of all incomes and expenses</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filterType === 'all' ? 'gradient-btn text-white shadow' : 'bg-slate-100 dark:bg-[#090b14] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('income')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filterType === 'income' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 dark:bg-[#090b14] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'}`}
            >
              Income
            </button>
            <button
              onClick={() => setFilterType('expense')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filterType === 'expense' ? 'bg-[#EF6464] text-white shadow' : 'bg-slate-100 dark:bg-[#090b14] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'}`}
            >
              Expenses
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/15 text-emerald-500' : 'bg-red-500/15 text-[#EF6464]'}`}>
                    {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.title}</h4>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-white dark:bg-[#13172b] text-[#8056F5] dark:text-[#a78bfa]">{t.category}</span>
                      <span>{t.date}</span>
                      <span>• {t.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`text-base font-extrabold ${t.type === 'income' ? 'text-emerald-500' : 'text-[#EF6464]'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatMoney(t.amount, currencySymbol)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400 text-sm">
              No transactions match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
