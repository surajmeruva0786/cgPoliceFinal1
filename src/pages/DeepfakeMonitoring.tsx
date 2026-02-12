import { motion } from 'motion/react';
import { Video, AlertTriangle, CheckCircle, XCircle, Flag, Bell, Save, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

// Default initial state
const initialData = {
  lipSyncMismatch: 'Medium',
  facialDistortion: 'Detected',
  identityVerification: 'Failed',
  confidence: 78,
  status: 'suspicious' as 'real' | 'suspicious' | 'deepfake'
};

export function DeepfakeMonitoring() {
  const [data, setData] = useState(initialData);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Poll localStorage for new alerts from citizen portal
    const checkAlerts = () => {
      const storedAlerts = JSON.parse(localStorage.getItem('deepfake_alerts') || '[]');
      if (storedAlerts.length > 0) {
        setAlerts(storedAlerts);
        // Use the most recent alert for main display
        const latest = storedAlerts[0];
        setData(prev => ({
          ...prev,
          status: latest.status,
          confidence: Math.round(latest.confidence * 100),
          // Simulate other metrics based on prediction
          facialDistortion: latest.prediction === 'FAKE' ? 'Detected' : 'Normal',
          identityVerification: latest.prediction === 'FAKE' ? 'Failed' : 'Verified',
        }));
      }
    };

    checkAlerts();
    const interval = setInterval(checkAlerts, 2000); // Check every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (data.status) {
      case 'real':
        return {
          label: 'Likely Real',
          color: '#10b981',
          icon: CheckCircle,
          bg: 'from-emerald-500/20 to-green-500/20'
        };
      case 'suspicious':
        return {
          label: 'Suspicious Activity',
          color: '#f59e0b',
          icon: AlertTriangle,
          bg: 'from-amber-500/20 to-orange-500/20'
        };
      case 'deepfake':
        return {
          label: 'Deepfake Detected',
          color: '#ef4444',
          icon: XCircle,
          bg: 'from-red-500/20 to-pink-500/20'
        };
      default:
        return {
          label: 'Unknown',
          color: '#cbd5e1',
          icon: Activity,
          bg: 'from-slate-500/20 to-gray-500/20'
        };
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
        {/* Left Column: Video Preview & Confidence */}
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
                  <span>ANALYZING</span>
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
                  Confidence: <span className="text-white font-bold text-lg ml-1">{data.confidence}%</span>
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
                  <span className="text-white font-bold text-base">{data.confidence}%</span>
                </div>
                <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.confidence}%` }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      background: data.confidence > 70
                        ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                        : data.confidence > 40
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

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-80 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative flex flex-col items-center gap-2 py-4 text-white">
                <Flag className="w-5 h-5" />
                <span className="text-sm font-semibold">Flag Case</span>
              </div>
            </button>
            <button className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 opacity-80 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative flex flex-col items-center gap-2 py-4 text-white">
                <Bell className="w-5 h-5" />
                <span className="text-sm font-semibold">Send Alert</span>
              </div>
            </button>
            <button className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative flex flex-col items-center gap-2 py-4 text-white">
                <Save className="w-5 h-5" />
                <span className="text-sm font-semibold">Save Report</span>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Reasoning & Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Forensic Analysis</h3>

              <div className="space-y-4">
                {/* Analysis Item */}
                <div className="p-4 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-xl border border-amber-500/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Lip Synchronization</span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
                      MEDIUM RISK
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Audio-visual synchronization shows moderate discrepancies in mouth movements during speech patterns
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-xl border border-red-500/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Facial Distortion</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30">
                      DETECTED
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Irregular facial feature boundaries detected around jaw and hairline areas indicating manipulation
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-red-500/5 to-pink-500/5 rounded-xl border border-red-500/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Identity Verification</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30">
                      FAILED
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Facial biometrics do not match any verified official in the national database
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl border border-blue-500/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Frame Consistency</span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
                      ANOMALIES
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Temporal inconsistencies detected between consecutive frames suggesting post-processing
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Lighting Analysis</span>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                      NORMAL
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Lighting patterns appear consistent with natural sources and environmental conditions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts List */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Recent Citizen Uploads</h3>
              <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                {alerts.length === 0 ? (
                  <p className="text-slate-400 text-sm">No recent uploads.</p>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <div>
                        <div className="text-white text-sm font-medium truncate w-48" title={alert.filename}>{alert.filename}</div>
                        <div className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</div>
                      </div>
                      <div className={`text-xs font-bold px-2 py-1 rounded-full ${alert.prediction === 'FAKE' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {alert.prediction} ({(alert.confidence * 100).toFixed(0)}%)
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
