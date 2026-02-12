import { motion } from 'motion/react';
import { Upload, FileText, User, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export function DocumentSummarizer() {
  const [hasDocument, setHasDocument] = useState(false);

  const handleUpload = () => {
    setHasDocument(true);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#F1F5F9] mb-2">Document & FIR Summarizer</h2>
        <p className="text-[#94A3B8]">AI-powered document analysis and entity extraction</p>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-8"
      >
        <div className="border-2 border-dashed border-[#2F80ED]/30 rounded-xl p-12 text-center hover:border-[#2F80ED] transition-colors cursor-pointer">
          <Upload className="w-16 h-16 text-[#2F80ED] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#F1F5F9] mb-2">Upload Document</h3>
          <p className="text-[#94A3B8] mb-6">
            Drag and drop or click to upload FIR, complaint, or investigation documents
          </p>
          <button
            onClick={handleUpload}
            className="px-6 py-3 bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white rounded-lg font-medium transition-all duration-300"
          >
            Select Files
          </button>
          <p className="text-xs text-[#94A3B8] mt-4">
            Supported formats: PDF, DOC, DOCX, TXT • Max size: 10MB
          </p>
        </div>
      </motion.div>

      {/* Analysis Results */}
      {hasDocument && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">AI Summary</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#0B1C2D] rounded-lg border border-[#2F80ED]/20">
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="w-5 h-5 text-[#2F80ED] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-[#F1F5F9] mb-2">Document Type</div>
                      <div className="text-[#94A3B8]">First Information Report (FIR)</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#F1F5F9] leading-relaxed">
                    <strong className="text-[#2F80ED]">Case Summary:</strong> Complaint filed regarding digital arrest scam where complainant received a video call from individuals impersonating Mumbai Police officials. The perpetrators claimed the complainant's Aadhaar card was linked to illegal activities and demanded immediate payment of ₹2,50,000 to avoid arrest. The victim transferred ₹1,80,000 before realizing the scam. Investigation reveals use of deepfake technology and VoIP numbers registered outside India.
                  </div>
                </div>

                <div className="p-4 bg-[#0B1C2D] rounded-lg border border-[#E63946]/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-[#E63946] mb-2">Key Findings</div>
                      <ul className="text-sm text-[#94A3B8] space-y-1 list-disc list-inside">
                        <li>Deepfake technology confirmed</li>
                        <li>International VoIP numbers used</li>
                        <li>Multiple bank accounts involved</li>
                        <li>Similar pattern to 7 other reported cases</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0B1C2D] rounded-lg">
                    <div className="text-sm text-[#94A3B8] mb-1">Amount Involved</div>
                    <div className="text-2xl font-bold text-[#E63946]">₹1,80,000</div>
                  </div>
                  <div className="p-4 bg-[#0B1C2D] rounded-lg">
                    <div className="text-sm text-[#94A3B8] mb-1">Linked Cases</div>
                    <div className="text-2xl font-bold text-[#F4A261]">7</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Risk Classification */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">Risk Classification</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#E63946]/10 border border-[#E63946]/30 rounded-lg text-center">
                  <div className="text-sm text-[#94A3B8] mb-2">Threat Level</div>
                  <div className="text-3xl font-bold text-[#E63946]">HIGH</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#94A3B8]">Urgency</span>
                      <span className="text-[#E63946] font-bold">Critical</span>
                    </div>
                    <div className="h-2 bg-[#0B1C2D] rounded-full overflow-hidden">
                      <div className="h-full bg-[#E63946] rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#94A3B8]">Complexity</span>
                      <span className="text-[#F4A261] font-bold">High</span>
                    </div>
                    <div className="h-2 bg-[#0B1C2D] rounded-full overflow-hidden">
                      <div className="h-full bg-[#F4A261] rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#94A3B8]">Evidence Quality</span>
                      <span className="text-[#2A9D8F] font-bold">Good</span>
                    </div>
                    <div className="h-2 bg-[#0B1C2D] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2A9D8F] rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#2F80ED]/20">
                  <button className="w-full py-3 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] hover:bg-[#E63946]/20 rounded-lg text-sm font-medium transition-all duration-300">
                    Mark as Priority Case
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Extracted Entities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">Extracted Entities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Names */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#2F80ED] mb-4">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Names</span>
                </div>
                <div className="space-y-2">
                  {['Ramesh Kumar (Complainant)', 'Inspector Sharma (Impersonated)', 'DCP Verma (Impersonated)', 'Unknown Suspect 1', 'Unknown Suspect 2'].map((name, index) => (
                    <div key={index} className="p-3 bg-[#0B1C2D] rounded-lg text-sm text-[#F1F5F9]">
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#2F80ED] mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Locations</span>
                </div>
                <div className="space-y-2">
                  {['Mumbai, Maharashtra', 'Andheri West', 'BKC Branch (Bank)', 'International (VoIP Origin)'].map((location, index) => (
                    <div key={index} className="p-3 bg-[#0B1C2D] rounded-lg text-sm text-[#F1F5F9]">
                      {location}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates & Timeline */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#2F80ED] mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Timeline</span>
                </div>
                <div className="space-y-2">
                  {['8 Feb 2026 - First Call', '8 Feb 2026 - Payment Made', '9 Feb 2026 - FIR Filed', '10 Feb 2026 - Investigation Started', '12 Feb 2026 - Current Status'].map((date, index) => (
                    <div key={index} className="p-3 bg-[#0B1C2D] rounded-lg text-sm text-[#F1F5F9]">
                      {date}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-4"
          >
            <button className="flex-1 py-4 bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white rounded-lg font-medium transition-all duration-300">
              Generate Full Report
            </button>
            <button className="flex-1 py-4 bg-[#0B1C2D] border border-[#2F80ED]/30 text-[#2F80ED] hover:bg-[#2F80ED]/10 rounded-lg font-medium transition-all duration-300">
              Export as PDF
            </button>
            <button className="flex-1 py-4 bg-[#0B1C2D] border border-[#2F80ED]/30 text-[#2F80ED] hover:bg-[#2F80ED]/10 rounded-lg font-medium transition-all duration-300">
              Add to Intelligence Database
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}
