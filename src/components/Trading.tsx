import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, ArrowUpRight, Filter } from 'lucide-react';
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
];

export const Trading: React.FC = () => {
  const user = useAppStore(state => state.user);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'discover' | 'portfolio'>('discover');

  if (!user) return null;

  const filteredStocks = POPULAR_STOCKS.filter(s =>
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-base pb-32">
      {/* Trading Header */}
      <div className="px-6 pt-12 pb-6 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase italic tracking-tighter">Terminal</h1>
            <p className="text-white/40 font-medium">Paper trading interface</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Buying Power</p>
            <p className="text-xl font-mono font-bold text-gold">${user.portfolio.balance.toLocaleString()}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbols or companies..."
            className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 font-bold text-white placeholder:text-white/20 focus:border-gold/30 focus:outline-none transition-all"
          />
        </div>

        {/* View Toggles */}
        <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
          <button
            onClick={() => setView('discover')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              view === 'discover' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setView('portfolio')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              view === 'portfolio' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'
            }`}
          >
            Portfolio
          </button>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {view === 'discover' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between opacity-40 px-2">
              <span className="text-[10px] font-black uppercase tracking-widest">Market Leaders</span>
              <Filter size={14} />
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {filteredStocks.map((stock, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={stock.symbol}
                    className="glass p-4 rounded-2xl flex items-center justify-between border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs ${
                        stock.isUp ? 'bg-wallStreet-green/10 text-wallStreet-green' : 'bg-error/10 text-error'
                      }`}>
                        {stock.symbol}
                      </div>
                      <div>
                        <p className="font-bold text-white/90">{stock.name}</p>
                        <p className="text-xs font-medium text-white/30">NASDAQ</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono font-bold text-white/90">${stock.price.toFixed(2)}</p>
                      <div className={`flex items-center justify-end text-xs font-bold ${
                        stock.isUp ? 'text-success' : 'text-error'
                      }`}>
                        {stock.isUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                        {stock.isUp ? '+' : ''}{stock.change}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {view === 'portfolio' && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20">
               <ArrowUpRight size={32} />
             </div>
             <div>
               <p className="font-bold text-white/60">No positions yet</p>
               <p className="text-sm text-white/30 max-w-[200px]">Execute your first trade in the discover tab.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
