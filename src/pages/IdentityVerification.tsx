import { motion } from 'motion/react';
import { Search, UserCheck, XCircle, Shield, Upload, Camera } from 'lucide-react';
import { useState } from 'react';

const verifiedOfficer = {
  name: 'Inspector Rajesh Kumar',
  rank: 'Sub-Inspector',
  department: 'Cyber Crime Investigation',
  officerId: 'IPS-2024-4567',
  location: 'Maharashtra Police',
  verified: true,
  matchConfidence: 96
};

export function IdentityVerification() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#F1F5F9] mb-2">Identity Verification System</h2>
        <p className="text-[#94A3B8]">Verify law enforcement officials and detect impersonation attempts</p>
      </div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
      >
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter name / officer ID / upload face frame"
                className="w-full bg-[#0B1C2D] border border-[#2F80ED]/30 rounded-lg pl-12 pr-4 py-4 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#2F80ED] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-8 bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white rounded-lg font-medium transition-all duration-300"
            >
              Verify Identity
            </button>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-[#0B1C2D] border border-[#2F80ED]/30 text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#2F80ED] rounded-lg text-sm transition-all duration-300"
            >
              <Upload className="w-4 h-4" />
              Upload Image
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-[#0B1C2D] border border-[#2F80ED]/30 text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#2F80ED] rounded-lg text-sm transition-all duration-300"
            >
              <Camera className="w-4 h-4" />
              Capture from Video
            </button>
          </div>
        </form>
      </motion.div>

      {/* Results Section */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Captured Face */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">Captured Face</h3>
            <div className="aspect-square bg-[#0B1C2D] rounded-lg flex items-center justify-center mb-4">
              <UserCheck className="w-24 h-24 text-[#2F80ED]/30" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Source:</span>
                <span className="text-[#F1F5F9]">Video Call Frame</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Quality:</span>
                <span className="text-[#2A9D8F]">High</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Timestamp:</span>
                <span className="text-[#F1F5F9]">12 Feb 2026, 14:23 IST</span>
              </div>
            </div>
          </div>

          {/* Matched Profile */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#F1F5F9]">Matched Official Profile</h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#2A9D8F]/20 text-[#2A9D8F] rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Verified
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#0B1C2D] rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-[#2F80ED]/20 rounded-full flex items-center justify-center">
                    <UserCheck className="w-8 h-8 text-[#2F80ED]" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#F1F5F9]">{verifiedOfficer.name}</div>
                    <div className="text-sm text-[#94A3B8]">{verifiedOfficer.rank}</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-[#2F80ED]/10">
                    <span className="text-[#94A3B8]">Officer ID:</span>
                    <span className="text-[#F1F5F9] font-medium">{verifiedOfficer.officerId}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#2F80ED]/10">
                    <span className="text-[#94A3B8]">Department:</span>
                    <span className="text-[#F1F5F9] font-medium">{verifiedOfficer.department}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#2F80ED]/10">
                    <span className="text-[#94A3B8]">Location:</span>
                    <span className="text-[#F1F5F9] font-medium">{verifiedOfficer.location}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#94A3B8]">Match Confidence:</span>
                    <span className="text-[#2A9D8F] font-bold">{verifiedOfficer.matchConfidence}%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#2A9D8F] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-[#2A9D8F] mb-1">Verification Successful</div>
                    <p className="text-xs text-[#94A3B8]">
                      This individual matches verified official records in the national database. Identity confirmed with high confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Impersonation Alert Example (Hidden by default) */}
      {false && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#E63946]/10 border border-[#E63946]/30 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#E63946]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-[#E63946]" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#E63946] mb-2">No Official Record Found</h3>
              <p className="text-[#F1F5F9] mb-4">
                The provided identity does not match any verified official in the national database. This may be an impersonation attempt.
              </p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[#E63946] hover:bg-[#E63946]/90 text-white rounded-lg text-sm font-medium transition-all duration-300">
                  Flag as Threat
                </button>
                <button className="px-4 py-2 bg-[#0B1C2D] border border-[#E63946]/30 text-[#E63946] hover:bg-[#E63946]/10 rounded-lg text-sm font-medium transition-all duration-300">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Verifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">Recent Verifications</h3>
        <div className="space-y-3">
          {[
            { name: 'DCP Sharma', status: 'verified', time: '5 min ago', confidence: 98 },
            { name: 'Inspector Verma', status: 'verified', time: '12 min ago', confidence: 94 },
            { name: 'Unknown Individual', status: 'failed', time: '28 min ago', confidence: 12 },
            { name: 'SI Patel', status: 'verified', time: '45 min ago', confidence: 97 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#0B1C2D] rounded-lg hover:bg-[#0B1C2D]/70 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.status === 'verified' ? 'bg-[#2A9D8F]/20' : 'bg-[#E63946]/20'
                }`}>
                  {item.status === 'verified' ? (
                    <UserCheck className="w-5 h-5 text-[#2A9D8F]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#E63946]" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-[#F1F5F9]">{item.name}</div>
                  <div className="text-xs text-[#94A3B8]">{item.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#94A3B8]">
                  Confidence: <span className={item.status === 'verified' ? 'text-[#2A9D8F]' : 'text-[#E63946]'}>{item.confidence}%</span>
                </span>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'verified' 
                    ? 'bg-[#2A9D8F]/20 text-[#2A9D8F]' 
                    : 'bg-[#E63946]/20 text-[#E63946]'
                }`}>
                  {item.status === 'verified' ? 'Verified' : 'Failed'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
