import { motion } from 'motion/react';
import { Video, AlertTriangle, CheckCircle, Upload, Camera } from 'lucide-react';

export function CitizenDeepfakeDetector() {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Deepfake Video Detector</h2>
        <p className="text-slate-400">Scan video calls and recordings for manipulation</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center">
            <Video className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Upload Video or Record Call</h3>
            <p className="text-slate-400 mb-6">Supports MP4, MOV, AVI formats • Max 50MB</p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-400 rounded-xl font-medium transition-all flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Video
              </button>
              <button className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 rounded-xl font-medium transition-all flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Record Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-amber-400 mb-1">Deepfake Warning</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Criminals use deepfake technology to impersonate police officers and government officials in video calls. Always verify identity through official channels before taking any action or sharing information.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
