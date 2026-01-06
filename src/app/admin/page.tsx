'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Layout, Trash2, Edit3, Plus, Save } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import CSS Quill agar toolbar muncul
import 'react-quill/dist/quill.snow.css';

// Memanggil ReactQuill secara dinamis untuk menghindari error "document is not defined"
const ReactQuill = dynamic(() => import('react-quill'), { 
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

  // Konfigurasi Toolbar Editor agar lengkap
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
    
    // Menghapus tag HTML untuk summary agar tidak berantakan di kartu artikel
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Layout size={24} />
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter">CMS ADMIN.</h1>
          </div>
        </div>

        {/* FORM INPUT DENGAN EDITOR BARU */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-700">
            {editingId ? <Edit3 size={20} className="text-blue-600"/> : <Plus size={20} className="text-blue-600"/>} 
            {editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input 
              required type="text" placeholder="Judul Artikel..." 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 focus:border-blue-500 focus:bg-white transition-all font-bold"
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
            <select 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold text-slate-600 cursor-pointer"
              value={category} onChange={(e) => setCategory(e.target.value)}
            >
              <option>Personal Growth</option>
              <option>Mental Health</option>
              <option>Career & Study</option>
              <option>Study Skills</option>
              <option>Social Life</option>
            </select>
          </div>

          {/* AREA EDITOR HTML */}
          <div className="mb-6 rounded-2xl border border-slate-100 overflow-hidden bg-slate-50">
            <ReactQuill 
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              placeholder="Tulis isi konten artikel di sini..."
              className="bg-white min-h-[300px]"
            />
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? 'Processing...' : editingId ? 'Simpan Perubahan' : 'Publish Sekarang'}
          </button>
        </form>

        {/* TABEL DAFTAR ARTIKEL */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Judul</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Kategori</th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-bold text-slate-800">{post.title}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                      {post.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(post)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18}/></button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Style Tambahan untuk Merapikan Editor */}
      <style jsx global>{`
        .ql-container.ql-snow { border: none !important; min-height: 300px; font-family: inherit; font-size: 16px; }
        .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #f1f5f9 !important; background: #f8fafc; padding: 12px; }
        .ql-editor.ql-blank::before { font-style: normal; color: #cbd5e1; }
      `}</style>
    </div>
  );
}