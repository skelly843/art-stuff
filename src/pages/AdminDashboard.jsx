import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Custom Icons
const PlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const ImageIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
const SettingsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const LogOutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
const EditIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;
const CheckCircleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const XIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching artworks:', error);
    else setArtworks(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      const { error } = await supabase.from('artworks').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchArtworks();
    }
  };

  const handleToggleStatus = async (artwork) => {
    const nextStatus = artwork.status === 'available' ? 'sold' : 'available';
    const { error } = await supabase
      .from('artworks')
      .update({ status: nextStatus })
      .eq('id', artwork.id);

    if (error) alert(error.message);
    else fetchArtworks();
  };

  const ArtworkModal = ({ onClose, onSave, artwork }) => {
    const [formData, setFormData] = useState(artwork || {
      title: '',
      description: '',
      price: '',
      medium: '',
      dimensions: '',
      year_painted: new Date().getFullYear(),
      category: '',
      status: 'available'
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUploading(true);

      let image_url = formData.image_url;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `artworks/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(filePath, imageFile);

        if (uploadError) {
          alert('Error uploading image');
          setUploading(false);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('portfolio')
          .getPublicUrl(filePath);

        image_url = publicUrl;
      }

      const artworkData = { ...formData, image_url, price: parseFloat(formData.price) };

      let error;
      if (artwork?.id) {
        ({ error } = await supabase.from('artworks').update(artworkData).eq('id', artwork.id));
      } else {
        ({ error } = await supabase.from('artworks').insert([artworkData]));
      }

      if (error) {
        alert(error.message);
      } else {
        onSave();
        onClose();
      }
      setUploading(false);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">{artwork ? 'Edit Artwork' : 'Add New Artwork'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-brand-100 rounded-full transition-colors"><XIcon /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl" placeholder="e.g. Abstract" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Medium</label>
                <input required value={formData.medium} onChange={e => setFormData({...formData, medium: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl" placeholder="e.g. Oil on Canvas" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dimensions</label>
                <input required value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl" placeholder="e.g. 24x36" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input required type="number" value={formData.year_painted} onChange={e => setFormData({...formData, year_painted: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-3 bg-brand-50 border border-brand-200 rounded-xl">
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Artwork Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full p-2 bg-brand-50 border border-dashed border-brand-300 rounded-xl" />
                {artwork?.image_url && !imageFile && <p className="text-xs text-brand-500 mt-1">Current image will be kept if none selected.</p>}
              </div>
            </div>
            <div className="pt-4 flex gap-4">
              <button type="button" onClick={onClose} className="flex-1 py-4 border border-brand-200 rounded-xl font-medium">Cancel</button>
              <button type="submit" disabled={uploading} className="flex-1 py-4 bg-brand-950 text-white rounded-xl font-medium disabled:opacity-50">
                {uploading ? 'Saving...' : 'Save Artwork'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-brand-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-brand-200 hidden md:flex flex-col sticky top-20 h-[calc(100vh-80px)]">
        <div className="p-8">
          <h2 className="font-serif text-xl text-brand-950">Artist Studio</h2>
        </div>
        <nav className="flex-grow px-4 space-y-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'inventory' ? 'bg-brand-950 text-white' : 'text-brand-600 hover:bg-brand-100'
            }`}
          >
            <ImageIcon />
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'orders' ? 'bg-brand-950 text-white' : 'text-brand-600 hover:bg-brand-100'
            }`}
          >
            <CheckCircleIcon />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'settings' ? 'bg-brand-950 text-white' : 'text-brand-600 hover:bg-brand-100'
            }`}
          >
            <SettingsIcon />
            Settings
          </button>
        </nav>
        <div className="p-4 border-t border-brand-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOutIcon />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-serif text-brand-950 capitalize">{activeTab}</h1>
            {activeTab === 'inventory' && (
              <button
                onClick={() => { setEditingArtwork(null); setIsModalOpen(true); }}
                className="bg-brand-950 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-brand-900 transition-colors shadow-lg shadow-brand-950/20"
              >
                <PlusIcon />
                Add New Artwork
              </button>
            )}
          </div>

          {activeTab === 'inventory' && (
            <div className="bg-white rounded-3xl shadow-sm border border-brand-200 overflow-hidden overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="bg-brand-50 border-b border-brand-200">
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-brand-500 font-bold">Artwork</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-brand-500 font-bold">Category</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-brand-500 font-bold">Price</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-brand-500 font-bold">Status</th>
                    <th className="px-6 py-4 text-xs uppercase tracking-wider text-brand-500 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {artworks.map((art) => (
                    <tr key={art.id} className="hover:bg-brand-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={art.image_url} alt="" className="w-12 h-12 rounded-lg object-cover bg-brand-100" />
                          <span className="font-medium text-brand-950">{art.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-brand-600">{art.category}</td>
                      <td className="px-6 py-4 text-brand-950 font-medium">${art.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(art)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                            art.status === 'available' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                            art.status === 'reserved' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                            'bg-brand-950 text-white hover:bg-brand-800'
                          }`}
                        >
                          {art.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => { setEditingArtwork(art); setIsModalOpen(true); }}
                            className="p-2 text-brand-400 hover:text-brand-950 transition-colors"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(art.id)}
                            className="p-2 text-brand-400 hover:text-red-600 transition-colors"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {artworks.length === 0 && !loading && (
                <div className="text-center py-12 text-brand-400">No artworks found. Start by adding one!</div>
              )}
            </div>
          )}

          {activeTab !== 'inventory' && (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-brand-300">
              <svg className="mx-auto text-brand-200 mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <p className="text-brand-500">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} feature coming soon.</p>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <ArtworkModal
          artwork={editingArtwork}
          onClose={() => setIsModalOpen(false)}
          onSave={fetchArtworks}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
