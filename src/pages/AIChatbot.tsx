import { motion } from 'motion/react';
import { Send, Bot, User, Database, FileText, Newspaper } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    content: 'Hello, IG Cyber Crime. I\'m your AI Intelligence Assistant. How can I help you today?',
    timestamp: '14:20'
  }
];

const exampleQueries = [
  'Show digital arrest cases this week',
  'List repeat offenders in Maharashtra',
  'Summarize recent deepfake incidents',
  'Analyze fraud trends for last month'
];

export function AIChatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: `I'm analyzing your query: "${input}". Here's what I found:\n\n• Total cases: 23\n• High priority: 7\n• Geographic concentration: Mumbai, Pune\n• Common pattern: Evening hours (6-10 PM)\n\nWould you like detailed reports on any specific cases?`,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);

    setInput('');
  };

  const handleExampleClick = (query: string) => {
    setInput(query);
  };

  return (
    /* 
      Layout Fix: 
      - Removed fixed height calc that was causing overflow.
      - Used flex-col and h-full to fill available space in the parent container.
      - Adjusted padding.
    */
    <div className="p-6 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-[#F1F5F9] mb-1">AI Intelligence Assistant</h2>
        <p className="text-sm text-[#94A3B8]">Query databases, analyze patterns, and get instant insights</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 bg-[#12283A] border border-[#2F80ED]/20 rounded-xl flex flex-col overflow-hidden"
        >
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'bot' ? 'bg-[#2F80ED]/20' : 'bg-[#0B1C2D]'
                  }`}>
                  {message.type === 'bot' ? (
                    <Bot className="w-4 h-4 text-[#2F80ED]" />
                  ) : (
                    <User className="w-4 h-4 text-[#F1F5F9]" />
                  )}
                </div>
                <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`max-w-[85%] rounded-xl p-3 ${message.type === 'bot'
                      ? 'bg-[#0B1C2D] border border-[#2F80ED]/20'
                      : 'bg-[#2F80ED]/20 border border-[#2F80ED]/30'
                    }`}>
                    <p className="text-sm text-[#F1F5F9] whitespace-pre-line">{message.content}</p>
                    <div className="text-xs text-[#94A3B8] mt-1">{message.timestamp}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#2F80ED]/20">
            <form onSubmit={handleSend} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your query here..."
                className="flex-1 bg-[#0B1C2D] border border-[#2F80ED]/30 rounded-lg px-4 py-2 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#2F80ED] transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2F80ED] hover:bg-[#2F80ED]/90 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </form>
          </div>
        </motion.div>

        {/* Context Sources Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 overflow-y-auto custom-scrollbar"
        >
          {/* Example Queries */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-[#F1F5F9] mb-3">Example Queries</h3>
            <div className="space-y-2">
              {exampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(query)}
                  className="w-full text-left p-2.5 bg-[#0B1C2D] hover:bg-[#0B1C2D]/70 border border-[#2F80ED]/20 hover:border-[#2F80ED] text-[#94A3B8] hover:text-[#F1F5F9] rounded-lg text-xs transition-all duration-300"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Context Sources */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-[#F1F5F9] mb-3">Context Sources</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 bg-[#0B1C2D] rounded-lg">
                <Database className="w-4 h-4 text-[#2A9D8F]" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-[#F1F5F9]">Fraud Database</div>
                  <div className="text-[10px] text-[#94A3B8]">Connected</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse"></div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-[#0B1C2D] rounded-lg">
                <FileText className="w-4 h-4 text-[#2A9D8F]" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-[#F1F5F9]">Deepfake Logs</div>
                  <div className="text-[10px] text-[#94A3B8]">Connected</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse"></div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-[#0B1C2D] rounded-lg">
                <Newspaper className="w-4 h-4 text-[#2A9D8F]" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-[#F1F5F9]">News Intelligence</div>
                  <div className="text-[10px] text-[#94A3B8]">Connected</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="bg-[#12283A] border border-[#2F80ED]/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-[#F1F5F9] mb-3">AI Capabilities</h3>
            <div className="space-y-2 text-xs text-[#94A3B8]">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] mt-1"></div>
                <span>Natural language queries</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] mt-1"></div>
                <span>Real-time data analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] mt-1"></div>
                <span>Pattern recognition</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] mt-1"></div>
                <span>Intelligent recommendations</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
