import { motion } from 'motion/react';
import { AlertTriangle, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function CitizenReportFraud() {
  const [formData, setFormData] = useState({
    type: '',
    content: '',
    details: '',
    amount: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ type: '', content: '', details: '', amount: '' });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Report Submitted!</h2>
          <p className="text-slate-400 mb-6">
            Your fraud report has been received by our cyber crime team. We'll investigate and take appropriate action.
          </p>
          <p className="text-sm text-slate-500">Reference ID: #FR-2024-{Math.floor(Math.random() * 10000)}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Report Fraud</h2>
        <p className="text-slate-400">Help us stop cyber criminals by reporting suspicious activity</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Type of Fraud *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-400/50 transition-all"
                required
              >
                <option value="">Select fraud type</option>
                <option value="digital-arrest">Digital Arrest Call</option>
                <option value="phishing-sms">Phishing SMS</option>
                <option value="fake-website">Fake Website</option>
                <option value="investment-scam">Investment Scam</option>
                <option value="upi-fraud">UPI/Payment Fraud</option>
                <option value="deepfake">Deepfake Video Call</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Phone Number / URL / Account Details *
              </label>
              <input
                type="text"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter phone, link, or relevant details"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Detailed Description *
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Describe what happened, when it happened, and any other relevant information..."
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 transition-all resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Amount Lost (if any)
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="₹ 0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-6 py-4 text-white font-semibold flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Submit Report
              </div>
            </button>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-400 mb-1">Your Privacy is Protected</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All reports are kept confidential. Your information helps our cyber crime unit identify patterns and catch criminals.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
