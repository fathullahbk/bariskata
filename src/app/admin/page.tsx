'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, Layout, Trash2, Edit3, Plus } from 'lucide-react';

export default function AdminPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal Growth');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    const postData = { title, content, category, slug, summary: content.substring(0, 100) + '...' };

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
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Layout size={24} /></div>
            <h1 className="text-3xl font-black italic">CMS ADMIN.</h1>
          </div>
        </div>

        {/* FORM INPUT */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {editingId ? <Edit3 size={20}/> : <Plus size={20}/>} {editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input 
              required type="text" placeholder="Judul Artikel..." 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 focus:border-blue-500"
              value={title} onChange={(e) => setTitle(e.target.value)}
            />
            <select 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 font-bold"
              value={category} onChange={(e) => setCategory(e.target.value)}
            >
              <option>Personal Growth</option>
              <option>Mental Health</option>
              <option>Career & Study</option>
              <option>Study Skills</option>
              <option>Social Life</option>
            </select>
          </div>
          <textarea 
            required placeholder="Isi konten artikel..." 
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-slate-100 min-h-[200px] mb-6"
            value={content} onChange={(e) => setContent(e.target.value)}
          />
          <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center gap-2 hover:bg-blue-700 transition-all">
            {loading ? 'Processing...' : editingId ? 'Update Artikel' : 'Publish Sekarang'}
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
                      <button onClick={() => handleEdit(post)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18}/></button>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}