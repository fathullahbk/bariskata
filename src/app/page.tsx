'use client'; 

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Search, Hash, ArrowUpRight, Lock, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TeenHubPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeCat, setActiveCat] = useState('All');
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  // Sinkronisasi dengan Mounted untuk menghindari Hydration Error
  useEffect(() => {
    setMounted(true);
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAllPosts(data);
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Password sederhana (Sebaiknya gunakan Supabase Auth untuk produksi)
    if (password === 'admin123') { 
      window.location.href = '/admin';
    } else {
      alert('Password Salah!');
    }
  };

  const categories = [
    { name: 'All', emoji: '🔥' },
    { name: 'Personal Growth', emoji: '🚀' },
    { name: 'Mental Health', emoji: '❤️‍🩹' },
    { name: 'Career & Study', emoji: '🎓' },
    { name: 'Study Skills', emoji: '📚' },
    { name: 'Social Life', emoji: '💬' }
  ];

  const filteredPosts = activeCat === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCat);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-300 font-sans selection:bg-lime-400 selection:text-black">
      
      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30vw] h-[30vw] bg-blue-500/20 rounded-full blur-[100px]"></div>
      </div>

      {/* FLOATING NAVBAR - DIPERBAIKI */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-6 py-3 shadow-xl flex items-center gap-6 md:gap-12">
          <Link href="/" className="font-black italic tracking-tighter text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            BARISKATA.
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
            <span className="italic tracking-tight text-xs opacity-70">Pulihkan Hati melalui Untaian Kata.</span>
            <Link href="#content" className="hover:text-black dark:hover:text-white transition-colors">Kategori</Link>
            
            {/* TOMBOL LOGIN ADMIN */}
            <button 
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-xs font-black"
            >
              <Lock size={12} /> ADMIN
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight"
          >
            Level Up Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Life & Mindset.
            </span>
          </motion.h1>
          
          {/* SEARCH BAR */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="relative max-w-lg mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl flex items-center p-2 shadow-2xl border border-slate-200 dark:border-white/10">
              <Search className="ml-4 text-slate-400" size={20} />
              <input type="text" placeholder="Cari topik curhat..." className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm font-medium" />
              <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl font-bold text-sm">Search</button>
            </div>
          </motion.div>
        </div>

        {/* CATEGORY PILLS */}
        <div id="content" className="flex gap-3 overflow-x-auto pb-8 justify-start md:justify-center no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCat(cat.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeCat === cat.name 
                ? 'bg-black dark:bg-white text-white dark:text-black scale-105 shadow-lg' 
                : 'bg-white dark:bg-[#1a1a1a] text-slate-500 border border-slate-200 dark:border-white/10'
              }`}
            >
              <span>{cat.emoji}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <motion.div key={post.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group bg-white dark:bg-[#121212] rounded-[30px] p-1 border border-slate-100 dark:border-white/5 hover:border-blue-500 transition-all">
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-[26px] p-6 h-full flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white dark:bg-black px-3 py-1 rounded-full border border-black/5">
                      <Hash size={10} className="inline mr-1"/>{post.category}
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-black leading-tight mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 line-clamp-2">{post.summary || "Klik untuk membaca selengkapnya..."}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {new Date(post.created_at).toLocaleDateString('id-ID')}
                  </span>
                  <Link href={`/blog/${post.slug}`} className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* MODAL LOGIN ADMIN */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#1a1a1a] p-8 rounded-[40px] max-w-sm w-full shadow-2xl border border-slate-200 dark:border-white/10 relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-slate-400 hover:text-black dark:hover:text-white">
              <X size={20} />
            </button>
            <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">Admin Access</h2>
            <p className="text-slate-500 text-sm mb-6">Masukkan password untuk masuk ke CMS.</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full p-4 bg-slate-100 dark:bg-black rounded-2xl outline-none focus:ring-2 ring-blue-500 text-slate-900 dark:text-white font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold hover:opacity-90 transition-all">
                Masuk
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-12 text-center border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a]">
        <button onClick={() => setShowLogin(true)} className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-black italic mx-auto mb-4 hover:scale-110 transition-transform">
          BK
        </button>
        <p className="text-slate-400 text-sm font-medium">Built for the <span className="text-black dark:text-white font-bold">Future You</span>.</p>
      </footer>
    </div>
  );
}