import { motion } from 'motion/react';
import { AlertTriangle, MapPin, Clock, Phone, Video } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Active Deepfake Scam in Progress',
    location: 'Mumbai, Maharashtra',
    time: '2 min ago',
    description: 'Real-time deepfake video call detected impersonating IG Cyber Crime',
    icon: Video
  },
  {
    id: 2,
    type: 'high',
    title: 'Digital Arrest Call Cluster Detected',
    location: 'Pune, Maharashtra',
    time: '15 min ago',
    description: '12 simultaneous digital arrest scam calls originating from same VoIP network',
    icon: Phone
  },
  {
    id: 3,
    type: 'high',
    title: 'Bank Fraud Pattern Alert',
    location: 'Bangalore, Karnataka',
    time: '28 min ago',
    description: 'Suspicious transaction pattern detected across 5 different accounts',
    icon: AlertTriangle
  },
  {
    id: 4,
    type: 'medium',
    title: 'Investment Scam Website Active',
    location: 'Delhi NCR',
    time: '45 min ago',
    description: 'Fraudulent cryptocurrency investment site gaining traction on social media',
    icon: AlertTriangle
  },
  {
    id: 5,
    type: 'medium',
    title: 'Identity Verification Failed',
    location: 'Hyderabad, Telangana',
    time: '1 hour ago',
    description: 'Individual claiming to be police officer failed verification check',
    icon: AlertTriangle
  },
  {
    id: 6,
    type: 'critical',
    title: 'Mass Phishing Campaign Detected',
    location: 'Chennai, Tamil Nadu',
    time: '1 hour ago',
    description: 'Large-scale SMS phishing campaign targeting bank customers',
    icon: Phone
  }
];

export function LiveAlerts() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#F1F5F9] mb-2">Live Fraud Alerts</h2>
        <p className="text-[#94A3B8]">Real-time monitoring of active fraud incidents and threats</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#E63946]/10 border border-[#E63946]/30 rounded-xl p-4"
        >
          <div className="text-sm text-[#E63946] mb-1">Critical Alerts</div>
          <div className="text-3xl font-bold text-[#E63946]">3</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#F4A261]/10 border border-[#F4A261]/30 rounded-xl p-4"
        >
          <div className="text-sm text-[#F4A261] mb-1">High Priority</div>
          <div className="text-3xl font-bold text-[#F4A261]">8</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#2F80ED]/10 border border-[#2F80ED]/30 rounded-xl p-4"
        >
          <div className="text-sm text-[#2F80ED] mb-1">Active Cases</div>
          <div className="text-3xl font-bold text-[#2F80ED]">24</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 rounded-xl p-4"
        >
          <div className="text-sm text-[#2A9D8F] mb-1">Resolved Today</div>
          <div className="text-3xl font-bold text-[#2A9D8F]">16</div>
        </motion.div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          const typeConfig = {
            critical: {
              bg: '#E6394620',
              border: '#E63946',
              text: '#E63946',
              label: 'CRITICAL'
            },
            high: {
              bg: '#F4A26120',
              border: '#F4A261',
              text: '#F4A261',
              label: 'HIGH'
            },
            medium: {
              bg: '#2F80ED20',
              border: '#2F80ED',
              text: '#2F80ED',
              label: 'MEDIUM'
            }
          }[alert.type];

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6 hover:border-[#2F80ED]/40 transition-all duration-300"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: typeConfig.border
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: typeConfig.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: typeConfig.text }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#F1F5F9]">{alert.title}</h3>
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-bold ml-4 flex-shrink-0"
                      style={{ backgroundColor: typeConfig.bg, color: typeConfig.text }}
                    >
                      {typeConfig.label}
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
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#2F80ED]/10 border border-[#2F80ED]/30 text-[#2F80ED] hover:bg-[#2F80ED]/20 rounded-lg text-sm font-medium transition-all duration-300">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] hover:bg-[#E63946]/20 rounded-lg text-sm font-medium transition-all duration-300">
                    Take Action
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
