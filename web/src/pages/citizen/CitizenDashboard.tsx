import { motion } from 'motion/react';
import { Shield, Search, Video, UserCheck, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

const protectionStats = [
  { label: 'URLs Checked', value: 23, icon: Search, color: 'blue' },
  { label: 'Threats Blocked', value: 8, icon: Shield, color: 'green' },
  { label: 'Reports Submitted', value: 2, icon: AlertTriangle, color: 'amber' },
  { label: 'Officials Verified', value: 1, icon: UserCheck, color: 'purple' },
];

const recentActivity = [
  {
    id: 1,
    type: 'url-check',
    title: 'URL Safety Check',
    result: 'safe',
    details: 'amazon.in verified as safe',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'threat-blocked',
    title: 'Malicious URL Blocked',
    result: 'blocked',
    details: 'fake-sbi-login.com prevented',
    time: '1 day ago'
  },
  {
    id: 3,
    type: 'report',
    title: 'Fraud Reported',
    result: 'submitted',
    details: 'Digital arrest scam call reported',
    time: '3 days ago'
  },
];

const threatAlerts = [
  {
    id: 1,
    title: 'Digital Arrest Scam Active',
    severity: 'high',
    description: 'Fake police calls targeting citizens in your area',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Phishing SMS Campaign',
    severity: 'medium',
    description: 'Fake bank KYC update messages being sent',
    time: '1 day ago'
  },
];

export function CitizenDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Check URL Safety',
      description: 'Verify if a link is safe',
      icon: Search,
      color: 'blue',
      path: '/citizen/url-checker'
    },
    {
      title: 'Detect Deepfake',
      description: 'Scan video calls for manipulation',
      icon: Video,
      color: 'purple',
      path: '/citizen/deepfake-detector'
    },
    {
      title: 'Verify Official',
      description: 'Check if police officer is real',
      icon: UserCheck,
      color: 'green',
      path: '/citizen/verify-official'
    },
    {
      title: 'Report Fraud',
      description: 'Submit suspicious activity',
      icon: AlertTriangle,
      color: 'red',
      path: '/citizen/report-fraud'
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-slate-400">Your personal protection dashboard</p>
      </div>

      {/* Protection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {protectionStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorMap: any = {
            blue: { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
            green: { bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
            amber: { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
            purple: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400' }
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[stat.color].bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
                <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[stat.color].bg} rounded-xl flex items-center justify-center border ${colorMap[stat.color].border} mb-4`}>
                  <Icon className={`w-6 h-6 ${colorMap[stat.color].text}`} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const colorMap: any = {
                blue: { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400', hover: 'hover:border-blue-500/50' },
                purple: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400', hover: 'hover:border-purple-500/50' },
                green: { bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', hover: 'hover:border-emerald-500/50' },
                red: { bg: 'from-red-500/20 to-pink-500/20', border: 'border-red-500/30', text: 'text-red-400', hover: 'hover:border-red-500/50' }
              };

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => navigate(action.path)}
                  className={`text-left p-5 bg-white/5 border ${colorMap[action.color].border} ${colorMap[action.color].hover} rounded-xl transition-all group/card`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[action.color].bg} rounded-xl flex items-center justify-center border ${colorMap[action.color].border} mb-4 group-hover/card:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${colorMap[action.color].text}`} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{action.title}</h4>
                  <p className="text-sm text-slate-400">{action.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.result === 'safe' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                    activity.result === 'blocked' ? 'bg-red-500/20 border border-red-500/30' :
                    'bg-blue-500/20 border border-blue-500/30'
                  }`}>
                    {activity.result === 'safe' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    {activity.result === 'blocked' && <XCircle className="w-5 h-5 text-red-400" />}
                    {activity.result === 'submitted' && <TrendingUp className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white mb-1">{activity.title}</div>
                    <div className="text-xs text-slate-400 mb-2">{activity.details}</div>
                    <div className="text-xs text-slate-500">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Threat Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Active Threat Alerts</h3>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
            </div>
            <div className="space-y-3">
              {threatAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    alert.severity === 'high'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-amber-500/10 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                      alert.severity === 'high' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white mb-1">{alert.title}</div>
                      <div className="text-xs text-slate-400 mb-2">{alert.description}</div>
                      <div className="text-xs text-slate-500">{alert.time}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Protection Tips Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                <Shield className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Stay Protected</h3>
                <p className="text-sm text-slate-400">Learn how to identify and avoid cyber frauds</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/citizen/protection-tips')}
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-xl font-semibold transition-all"
            >
              View Tips
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
