import Link from 'next/link';

export default function HomePage() {
  // Data Artikel (Simulasi Database)
  const allPosts = [
    { id: 1, title: 'Mulai dengan Next.js dan Tailwind CSS', date: '5 Jan 2026', slug: 'nextjs-tailwind', category: 'Tutorial' },
    { id: 2, title: 'Membuat Component Reusable di React', date: '3 Jan 2026', slug: 'react-component', category: 'Coding' },
    { id: 3, title: 'Integrasi n8n dengan Next.js', date: '1 Jan 2026', slug: 'n8n-nextjs', category: 'Automation' },
    { id: 4, title: 'Optimasi SEO untuk Blog Next.js', date: '28 Des 2025', slug: 'seo-nextjs', category: 'Tips' },
    { id: 5, title: 'Panduan Deployment ke Vercel', date: '25 Des 2025', slug: 'deploy-vercel', category: 'DevOps' },
  ];

  // Recent Posts (Ambil 3 terbaru)
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* 1. HEADER (NAVBAR) */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600">
            BARISKATA<span className="text-gray-400">.</span>
          </Link>
          <div className="hidden md:flex space-x-8 font-medium text-sm uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="#daftar-isi" className="hover:text-blue-600 transition">Daftar Isi</Link>
            <Link href="/about" className="hover:text-blue-600 transition">Tentang</Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative overflow-hidden bg-white py-24">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left">
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Tuliskan <span className="text-blue-600">Ide</span>, Bangun <span className="text-indigo-600">Dunia</span>.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Selamat datang di Bariskata. Di sini saya membagikan catatan perjalanan belajar teknologi dan berbagi tutorial pemrograman yang mudah dipahami.
            </p>
            <div className="flex space-x-4">
              <a href="#recent" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Baca Artikel
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            {/* Ilustrasi Sederhana dengan CSS */}
            <div className="w-72 h-72 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
               <svg className="w-40 h-40 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </div>
          </div>
        </div>
      </header>

      {/* 3. RECENT POSTS */}
      <section id="recent" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Artikel Terbaru</h2>
              <p className="text-gray-500">Tulisan hangat yang baru saja rilis.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <div key={post.id} className="group bg-white p-2 rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-video bg-gray-200 rounded-xl mb-4 overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 group-hover:scale-110 transition duration-500"></div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-xl font-bold mt-2 group-hover:text-blue-600 transition">{post.title}</h3>
                  <p className="text-gray-500 text-sm mt-2">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DAFTAR ISI (ARCHIVE) */}
      <section id="daftar-isi" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Semua Tulisan</h2>
          <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <ul className="divide-y divide-gray-100">
              {allPosts.map((post) => (
                <li key={post.id} className="py-4 flex justify-between items-center group">
                  <Link href={`/blog/${post.slug}`} className="text-lg font-medium text-gray-700 group-hover:text-blue-600 transition">
                    {post.title}
                  </Link>
                  <span className="text-sm text-gray-400 font-mono">{post.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-900 font-bold">Bariskata<span className="text-blue-600">.</span></p>
            <p className="text-sm text-gray-500">© 2026 Fathullah BK. Built with Next.js.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition">Instagram</a>
          </div>
        </div>
      </footer>

    </div>
  );
}