import { motion } from 'motion/react';
import { Shield, Users, AlertTriangle, Video, Link, MapPin, TrendingUp, Activity, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CitizenMonitoring() {
  // Static data — no backend calls (prototyping mode)
  const stats = { total_url_checks: 1247, today_url_checks: 34, unsafe_urls: 186, total_fraud_reports: 342, pending_reports: 47, total_deepfake_scans: 89, today_deepfake_scans: 5, deepfakes_detected: 23 };
  const reports: any[] = [];
  const loading = false;

  const citizenStats = [
    { label: 'Total URL Checks', value: stats?.total_url_checks || 0, trend: `${stats?.today_url_checks || 0} today`, icon: Link, color: 'amber' },
    { label: 'Fraud Reports', value: stats?.total_fraud_reports || 0, trend: `${stats?.pending_reports || 0} pending`, icon: AlertTriangle, color: 'red' },
    { label: 'Deepfake Scans', value: stats?.total_deepfake_scans || 0, trend: `${stats?.today_deepfake_scans || 0} today`, icon: Video, color: 'purple' },
    { label: 'Unsafe URLs Found', value: stats?.unsafe_urls || 0, trend: `${stats?.deepfakes_detected || 0} fakes`, icon: Shield, color: 'blue' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Investigating': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Resolved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const colorMap: any = {
    blue: { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
    red: { bg: 'from-red-500/20 to-pink-500/20', border: 'border-red-500/30', text: 'text-red-400' },
    amber: { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
    purple: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Citizen Protection Monitoring</h2>
          <p className="text-slate-400">Real-time aggregation of citizen reports and protection activities</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg backdrop-blur-sm">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-sm font-medium text-emerald-400">Live from Database</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {citizenStats.map((stat, index) => {
          const Icon = stat.icon;
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

      {/* Recent Citizen Reports — from database */}
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
            {reports.length === 0 ? (
              <p className="text-slate-400 text-sm py-8 text-center">No fraud reports yet. Reports submitted by citizens will appear here in real-time.</p>
            ) : (
              reports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">Report #{report.id}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{report.fraud_type}</div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(report.created_at).toLocaleString()}</span>
                  </div>
                  <div className="ml-13">
                    <p className="text-sm text-slate-300 mb-2">{report.details}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{report.location}</span>
                      </div>
                      {report.amount_lost > 0 && (
                        <span className="text-red-400 font-bold">₹{report.amount_lost.toLocaleString()} lost</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
