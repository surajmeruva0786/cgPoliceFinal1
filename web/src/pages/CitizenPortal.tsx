import { motion } from 'motion/react';
import { Shield, Search, AlertTriangle, Phone, MessageSquare, Video, UserCheck, FileText, Send, CheckCircle, ExternalLink, ArrowLeft, Lock, User, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const API_BASE = 'http://localhost:8000';

const protectionTips = [
  {
    icon: Phone,
    title: 'Digital Arrest Scam',
    description: 'Police never call demanding money. Hang up immediately if someone claims you\'re under investigation.'
  },
  {
    icon: Video,
    title: 'Deepfake Video Calls',
    description: 'Verify official identity through official channels. Ask questions only you and the official know.'
  },
  {
    icon: MessageSquare,
    title: 'SMS & WhatsApp Frauds',
    description: 'Never click suspicious links. Banks never ask for OTP, PIN or card details via message.'
  }
];

const recentAlerts = [
  {
    id: 1,
    type: 'high',
    title: 'Fake SBI KYC Update Campaign Active',
    description: 'Fraudsters sending SMS asking to update KYC urgently',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'medium',
    title: 'WhatsApp Investment Scam Detected',
    description: 'Fake cryptocurrency investment groups targeting young professionals',
    time: '5 hours ago'
  },
  {
    id: 3,
    type: 'high',
    title: 'Digital Arrest Call Wave in Mumbai',
    description: 'Multiple reports of impersonation calls claiming drug courier involvement',
    time: '8 hours ago'
  }
];

export function CitizenPortal() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [reportData, setReportData] = useState({
    type: '',
    content: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authForm, setAuthForm] = useState({ phone: '', password: '', name: '' });
  const [citizenId, setCitizenId] = useState<number | null>(null);
  const [citizenName, setCitizenName] = useState('');

  // URL check state
  const [urlInput, setUrlInput] = useState('');
  const [urlResult, setUrlResult] = useState<any>(null);
  const [urlChecking, setUrlChecking] = useState(false);

  // Auto-authenticate for prototyping — no login needed
  useEffect(() => {
    const storedId = localStorage.getItem('citizen_id');
    if (storedId) {
      setCitizenId(parseInt(storedId));
      setCitizenName(localStorage.getItem('citizen_name') || 'Citizen');
    } else {
      localStorage.setItem('user_type', 'citizen');
      localStorage.setItem('citizen_id', '1');
      localStorage.setItem('citizen_name', 'Citizen');
      setCitizenId(1);
      setCitizenName('Citizen');
    }
    setIsAuthenticated(true);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Skip API — just set local state (prototyping mode)
    const cName = authForm.name || 'Citizen';
    localStorage.setItem('user_type', 'citizen');
    localStorage.setItem('citizen_id', '1');
    localStorage.setItem('citizen_name', cName);
    setCitizenId(1);
    setCitizenName(cName);
    setIsAuthenticated(true);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_type');
    localStorage.removeItem('citizen_id');
    localStorage.removeItem('citizen_name');
    setCitizenId(null);
    setCitizenName('');
    setIsAuthenticated(false);
  };

  const handleUrlCheck = async () => {
    if (!urlInput || !citizenId) return;
    setUrlChecking(true);
    setUrlResult(null);
    try {
      const response = await fetch(`${API_BASE}/check-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput, citizen_id: citizenId })
      });
      const data = await response.json();
      setUrlResult(data);
    } catch {
      setUrlResult({ status: 'ERROR', error: 'Failed to check URL. Ensure backend is running.' });
    } finally {
      setUrlChecking(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenId) {
      setShowAuth(true);
      return;
    }
    try {
      await fetch(`${API_BASE}/report-fraud`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fraud_type: reportData.type,
          contact_info: reportData.content,
          details: reportData.details,
          citizen_id: citizenId
        })
      });
    } catch { }
    setSubmitted(true);
    setTimeout(() => {
      setActiveService(null);
      setSubmitted(false);
      setReportData({ type: '', content: '', details: '' });
    }, 3000);
  };

  const requireAuth = (serviceId: string) => {
    // No auth needed — prototyping mode
    setActiveService(serviceId);
  };

  const services = [
    {
      id: 'check-url',
      icon: Search,
      title: 'Check URL Safety',
      description: 'Verify if a website or link is safe before clicking',
      color: 'blue'
    },
    {
      id: 'report-fraud',
      icon: AlertTriangle,
      title: 'Report Fraud',
      description: 'Report suspicious calls, messages, or websites',
      color: 'red'
    },
    {
      id: 'verify-official',
      icon: UserCheck,
      title: 'Verify Official',
      description: 'Check if a police officer or official is genuine',
      color: 'emerald'
    },
    {
      id: 'file-complaint',
      icon: FileText,
      title: 'File Complaint',
      description: 'Register an official cybercrime complaint',
      color: 'amber'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 via-white to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-slate-900" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Citizen Fraud Protection Portal
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">
                  National Digital Fraud Prevention Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">{citizenName}</div>
                    <div className="text-xs text-slate-400">Citizen</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setShowAuth(true); setIsRegister(false); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 rounded-lg transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm font-medium">Login</span>
                  </button>
                  <button
                    onClick={() => { setShowAuth(true); setIsRegister(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-lg transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Register</span>
                  </button>
                </>
              )}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Officer Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuth && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowAuth(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">
              {isRegister ? 'Create Account' : 'Citizen Login'}
            </h3>
            <p className="text-slate-400 mb-6 text-sm">
              {isRegister ? 'Register to access fraud protection services' : 'Login to access your account'}
            </p>

            {authError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-all"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    value={authForm.phone}
                    onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    placeholder="Enter password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-all"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                {authLoading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Login')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setIsRegister(!isRegister); setAuthError(''); }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="text-5xl font-bold text-white">
            Protect Yourself from Cyber Fraud
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Use our tools to check suspicious links, verify officials, report frauds, and stay safe online
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const colorMap = ({
              blue: { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400', iconBg: 'bg-blue-500/20' },
              red: { bg: 'from-red-500/20 to-pink-500/20', border: 'border-red-500/30', text: 'text-red-400', iconBg: 'bg-red-500/20' },
              emerald: { bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
              amber: { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-400', iconBg: 'bg-amber-500/20' }
            } as Record<string, { bg: string; border: string; text: string; iconBg: string }>)[service.color] || { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400', iconBg: 'bg-blue-500/20' };

            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => requireAuth(service.id)}
                className="relative group text-left"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colorMap.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className={`relative bg-white/[0.02] backdrop-blur-xl border ${colorMap.border} rounded-2xl p-6 shadow-xl hover:border-opacity-50 transition-all h-full`}>
                  <div className={`w-14 h-14 ${colorMap.iconBg} rounded-xl flex items-center justify-center mb-4 border ${colorMap.border}`}>
                    <Icon className={`w-7 h-7 ${colorMap.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-400">{service.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Active Service Modal */}
        {activeService && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => !submitted && setActiveService(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
            >
              {!submitted ? (
                <>
                  <button
                    onClick={() => setActiveService(null)}
                    className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <h3 className="text-3xl font-bold text-white mb-2">
                    {services.find(s => s.id === activeService)?.title}
                  </h3>
                  <p className="text-slate-400 mb-8">
                    {services.find(s => s.id === activeService)?.description}
                  </p>

                  <form onSubmit={handleSubmitReport} className="space-y-6">
                    {activeService === 'check-url' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Enter URL or Link to Check
                          </label>
                          <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://example.com or paste link here"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-all"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleUrlCheck}
                          disabled={urlChecking || !urlInput}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg disabled:opacity-50"
                        >
                          {urlChecking ? 'Checking...' : 'Check Safety'}
                        </button>
                        {urlResult && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl border ${urlResult.status === 'UNSAFE'
                              ? 'bg-red-500/10 border-red-500/30'
                              : urlResult.status === 'SAFE'
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-amber-500/10 border-amber-500/30'
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {urlResult.status === 'SAFE'
                                ? <CheckCircle className="w-5 h-5 text-emerald-400" />
                                : <AlertTriangle className="w-5 h-5 text-red-400" />}
                              <span className={`font-bold ${urlResult.status === 'SAFE' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {urlResult.status}
                              </span>
                            </div>
                            {urlResult.threats?.length > 0 && (
                              <div className="text-sm text-red-300">
                                <strong>Threats:</strong> {urlResult.threats.map((t: any) => t.threatType).join(', ')}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    )}

                    {activeService === 'report-fraud' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Type of Fraud
                          </label>
                          <select
                            value={reportData.type}
                            onChange={(e) => setReportData({ ...reportData, type: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-400/50 transition-all"
                            required
                          >
                            <option value="">Select fraud type</option>
                            <option value="digital-arrest">Digital Arrest Call</option>
                            <option value="phishing-sms">Phishing SMS</option>
                            <option value="fake-website">Fake Website</option>
                            <option value="investment-scam">Investment Scam</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Phone Number / URL / Message
                          </label>
                          <input
                            type="text"
                            value={reportData.content}
                            onChange={(e) => setReportData({ ...reportData, content: e.target.value })}
                            placeholder="Enter suspicious phone, link, or message"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Additional Details
                          </label>
                          <textarea
                            value={reportData.details}
                            onChange={(e) => setReportData({ ...reportData, details: e.target.value })}
                            placeholder="Describe what happened..."
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 transition-all resize-none"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          Submit Report
                        </button>
                      </div>
                    )}

                    {activeService === 'verify-official' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Officer Name or ID
                          </label>
                          <input
                            type="text"
                            placeholder="Enter officer name or ID number"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-3">
                            Department / Location
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Mumbai Cyber Crime Cell"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-xl transition-all shadow-lg"
                        >
                          Verify Identity
                        </button>
                      </div>
                    )}

                    {activeService === 'file-complaint' && (
                      <div className="space-y-4">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <p className="text-sm text-amber-400">
                            <strong>Note:</strong> Filing a complaint will create an official FIR. Please ensure all information provided is accurate.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
                          className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Go to National Cybercrime Portal
                        </button>
                      </div>
                    )}
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30"
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Submitted Successfully!</h3>
                  <p className="text-slate-400">
                    Your report has been received. Our team will review it shortly.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Recent Public Alerts */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Recent Fraud Alerts</h3>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
            </div>

            <div className="grid gap-4">
              {recentAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-xl border backdrop-blur-sm ${alert.type === 'high'
                    ? 'bg-red-500/5 border-red-500/20'
                    : 'bg-amber-500/5 border-amber-500/20'
                    }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`w-5 h-5 ${alert.type === 'high' ? 'text-red-400' : 'text-amber-400'}`} />
                      <h4 className="text-lg font-bold text-white">{alert.title}</h4>
                    </div>
                    <span className="text-xs text-slate-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 ml-8">{alert.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Protection Tips */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-6">Stay Protected - Quick Tips</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {protectionTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{tip.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{tip.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl backdrop-blur-sm">
            <Phone className="w-6 h-6 text-red-400" />
            <div className="text-left">
              <div className="text-sm text-slate-400">National Cybercrime Helpline</div>
              <div className="text-2xl font-bold text-white">1930</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
