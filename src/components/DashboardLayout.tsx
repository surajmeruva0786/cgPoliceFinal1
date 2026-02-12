import { Outlet, useNavigate, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Video, 
  UserCheck, 
  Brain, 
  MessageSquare, 
  Newspaper, 
  FileText,
  LogOut,
  Shield,
  User,
  Link as LinkIcon,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { path: '/dashboard/citizen-monitoring', label: 'Citizen Monitoring', icon: Users },
  { path: '/dashboard/alerts', label: 'Live Alerts', icon: AlertTriangle },
  { path: '/dashboard/fraud-detection', label: 'URL Detector', icon: LinkIcon },
  { path: '/dashboard/deepfake', label: 'Deepfake', icon: Video },
  { path: '/dashboard/identity', label: 'Identity', icon: UserCheck },
  { path: '/dashboard/intelligence', label: 'Intelligence', icon: Brain },
  { path: '/dashboard/chatbot', label: 'AI Assistant', icon: MessageSquare },
  { path: '/dashboard/newspaper', label: 'News Intel', icon: Newspaper },
  { path: '/dashboard/documents', label: 'Documents', icon: FileText },
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', { 
      dateStyle: 'medium', 
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
        <div className="px-6 py-4">
          {/* Top Row - Branding and User Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-white to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-slate-900" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  National Digital Fraud Prevention Platform
                </h1>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span>System Operational</span>
                  </div>
                  <span>•</span>
                  <span>{getCurrentTime()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg backdrop-blur-sm">
                <div className="text-xs text-amber-400 font-medium">Active Alerts</div>
                <div className="text-xl font-bold text-white">247</div>
              </div>
              
              <div className="h-10 w-px bg-white/10"></div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">IG Cyber Crime</div>
                  <div className="text-xs text-slate-400">Inspector General</div>
                </div>
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-blue-400/20">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="h-10 w-px bg-white/10"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Bottom Row - Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
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
    </div>
  );
}