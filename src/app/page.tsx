'use client'; 

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Search, Sparkles, TrendingUp, Hash, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TeenHubPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeCat, setActiveCat] = useState('All');

  useEffect(() => setMounted(true), []);

  const categories = [
    { name: 'All', emoji: '🔥' },
    { name: 'Personal Growth', emoji: '🚀' },
    { name: 'Mental Health', emoji: '❤️‍🩹' },
    { name: 'Career & Study', emoji: '🎓' },
    { name: 'Social Life', emoji: '💬' }
  ];

// Ganti bagian variabel allPosts dengan ini:
const [allPosts, setAllPosts] = useState<any[]>([]);

useEffect(() => {
  fetchPosts();
  setMounted(true);
}, []);

async function fetchPosts() {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (data) setAllPosts(data);
}

  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Password sederhana untuk akses admin
    if (password === 'admin123') { 
      window.location.href = '/admin';
    } else {
      alert('Password Salah!');
    }
  };

  // Filter logic sederhana
  const filteredPosts = activeCat === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCat);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-300 font-sans selection:bg-lime-400 selection:text-black">
      
      {/* BACKGROUND BLOBS (Vibe Setter) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30vw] h-[30vw] bg-blue-500/20 rounded-full blur-[100px]"></div>
      </div>

      {/* FLOATING NAVBAR */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-6 py-3 shadow-xl flex items-center gap-6 md:gap-12">
          <Link href="/" className="font-black italic tracking-tighter text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            BARISKATA.
          </Link>
          
          <div className="hidden md:flex gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">For You</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Trending</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Topics</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} /> Daily Inspiration
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight"
          >
            Level Up Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
              Life & Mindset.
            </span>
          </motion.h1>
          
          {/* SEARCH BAR MODERN */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-lg mx-auto group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl flex items-center p-2 shadow-2xl border border-slate-200 dark:border-white/10">
              <Search className="ml-4 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari topik curhat hari ini..." 
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm font-medium placeholder:text-slate-400"
              />
              <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-80 transition-opacity">
                Search
              </button>
            </div>
          </motion.div>
        </div>

        {/* CATEGORY PILLS (SCROLLABLE) */}
        <div className="flex gap-3 overflow-x-auto pb-8 justify-start md:justify-center no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                activeCat === cat.name 
                ? 'bg-black dark:bg-white text-white dark:text-black scale-105 shadow-lg' 
                : 'bg-white dark:bg-[#1a1a1a] text-slate-500 border border-slate-200 dark:border-white/10 hover:border-slate-400'
              }`}
            >
              <span>{cat.emoji}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group relative bg-white dark:bg-[#121212] rounded-[30px] p-1 border border-slate-100 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="h-full bg-slate-50 dark:bg-[#1a1a1a] rounded-[26px] p-6 flex flex-col justify-between overflow-hidden relative">
                
                {/* Gradient Blur Top */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${post.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest bg-white dark:bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-black/5 dark:border-white/10">
                      <Hash size={10} /> {post.category}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{post.date}</span>
                  </div>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl md:text-2xl font-black leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4 decoration-blue-500 cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                    Pelajari rahasia kecil yang bikin perubahan besar dalam hidup lo.
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-black/5 dark:border-white/5 pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span>⏱ {post.read} read</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

{showLogin && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white p-8 rounded-[40px] max-w-sm w-full shadow-2xl border border-slate-200"
    >
      <h2 className="text-3xl font-black mb-2 text-slate-900">Admin Access</h2>
      <p className="text-slate-500 text-sm mb-6 font-medium">Silahkan masukkan password admin.</p>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <input 
            type="password" 
            placeholder="Enter Password" 
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500 text-slate-900 placeholder:text-slate-400 font-bold transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            className="flex-1 bg-black text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => setShowLogin(false)} 
            className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]">
        <div className="flex justify-center items-center gap-2 mb-4">
          <div onClick={() => setShowLogin(true)} className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold italic">BK</div>
        </div>
        <p className="text-slate-400 text-sm font-medium">Built for the <span className="text-black dark:text-white font-bold">Future You</span>.</p>
      </footer>
    </div>
  );
}