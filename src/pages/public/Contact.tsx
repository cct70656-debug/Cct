import React, { useState } from 'react';
import { PublicNavbar } from '../../components/public/Navbar';
import { PublicFooter } from '../../components/public/Footer';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#101225] text-slate-100 flex flex-col">
      <PublicNavbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-grow">
        <h1 className="text-4xl font-extrabold text-white mb-4">Contact Support</h1>
        <p className="text-slate-300 mb-8">Have questions or need assistance? Our support team is here for you 24/7.</p>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-[#191B35] border border-emerald-500/30 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
            <p className="text-slate-300">Thank you for reaching out. We will get back to your registered email shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#191B35] border border-[#252849] space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-xl bg-[#101225] border border-[#252849] text-white focus:outline-none focus:border-[#8056F5]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Describe your inquiry..."
                className="w-full px-4 py-3 rounded-xl bg-[#101225] border border-[#252849] text-white focus:outline-none focus:border-[#8056F5]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8056F5] to-[#A78BFA] text-white font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-[#8056F5]/30 hover:opacity-95 transition-all"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
      <PublicFooter />
    </div>
  );
};
