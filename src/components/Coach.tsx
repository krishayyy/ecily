import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Sparkles, User, Brain, Command } from 'lucide-react';
import { useAppStore } from '../store';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const Coach: React.FC = () => {
  const user = useAppStore(state => state.user);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: `Neural link established. Greetings, ${user?.name.split(' ')[0]}. I am Cily, your AI financial synchronization entity. Strategic inquiry ready.` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (window.navigator.vibrate) window.navigator.vibrate(5);

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "Processing data... Analysis suggests that for your current liquidity, prioritizing an emergency reserve is the optimal protocol.",
        "Market trajectory data indicates that sustained equity holding consistently outperforms timing-based entry points.",
        "Your reputation index (Credit Score) is a critical lever. Maintaining low utilization increases system trust.",
        "Flow optimization achieved. Budgeting is the protocol for ensuring capital reaches high-impact objectives."
      ];
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      if (window.navigator.vibrate) window.navigator.vibrate([10, 30]);
    }, 1500);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-void font-display text-white">
      {/* OS Header HUD */}
      <div className="px-8 pt-20 pb-8 flex items-center justify-between premium-glass border-b border-white/5 sticky top-0 z-20 backdrop-blur-2xl">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gold rounded-2xl blur-xl"
            />
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center shadow-gold-bloom border border-white/20 relative z-10">
              <Brain size={28} className="text-void" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-void shadow-[0_0_8px_#10B981] z-20" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <span className="micro-label text-gold/60">AI ENTITY // CILY-OS</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span className="micro-label">ACTIVE</span>
            </div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter">Money <span className="gold-gradient">Coach</span></h1>
          </div>
        </div>
        <button
          onClick={() => {
              setMessages([messages[0]]);
              if (window.navigator.vibrate) window.navigator.vibrate(20);
          }}
          className="w-12 h-12 rounded-full premium-glass flex items-center justify-center text-white/20 hover:text-white transition-all hover:bg-white/5 group"
        >
          <Trash2 size={18} className="group-hover:scale-110" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-10 space-y-8 scroll-smooth no-scrollbar mask-fade-edges">
        <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`flex items-end space-x-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${
                        msg.role === 'user' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-gold/10 border-gold/20 text-gold'
                    }`}>
                        {msg.role === 'user' ? <User size={14} /> : <Command size={14} />}
                    </div>

                    <div className={`p-6 rounded-[2rem] relative overflow-hidden transition-all duration-700 ${
                        msg.role === 'user'
                        ? 'bg-blue-600/10 text-white border border-blue-500/30 rounded-tr-none'
                        : 'premium-glass text-white/90 border-white/10 rounded-tl-none'
                    }`}>
                        {msg.role === 'assistant' && (
                            <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 blur-2xl pointer-events-none" />
                        )}
                        <p className="text-lg font-lux uppercase leading-relaxed tracking-tight">{msg.content}</p>
                    </div>
                </div>
            </motion.div>
            ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start pl-12"
          >
            <div className="premium-glass p-5 rounded-full flex space-x-2 border-white/5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Stage */}
      <div className="px-8 pb-40 pt-6 bg-void relative overflow-hidden">
        {/* Rapid Prompts */}
        <div className="flex space-x-3 mb-6 overflow-x-auto no-scrollbar py-2">
          {[
            { label: "Analyze Budget", icon: Brain },
            { label: "Invest Strategy", icon: Sparkles },
            { label: "Credit Protocol", icon: ShieldCheck }
          ].map(prompt => (
            <motion.button
              key={prompt.label}
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInput(prompt.label)}
              className="flex items-center space-x-2 whitespace-nowrap px-6 py-3 premium-glass hover:bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gold transition-all"
            >
              <prompt.icon size={12} />
              <span>{prompt.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="SYNCHRONIZE INQUIRY..."
            className="w-full h-18 bg-white/[0.03] border border-white/10 rounded-super pl-6 pr-16 font-black tracking-widest text-xs text-white placeholder:text-white/10 focus:border-gold/40 focus:bg-white/[0.05] focus:outline-none transition-all duration-500"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              !input.trim() ? 'bg-white/5 text-white/10' : 'bg-gold text-void shadow-gold-bloom shadow-2xl scale-110 active:scale-95'
            }`}
          >
            <Send size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

function ShieldCheck({ size }: { size: number }) {
    return <Sparkles size={size} />;
}
