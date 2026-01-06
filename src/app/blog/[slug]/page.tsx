'use client';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Eye } from 'lucide-react';

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug; // Ambil slug dari params
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);

  // 1. useEffect untuk mengambil data artikel
  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle(); 

      if (error) {
        console.error('Supabase Error:', error.message);
      } else {
        setPost(data);
      }
      setLoading(false);
    }
    
    fetchPost();
  }, [slug]);

  // 2. useEffect untuk mencatat statistik pengunjung (logView)
  useEffect(() => {
    const logView = async () => {
      if (slug) {
        // Simpan ke tabel page_views
        await supabase.from('page_views').insert([{ slug: slug }]);
        
        // Ambil total views saat ini untuk ditampilkan (opsional)
        const { count } = await supabase
          .from('page_views')
          .select('*', { count: 'exact', head: true })
          .eq('slug', slug);
        
        if (count) setViewCount(count);
      }
    };

    if (post) logView(); // Jalankan hanya jika data post sudah berhasil dimuat
  }, [slug, post]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400 animate-pulse text-xs uppercase tracking-widest">Memuat Cerita...</div>;
  
  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-black text-slate-800 tracking-tighter italic">BARISKATA.</h1>
      <p className="font-bold text-slate-400">Artikel tidak ditemukan :(</p>
      <button onClick={() => router.push('/')} className="text-blue-600 font-bold text-sm underline">Kembali ke Beranda</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20 selection:bg-blue-100 selection:text-blue-900">
      {/* Header / Nav */}
      <nav className="p-6 max-w-4xl mx-auto sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button 
          onClick={() => router.push('/')} 
          className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors font-bold text-xs uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Kembali
        </button>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-10">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
            {post.category}
          </span>
          <div className="flex items-center gap-4 text-slate-400 text-[11px] font-black uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-slate-300" />
              {new Date(post.created_at).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-slate-300" />
              {viewCount} Views
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-10 leading-[1.1] text-slate-900 italic">
          {post.title}
        </h1>

        {/* Konten Artikel */}
        <div className="mt-10 border-t border-slate-100 pt-10">
          <div 
            className="prose prose-slate lg:prose-xl max-w-none text-slate-700 
                       prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tighter
                       prose-p:leading-[1.8] prose-p:mb-6
                       prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                       prose-strong:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                       ql-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>

      {/* Global CSS khusus untuk konten Quill */}
      <style jsx global>{`
        .ql-content ul { list-style-type: disc !important; padding-left: 1.5em !important; margin-bottom: 1.5rem !important; }
        .ql-content ol { list-style-type: decimal !important; padding-left: 1.5em !important; margin-bottom: 1.5rem !important; }
        .ql-content li { margin-bottom: 0.5rem !important; }
      `}</style>
    </div>
  );
}