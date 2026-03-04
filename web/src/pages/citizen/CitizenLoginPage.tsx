import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Lock, User, Key, Sparkles, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export function CitizenLoginPage() {
    const navigate = useNavigate();
    const [citizenId, setCitizenId] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/citizen');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-6xl mx-8 grid md:grid-cols-2 gap-16 items-center relative z-10"
            >
                {/* Left Side - Branding */}
                <div className="text-left space-y-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-center gap-5"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-white to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-white/10">
                                <Shield className="w-14 h-14 text-slate-900" />
                            </div>
                            <div className="absolute -top-2 -right-2">
                                <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h1 className="text-5xl font-bold text-white mb-3 leading-tight">
                            Citizen Protection
                        </h1>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6 leading-tight">
                            Portal
                        </h1>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            Secure Interface for Reporting and Monitoring Cyber Threats
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 text-emerald-400">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50"></div>
                            <span className="font-medium">Secure Citizen Gateway: Active</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-white">Instant</div>
                                <div className="text-xs text-slate-400 mt-1">Fraud Reporting</div>
                            </div>
                            <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                <div className="text-2xl font-bold text-white">AI Safety</div>
                                <div className="text-xs text-slate-400 mt-1">Tools Included</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Login Form */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative"
                >
                    {/* Glassy Card */}
                    <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 rounded-3xl"></div>

                        <div className="relative z-10">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Citizen Login</h2>
                                <p className="text-sm text-slate-400">Enter your details to access the portal</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        Mobile Number / Citizen ID
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                        <input
                                            type="text"
                                            value={citizenId}
                                            onChange={(e) => setCitizenId(e.target.value)}
                                            placeholder="Enter mobile number or ID"
                                            className="relative w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="relative w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                                        OTP Verification
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter 6-digit OTP"
                                            className="relative w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="relative w-full group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative px-6 py-4 text-white font-semibold text-lg flex items-center justify-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Login to Portal
                                    </div>
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="flex items-start gap-3 text-xs text-slate-400 bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-4">
                                    <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                    <p className="leading-relaxed">
                                        This is a protected government system. Unauthorized access is a criminal offense under the IT Act, 2000.
                                    </p>
                                </div>

                                <div className="text-center space-y-2">
                                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">OR</div>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-500/30 text-blue-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                                    >
                                        <User className="w-4 h-4" />
                                        Officer Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
