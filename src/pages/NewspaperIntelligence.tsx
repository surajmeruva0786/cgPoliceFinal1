import { motion } from 'motion/react';
import { Newspaper, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { day: 'Mon', mentions: 12 },
  { day: 'Tue', mentions: 18 },
  { day: 'Wed', mentions: 15 },
  { day: 'Thu', mentions: 24 },
  { day: 'Fri', mentions: 21 },
  { day: 'Sat', mentions: 16 },
  { day: 'Sun', mentions: 14 },
];

const articles = [
  {
    id: 1,
    headline: 'Major Digital Arrest Scam Busted in Mumbai - 15 Arrested',
    source: 'Times of India',
    date: '12 Feb 2026',
    riskLevel: 'high',
    relevance: 95,
    summary: 'Mumbai Police cyber cell arrests 15 individuals running sophisticated digital arrest scam targeting senior citizens.'
  },
  {
    id: 2,
    headline: 'Deepfake Technology Used to Impersonate IPS Officer',
    source: 'The Hindu',
    date: '11 Feb 2026',
    riskLevel: 'high',
    relevance: 92,
    summary: 'Criminals use deepfake video calls to impersonate police officials, demanding money from unsuspecting victims.'
  },
  {
    id: 3,
    headline: 'Investment Scam via Social Media Targets Young Professionals',
    source: 'Indian Express',
    date: '10 Feb 2026',
    riskLevel: 'medium',
    relevance: 78,
    summary: 'New cryptocurrency investment scam spreads through Instagram and Telegram, affecting over 200 victims.'
  },
  {
    id: 4,
    headline: 'Cyber Crime Unit Launches AI-Based Fraud Detection System',
    source: 'Economic Times',
    date: '9 Feb 2026',
    riskLevel: 'low',
    relevance: 65,
    summary: 'State government invests in advanced AI technology to combat rising cyber fraud incidents.'
  }
];

export function NewspaperIntelligence() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#F1F5F9] mb-2">Newspaper Intelligence Agent</h2>
        <p className="text-[#94A3B8]">Daily intelligence brief from news sources and media monitoring</p>
      </div>

      {/* Daily Brief */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#F1F5F9] mb-1">Daily Intelligence Brief</h3>
            <p className="text-sm text-[#94A3B8]">Thursday, 12 February 2026</p>
          </div>
          <div className="px-4 py-2 bg-[#2F80ED]/10 border border-[#2F80ED]/30 text-[#2F80ED] rounded-lg text-sm font-medium">
            24 New Articles
          </div>
        </div>

        <div className="p-4 bg-[#0B1C2D] rounded-lg border border-[#2F80ED]/20">
          <p className="text-[#F1F5F9] leading-relaxed">
            <strong className="text-[#2F80ED]">AI Summary:</strong> Today's media monitoring reveals heightened coverage of digital arrest scams in major metropolitan areas, with Mumbai reporting significant law enforcement action. Deepfake impersonation cases continue to be a major concern across national media. Investment scams targeting young professionals show emerging patterns of social media exploitation. Overall threat level remains elevated with increasing public awareness through media coverage.
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
          <h3 className="text-xl font-bold text-[#F1F5F9]">Relevant Articles</h3>
          
          {articles.map((article, index) => {
            const riskConfig = {
              high: { color: '#E63946', bg: '#E6394620', label: 'HIGH RISK' },
              medium: { color: '#F4A261', bg: '#F4A26120', label: 'MEDIUM' },
              low: { color: '#2A9D8F', bg: '#2A9D8F20', label: 'LOW' }
            }[article.riskLevel];

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6 hover:border-[#2F80ED]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: riskConfig.bg }}
                  >
                    <Newspaper className="w-6 h-6" style={{ color: riskConfig.color }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-[#F1F5F9] flex-1">{article.headline}</h4>
                      <button className="ml-4 text-[#2F80ED] hover:text-[#2F80ED]/80">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mb-3 text-sm text-[#94A3B8]">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>

                    <p className="text-sm text-[#94A3B8] mb-4">{article.summary}</p>

                    <div className="flex items-center gap-3">
                      <div 
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: riskConfig.bg, color: riskConfig.color }}
                      >
                        {riskConfig.label}
                      </div>
                      <div className="px-3 py-1 bg-[#0B1C2D] text-[#2F80ED] rounded-full text-xs font-medium">
                        Relevance: {article.relevance}%
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Emerging Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Trend Graph */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-[#F1F5F9] mb-6">Emerging Threat Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2F80ED20" />
                <XAxis dataKey="day" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#12283A', 
                    border: '1px solid #2F80ED40',
                    borderRadius: '8px',
                    color: '#F1F5F9'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="mentions" 
                  stroke="#2F80ED" 
                  strokeWidth={2}
                  dot={{ fill: '#2F80ED', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs text-[#94A3B8] mt-4">Media mentions of cyber fraud in last 7 days</p>
          </div>

          {/* Top Keywords */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-[#F1F5F9] mb-4">Top Keywords</h3>
            <div className="space-y-3">
              {[
                { keyword: 'Digital Arrest', count: 47 },
                { keyword: 'Deepfake', count: 38 },
                { keyword: 'Investment Scam', count: 29 },
                { keyword: 'UPI Fraud', count: 24 },
                { keyword: 'Phishing', count: 18 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-[#F1F5F9]">{item.keyword}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-[#0B1C2D] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#2F80ED] rounded-full"
                        style={{ width: `${(item.count / 50) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[#94A3B8] w-8 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Stats */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-[#F1F5F9] mb-4">Alert Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#E63946]/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-[#E63946]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#F1F5F9]">High Risk Articles</div>
                  <div className="text-2xl font-bold text-[#E63946]">12</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#2F80ED]/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#2F80ED]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#F1F5F9]">Trending Topics</div>
                  <div className="text-2xl font-bold text-[#2F80ED]">8</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
