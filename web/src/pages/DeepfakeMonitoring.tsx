import { motion } from 'motion/react';
import { Video, AlertTriangle, CheckCircle, XCircle, Flag, Bell, Save, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export function DeepfakeMonitoring() {
  const [scans, setScans] = useState<any[]>([]);
  const [latestScan, setLatestScan] = useState<any>(null);

  // No backend fetch — scans list starts empty (prototyping mode)

  const confidence = latestScan ? Math.round(latestScan.confidence * 100) : 50;
  const prediction = latestScan?.prediction || 'UNKNOWN';

  const getStatusConfig = () => {
    if (!latestScan) return { label: 'Waiting for Scans', color: '#cbd5e1', icon: Activity, bg: 'from-slate-500/20 to-gray-500/20' };
    switch (prediction) {
      case 'REAL':
        return { label: 'Likely Real', color: '#10b981', icon: CheckCircle, bg: 'from-emerald-500/20 to-green-500/20' };
      case 'FAKE':
        return { label: 'Deepfake Detected', color: '#ef4444', icon: XCircle, bg: 'from-red-500/20 to-pink-500/20' };
      default:
        return { label: 'Analyzing...', color: '#f59e0b', icon: AlertTriangle, bg: 'from-amber-500/20 to-orange-500/20' };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Deepfake Detection System</h2>
          <p className="text-slate-400">Advanced AI-powered authenticity verification</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
          <Activity className="w-4 h-4 text-red-400 animate-pulse" />
          <span className="text-sm font-medium text-red-400">Live Analysis Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Latest Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Video Player */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
                <Video className="w-20 h-20 text-slate-700 relative z-10" />
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold animate-pulse shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping absolute"></div>
                  <div className="w-2 h-2 bg-white rounded-full relative"></div>
                  <span>{latestScan ? 'LATEST RESULT' : 'ANALYZING'}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-gradient-to-r ${statusConfig.bg} border backdrop-blur-sm shadow-lg`}
                  style={{ borderColor: `${statusConfig.color}40` }}
                >
                  <StatusIcon className="w-5 h-5" style={{ color: statusConfig.color }} />
                  <span style={{ color: statusConfig.color }}>{statusConfig.label}</span>
                </div>
                <div className="text-sm text-slate-400">
                  Confidence: <span className="text-white font-bold text-lg ml-1">{confidence}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Meter */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6">Authenticity Assessment</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-400 font-medium">Manipulation Probability</span>
                  <span className="text-white font-bold text-base">{confidence}%</span>
                </div>
                <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      background: confidence > 70
                        ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                        : confidence > 40
                          ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                          : 'linear-gradient(90deg, #10b981, #059669)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 pt-1">
                  <span>Authentic</span>
                  <span>Questionable</span>
                  <span>Manipulated</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Recent Citizen Uploads — from DB */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Recent Citizen Uploads</h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {scans.length === 0 ? (
                  <p className="text-slate-400 text-sm py-8 text-center">No deepfake scans yet. Citizen uploads will appear here in real-time.</p>
                ) : (
                  scans.map((scan) => (
                    <div key={scan.id} className="flex justify-between items-center py-3 px-3 rounded-xl border border-white/5 hover:border-white/10 bg-white/[0.02] transition-all">
                      <div>
                        <div className="text-white text-sm font-medium truncate w-48" title={scan.filename}>{scan.filename}</div>
                        <div className="text-xs text-slate-500">{new Date(scan.scanned_at).toLocaleString()}</div>
                      </div>
                      <div className={`text-xs font-bold px-3 py-1.5 rounded-full ${scan.prediction === 'FAKE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}>
                        {scan.prediction} ({(scan.confidence * 100).toFixed(0)}%)
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Detection Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                  <div className="text-2xl font-bold text-white">{scans.length}</div>
                  <div className="text-sm text-slate-400">Total Scans</div>
                </div>
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                  <div className="text-2xl font-bold text-red-400">{scans.filter(s => s.prediction === 'FAKE').length}</div>
                  <div className="text-sm text-slate-400">Fakes Found</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
