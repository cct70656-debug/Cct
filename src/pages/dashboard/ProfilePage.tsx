import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Globe, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

const COUNTRIES = [
  { name: 'United States', currency: 'USD ($)' },
  { name: 'United Kingdom', currency: 'GBP (£)' },
  { name: 'European Union', currency: 'EUR (€)' },
  { name: 'India', currency: 'INR (₹)' },
  { name: 'Canada', currency: 'CAD ($)' },
  { name: 'Australia', currency: 'AUD ($)' },
  { name: 'United Arab Emirates', currency: 'AED (د.إ)' },
  { name: 'Saudi Arabia', currency: 'SAR (ر.س)' },
  { name: 'Singapore', currency: 'SGD ($)' },
  { name: 'Japan', currency: 'JPY (¥)' },
  { name: 'Switzerland', currency: 'CHF (Fr)' },
  { name: 'Pakistan', currency: 'PKR (₨)' },
  { name: 'Malaysia', currency: 'MYR (RM)' },
  { name: 'Other', currency: 'USD ($)' }
];

const CURRENCIES = [
  'USD ($)',
  'EUR (€)',
  'GBP (£)',
  'INR (₹)',
  'CAD ($)',
  'AUD ($)',
  'AED (د.إ)',
  'SAR (ر.س)',
  'SGD ($)',
  'JPY (¥)',
  'CHF (Fr)',
  'PKR (₨)',
  'MYR (RM)'
];

export const ProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [fullName, setFullName] = useState(userProfile?.fullName || '');
  const [country, setCountry] = useState(userProfile?.country || 'United States');
  const [currency, setCurrency] = useState(userProfile?.currency || 'USD ($)');
  const [timezone, setTimezone] = useState(userProfile?.timezone || 'UTC');
  const [success, setSuccess] = useState(false);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    const found = COUNTRIES.find(c => c.name === selectedCountry);
    if (found) {
      setCurrency(found.currency);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({ fullName, country, currency, timezone });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage your personal details, country, and currency preferences</p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl glass-panel shadow-xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Full Name</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                disabled
                value={userProfile?.email || ''}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-[#090b14]/50 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Country</label>
            <div className="relative">
              <Globe className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={country}
                onChange={handleCountryChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              >
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Preferred Currency</label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Timezone</label>
            <div className="relative">
              <Clock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090b14] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#8056F5]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3.5 rounded-xl gradient-btn text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
