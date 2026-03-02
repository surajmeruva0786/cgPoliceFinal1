import { motion } from 'motion/react';
import { Phone, Video, MessageSquare, CreditCard, Shield, AlertTriangle } from 'lucide-react';

const tips = [
  {
    icon: Phone,
    title: 'Digital Arrest Scams',
    color: 'red',
    points: [
      'Police NEVER make arrest calls demanding money',
      'No government agency asks for payment over phone',
      'Hang up immediately if threatened with arrest',
      'Verify through official channels - Call 100 or 1930',
      'Do not share OTP, card details, or transfer money'
    ]
  },
  {
    icon: Video,
    title: 'Deepfake Video Calls',
    color: 'purple',
    points: [
      'Criminals use AI to impersonate officials in video calls',
      'Ask questions only you and the real person would know',
      'Look for unnatural facial movements or voice glitches',
      'Request to meet in person at police station',
      'Record the call if possible and report immediately'
    ]
  },
  {
    icon: MessageSquare,
    title: 'SMS & WhatsApp Frauds',
    color: 'green',
    points: [
      'Banks never ask for OTP, PIN, or card details via message',
      'Verify sender before clicking any links',
      'Check for spelling errors and suspicious URLs',
      'Don\'t download APK files from unknown sources',
      'Forward suspicious messages to 1909'
    ]
  },
  {
    icon: CreditCard,
    title: 'UPI & Payment Frauds',
    color: 'amber',
    points: [
      'Never accept payment requests from unknown numbers',
      'Verify UPI ID before sending money',
      'Don\'t share QR codes or screenshots of payment apps',
      'Set daily transaction limits on your accounts',
      'Report unauthorized transactions within 24 hours'
    ]
  },
  {
    icon: Shield,
    title: 'Investment Scams',
    color: 'blue',
    points: [
      'If returns sound too good to be true, they usually are',
      'Verify investment platforms with SEBI/RBI',
      'Don\'t invest based on WhatsApp group tips',
      'Research company credentials before investing',
      'Beware of celebrity endorsement deepfakes'
    ]
  }
];

export function CitizenProtectionTips() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Cyber Safety Guide</h2>
        <p className="text-slate-400">Learn how to protect yourself from digital frauds and scams</p>
      </div>

      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
              <AlertTriangle className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Emergency Helpline</h3>
              <p className="text-slate-400">If you're being scammed right now, call immediately</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">1930</div>
            <div className="text-sm text-slate-400">Toll Free • 24/7</div>
          </div>
        </div>
      </motion.div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          const colorMap: any = {
            red: { bg: 'from-red-500/20 to-pink-500/20', border: 'border-red-500/30', text: 'text-red-400', iconBg: 'bg-red-500/20' },
            purple: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400', iconBg: 'bg-purple-500/20' },
            green: { bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', iconBg: 'bg-emerald-500/20' },
            amber: { bg: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-400', iconBg: 'bg-amber-500/20' },
            blue: { bg: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', text: 'text-blue-400', iconBg: 'bg-blue-500/20' }
          };

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[tip.color].bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${colorMap[tip.color].iconBg} rounded-xl flex items-center justify-center border ${colorMap[tip.color].border}`}>
                    <Icon className={`w-6 h-6 ${colorMap[tip.color].text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                </div>
                <ul className="space-y-3">
                  {tip.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <div className={`w-1.5 h-1.5 rounded-full ${colorMap[tip.color].text.replace('text-', 'bg-')} mt-1.5 flex-shrink-0`}></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* General Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6">General Safety Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Never share OTP with anyone - not even bank employees',
              'Always verify caller identity through official channels',
              'Don\'t click on shortened URLs (bit.ly, etc.) from unknown sources',
              'Enable two-factor authentication on all accounts',
              'Keep your device software and apps updated',
              'Use strong, unique passwords for different accounts',
              'Be skeptical of urgent messages demanding immediate action',
              'Report all suspicious activity through this portal'
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
