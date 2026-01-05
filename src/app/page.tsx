'use client'; 

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mencegah hydration error agar tema sinkron antara server dan client
  useEffect(() => setMounted(true), []);

  const categories = [
    'Pengembangan Diri (Personal Growth)',
    'Kesehatan Mental (Mental Health)',
    'Karier & Studi Lanjut',
    'Tips Belajar (Study Skills)',
    'Hubungan Sosial (Social Relationship)'
  ];

  const allPosts = [
    { id: 1, title: 'Cara Membangun Kebiasaan Pagi yang Produktif', date: '5 Jan 2026', slug: 'kebiasaan-pagi', category: 'Pengembangan Diri (Personal Growth)', summary: 'Langkah kecil untuk perubahan besar dalam hidup Anda.', tag: '#Habit' },
    { id: 2, title: 'Mengatasi Burnout saat Kuliah', date: '3 Jan 2026', slug: 'mengatasi-burnout', category: 'Kesehatan Mental (Mental Health)', summary: 'Tips menjaga kesehatan mental di tengah tekanan akademik.', tag: '#Wellness' },
    { id: 3, title: 'Persiapan Menghadapi Interview Kerja Pertama', date: '1 Jan 2026', slug: 'interview-kerja', category: 'Karier & Studi Lanjut', summary: 'Hal-hal penting yang harus Anda siapkan sebelum bertemu rekruter.', tag: '#Career' },
    { id: 4, title: 'Teknik Pomodoro: Belajar Fokus dalam 25 Menit', date: '28 Des 2025', slug: 'teknik-pomodoro', category: 'Tips Belajar (Study Skills)', summary: 'Metode belajar paling efektif untuk mahasiswa.', tag: '#Study' },
    { id: 5, title: 'Cara Berkomunikasi Efektif dengan Pasangan', date: '25 Des 2025', slug: 'komunikasi-efektif', category: 'Hubungan Sosial (Social Relationship)', summary: 'Membangun hubungan yang sehat melalui komunikasi yang jujur.', tag: '#Relation' },
    { id: 6, title: 'Mindset Orang Sukses: Growth Mindset', date: '20 Des 2025', slug: 'growth-mindset', category: 'Pengembangan Diri (Personal Growth)', summary: 'Mengapa cara berpikir menentukan masa depan Anda.', tag: '#Mindset' },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
      
      {/* MODERN NAVBAR WITH THEME TOGGLE */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold rotate-3 group-hover:rotate-0 transition-transform">B</div>
            <span className="text-xl font-black tracking-tight uppercase italic">Bariskata</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link href="#kategori" className="hover:text-blue-600 transition-colors">Kategori</Link>
            </div>
            
            {/* Theme Switcher */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:ring-2 ring-blue-500 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
            </button>
            
            <Link href="/about" className="hidden md:block px-5 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* MINIMALIST HERO WITH ANIMATION */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 dark:opacity-20">
           <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200 dark:bg-indigo-900 rounded-full blur-[120px]"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] uppercase bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
            Journal & Thought
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Pertumbuhan</span> Diri.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Kumpulan barisan kata yang dirancang untuk membantu Anda menavigasi karier, kesehatan mental, dan hubungan sosial.
          </p>
        </motion.div>
      </header>

      {/* CATEGORY SECTIONS WITH SCROLL REVEAL */}
      <section id="kategori" className="pb-24">
        <div className="container mx-auto px-6">
          
          {categories.map((cat) => {
            const filteredPosts = allPosts.filter(post => post.category === cat);

            return (
              <motion.div 
                key={cat} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-24 last:mb-0"
              >
                {/* Header Kategori */}
                <div className="flex items-end justify-between mb-10 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-1">{cat}</h2>
                    <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Topik terpilih hari ini</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">Archive / {filteredPosts.length}</span>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                      <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="group relative bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]"
                      >
                        <div className="flex justify-between items-start mb-12">
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{post.date}</span>
                          <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <ArrowRight size={18} />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {post.summary}
                        </p>
                        
                        <div className="flex gap-2 mt-auto">
                           <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter italic">
                            {post.tag || '#Insight'}
                           </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 px-8 rounded-[32px] border-2 border-dashed border-slate-100 dark:border-slate-800 flex items-center justify-center">
                    <p className="text-slate-300 dark:text-slate-700 text-sm font-medium italic uppercase tracking-widest text-center">Belum ada artikel dalam kategori ini</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* MODERN FOOTER */}
      <footer className="bg-slate-900 dark:bg-black text-white py-24 rounded-t-[60px] transition-colors duration-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-12 border-b border-slate-800 pb-16">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black tracking-tighter mb-4 italic uppercase">Bariskata<span className="text-blue-500">.</span></h2>
              <p className="text-slate-400 text-sm max-w-sm">Dapatkan pemikiran terbaik tentang pertumbuhan diri langsung di inbox Anda setiap minggu.</p>
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-3">
               <input type="email" placeholder="email@kamu.com" className="bg-slate-800 border-none rounded-2xl px-6 py-4 flex-grow focus:ring-2 focus:ring-blue-600 outline-none text-sm transition-all shadow-inner" />
               <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all shadow-lg">Join</button>
            </div>
          </div>
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] italic">Bariskata — 2026</p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
              <a href="#" className="hover:text-blue-400 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}