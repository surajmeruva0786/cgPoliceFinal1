import { Outlet, useNavigate, useLocation } from 'react-router';
import { Shield, Home, Search, Video, UserCheck, AlertTriangle, BookOpen, User, Bell, Bot } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { path: '/citizen', label: 'Dashboard', icon: Home },
  { path: '/citizen/url-checker', label: 'URL Checker', icon: Search },
  { path: '/citizen/deepfake-detector', label: 'Deepfake Detector', icon: Video },
  { path: '/citizen/verify-official', label: 'Verify Official', icon: UserCheck },
  { path: '/citizen/report-fraud', label: 'Report Fraud', icon: AlertTriangle },
  { path: '/citizen/alerts', label: 'Live Alerts', icon: Bell },
  { path: '/citizen/ai-assistant', label: 'AI Assistant', icon: Bot },
  { path: '/citizen/protection-tips', label: 'Protection Tips', icon: BookOpen },
];

export function CitizenPortalLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-white to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-slate-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Citizen Protection Portal
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span>Protected by National Cyber Command</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">Citizen #2847651</div>
                  <div className="text-xs text-slate-400">Protected User</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-400/20">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="h-10 w-px bg-white/10"></div>

              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg transition-all text-sm font-medium"
              >
                Officer Login
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCitizenTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-white/20 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="text-sm font-medium relative z-10">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>

      {/* Emergency Helpline Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="px-6 py-4 flex items-center justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-slate-400">National Cybercrime Helpline</div>
              <div className="text-lg font-bold text-white">1930</div>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="text-sm text-slate-400">
            Available 24/7 • Toll Free • All India
          </div>
        </div>
      </footer>
    </div>
  );
}
