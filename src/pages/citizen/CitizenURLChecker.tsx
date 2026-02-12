import { motion } from 'motion/react';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function CitizenURLChecker() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    // Simulate API call
    setTimeout(() => {
      const isSafe = Math.random() > 0.3;
      setResult({
        safe: isSafe,
        confidence: isSafe ? 98 : 94,
        threats: isSafe ? [] : ['Phishing attempt detected', 'Domain recently registered', 'SSL certificate suspicious'],
        category: isSafe ? 'Legitimate Website' : 'Banking Fraud Attempt'
      });
      setIsChecking(false);
    }, 2000);
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">URL Safety Checker</h2>
        <p className="text-slate-400">Check if a website or link is safe before visiting</p>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleCheck} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Enter URL to Check
              </label>
              <div className="relative group/input">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity"></div>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-blue-400 transition-colors z-10" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com or paste any link..."
                  className="relative w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isChecking || !url}
              className="w-full group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative px-6 py-4 text-white font-semibold flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                {isChecking ? 'Checking Safety...' : 'Check URL'}
              </div>
            </button>
          </form>
        </div>
      </motion.div>

      {/* Result Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${result.safe ? 'from-emerald-500/10 to-green-500/10' : 'from-red-500/10 to-pink-500/10'} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Safety Report</h3>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-bold ${
                result.safe
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}>
                {result.safe ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {result.safe ? 'SAFE' : 'DANGEROUS'}
              </div>
            </div>

            <div className="space-y-6">
              {/* Confidence */}
              <div className={`p-5 rounded-xl border ${result.safe ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">Safety Confidence</span>
                  <span className={`font-bold text-lg ${result.safe ? 'text-emerald-400' : 'text-red-400'}`}>{result.confidence}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full ${result.safe ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}
                  />
                </div>
              </div>

              {/* Threats (if any) */}
              {!result.safe && result.threats.length > 0 && (
                <div>
                  <div className="text-sm font-semibold text-white mb-3">Detected Threats:</div>
                  <div className="space-y-2">
                    {result.threats.map((threat: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-slate-300 bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{threat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-xs text-slate-400 mb-1">Category</div>
                  <div className="text-white font-semibold">{result.category}</div>
                </div>
                <div className={`p-4 rounded-xl border ${result.safe ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <div className={`text-xs mb-1 ${result.safe ? 'text-emerald-400' : 'text-red-400'}`}>Recommendation</div>
                  <div className={`font-bold ${result.safe ? 'text-emerald-400' : 'text-red-400'}`}>
                    {result.safe ? 'SAFE TO VISIT' : 'DO NOT VISIT'}
                  </div>
                </div>
              </div>

              {/* Actions */}
              {!result.safe && (
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg font-medium transition-all">
                    Report This URL
                  </button>
                  <button className="flex-1 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg font-medium transition-all">
                    Learn More
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Information Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-400 mb-1">Protection Tip</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Always check URLs before clicking, especially in SMS, WhatsApp, or email. Fraudsters create fake websites that look identical to real ones.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
