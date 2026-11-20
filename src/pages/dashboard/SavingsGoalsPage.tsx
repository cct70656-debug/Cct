import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';
import { formatMoney } from '../../utils/currency';
import { Target, Plus, Trash2 } from 'lucide-react';

export const SavingsGoalsPage: React.FC = () => {
  const { savingsGoals, addSavingsGoal, deleteSavingsGoal, contributeToGoal } = useFinance();
  const { userProfile } = useAuth();
  const currencySymbol = userProfile?.currency || 'USD ($)';
  const [goalName, setGoalName] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavedAmount, setCurrentSavedAmount] = useState('');
  const [targetDate, setTargetDate] = useState('2026-12-31');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [category, setCategory] = useState('Savings');
  const [contribGoalId, setContribGoalId] = useState<string | null>(null);
  const [contribAmount, setContribAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || !targetAmount) return;
    await addSavingsGoal({
      goalName,
      description,
      targetAmount: parseFloat(targetAmount),
      currentSavedAmount: parseFloat(currentSavedAmount || '0'),
      targetDate,
      monthlyContribution: parseFloat(monthlyContribution || '0'),
      category
    });
    setGoalName('');
    setDescription('');
    setTargetAmount('');
    setCurrentSavedAmount('');
    setMonthlyContribution('');
  };

  const handleContribute = async (goalId: string) => {
    if (!contribAmount) return;
    await contributeToGoal(goalId, parseFloat(contribAmount));
    setContribGoalId(null);
    setContribAmount('');
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Savings Goals</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Set targets, track progress milestones, and accelerate your wealth growth</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Goal Form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Create Savings Goal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Goal Name</label>
              <input
                type="text"
                required
                value={goalName}
                onChange={e => setGoalName(e.target.value)}
                placeholder="e.g. MacBook Pro M3"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Target Amount</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={targetAmount}
                  onChange={e => setTargetAmount(e.target.value)}
                  placeholder="3000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Current Saved</label>
                <input
                  type="number"
                  min="0"
                  value={currentSavedAmount}
                  onChange={e => setCurrentSavedAmount(e.target.value)}
                  placeholder="500"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Target Date</label>
                <input
                  type="date"
                  required
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Monthly Contrib</label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={e => setMonthlyContribution(e.target.value)}
                  placeholder="300"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Description (Optional)</label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Details..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-btn text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Savings Goal</span>
            </button>
          </form>
        </div>

        {/* Goals List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Active Savings Goals</h3>
          {savingsGoals.length > 0 ? (
            savingsGoals.map((goal) => {
              const pct = Math.min(100, Math.round((goal.currentSavedAmount / goal.targetAmount) * 100));
              const remaining = Math.max(0, goal.targetAmount - goal.currentSavedAmount);

              return (
                <div key={goal.id} className="p-6 rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{goal.goalName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{goal.description || 'Target savings goal'}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-[#8056F5] dark:text-[#a78bfa] font-medium">{pct}% Complete</span>
                      <button
                        onClick={() => goal.id && deleteSavingsGoal(goal.id)}
                        className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">Saved: <strong className="text-emerald-500">{formatMoney(goal.currentSavedAmount, currencySymbol)}</strong></span>
                    <span className="text-slate-600 dark:text-slate-300">Target: <strong className="text-slate-900 dark:text-white">{formatMoney(goal.targetAmount, currencySymbol)}</strong></span>
                    <span className="text-slate-600 dark:text-slate-300">Remaining: <strong className="text-amber-500">{formatMoney(remaining, currencySymbol)}</strong></span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#090b14] overflow-hidden">
                    <div className="h-full gradient-btn rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Target Date: {goal.targetDate}</span>
                    {contribGoalId === goal.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={contribAmount}
                          onChange={e => setContribAmount(e.target.value)}
                          className="w-28 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                        />
                        <button
                          onClick={() => goal.id && handleContribute(goal.id)}
                          className="px-3 py-1.5 rounded-lg gradient-btn text-white text-xs font-semibold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setContribGoalId(null)}
                          className="px-2 py-1.5 text-xs text-slate-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setContribGoalId(goal.id || null)}
                        className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-[#8056F5]/20 text-[#8056F5] dark:text-[#a78bfa] hover:bg-purple-100 transition-colors text-xs font-semibold flex items-center space-x-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Contribution</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#13172b] border border-slate-200 dark:border-white/10 text-slate-400">
              No savings goals created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
