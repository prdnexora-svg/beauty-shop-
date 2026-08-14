import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';

interface CreateContentScreenProps {
  onNavigate?: (view: ViewType) => void;
}

export default function CreateContentScreen({ onNavigate }: CreateContentScreenProps) {
  const [tags, setTags] = useState<string[]>(['Skincare', 'Luxury', 'Editorial']);
  const [tagInput, setTagInput] = useState('');
  const [caption, setCaption] = useState('Introducing the Aura Collection. A study in light, texture, and transformative results. #NexoraLuxe #AuraCollection');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [category, setCategory] = useState('Product Launch');

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-['Inter'] antialiased min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-[#fcf9f8] w-full h-20 border-b border-[#e8e8e8] flex justify-between items-center px-10 max-w-[1440px] mx-auto hidden md:flex">
        <div className="flex items-center space-x-8">
          <span 
            onClick={() => onNavigate && onNavigate('social-feed')}
            className="text-2xl font-bold tracking-tighter uppercase text-[#8e004b] cursor-pointer"
          >
            Nexora
          </span>
          <div className="flex space-x-6">
            <button onClick={() => onNavigate && onNavigate('social-feed')} className="text-slate-600 font-semibold text-sm hover:text-[#8e004b] transition-colors">Feed</button>
            <button onClick={() => onNavigate && onNavigate('discover')} className="text-slate-600 font-semibold text-sm hover:text-[#8e004b] transition-colors">Explore</button>
            <button onClick={() => onNavigate && onNavigate('shop')} className="text-slate-600 font-semibold text-sm hover:text-[#8e004b] transition-colors">Trending</button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span onClick={() => onNavigate && onNavigate('discover')} className="material-symbols-outlined cursor-pointer hover:text-[#8e004b] transition-colors">search</span>
          <span onClick={() => alert('Notifications')} className="material-symbols-outlined cursor-pointer hover:text-[#8e004b] transition-colors">notifications</span>
          <span onClick={() => onNavigate && onNavigate('social-feed')} className="material-symbols-outlined cursor-pointer hover:text-[#8e004b] transition-colors">favorite</span>
          <div className="w-8 h-8 rounded-full bg-[#f0edec] overflow-hidden ml-4 cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOu0Nf1TEP1qYxD_kOKzI26u8COlG-CYGVrbmXuw9Wq0kdA8p1vVB-cbTPuemmL-fS8JF3m3xK18dylvh0JTXS5VKEBDJl4lG3QIEw5GroetgsDi8rj3psPxdZZjZztvk_2lV8iCz_6kcARF37J7C4bpzwTFSP8KG8zqObWW8fcsAnclBJr6LSLcjliGhXPAlmFs41YOSfuJNqhKGBFWZoWXBP-GC10YYOI-0aLjS_qqCAYAtMsXiq4Q" 
            />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-5 md:px-10 py-8 flex flex-col md:flex-row gap-12 w-full pb-32">
        {/* Left Column: Workspace / Upload Zone */}
        <div className="flex-1 space-y-8">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Create Content</h1>
            <p className="text-base text-slate-600 mt-2">Upload media and define your campaign parameters.</p>
          </header>

          {/* Media Grid */}
          <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Media Assets</h2>
              <button 
                onClick={() => alert('File picker opened')}
                className="text-xs font-bold text-[#8e004b] flex items-center space-x-1 hover:opacity-80 transition-opacity"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Add Files</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Dropzone */}
              <div 
                onClick={() => alert('Dropzone / File selector')}
                className="relative border-2 border-dashed border-[#e0bec6] rounded-xl bg-[#fdf8f8] hover:bg-[#fde7f3]/30 transition-colors flex flex-col items-center justify-center p-6 min-h-[160px] cursor-pointer group"
              >
                <span className="material-symbols-outlined text-[#8e004b] text-3xl mb-2 group-hover:scale-110 transition-transform">cloud_upload</span>
                <span className="text-xs font-bold text-slate-700">Upload Media</span>
                <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, MP4</span>
              </div>

              {/* Uploaded Item 1 */}
              <div className="relative border border-[#e8e8e8] rounded-xl bg-white overflow-hidden min-h-[160px] group shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKvfW9e4i7nkOQUHHXxtxirb-yh2nmRLljVgFD59YrGeWaBmPIM4CJ2ifRY_UWBrSuoIhR3RpjCf6pvmEMSd0P-Dj-0v2M8uVBK1Apv2AZ_Y5Lb_l649PyZUvR5TIyL4R-y0zTpYU0pClGGiHgdmAyLJdz0p1wiBZjuveURJYgAjoNwsJECze23amPeWN9OdhusXILCuHvn-evkMnYcmxxlosxBv2AVwZ6bttAKjdwoCTcaXWA0ZERgw" 
                  alt="Luxury skincare bottle" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => alert('Edit image')} className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => alert('Delete image')} className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Item 2 */}
              <div className="relative border border-[#e8e8e8] rounded-xl bg-white overflow-hidden min-h-[160px] group shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIHkcQQ-xPSgD1rAGOCSBLzix5aZEGnwZfqA0odIHoH4u3nyA7bxpHXO62w26NPMLD1Aue6oKw04ZWmbldSrj8BHlM2x2rWcVZX88ArW13Dvgivo6nImVX7UtAB-OnG9eB5t9eLDbWPgnaLs8YM6brJLTT9bXzrYphH0cp9chgCidufetUZCfPjdjrRVwL7STYP8_QEEAzeMCLobE61Px3QrcMF5iAuFt5_BbrnSD6k_oKxRQbiV2AZA" 
                  alt="Cosmetic jars" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => alert('Edit image')} className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => alert('Delete image')} className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Item 3 */}
              <div className="relative border border-[#e8e8e8] rounded-xl bg-white overflow-hidden min-h-[160px] group shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdJoEifCjlOomrohoNvOIG9AIBQulqb-LXb-tXksZQZ4pL5zxZP6lW5KFAYbk3KstamM9vp7Y8SNSibj5C6h6lNYHa5Uyc201Z_Yfnn3sSVvgLhJLXKv7_zszeOD4Hdo4N2PgKcK_z014giboxK2Pem9peXvDihVGsaLegxMVwbM33bhgZMRuishasjqdKXz8OrIaMDyqa5rGWdft2V7Uh-qMcKPCY33cp0YP4_og9CPRLymNAlr752g" 
                  alt="Editorial model" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => alert('Edit image')} className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => alert('Delete image')} className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Item 4 (taller) */}
              <div className="relative border border-[#e8e8e8] rounded-xl bg-white overflow-hidden min-h-[160px] group shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWorMNh6qfdWdFvqhSYnSe6D_yjyAnrQjhXP4csDKcyOAq5bIFc_16Kdr4mPV5GxX0G7HBUM5nx95nToaMRjBsw2bZi4-wi8N494HOhQ38zL5HyYElmydKoJNI0AkgZONRQr71iy08BhJDGXokV4GTDjvDAlLyg7x6axCBmyTkHgcGRwvelNy1X-uSNeN0TMksxbIMqYGMx-FghDjI5Rg7Ukdgd--bmU0-2alhU121B3vrO94nze2MMA" 
                  alt="Flat lay" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => alert('Edit image')} className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button onClick={() => alert('Delete image')} className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Caption</label>
              <textarea 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-[#f0edec] border-0 border-b border-slate-300 focus:ring-0 focus:border-b-[#8e004b] text-sm text-slate-900 resize-none h-32 p-3 transition-colors rounded-t-xl outline-none" 
                placeholder="Write a compelling caption..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Controls */}
        <aside className="w-full md:w-80 flex-shrink-0 space-y-6">
          <div className="bg-white border border-[#e8e8e8] rounded-2xl p-6 shadow-sm space-y-6 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-[#e8e8e8] pb-3">Details</h3>
            
            {/* Visibility */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Visibility</label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="visibility" 
                    checked={visibility === 'public'} 
                    onChange={() => setVisibility('public')}
                    className="text-[#8e004b] focus:ring-[#8e004b] h-4 w-4 border-[#e8e8e8] bg-[#f0edec]" 
                  />
                  <span className="text-sm font-medium text-slate-800 group-hover:text-[#8e004b] transition-colors">Public</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="visibility" 
                    checked={visibility === 'private'} 
                    onChange={() => setVisibility('private')}
                    className="text-[#8e004b] focus:ring-[#8e004b] h-4 w-4 border-[#e8e8e8] bg-[#f0edec]" 
                  />
                  <span className="text-sm font-medium text-slate-800 group-hover:text-[#8e004b] transition-colors">Private (Draft)</span>
                </label>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f0edec] border-0 border-b border-slate-300 focus:ring-0 focus:border-b-[#8e004b] text-sm text-slate-900 py-2.5 px-3 rounded-t-xl outline-none"
              >
                <option>Product Launch</option>
                <option>Tutorial</option>
                <option>Behind the Scenes</option>
                <option>Campaign</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center px-2.5 py-1 bg-[#fde7f3] text-[#8e004b] text-xs font-bold rounded-full">
                    {tag} 
                    <button onClick={() => removeTag(tag)} className="ml-1.5 hover:text-slate-900">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="Add tag + Enter" 
                className="w-full bg-[#f0edec] border-0 border-b border-slate-300 focus:ring-0 focus:border-b-[#8e004b] text-sm text-slate-900 py-2 px-3 rounded-t-xl outline-none" 
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#e8e8e8] flex flex-col gap-3">
              <button 
                onClick={() => {
                  alert('Content published successfully!');
                  onNavigate && onNavigate('social-feed');
                }}
                className="w-full bg-[#8e004b] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-[#b90064] transition-colors flex justify-center items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">send</span> Publish Now
              </button>
              <button 
                onClick={() => {
                  alert('Draft saved successfully!');
                  onNavigate && onNavigate('social-feed');
                }}
                className="w-full bg-transparent border border-[#8e004b] text-[#8e004b] text-xs font-bold py-3.5 rounded-xl hover:bg-[#fde7f3] transition-colors"
              >
                Save Draft
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
