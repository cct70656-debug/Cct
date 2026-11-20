import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';
import { formatMoney } from '../../utils/currency';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  PiggyBank, 
  Sparkles, 
  Target 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Link } from 'react-router-dom';

export const DashboardOverview: React.FC = () => {
  const { incomes, expenses, budgets, savingsGoals, insights } = useFinance();
  const { userProfile } = useAuth();
  const currencySymbol = userProfile?.currency || 'USD ($)';

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const availableBalance = totalIncome - totalExpense;
  const totalSavings = savingsGoals.reduce((s, g) => s + g.currentSavedAmount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  // Chart data calculation
  const monthlyData = [
    { name: 'Jan', income: 4800, expenses: 2100 },
    { name: 'Feb', income: 5200, expenses: 2400 },
    { name: 'Mar', income: 5100, expenses: 1900 },
    { name: 'Apr', income: 5800, expenses: 2600 },
    { name: 'May', income: totalIncome || 6000, expenses: totalExpense || 2400 },
  ];

  // Category pie chart data
  const categoryMap: { [key: string]: number } = {};
  expenses.forEach(e => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });
  const pieData = Object.keys(categoryMap).map(cat => ({ name: cat, value: categoryMap[cat] }));
  const COLORS = ['#8056F5', '#a78bfa', '#10B981', '#F59E0B', '#EF6464', '#3B82F6', '#EC4899', '#6366F1'];

  return (
    <div className="space-y-8 pb-12">
      {/* Financial Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-[#8056F5]/50 transition-all shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Income</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{formatMoney(totalIncome, currencySymbol)}</h3>
          <span className="text-[10px] text-emerald-500 flex items-center mt-2 font-medium">
            <TrendingUp className="w-3 h-3 mr-1" /> Verified records
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-[#8056F5]/50 transition-all shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Expenses</span>
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-[#EF6464] flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{formatMoney(totalExpense, currencySymbol)}</h3>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 block font-medium">Controlled spending</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-[#8056F5]/50 transition-all shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Available Balance</span>
            <div className="w-10 h-10 rounded-2xl bg-[#8056F5]/10 text-[#8056F5] flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{formatMoney(availableBalance, currencySymbol)}</h3>
          <span className="text-[10px] text-[#8056F5] mt-2 block font-medium">Ready for investment</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-[#8056F5]/50 transition-all shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Savings</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <PiggyBank className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{formatMoney(totalSavings, currencySymbol)}</h3>
          <span className="text-[10px] text-amber-500 mt-2 block font-medium">Across active goals</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-[#8056F5]/50 transition-all shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Savings Rate</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{savingsRate.toFixed(1)}%</h3>
          <span className="text-[10px] text-emerald-500 mt-2 block font-medium">Target: &gt;30%</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Income vs Expenses Trend</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monthly financial cashflow comparison</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF6464" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF6464" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }} />
                <Area type="monotone" dataKey="income" stroke="#10B981" fillOpacity={1} fill="url(#colorInc)" name="Income" />
                <Area type="monotone" dataKey="expenses" stroke="#EF6464" fillOpacity={1} fill="url(#colorExp)" name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Expense Categories</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Distribution by category</p>
            </div>
          </div>
          <div className="h-72 w-full flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-slate-400">No expense records found.</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Financial Insights & Savings Goals Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#8056F5]" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gemini AI Financial Insights</h3>
            </div>
            <Link to="/dashboard/ai-advisor" className="text-xs text-[#8056F5] hover:underline font-medium">View All</Link>
          </div>
          <div className="space-y-4">
            {insights.length > 0 ? (
              insights.slice(0, 3).map((ins, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{ins.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-[#8056F5] dark:text-[#a78bfa] capitalize font-medium">{ins.severity}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ins.description}</p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-slate-400 text-sm">
                No AI insights yet. Click "Run AI Analysis" in the top bar to generate personalized insights.
              </div>
            )}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-[#8056F5]" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Savings Goals Progress</h3>
            </div>
            <Link to="/dashboard/savings" className="text-xs text-[#8056F5] hover:underline font-medium">Manage Goals</Link>
          </div>
          <div className="space-y-5">
            {savingsGoals.length > 0 ? (
              savingsGoals.map((goal, i) => {
                const pct = Math.min(100, Math.round((goal.currentSavedAmount / goal.targetAmount) * 100));
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-900 dark:text-white">{goal.goalName}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{formatMoney(goal.currentSavedAmount, currencySymbol)} / {formatMoney(goal.targetAmount, currencySymbol)} ({pct}%)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#090b14] overflow-hidden">
                      <div className="h-full gradient-btn rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400">No savings goals created yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
