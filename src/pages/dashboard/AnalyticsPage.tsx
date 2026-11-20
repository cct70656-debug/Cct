import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { incomes, expenses } = useFinance();

  const totalInc = incomes.reduce((s, i) => s + i.amount, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);

  const categoryMap: { [key: string]: number } = {};
  expenses.forEach(e => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });
  const pieData = Object.keys(categoryMap).map(cat => ({ name: cat, value: categoryMap[cat] }));
  const COLORS = ['#8056F5', '#A78BFA', '#10B981', '#F59E0B', '#EF6464', '#3B82F6', '#EC4899', '#6366F1'];

  const barData = [
    { name: 'Income', amount: totalInc },
    { name: 'Expenses', amount: totalExp },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white">Financial Analytics</h2>
        <p className="text-xs text-slate-400">Advanced charts and visual breakdown of your financial health</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-[#191B35] border border-[#252849]">
          <h3 className="text-lg font-bold text-white mb-4">Income vs Expenses Comparison</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#101225', borderColor: '#252849', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="amount" fill="#8056F5" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#191B35] border border-[#252849]">
          <h3 className="text-lg font-bold text-white mb-4">Category Expense Distribution</h3>
          <div className="h-80 w-full flex items-center justify-center">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#101225', borderColor: '#252849', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-slate-400">No expense data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
