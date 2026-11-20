import React, { useState } from 'react';
import { HelpCircle, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db, collection, addDoc, serverTimestamp } from '../../firebase';

export const SupportPage: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !subject || !message) return;
    await addDoc(collection(db, 'supportTickets'), {
      userId: currentUser.uid,
      userEmail: userProfile?.email || currentUser.email,
      subject,
      message,
      status: 'Open',
      createdAt: serverTimestamp()
    });
    setSubmitted(true);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Help & Support</h2>
        <p className="text-xs text-slate-400">Submit a support ticket or browse our FAQ knowledge base</p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-3xl bg-[#191B35] border border-emerald-500/30 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-2xl font-bold text-white">Support Ticket Submitted</h3>
          <p className="text-slate-300 text-sm">Our support team has received your ticket and will respond via email shortly.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-[#8056F5] text-white text-xs font-semibold"
          >
            Submit Another Ticket
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-[#A78BFA]" />
            <span>Create Support Ticket</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Question about budget alerts"
              className="w-full px-4 py-3 rounded-xl bg-[#101225] border border-[#252849] text-white text-sm focus:outline-none focus:border-[#8056F5]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Describe your issue or question..."
              className="w-full px-4 py-3 rounded-xl bg-[#101225] border border-[#252849] text-white text-sm focus:outline-none focus:border-[#8056F5]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold text-sm shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Ticket</span>
          </button>
        </form>
      )}
    </div>
  );
};
