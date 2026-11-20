import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';
import { formatMoney } from '../../utils/currency';
import { ArrowUpRight, Plus, Trash2, Search } from 'lucide-react';

export const IncomePage: React.FC = () => {
  const { incomes, addIncome, deleteIncome } = useFinance();
  const { userProfile } = useAuth();
  const currencySymbol = userProfile?.currency || 'USD ($)';
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState<'Salary' | 'Freelancing' | 'Business' | 'Investments' | 'Rental Income' | 'Other Income'>('Salary');
  const [category, setCategory] = useState('Primary');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Bank transfer' | 'Debit card' | 'Credit card' | 'Mobile wallet'>('Bank transfer');
  const [description, setDescription] = useState('');
  const [recurringFrequency, setRecurringFrequency] = useState<'None' | 'Weekly' | 'Monthly' | 'Yearly'>('Monthly');
  const [search, setSearch] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    await addIncome({
      title,
      amount: parseFloat(amount),
      source,
      category,
      date,
      paymentMethod,
      description,
      recurringFrequency
    });
    setTitle('');
    setAmount('');
    setDescription('');
  };

  const filtered = incomes.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.source.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Income Management</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Track and manage all your income sources and recurring cashflow</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Income Form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add New Income</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Income Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Monthly Salary"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Amount</label>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="5000"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Source</label>
                <select
                  value={source}
                  onChange={e => setSource(e.target.value as any)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                >
                  <option value="Salary">Salary</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Business">Business</option>
                  <option value="Investments">Investments</option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Other Income">Other Income</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                >
                  <option value="Bank transfer">Bank transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Debit card">Debit card</option>
                  <option value="Credit card">Credit card</option>
                  <option value="Mobile wallet">Mobile wallet</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Frequency</label>
                <select
                  value={recurringFrequency}
                  onChange={e => setRecurringFrequency(e.target.value as any)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                >
                  <option value="None">None</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Description (Optional)</label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Notes..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-btn text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Income Record</span>
            </button>
          </form>
        </div>

        {/* Income Records List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Income History</h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search income..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filtered.length > 0 ? (
              filtered.map((inc) => (
                <div key={inc.id} className="p-5 rounded-2xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{inc.title}</h4>
                      <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#090b14] text-[#8056F5] dark:text-[#a78bfa]">{inc.source}</span>
                        <span>{inc.date}</span>
                        <span>• {inc.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-extrabold text-emerald-500">+{formatMoney(inc.amount, currencySymbol)}</span>
                    <button
                      onClick={() => inc.id && deleteIncome(inc.id)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 text-slate-400">
                No income records found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
