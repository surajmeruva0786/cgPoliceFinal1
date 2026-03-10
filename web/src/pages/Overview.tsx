import { motion } from 'motion/react';
import { AlertTriangle, Video, Phone, UserCheck, Shield, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const scamCategories = [
  { name: 'Digital Arrest', value: 28, color: '#E63946' },
  { name: 'Bank Fraud', value: 24, color: '#F4A261' },
  { name: 'Deepfake', value: 18, color: '#2F80ED' },
  { name: 'Phishing', value: 20, color: '#A8DADC' },
  { name: 'Investment', value: 10, color: '#457B9D' },
];

function MetricCard({ title, value, icon: Icon, trend, trendValue }: any) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
            <Icon className="w-7 h-7 text-blue-400" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm ${trend === 'up'
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
              {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="text-4xl font-bold text-white mb-2 tracking-tight">{displayValue.toLocaleString()}</div>
        <div className="text-sm text-slate-400 font-medium">{title}</div>
      </div>
    </motion.div>
  );
}

export function Overview() {
  // Static data — no backend calls (prototyping mode)
  const stats = {
    total_url_checks: 1247,
    total_deepfake_scans: 89,
    total_fraud_reports: 342,
    total_citizens: 15420,
    unsafe_urls: 186,
    deepfakes_detected: 23,
    pending_reports: 47,
    today_url_checks: 34,
    today_deepfake_scans: 5,
    today_fraud_reports: 12,
    total_alerts: 8,
  };
  const activity: any[] = [
    { id: 'url_check-1', type: 'url_check', description: 'URL checked: https://suspicious-link.com', status: 'UNSAFE', timestamp: new Date().toISOString() },
    { id: 'deepfake-1', type: 'deepfake_scan', description: 'Deepfake scan: video_call_recording.mp4', status: 'FAKE', timestamp: new Date().toISOString() },
    { id: 'fraud-1', type: 'fraud_report', description: 'Fraud report: Digital Arrest Call', status: 'pending', timestamp: new Date().toISOString() },
    { id: 'url_check-2', type: 'url_check', description: 'URL checked: https://safe-website.gov.in', status: 'SAFE', timestamp: new Date().toISOString() },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'url_check': return { icon: Shield, color: '#2F80ED' };
      case 'deepfake_scan': return { icon: Video, color: '#E63946' };
      case 'fraud_report': return { icon: AlertTriangle, color: '#F4A261' };
      default: return { icon: Shield, color: '#2A9D8F' };
    }
  };

  const getActivityMessage = (item: any) => {
    switch (item.type) {
      case 'url_check': return `URL Check: ${item.title} — ${item.status}`;
      case 'deepfake_scan': return `Deepfake scan: ${item.title} — ${item.status} (${(item.confidence * 100).toFixed(0)}%)`;
      case 'fraud_report': return `Fraud report: ${item.title} — ${item.details?.substring(0, 50)}...`;
      default: return item.title;
    }
  };

  const fraudTrendData = [
    { day: 'Day 1', incidents: stats?.today_fraud_reports || 0 },
    { day: 'Day 5', incidents: Math.max(1, (stats?.total_fraud_reports || 0)) },
    { day: 'Day 10', incidents: stats?.today_url_checks || 0 },
    { day: 'Day 15', incidents: stats?.unsafe_urls || 0 },
    { day: 'Day 20', incidents: stats?.today_deepfake_scans || 0 },
    { day: 'Day 25', incidents: stats?.deepfakes_detected || 0 },
    { day: 'Day 30', incidents: stats?.pending_reports || 0 },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Command Center</h2>
          <p className="text-slate-400">Real-time intelligence and monitoring dashboard</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-400">All Systems Active</span>
        </div>
      </div>

      {/* Metrics Grid — using real DB stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Active Fraud Alerts"
          value={stats?.total_alerts || 0}
          icon={AlertTriangle}
          trend="up"
          trendValue={`${stats?.today_fraud_reports || 0} today`}
        />
        <MetricCard
          title="Deepfakes Detected"
          value={stats?.deepfakes_detected || 0}
          icon={Video}
          trend={stats?.today_deepfake_scans > 0 ? "up" : undefined}
          trendValue={`${stats?.today_deepfake_scans || 0} today`}
        />
        <MetricCard
          title="Fraud Reports"
          value={stats?.total_fraud_reports || 0}
          icon={Phone}
          trend={stats?.pending_reports > 0 ? "up" : undefined}
          trendValue={`${stats?.pending_reports || 0} pending`}
        />
        <MetricCard
          title="URLs Checked"
          value={stats?.total_url_checks || 0}
          icon={UserCheck}
        />
        <MetricCard
          title="Unsafe URLs Blocked"
          value={stats?.unsafe_urls || 0}
          icon={Shield}
          trend={stats?.unsafe_urls > 0 ? "up" : undefined}
          trendValue={`${stats?.today_url_checks || 0} checked today`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fraud Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Activity Overview</h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Cumulative Stats</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fraudTrendData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    backdropFilter: 'blur(12px)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#1e293b' }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                  fill="url(#lineGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Activity Feed — from database */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Live Intelligence</h3>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {activity.length === 0 ? (
                <p className="text-slate-400 text-sm">No recent activity. Data will appear here as citizens use the app.</p>
              ) : (
                activity.map((item, index) => {
                  const config = getActivityIcon(item.type);
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={`${item.type}-${item.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
                        style={{
                          backgroundColor: `${config.color}15`,
                          border: `1px solid ${config.color}30`
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 leading-relaxed">{getActivityMessage(item)}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(item.timestamp).toLocaleString()}</p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scam Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-8">Threat Category Distribution</h3>
          <div className="flex items-center justify-center gap-16">
            <ResponsiveContainer width="50%" height={300}>
              <PieChart>
                <defs>
                  {scamCategories.map((entry, index) => (
                    <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={scamCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={130}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {scamCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} stroke="rgba(15, 23, 42, 0.5)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    backdropFilter: 'blur(12px)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-4">
              {scamCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 group/item"
                >
                  <div
                    className="w-5 h-5 rounded-lg shadow-lg"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-slate-300 text-base font-medium min-w-[160px] group-hover/item:text-white transition-colors">{category.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${category.value}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></motion.div>
                    </div>
                    <span className="text-white font-bold text-lg min-w-[50px]">{category.value}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}