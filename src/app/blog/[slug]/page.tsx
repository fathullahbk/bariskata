'use client';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Hash, Clock } from 'lucide-react';
import Link from 'next/link';

export default function BlogPost() {
  const { slug } = useParams();
  console.log("Slug yang sedang dibuka:", slug);
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchPost() {
    if (!slug) return;
    
    setLoading(true);
    // Kita pastikan mencari data yang kolom 'slug'-nya SAMA dengan parameter URL
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

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center font-bold">Artikel tidak ditemukan :(</div>;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20">
      {/* Header / Nav */}
      <nav className="p-6 max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Back to Home
        </button>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            {post.category}
          </span>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
            <Calendar size={14} />
            {new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight text-slate-900">
          {post.title}
        </h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-xl leading-relaxed text-slate-600 whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
}