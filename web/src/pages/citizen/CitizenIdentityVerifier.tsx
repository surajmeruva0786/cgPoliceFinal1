import { motion } from 'motion/react';
import { UserCheck, Search, Shield, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function CitizenIdentityVerifier() {
  const [officerId, setOfficerId] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Verification logic
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Verify Police Officer</h2>
        <p className="text-slate-400">Check if the officer contacting you is genuine</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Officer Name or ID Number
              </label>
              <div className="relative group/input">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors z-10" />
                <input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="Enter officer name or ID..."
                  className="relative w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Department / Location (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Mumbai Cyber Crime Cell"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-6 py-4 text-white font-semibold flex items-center justify-center gap-2">
                <UserCheck className="w-5 h-5" />
                Verify Identity
              </div>
            </button>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-red-500/10 border border-red-500/20 rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-400 mb-1">Important</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real police officers will NEVER demand money over phone or video call. If someone claims to be police and asks for payment, hang up immediately and verify through this portal or call 1930.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
