'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Layout, Trash2, Edit3, Plus, Save, BarChart3 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import CSS Quill
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-slate-50 animate-pulse rounded-2xl border border-slate-100" />
});

export default function AdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal Growth');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Logic Statistik
  const totalPosts = posts.length;
  const categoriesCount = new Set(posts.map(p => p.category)).size;
  const latestPostDate = posts.length > 0 
    ? new Date(posts[0].created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) 
    : '-';

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const pureText = content.replace(/<[^>]*>?/gm, '');
    
    const postData = { 
      title, 
      content, 
      category, 
      slug, 
      summary: pureText.substring(0, 120) + '...' 
    };

    if (editingId) {
      await supabase.from('posts').update(postData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('posts').insert([postData]);
    }

    setTitle(''); setContent(''); fetchPosts();
    setLoading(false);
  };

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setCategory(post.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus artikel ini?')) {
      await supabase.from('posts').delete().eq('id', id);
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-24 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Layout size={24} />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter">CMS ADMIN.</h1>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard title="Total Artikel" value={totalPosts} unit="Post" color="bg-blue-500" />
          <StatCard title="Kategori" value={categoriesCount} unit="Topik" color="bg-purple-500" />
          <StatCard title="Estimasi Views" value="0" unit="Klik" color="bg-emerald-500" />
          <StatCard title="Terakhir Update" value={latestPostDate} unit="" color="bg-orange-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM EDITOR */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm transition-all">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                {editingId ? <Edit3 size={20} className="text-blue-600"/> : <Plus size={20} className="text-blue-600"/>}
                {editingId ? 'Edit Artikel' : 'Tulis Baru'}
              </h2>

              <input 
                required type="text" placeholder="Judul Artikel..." 
                className="w-full p-4 mb-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 focus:border-blue-500 focus:bg-white transition-all font-bold text-lg"
                value={title} onChange={(e) => setTitle(e.target.value)}
              />

              <div className="mb-6 rounded-2xl border border-slate-100 overflow-hidden admin-quill-editor">
                <ReactQuill 
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Mulai menulis cerita Anda..."
                />
              </div>

              <div className="flex gap-3">
                <select 
                  className="p-4 bg-slate-100 rounded-2xl outline-none font-bold text-slate-600 cursor-pointer border border-transparent focus:border-slate-200"
                  value={category} onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Personal Growth</option>
                  <option>Mental Health</option>
                  <option>Career & Study</option>
                  <option>Study Skills</option>
                  <option>Social Life</option>
                </select>
                <button disabled={loading} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black flex justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10">
                  <Save size={20}/> {loading ? 'Saving...' : editingId ? 'Simpan' : 'Publish'}
                </button>
              </div>
            </form>
          </div>

          {/* LIST ARTIKEL */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 max-h-[750px] overflow-y-auto">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <BarChart3 size={14}/> Manajemen Konten
              </h3>
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-100 transition-all group">
                    <h4 className="font-bold text-slate-800 mb-1 line-clamp-1">{post.title}</h4>
                    <span className="text-[10px] font-black text-blue-500 uppercase">{post.category}</span>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleEdit(post)} className="flex-1 bg-white p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center justify-center gap-1 text-xs font-bold">
                        <Edit3 size={14}/> Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 rounded-xl border border-slate-200 text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- KOMPONEN STATCARD (Diletakkan di luar AdminPage) ---
function StatCard({ title, value, unit, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm transition-transform hover:scale-[1.02] duration-300">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
        {unit && <span className="text-xs font-bold text-slate-400 uppercase">{unit}</span>}
      </div>
      <div className={`h-1.5 w-8 ${color} mt-4 rounded-full shadow-sm`}></div>
    </div>
  );
}