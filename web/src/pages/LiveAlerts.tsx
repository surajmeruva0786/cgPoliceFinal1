import { motion } from 'motion/react';
import { AlertTriangle, MapPin, Clock, Phone, Video, Plus, Send, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LiveAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '', description: '', severity: 'medium', location: 'Pan India', type: 'general'
  });
  const [sending, setSending] = useState(false);

  const fetchAlerts = () => {
    fetch('http://localhost:8000/alerts?active_only=false&limit=50')
      .then(r => r.json())
      .then(data => setAlerts(data))
      .catch(err => console.error('Alert fetch error:', err));
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateAlert = async () => {
    if (!newAlert.title || !newAlert.description) return;
    setSending(true);
    try {
      await fetch('http://localhost:8000/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlert),
      });
      setNewAlert({ title: '', description: '', severity: 'medium', location: 'Pan India', type: 'general' });
      setShowForm(false);
      fetchAlerts();
    } catch (err) {
      console.error('Create alert error:', err);
    } finally {
      setSending(false);
    }
  };

  const severityConfig: any = {
    critical: { bg: '#E6394620', border: '#E63946', text: '#E63946', label: 'CRITICAL' },
    high: { bg: '#F4A26120', border: '#F4A261', text: '#F4A261', label: 'HIGH' },
    medium: { bg: '#2F80ED20', border: '#2F80ED', text: '#2F80ED', label: 'MEDIUM' },
    low: { bg: '#2A9D8F20', border: '#2A9D8F', text: '#2A9D8F', label: 'LOW' },
  };

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const highCount = alerts.filter(a => a.severity === 'high').length;
  const activeCount = alerts.filter(a => a.is_active).length;

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-2">Live Fraud Alerts</h2>
          <p className="text-[#94A3B8]">Create alerts visible to all citizens on the mobile app</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Cancel' : 'Create Alert'}
        </button>
      </div>

      {/* Create Alert Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#12283A] border border-[#2F80ED]/30 rounded-xl p-6 space-y-4"
        >
          <h3 className="text-lg font-bold text-white mb-2">New Alert (visible to citizens)</h3>
          <input
            type="text"
            value={newAlert.title}
            onChange={e => setNewAlert({ ...newAlert, title: e.target.value })}
            placeholder="Alert Title"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50"
          />
          <textarea
            value={newAlert.description}
            onChange={e => setNewAlert({ ...newAlert, description: e.target.value })}
            placeholder="Alert Description"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 resize-none"
          />
          <div className="grid grid-cols-3 gap-4">
            <select
              value={newAlert.severity}
              onChange={e => setNewAlert({ ...newAlert, severity: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400/50"
            >
              <option value="critical">🔴 Critical</option>
              <option value="high">🟠 High</option>
              <option value="medium">🔵 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <input
              type="text"
              value={newAlert.location}
              onChange={e => setNewAlert({ ...newAlert, location: e.target.value })}
              placeholder="Location"
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50"
            />
            <select
              value={newAlert.type}
              onChange={e => setNewAlert({ ...newAlert, type: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400/50"
            >
              <option value="general">General</option>
              <option value="phishing">Phishing</option>
              <option value="deepfake">Deepfake</option>
              <option value="scam_call">Scam Call</option>
              <option value="bank_fraud">Bank Fraud</option>
            </select>
          </div>
          <button
            onClick={handleCreateAlert}
            disabled={sending || !newAlert.title || !newAlert.description}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-medium transition-all"
          >
            <Send className="w-4 h-4" />
            {sending ? 'Sending...' : 'Publish Alert to Citizens'}
          </button>
        </motion.div>
      )}

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#E63946]/10 border border-[#E63946]/30 rounded-xl p-4">
          <div className="text-sm text-[#E63946] mb-1">Critical Alerts</div>
          <div className="text-3xl font-bold text-[#E63946]">{criticalCount}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#F4A261]/10 border border-[#F4A261]/30 rounded-xl p-4">
          <div className="text-sm text-[#F4A261] mb-1">High Priority</div>
          <div className="text-3xl font-bold text-[#F4A261]">{highCount}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#2F80ED]/10 border border-[#2F80ED]/30 rounded-xl p-4">
          <div className="text-sm text-[#2F80ED] mb-1">Active Alerts</div>
          <div className="text-3xl font-bold text-[#2F80ED]">{activeCount}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 rounded-xl p-4">
          <div className="text-sm text-[#2A9D8F] mb-1">Total Alerts</div>
          <div className="text-3xl font-bold text-[#2A9D8F]">{alerts.length}</div>
        </motion.div>
      </div>

      {/* Alerts List — from database */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-slate-400 text-center py-12">No alerts yet. Create one above to broadcast to all citizens.</p>
        ) : (
          alerts.map((alert, index) => {
            const config = severityConfig[alert.severity] || severityConfig.medium;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6 hover:border-[#2F80ED]/40 transition-all duration-300"
                style={{ borderLeftWidth: '4px', borderLeftColor: config.border }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: config.bg }}
                  >
                    <AlertTriangle className="w-6 h-6" style={{ color: config.text }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#F1F5F9]">{alert.title}</h3>
                      <div className="flex items-center gap-2">
                        {!alert.is_active && (
                          <span className="px-2 py-0.5 bg-slate-500/20 text-slate-400 text-xs rounded-full border border-slate-500/30">INACTIVE</span>
                        )}
                        <div
                          className="px-3 py-1 rounded-full text-xs font-bold ml-2 flex-shrink-0"
                          style={{ backgroundColor: config.bg, color: config.text }}
                        >
                          {config.label}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#94A3B8] mb-4">{alert.description}</p>
                    <div className="flex items-center gap-6 text-sm text-[#94A3B8]">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(alert.created_at).toLocaleString()}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-white/5 rounded-full">{alert.type}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
