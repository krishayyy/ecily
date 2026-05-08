import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, ArrowUpRight, Filter, LayoutGrid, List, Activity, DollarSign } from 'lucide-react';
import { useAppStore } from '../store';
import { useState } from 'react';

const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 1.2, isUp: true },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 171.05, change: -2.4, isUp: false },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 4.5, isUp: true },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.50, change: 0.8, isUp: true },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 148.74, change: -0.5, isUp: false },
  { symbol: 'AMZN', name: 'Amazon.com', price: 178.15, change: 1.1, isUp: true },
  { symbol: 'META', name: 'Meta Platforms', price: 505.90, change: 2.3, isUp: true },
  { symbol: 'NFLX', name: 'Netflix, Inc.', price: 610.50, change: -1.2, isUp: false },
  { symbol: 'PLTR', name: 'Palantir Tech', price: 24.52, change: 3.8, isUp: true },
  { symbol: 'COIN', name: 'Coinbase Global', price: 256.12, change: 5.2, isUp: true },
];

export const Trading: React.FC = () => {
  const user = useAppStore(state => state.user);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'discover' | 'portfolio'>('discover');
  const [layout, setLayout] = useState<'list' | 'grid'>('list');

  if (!user) return null;

  const filteredStocks = POPULAR_STOCKS.filter(s =>
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-void pb-40 font-display text-white">
      {/* Dynamic Header HUD */}
      <div className="px-6 pt-20 pb-8 relative overflow-hidden border-b border-border">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_-20%,rgba(197,160,89,0.05),transparent_50%)]" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-gold-glow" />
              <span className="micro-label text-gold/60">Market Access // Phase 01</span>
            </div>
            <h1 className="text-display-md text-display italic uppercase tracking-tighter">Trading <span className="gold-gradient">Terminal</span></h1>
            <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.3em]">Real-time simulation protocol active.</p>
          </div>

          <div className="flex gap-4">
             <div className="premium-glass p-5 rounded-super border-white/5 flex items-center space-x-5 min-w-[180px]">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                   <DollarSign size={18} />
                </div>
                <div>
                   <p className="micro-label !text-[8px] mb-0.5">Liquidity</p>
                   <p className="text-lg font-mono font-bold text-white">${user.portfolio.balance.toLocaleString()}</p>
                </div>
             </div>
             <div className="premium-glass p-5 rounded-super border-white/5 flex items-center space-x-5 min-w-[180px]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
                   <Activity size={18} />
                </div>
                <div>
                   <p className="micro-label !text-[8px] mb-0.5">Pulse</p>
                   <p className="text-lg font-black italic text-white uppercase tracking-tighter">Stable</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8 max-w-6xl mx-auto">
        {/* Interaction Bar */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="SCAN SYMBOLS OR ENTITIES..."
                    className="w-full h-14 bg-white/[0.02] border border-white/5 rounded-2xl pl-14 pr-6 font-mono text-[10px] tracking-widest text-white placeholder:text-white/10 focus:border-gold/30 focus:bg-white/[0.04] focus:outline-none transition-all duration-500"
                />
            </div>

            <div className="flex p-1 premium-glass rounded-2xl border-white/5">
                <button
                    onClick={() => setView('discover')}
                    className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                    view === 'discover' ? 'bg-white/5 text-white shadow-lg' : 'text-white/20 hover:text-white/40'
                    }`}
                >
                    Market
                </button>
                <button
                    onClick={() => setView('portfolio')}
                    className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                    view === 'portfolio' ? 'bg-white/5 text-white shadow-lg' : 'text-white/20 hover:text-white/40'
                    }`}
                >
                    Positions
                </button>
            </div>

            <div className="flex p-1 premium-glass rounded-2xl border-white/5">
                <button
                    onClick={() => setLayout('list')}
                    className={`p-2.5 rounded-xl transition-all ${layout === 'list' ? 'bg-white/5 text-gold' : 'text-white/20 hover:text-white/40'}`}
                >
                    <List size={18} />
                </button>
                <button
                    onClick={() => setLayout('grid')}
                    className={`p-2.5 rounded-xl transition-all ${layout === 'grid' ? 'bg-white/5 text-gold' : 'text-white/20 hover:text-white/40'}`}
                >
                    <LayoutGrid size={18} />
                </button>
            </div>
        </div>

        {view === 'discover' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center space-x-3">
                <span className="micro-label text-gold/60">Tactical Feed</span>
                <div className="h-px w-24 bg-gradient-to-r from-gold/20 to-transparent" />
              </div>
              <Filter size={14} className="text-white/20 hover:text-white/50 cursor-pointer transition-colors" />
            </div>

            <div className={layout === 'list' ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
              <AnimatePresence mode="popLayout">
                {filteredStocks.map((stock, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, delay: i * 0.03 }}
                    key={stock.symbol}
                    className={`premium-glass p-6 rounded-[2.5rem] border-white/5 flex items-center justify-between group cursor-pointer transition-all duration-700 relative overflow-hidden hover:bg-white/[0.04] hover:border-white/10 ${layout === 'grid' ? 'flex-col items-start gap-6' : ''}`}
                  >
                    <div className="flex items-center space-x-5 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm border transition-all duration-700 ${
                        stock.isUp
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] group-hover:bg-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_20px_rgba(225,29,72,0.1)] group-hover:bg-rose-500/20'
                      }`}>
                        {stock.symbol}
                      </div>
                      <div>
                        <p className="text-lg font-black italic uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">{stock.name}</p>
                        <p className="micro-label !text-[8px] opacity-40 group-hover:opacity-70 transition-opacity">Global // NASDAQ Index</p>
                      </div>
                    </div>

                    <div className={`flex items-end gap-6 relative z-10 ${layout === 'grid' ? 'w-full justify-between' : 'text-right'}`}>
                      <div className="space-y-1">
                        <span className="micro-label !text-[8px] !tracking-widest block opacity-20 group-hover:opacity-40 transition-opacity">Price Unit</span>
                        <p className="font-mono font-bold text-xl text-white/90">${stock.price.toFixed(2)}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="micro-label !text-[8px] !tracking-widest block opacity-20 group-hover:opacity-40 transition-opacity">Volatility</span>
                        <div className={`flex items-center justify-end text-sm font-black italic uppercase ${
                            stock.isUp ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                            {stock.isUp ? <TrendingUp size={14} className="mr-1.5" /> : <TrendingDown size={14} className="mr-1.5" />}
                            {stock.isUp ? '+' : ''}{stock.change}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {view === 'portfolio' && (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-8 premium-glass rounded-super border-dashed border-white/5 max-w-xl mx-auto">
             <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gold rounded-full blur-2xl"
                />
                <div className="w-20 h-20 rounded-3xl bg-white/[0.01] flex items-center justify-center text-white/5 border border-white/5 relative z-10">
                    <ArrowUpRight size={32} strokeWidth={1} />
                </div>
             </div>
             <div className="space-y-4">
                <h3 className="text-display text-2xl italic uppercase tracking-tighter">Empty <span className="gold-gradient">Portfolio</span></h3>
                <p className="text-white/20 text-[10px] font-mono uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">Execute your first acquisition protocol in the market feed.</p>
             </div>
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('discover')}
                className="premium-glass px-10 py-4 rounded-xl border-gold/10 text-gold/60 font-black text-[10px] uppercase tracking-widest"
             >
                Return to Feed
             </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};
