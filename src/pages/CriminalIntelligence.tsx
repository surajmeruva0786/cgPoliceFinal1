import { motion } from 'motion/react';
import { Network, Phone, MapPin, AlertTriangle, User, Link2 } from 'lucide-react';

const criminalProfile = {
  name: 'Rajesh M. (Suspected)',
  aliases: ['Raj Kumar', 'Bobby Digital', 'Tech Raj'],
  phoneNumbers: ['+91-9876543210', '+91-8765432109', '+91-7654321098'],
  locations: ['Mumbai', 'Pune', 'Bangalore'],
  deepfakeIncidents: 12,
  fraudCases: 8,
  lastActivity: '2 days ago',
  riskLevel: 'HIGH'
};

const networkNodes = [
  { id: 1, type: 'phone', label: '+91-98765...', x: 30, y: 30 },
  { id: 2, type: 'person', label: 'Suspect A', x: 70, y: 20 },
  { id: 3, type: 'location', label: 'Mumbai', x: 50, y: 60 },
  { id: 4, type: 'phone', label: '+91-87654...', x: 20, y: 70 },
  { id: 5, type: 'person', label: 'Suspect B', x: 80, y: 70 },
];

const insights = [
  {
    title: 'Fraud Pattern Detected',
    description: 'Suspect operates primarily during evening hours (6 PM - 10 PM)',
    severity: 'high'
  },
  {
    title: 'Geographic Cluster',
    description: 'Multiple incidents reported in Maharashtra region within 2-week period',
    severity: 'medium'
  },
  {
    title: 'Technology Profile',
    description: 'Uses advanced deepfake tools and encrypted communication channels',
    severity: 'high'
  },
  {
    title: 'Network Analysis',
    description: 'Connected to 7 other suspects through shared phone numbers',
    severity: 'medium'
  }
];

export function CriminalIntelligence() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#F1F5F9] mb-2">Criminal Intelligence Network</h2>
        <p className="text-[#94A3B8]">Advanced pattern detection and relationship mapping</p>
      </div>

      {/* Network Graph Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#F1F5F9]">Network Relationship Graph</h3>
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Network className="w-4 h-4" />
            <span>5 Nodes • 7 Connections</span>
          </div>
        </div>

        <div className="relative h-96 bg-[#0B1C2D] rounded-lg overflow-hidden">
          {/* Network visualization */}
          <svg className="w-full h-full">
            {/* Connection lines */}
            <line x1="30%" y1="30%" x2="70%" y2="20%" stroke="#2F80ED" strokeWidth="2" opacity="0.5" />
            <line x1="30%" y1="30%" x2="50%" y2="60%" stroke="#2F80ED" strokeWidth="2" opacity="0.5" />
            <line x1="70%" y1="20%" x2="50%" y2="60%" stroke="#2F80ED" strokeWidth="2" opacity="0.5" />
            <line x1="50%" y1="60%" x2="20%" y2="70%" stroke="#2F80ED" strokeWidth="2" opacity="0.5" />
            <line x1="50%" y1="60%" x2="80%" y2="70%" stroke="#2F80ED" strokeWidth="2" opacity="0.5" />
            <line x1="70%" y1="20%" x2="80%" y2="70%" stroke="#F4A261" strokeWidth="2" opacity="0.3" />
            <line x1="30%" y1="30%" x2="20%" y2="70%" stroke="#F4A261" strokeWidth="2" opacity="0.3" />
          </svg>

          {/* Network nodes */}
          {networkNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="absolute"
              style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative group">
                <div className="w-16 h-16 bg-[#2F80ED]/20 border-2 border-[#2F80ED] rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  {node.type === 'phone' && <Phone className="w-6 h-6 text-[#2F80ED]" />}
                  {node.type === 'person' && <User className="w-6 h-6 text-[#2F80ED]" />}
                  {node.type === 'location' && <MapPin className="w-6 h-6 text-[#2F80ED]" />}
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#12283A] border border-[#2F80ED]/30 px-3 py-1 rounded text-xs text-[#F1F5F9] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {node.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#2F80ED] rounded-full"></div>
            <span className="text-[#94A3B8]">Strong Connection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#F4A261] opacity-50 rounded-full"></div>
            <span className="text-[#94A3B8]">Weak Connection</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Criminal Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-xl font-bold text-[#F1F5F9]">Criminal Profile</h3>
            <div className="px-3 py-1 bg-[#E63946]/20 text-[#E63946] rounded-full text-xs font-bold">
              {criminalProfile.riskLevel} RISK
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-2xl font-bold text-[#F1F5F9] mb-1">{criminalProfile.name}</div>
              <div className="text-sm text-[#94A3B8]">Last Activity: {criminalProfile.lastActivity}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#0B1C2D] rounded-lg">
                <div className="text-sm text-[#94A3B8] mb-1">Deepfake Incidents</div>
                <div className="text-2xl font-bold text-[#E63946]">{criminalProfile.deepfakeIncidents}</div>
              </div>
              <div className="p-4 bg-[#0B1C2D] rounded-lg">
                <div className="text-sm text-[#94A3B8] mb-1">Fraud Cases</div>
                <div className="text-2xl font-bold text-[#F4A261]">{criminalProfile.fraudCases}</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-[#F1F5F9] mb-3">Known Aliases</div>
              <div className="flex flex-wrap gap-2">
                {criminalProfile.aliases.map((alias, index) => (
                  <span key={index} className="px-3 py-1 bg-[#0B1C2D] border border-[#2F80ED]/30 text-[#94A3B8] rounded-full text-sm">
                    {alias}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-[#F1F5F9] mb-3">Linked Phone Numbers</div>
              <div className="space-y-2">
                {criminalProfile.phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#0B1C2D] rounded-lg">
                    <Phone className="w-4 h-4 text-[#2F80ED]" />
                    <span className="text-sm text-[#F1F5F9]">{phone}</span>
                    <button className="ml-auto text-xs text-[#2F80ED] hover:text-[#2F80ED]/80">
                      Track
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-[#F1F5F9] mb-3">Associated Locations</div>
              <div className="flex flex-wrap gap-2">
                {criminalProfile.locations.map((location, index) => (
                  <span key={index} className="flex items-center gap-2 px-3 py-2 bg-[#0B1C2D] border border-[#2F80ED]/30 text-[#F1F5F9] rounded-lg text-sm">
                    <MapPin className="w-4 h-4 text-[#2F80ED]" />
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pattern Insights Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">AI Pattern Insights</h3>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  insight.severity === 'high' 
                    ? 'bg-[#E63946]/10 border-[#E63946]/30' 
                    : 'bg-[#F4A261]/10 border-[#F4A261]/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle 
                    className={`w-5 h-5 flex-shrink-0 ${
                      insight.severity === 'high' ? 'text-[#E63946]' : 'text-[#F4A261]'
                    }`} 
                  />
                  <div>
                    <div className={`text-sm font-medium mb-1 ${
                      insight.severity === 'high' ? 'text-[#E63946]' : 'text-[#F4A261]'
                    }`}>
                      {insight.title}
                    </div>
                    <p className="text-xs text-[#94A3B8]">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#2F80ED]/20">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#2F80ED]/10 border border-[#2F80ED]/30 text-[#2F80ED] hover:bg-[#2F80ED]/20 rounded-lg text-sm font-medium transition-all duration-300">
              <Link2 className="w-4 h-4" />
              View Full Network Map
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
