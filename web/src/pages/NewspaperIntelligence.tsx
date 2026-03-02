import { motion } from 'motion/react';
import { Newspaper, TrendingUp, AlertTriangle, ExternalLink, RefreshCw, Loader } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const trendData = [
  { day: 'Mon', mentions: 12 },
  { day: 'Tue', mentions: 18 },
  { day: 'Wed', mentions: 15 },
  { day: 'Thu', mentions: 24 },
  { day: 'Fri', mentions: 21 },
  { day: 'Sat', mentions: 16 },
  { day: 'Sun', mentions: 14 },
];

export function NewspaperIntelligence() {
  const [newsData, setNewsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/news-intel');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();

      let parsedAnalysis: any = {
        summary: "News analysis currently unavailable.",
        trends: [],
        action_items: []
      };

      if (data.analysis && typeof data.analysis === 'object') {
        parsedAnalysis = data.analysis;
      } else if (typeof data.analysis === 'string') {
        // Fallback just in case
        try {
          parsedAnalysis = JSON.parse(data.analysis);
        } catch (e) {
          parsedAnalysis.summary = data.analysis;
        }
      }

      setNewsData({ ...data, parsedAnalysis });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#F1F5F9] mb-2">Newspaper Intelligence Agent</h2>
          <p className="text-[#94A3B8]">Real-time intelligence brief from Chhattisgarh news sources</p>
        </div>
        <button
          onClick={fetchNews}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#2F80ED]/10 text-[#2F80ED] border border-[#2F80ED]/30 rounded-lg hover:bg-[#2F80ED]/20 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Intelligence
        </button>
      </div>

      {loading && !newsData && (
        <div className="flex justify-center py-20">
          <Loader className="w-12 h-12 text-[#2F80ED] animate-spin" />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg">
          Error: {error}
        </div>
      )}

      {!loading && newsData && (
        <>
          {/* Daily Brief */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#F1F5F9] mb-1">Intelligence Summary</h3>
                <p className="text-sm text-[#94A3B8]">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="px-4 py-2 bg-[#2F80ED]/10 border border-[#2F80ED]/30 text-[#2F80ED] rounded-lg text-sm font-medium">
                {newsData.articles?.length || 0} New Articles
              </div>
            </div>

            <div className="p-4 bg-[#0B1C2D] rounded-lg border border-[#2F80ED]/20">
              <p className="text-[#F1F5F9] leading-relaxed whitespace-pre-wrap">
                <strong className="text-[#2F80ED]">Overview:</strong> {newsData.parsedAnalysis?.summary || "No summary generated."}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Articles List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              <h3 className="text-xl font-bold text-[#F1F5F9]">Aggregated News Sources</h3>

              {newsData.articles?.map((article: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6 hover:border-[#2F80ED]/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#2F80ED]/20"
                    >
                      <Newspaper className="w-6 h-6 text-[#2F80ED]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-bold text-[#F1F5F9] flex-1 mr-4">{article.title}</h4>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#2F80ED] hover:text-[#2F80ED]/80"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>

                      <p className="text-sm text-[#94A3B8] mb-4">{article.summary || "No description available."}</p>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#94A3B8] bg-[#0B1C2D] px-2 py-1 rounded">{article.source}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {(!newsData.articles || newsData.articles.length === 0) && (
                <div className="text-[#94A3B8] text-center py-8">No articles found matching criteria.</div>
              )}
            </motion.div>

            {/* Emerging Trends */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Action Items */}
              <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#F1F5F9] mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                  {newsData.parsedAnalysis?.action_items?.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-[#0B1C2D] rounded border-l-2 border-[#E63946]">
                      <span className="text-sm text-[#F1F5F9]">{item}</span>
                    </div>
                  )) || <div className="text-sm text-[#94A3B8]">No specific actions generated.</div>}
                </div>
              </div>

              {/* Trends */}
              <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#F1F5F9] mb-4">Emerging Trends</h3>
                <div className="space-y-3">
                  {newsData.parsedAnalysis?.trends?.map((trend: string, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-[#F1F5F9]">{trend}</span>
                    </div>
                  )) || <div className="text-sm text-[#94A3B8]">No trends data available.</div>}
                </div>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
