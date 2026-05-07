import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2 } from 'lucide-react';
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
    { id: '1', role: 'assistant', content: `Hey ${user?.name.split(' ')[0]}! I'm Cily, your AI money coach. Ask me anything about budgeting, investing, or credit!` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! For someone in your position, focusing on an emergency fund first is usually the smartest move.",
        "When it comes to investing, time in the market beats timing the market every single time.",
        "Your credit score is like a financial GPA. Keeping your utilization low is the best way to boost it.",
        "Budgeting isn't about restriction, it's about making sure your money goes where you actually want it to."
      ];
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-dark-base pb-32">
      {/* Coach Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-white/5 bg-dark-base/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center shadow-lg">
              <span className="text-2xl">😊</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-dark-base" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">Cily</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-success">Online Now</p>
          </div>
        </div>
        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 text-white/20 hover:text-white transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scroll-smooth">
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user'
              ? 'bg-xpBlue text-white rounded-tr-none'
              : 'bg-white/5 border border-white/5 text-white/90 rounded-tl-none'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex space-x-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 bg-dark-base border-t border-white/5">
        <div className="flex space-x-2 mb-4 overflow-x-auto no-scrollbar py-1">
          {["What's a budget?", "Investing basics", "Credit scores"].map(prompt => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-bold text-white/60 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Cily anything..."
            className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-4 pr-14 font-bold text-white placeholder:text-white/20 focus:border-gold/30 focus:outline-none transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              !input.trim() ? 'text-white/10' : 'bg-gold text-void shadow-lg'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
