import Link from 'next/link';

export default function HomePage() {
  const categories = [
    'Pengembangan Diri (Personal Growth)',
    'Kesehatan Mental (Mental Health)',
    'Karier & Studi Lanjut',
    'Tips Belajar (Study Skills)',
    'Hubungan Sosial (Social Relationship)'
  ];

  const allPosts = [
    { id: 1, title: 'Cara Membangun Kebiasaan Pagi yang Produktif', date: '5 Jan 2026', slug: 'kebiasaan-pagi', category: 'Pengembangan Diri (Personal Growth)', summary: 'Langkah kecil untuk perubahan besar dalam hidup Anda.' },
    { id: 2, title: 'Mengatasi Burnout saat Kuliah', date: '3 Jan 2026', slug: 'mengatasi-burnout', category: 'Kesehatan Mental (Mental Health)', summary: 'Tips menjaga kesehatan mental di tengah tekanan akademik.' },
    { id: 3, title: 'Persiapan Menghadapi Interview Kerja Pertama', date: '1 Jan 2026', slug: 'interview-kerja', category: 'Karier & Studi Lanjut', summary: 'Hal-hal penting yang harus Anda siapkan sebelum bertemu rekruter.' },
    { id: 4, title: 'Teknik Pomodoro: Belajar Fokus dalam 25 Menit', date: '28 Des 2025', slug: 'teknik-pomodoro', category: 'Tips Belajar (Study Skills)', summary: 'Metode belajar paling efektif untuk mahasiswa.' },
    { id: 5, title: 'Cara Berkomunikasi Efektif dengan Pasangan', date: '25 Des 2025', slug: 'komunikasi-efektif', category: 'Hubungan Sosial (Social Relationship)', summary: 'Membangun hubungan yang sehat melalui komunikasi yang jujur.' },
    { id: 6, title: 'Mindset Orang Sukses: Growth Mindset', date: '20 Des 2025', slug: 'growth-mindset', category: 'Pengembangan Diri (Personal Growth)', summary: 'Mengapa cara berpikir menentukan masa depan Anda.' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900">
      
      {/* MODERN NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold rotate-3 group-hover:rotate-0 transition-transform">B</div>
            <span className="text-xl font-black tracking-tight uppercase italic">Bariskata</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="#kategori" className="hover:text-blue-600 transition-colors">Kategori</Link>
            <Link href="/about" className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all">About</Link>
          </div>
        </div>
      </nav>

      {/* MINIMALIST HERO */}
      <header className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40">
           <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-200 rounded-full blur-[120px]"></div>
        </div>
        <div className="container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] uppercase bg-blue-50 text-blue-600 rounded-full border border-blue-100">
            Journal & Thought
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">
            Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pertumbuhan</span> Diri.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Kumpulan barisan kata yang dirancang untuk membantu Anda menavigasi karier, kesehatan mental, dan hubungan sosial.
          </p>
        </div>
      </header>

      {/* CATEGORY SECTIONS */}
      <section id="kategori" className="pb-24">
        <div className="container mx-auto px-6">
          
          {categories.map((cat) => {
            const filteredPosts = allPosts.filter(post => post.category === cat);

            return (
              <div key={cat} className="mb-20 last:mb-0">
                {/* Header Kategori Modern */}
                <div className="flex items-end justify-between mb-10 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 mb-1">{cat}</h2>
                    <p className="text-sm text-slate-400 font-medium">Topik terpilih hari ini</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Archive / {filteredPosts.length}</span>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                      <div key={post.id} className="group relative bg-white rounded-[32px] p-8 border border-slate-100 hover:border-blue-100 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-start mb-12">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {post.summary}
                        </p>
                        
                        <div className="flex gap-2">
                           <span className="px-3 py-1 bg-slate-50 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-tighter">#PersonalGrowth</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 px-8 rounded-[32px] border-2 border-dashed border-slate-100 flex items-center justify-center">
                    <p className="text-slate-300 text-sm font-medium italic uppercase tracking-widest">Coming Soon</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER MODERN */}
      <footer className="bg-slate-900 text-white py-20 rounded-t-[60px]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-12 border-b border-slate-800 pb-16">
            <div>
              <h2 className="text-4xl font-black tracking-tighter mb-4">Mulai Berlangganan<span className="text-blue-500">.</span></h2>
              <p className="text-slate-400 text-sm">Dapatkan notifikasi barisan kata setiap minggu langsung di inbox Anda.</p>
            </div>
            <div className="flex gap-2">
               <input type="email" placeholder="email@kamu.com" className="bg-slate-800 border-none rounded-2xl px-6 py-4 flex-grow focus:ring-2 focus:ring-blue-600 outline-none transition-all" />
               <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all">Join</button>
            </div>
          </div>
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest italic">Bariskata — 2026</p>
          </div>
        </div>
      </footer>

    </div>
  );
}