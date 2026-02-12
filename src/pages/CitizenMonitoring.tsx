import { motion } from 'motion/react';
import { Shield, Users, AlertTriangle, Video, Link, MapPin, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const citizenStats = [
  { label: 'Active Users', value: 2847651, trend: '+15%', icon: Users, color: 'blue' },
  { label: 'Fraud Reports Today', value: 3847, trend: '+8%', icon: AlertTriangle, color: 'red' },
  { label: 'URLs Checked Today', value: 156847, trend: '+23%', icon: Link, color: 'amber' },
  { label: 'Deepfakes Detected', value: 247, trend: '+12%', icon: Video, color: 'purple' },
];

const citizenActivityData = [
  { hour: '00:00', reports: 45, urlChecks: 230, verifications: 12 },
  { hour: '04:00', reports: 23, urlChecks: 180, verifications: 8 },
  { hour: '08:00', reports: 89, urlChecks: 450, verifications: 34 },
  { hour: '12:00', reports: 156, urlChecks: 890, verifications: 67 },
  { hour: '16:00', reports: 234, urlChecks: 1200, verifications: 89 },
  { hour: '20:00', reports: 198, urlChecks: 780, verifications: 56 },
];

const regionalData = [
  { state: 'Maharashtra', reports: 847, users: 485632 },
  { state: 'Karnataka', reports: 623, users: 367891 },
  { state: 'Delhi', reports: 589, users: 298765 },
  { state: 'Tamil Nadu', reports: 456, users: 345678 },
  { state: 'Gujarat', reports: 398, users: 256789 },
];

const recentCitizenReports = [
  {
    id: 1,
    citizenId: 'CTZ-2847651',
    type: 'Digital Arrest Call',
    status: 'High Priority',
    location: 'Mumbai, Maharashtra',
    time: '2 min ago',
    details: 'Reported fake police call demanding ₹2.5L'
  },
  {
    id: 2,
    citizenId: 'CTZ-2847623',
    type: 'Phishing URL',
    status: 'Verified Threat',
    location: 'Bangalore, Karnataka',
    time: '8 min ago',
    details: 'Fake SBI KYC update website detected'
  },
  {
    id: 3,
    citizenId: 'CTZ-2847589',
    type: 'Deepfake Video',
    status: 'Under Investigation',
    location: 'Delhi NCR',
    time: '15 min ago',
    details: 'Deepfake of government official in video call'
  },
  {
    id: 4,
    citizenId: 'CTZ-2847534',
    type: 'SMS Scam',
    status: 'Confirmed Fraud',
    location: 'Pune, Maharashtra',
    time: '28 min ago',
    details: 'Lottery scam SMS with malicious link'
  },
];

export function CitizenMonitoring() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Citizen Protection Monitoring</h2>
          <p className="text-slate-400">Real-time aggregation of citizen reports and protection activities</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg backdrop-blur-sm">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-emerald-400">2.8M Citizens Protected</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {citizenStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorMap: any = {
            blue: { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
            red: { bg: 'from-red-500/20 to-pink-500/20', border: 'border-red-500/30', text: 'text-red-400' },
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
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[stat.color].bg} rounded-xl flex items-center justify-center border ${colorMap[stat.color].border}`}>
                    <Icon className={`w-6 h-6 ${colorMap[stat.color].text}`} />
                  </div>
                  <span className="text-emerald-400 text-sm font-bold">{stat.trend}</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value.toLocaleString()}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Citizen Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Citizen Activity (Last 24 Hours)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={citizenActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="hour" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(12px)'
                  }} 
                />
                <Line type="monotone" dataKey="reports" stroke="#ef4444" strokeWidth={2} name="Fraud Reports" />
                <Line type="monotone" dataKey="urlChecks" stroke="#3b82f6" strokeWidth={2} name="URL Checks" />
                <Line type="monotone" dataKey="verifications" stroke="#10b981" strokeWidth={2} name="Verifications" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Regional Activity</h3>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-medium">{region.state}</span>
                    </div>
                    <span className="text-red-400 font-bold">{region.reports}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: `${(region.reports / regionalData[0].reports) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400 min-w-[80px]">{region.users.toLocaleString()} users</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Citizen Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Live Citizen Reports</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
              <span className="text-sm text-slate-400">Real-time Feed</span>
            </div>
          </div>

          <div className="space-y-3">
            {recentCitizenReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{report.citizenId}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          report.status === 'High Priority' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          report.status === 'Verified Threat' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                          report.status === 'Under Investigation' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{report.type}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{report.time}</span>
                </div>
                <div className="ml-13">
                  <p className="text-sm text-slate-300 mb-2">{report.details}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span>{report.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl font-medium transition-all">
            View All Citizen Reports
          </button>
        </div>
      </motion.div>
    </div>
  );
}
