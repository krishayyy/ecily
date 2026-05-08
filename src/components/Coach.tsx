import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Sparkles, Heart, Zap, Target, Bot } from 'lucide-react';
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
    { id: '1', role: 'assistant', content: `Hey ${user?.name.split(' ')[0]}! I've been looking at your progress - you're doing great. I'm Cily, your personal partner in this money journey. What's on your mind today? No question is too big or small.` }
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
        "That's a really smart thing to be thinking about. Honestly, most people don't start asking that until much later - you're already ahead of the game. For your situation, I'd suggest starting with a small emergency reserve first. How does that sound?",
        "I love that you're curious about the markets! It can feel like a lot at first, but remember: you don't have to get it all right today. Just starting is the biggest win. Steady, long-term growth is usually where the magic happens.",
        "Your credit score might just look like a number, but think of it as your financial reputation. You're building trust with the system, and that trust is going to open so many doors for you later. You've got this!",
        "Budgeting isn't about saying 'no' to things you love. It's actually about saying 'yes' to the things that matter most to you. It's your plan, and you're the one in control. Want to try building a quick one together?"
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
      {/* Human-Centric Header */}
      <div className="px-8 pt-20 pb-8 flex items-center justify-between bg-void/80 backdrop-blur-2xl sticky top-0 z-20">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gold rounded-3xl blur-xl"
            />
            <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-gold to-[#F5D142] flex items-center justify-center shadow-gold-bloom border border-white/20 relative z-10">
              <Bot size={32} className="text-void" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gold border-4 border-void z-20 shadow-lg" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight">Cily</h1>
            <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gold/60">Always here for you</span>
                <Heart size={10} className="text-gold/40 fill-current" />
            </div>
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
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-8 scroll-smooth no-scrollbar mask-fade-edges">
        <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`flex items-end space-x-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 border border-gold/20">
                            <Sparkles size={14} className="text-gold" />
                        </div>
                    )}

                    <div className={`p-6 rounded-[2.2rem] relative overflow-hidden transition-all duration-700 ${
                        msg.role === 'user'
                        ? 'bg-white text-black rounded-tr-none shadow-2xl'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                    }`}>
                        <p className="text-lg font-medium leading-relaxed tracking-tight">{msg.content}</p>
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
            <div className="bg-white/5 p-5 rounded-full flex space-x-2 border border-white/5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  className="w-2 h-2 rounded-full bg-gold"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Stage */}
      <div className="px-8 pb-40 pt-6 bg-void relative z-30">
        {/* Suggestion Chips */}
        <div className="flex space-x-3 mb-6 overflow-x-auto no-scrollbar py-2">
          {[
            { label: "What's a budget?", icon: Zap },
            { label: "Explain Investing", icon: Target },
            { label: "Credit Score Help", icon: Heart }
          ].map(prompt => (
            <motion.button
              key={prompt.label}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInput(prompt.label)}
              className="flex items-center space-x-2 whitespace-nowrap px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all shadow-xl"
            >
              <prompt.icon size={14} className="text-gold" />
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
            placeholder="Type your message..."
            className="w-full h-18 bg-white/5 border border-white/10 rounded-[2rem] pl-6 pr-16 font-bold text-lg text-white placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.08] focus:outline-none transition-all duration-500 shadow-2xl"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            aria-label="Send"
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              !input.trim() ? 'bg-white/5 text-white/10' : 'bg-white text-black shadow-2xl scale-110 active:scale-90'
            }`}
          >
            <Send size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
