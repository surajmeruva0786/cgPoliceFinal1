import { motion } from 'motion/react';
import { Shield, Link, MessageSquare, Search, AlertTriangle, CheckCircle, XCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const recentDetections = [
  {
    id: 1,
    url: 'https://fake-sbi-login-secure.com',
    type: 'url',
    status: 'malicious',
    threat: 'Phishing - Bank Impersonation',
    reportedBy: 347,
    timestamp: '3 min ago'
  },
  {
    id: 2,
    message: 'Your Aadhaar is blocked. Click here to verify immediately: bit.ly/aadhar-verify-now',
    type: 'message',
    status: 'malicious',
    threat: 'SMS Phishing',
    reportedBy: 892,
    timestamp: '8 min ago'
  },
  {
    id: 3,
    url: 'https://secure-kyc-update-bank.in',
    type: 'url',
    status: 'suspicious',
    threat: 'Potential KYC Scam',
    reportedBy: 234,
    timestamp: '15 min ago'
  },
  {
    id: 4,
    message: 'Congratulations! You won ₹10 Lakhs lottery. Contact WhatsApp +91-9876543210',
    type: 'message',
    status: 'malicious',
    threat: 'Lottery Scam',
    reportedBy: 1523,
    timestamp: '22 min ago'
  }
];

const stats = [
  { label: 'URLs Analyzed Today', value: 15847, trend: '+12%' },
  { label: 'Malicious Detected', value: 3421, trend: '+8%' },
  { label: 'Messages Scanned', value: 28934, trend: '+15%' },
  { label: 'Blocked in Real-time', value: 2876, trend: '+5%' }
];

export function FraudURLDetection() {
  const [inputValue, setInputValue] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'message'>('url');

  const handleAnalyze = async () => {
    if (!inputValue) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('http://localhost:8000/check-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputValue }),
      });

      const data = await response.json();

      if (data.status === 'UNSAFE') {
        setAnalysisResult({
          status: 'malicious',
          confidence: 100, // Safe Browsing is deterministic
          threats: data.threats.map((t: any) => `${t.threatType} on ${t.platformType}`),
          recommendation: 'BLOCK IMMEDIATELY',
          category: data.threats[0]?.threatType || 'Unknown Threat'
        });
      } else if (data.status === 'SAFE') {
        // For safe URLs, we might not show the full malicious UI, but let's adapt it to show "Safe"
        // The current UI seems built for "Analysis Result" which implies finding something. 
        // Let's set a "safe" result state.
        setAnalysisResult({
          status: 'safe',
          confidence: 100,
          threats: [],
          recommendation: 'SAFE TO VISIT',
          category: 'Verified Safe'
        });
      } else {
        // Error
        console.error("API Error:", data.details);
      }

    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Fraud URL & Message Detector</h2>
          <p className="text-slate-400">Real-time threat detection and citizen protection system</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg backdrop-blur-sm">
          <Shield className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-emerald-400">Protection Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
              <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-white">{stat.value.toLocaleString()}</div>
                <div className="text-emerald-400 text-sm font-semibold">{stat.trend}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Input Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Analyze URL or Message</h3>

              {/* Tab Switcher */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('url')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'url'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                >
                  <Link className="w-4 h-4" />
                  URL Analysis
                </button>
                <button
                  onClick={() => setActiveTab('message')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'message'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Message Analysis
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative group/input">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur opacity-0 group-focus-within/input:opacity-100 transition-opacity"></div>
                  {activeTab === 'url' ? (
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter suspicious URL (e.g., https://example.com)"
                      className="relative w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                    />
                  ) : (
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Paste suspicious message or SMS content..."
                      rows={4}
                      className="relative w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all backdrop-blur-sm resize-none"
                    />
                  )}
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !inputValue}
                  className="w-full group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative px-6 py-3 text-white font-semibold flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Threat'}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Result */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Analysis Result</h3>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-bold ${analysisResult.status === 'malicious'
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                    {analysisResult.status === 'malicious' ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    {analysisResult.status === 'malicious' ? 'MALICIOUS' : 'SAFE'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${analysisResult.status === 'malicious'
                    ? 'bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20'
                    : 'bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20'
                    }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-white">Threat Confidence</span>
                      <span className="text-red-400 font-bold text-lg">{analysisResult.confidence}%</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysisResult.confidence}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-full ${analysisResult.status === 'malicious' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-emerald-500 to-green-500'}`}
                      />
                    </div>
                  </div>

                  {analysisResult.status === 'malicious' && (
                    <div>
                      <div className="text-sm font-semibold text-white mb-3">Detected Threats:</div>
                      <div className="space-y-2">
                        {analysisResult.threats.map((threat: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-slate-300 bg-white/5 rounded-lg p-3 border border-white/10">
                            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>{threat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-xs text-slate-400 mb-1">Category</div>
                      <div className="text-white font-semibold">{analysisResult.category}</div>
                    </div>
                    <div className={`p-4 rounded-xl border ${analysisResult.status === 'malicious' ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                      <div className={`text-xs mb-1 ${analysisResult.status === 'malicious' ? 'text-red-400' : 'text-emerald-400'}`}>Recommendation</div>
                      <div className={`${analysisResult.status === 'malicious' ? 'text-red-400' : 'text-emerald-400'} font-bold`}>{analysisResult.recommendation}</div>
                    </div>
                  </div>

                  {analysisResult.status === 'malicious' && (
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-lg font-medium transition-all">
                        Block URL
                      </button>
                      <button className="flex-1 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-lg font-medium transition-all">
                        Generate Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Recent Detections */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Detections</h3>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {recentDetections.map((detection, index) => (
                <motion.div
                  key={detection.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`px-2 py-1 rounded text-xs font-bold ${detection.status === 'malicious'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                      {detection.status.toUpperCase()}
                    </div>
                    <span className="text-xs text-slate-500">{detection.timestamp}</span>
                  </div>

                  <div className="text-sm text-white font-medium mb-2 line-clamp-2">
                    {detection.type === 'url' ? detection.url : detection.message}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{detection.threat}</span>
                    <span className="text-blue-400 font-semibold">{detection.reportedBy} reports</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
