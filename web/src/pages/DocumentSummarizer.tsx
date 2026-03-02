import { motion } from 'motion/react';
import { Upload, FileText, User, MapPin, Calendar, AlertTriangle, Loader, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';

export function DocumentSummarizer() {
  const [hasDocument, setHasDocument] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setHasDocument(true); // Show the UI structure immediately, possibly with loaders
    setAnalysisResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/analyze-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      console.log("Analysis Data:", data);

      let parsedAnalysis: any = {
        summary: "Analysis failed to generate structured data.",
        clues: [],
        recommendations: [],
        risk_level: "Unknown",
        key_entities: [],
        timeline: []
      };

      if (data.analysis && typeof data.analysis === 'object') {
        // Backend returned clean JSON object
        parsedAnalysis = data.analysis;
      } else if (typeof data.analysis === 'string') {
        // Fallback parsing
        try {
          parsedAnalysis = JSON.parse(data.analysis);
        } catch (e) {
          console.error("Failed to parse LLM JSON", e);
          parsedAnalysis.summary = data.analysis;
        }
      }

      setAnalysisResult({ ...data, parsedAnalysis });

    } catch (error) {
      console.error("Error analyzing document:", error);
      alert("Failed to analyze document. Ensure backend is running.");
      setHasDocument(false);
    } finally {
      setIsAnalyzing(false);
    }
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
        />
        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed border-[#2F80ED]/30 rounded-xl p-12 text-center hover:border-[#2F80ED] transition-colors cursor-pointer"
        >
          {isAnalyzing ? (
            <Loader className="w-16 h-16 text-[#2F80ED] mx-auto mb-4 animate-spin" />
          ) : (
            <Upload className="w-16 h-16 text-[#2F80ED] mx-auto mb-4" />
          )}

          <h3 className="text-xl font-bold text-[#F1F5F9] mb-2">
            {isAnalyzing ? "Analyzing Document..." : "Upload Document"}
          </h3>
          <p className="text-[#94A3B8] mb-6">
            {isAnalyzing
              ? "Extracting text, scraping intelligence, and generating insights..."
              : "Drag and drop or click to upload FIR, complaint, or investigation documents"}
          </p>
          {!isAnalyzing && (
            <button
              className="px-6 py-3 bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white rounded-lg font-medium transition-all duration-300"
            >
              Select Files
            </button>
          )}
          <p className="text-xs text-[#94A3B8] mt-4">
            Supported formats: Images (JPG, PNG) • Max size: 10MB
          </p>
        </div>
      </motion.div>

      {/* Analysis Results */}
      {analysisResult && (
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
                      <div className="text-sm font-medium text-[#F1F5F9] mb-2">Analysis Report</div>
                      <div className="text-[#94A3B8]">Generated from Uploaded Document</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#F1F5F9] leading-relaxed whitespace-pre-wrap">
                    <strong className="text-[#2F80ED]">Summary:</strong> {analysisResult.parsedAnalysis?.summary || "No summary available."}
                  </div>
                </div>

                <div className="p-4 bg-[#0B1C2D] rounded-lg border border-[#E63946]/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-[#E63946] mb-2">Investigative Clues</div>
                      <ul className="text-sm text-[#94A3B8] space-y-1 list-disc list-inside">
                        {analysisResult.parsedAnalysis?.clues?.map((clue: string, i: number) => (
                          <li key={i}>{clue}</li>
                        )) || <li>No specific clues identified.</li>}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0B1C2D] rounded-lg">
                    <div className="text-sm text-[#94A3B8] mb-1">Risk Level</div>
                    <div className="text-2xl font-bold text-[#E63946]">{analysisResult.parsedAnalysis?.risk_level || "Unknown"}</div>
                  </div>
                  <div className="p-4 bg-[#0B1C2D] rounded-lg">
                    <div className="text-sm text-[#94A3B8] mb-1">Related Articles</div>
                    <div className="text-2xl font-bold text-[#F4A261]">{analysisResult.related_articles?.length || 0}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">Recommendations</h3>

              <div className="space-y-4">
                <div className="space-y-3">
                  {analysisResult.parsedAnalysis?.recommendations?.map((rec: string, i: number) => (
                    <div key={i} className="p-3 bg-[#0B1C2D] rounded-lg text-sm text-[#F1F5F9] border-l-2 border-[#2F80ED]">
                      {rec}
                    </div>
                  ))}
                  {!analysisResult.parsedAnalysis?.recommendations && (
                    <div className="p-3 text-[#94A3B8] text-sm">No specific recommendations.</div>
                  )}
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
            <h3 className="text-xl font-bold text-[#F1F5F9] mb-6">Extracted Intelligence</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Entities */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#2F80ED] mb-4">
                  <User className="w-5 h-5" />
                  <span className="font-medium">Key Entities</span>
                </div>
                <div className="space-y-2">
                  {analysisResult.parsedAnalysis?.key_entities?.map((entity: string, index: number) => (
                    <div key={index} className="p-3 bg-[#0B1C2D] rounded-lg text-sm text-[#F1F5F9]">
                      {entity}
                    </div>
                  )) || <div className="text-sm text-[#94A3B8]">No entities detected.</div>}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#2F80ED] mb-4">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Estimated Timeline</span>
                </div>
                <div className="space-y-2">
                  {analysisResult.parsedAnalysis?.timeline?.map((event: string, index: number) => (
                    <div key={index} className="p-3 bg-[#0B1C2D] rounded-lg text-sm text-[#F1F5F9]">
                      {event}
                    </div>
                  )) || <div className="text-sm text-[#94A3B8]">No timeline events detected.</div>}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
