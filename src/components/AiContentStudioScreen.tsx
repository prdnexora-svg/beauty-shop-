import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';

interface AiContentStudioScreenProps {
  onNavigate?: (view: ViewType) => void;
}

export default function AiContentStudioScreen({ onNavigate }: AiContentStudioScreenProps) {
  const [prompt, setPrompt] = useState('A minimalist flat lay of luxury skincare serum bottle on polished terrazzo marble. Soft morning light, sharp shadows.');
  const [lighting, setLighting] = useState('Morning Window Light');
  const [composition, setComposition] = useState('Macro / Close-up');
  const [selectedVariation, setSelectedVariation] = useState(0);

  const variations = [
    {
      id: 0,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmyYVaJTQUDzaKPFNFHv5SeCuPoV6WfjdMNO8HMHEqmlAvwU6_Pm_hvBv_-LycwsUDh-cy5OknTW6G5NPqojnR2DuR23oz563bxNZY0yuCzLl2s9qxC_Lhx9SkH-voo4d8XRy9RTgg-dmtAErhNg0wrq-RQhbfNdd9b1PWy8QZF5qPRvwzJEY8bXwu8AoHmPmOGz5zLFxiKFqrAtHuvQGuJhUabXeiyJmFkcpLU81dhKa5UFn7pp7UCQ',
      alt: 'Macro close up of serum bottle'
    },
    {
      id: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALX-wjU2gfSsWe52p8O0c_wYm4PaUAQVKK9EZLNFq3zl-BSdUbEgd29Hh-6ixqdJFMPvKTf0IssRoTpgZC5t4mbMgNjePi6zivzWOszdMqbu2l3l47HwDy9c67OVTDXfFTJAVOjIvnVwOSZXML_cs_gtchg98J9O1RHSMp47B0ZtOd75N1IrjyCeYW7x08uF3TfSHukpRiZj8HlLzDTjdRFJqUhF-F05LCNKBf9fSgP24B70NBa8g0Yg',
      alt: 'Variation 2'
    },
    {
      id: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1AVG17QufbSgn99AgrdlRu6b43EiMe_yTiQgXNHXxm21f-SmqTaFSmeCIYfDoxaMO_ByR1DKPOWYNDGgD89IfysDY8UmWmEdCu64yAC77t1N6IbeG-RRQ2PEXDy4vzsH8LRK_dyCMRZLbHmIQ-rRLe--vCQvebahBbklsqA5aSxwFq9xNxBHOdAFKoTXhBwfFq2OidlV7ZmKwJIJii6Sul9LafmHj36ighKPo-HdcdfIw4qsYeBVYmg',
      alt: 'Variation 3'
    }
  ];

  return (
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-['Inter'] h-screen overflow-hidden flex w-full">
      {/* SideNavBar */}
      <nav className="bg-white text-[#8e004b] flex flex-col h-full py-8 space-y-8 w-64 fixed left-0 top-0 border-r border-[#e8e8e8] hidden md:flex z-50 shadow-sm">
        <div className="px-6 cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Nexora Management</h1>
          <p className="text-[11px] font-medium text-slate-500 mt-1">Premium Suite</p>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <button onClick={() => onNavigate && onNavigate('home')} className="w-full text-slate-600 pl-4 flex items-center space-x-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all text-left font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button onClick={() => onNavigate && onNavigate('shop')} className="w-full text-[#8e004b] font-bold border-l-4 border-[#8e004b] pl-3 flex items-center space-x-3 py-2.5 rounded-xl bg-[#fde7f3] text-left text-sm">
            <span className="material-symbols-outlined text-[20px]">spa</span>
            <span>Services</span>
          </button>
          <button onClick={() => onNavigate && onNavigate('orders')} className="w-full text-slate-600 pl-4 flex items-center space-x-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all text-left font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            <span>Inventory</span>
          </button>
          <button onClick={() => onNavigate && onNavigate('distributor-directory')} className="w-full text-slate-600 pl-4 flex items-center space-x-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all text-left font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span>Clients</span>
          </button>
          <button onClick={() => onNavigate && onNavigate('home')} className="w-full text-slate-600 pl-4 flex items-center space-x-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all text-left font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            <span>Analytics</span>
          </button>
        </div>
        <div className="px-4 pb-4">
          <button onClick={() => onNavigate && onNavigate('shop')} className="w-full bg-[#8e004b] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#b90064] transition-colors shadow-sm">Book Session</button>
        </div>
        <div className="px-2 space-y-1 border-t border-[#e8e8e8] pt-4">
          <button onClick={() => onNavigate && onNavigate('home')} className="w-full text-slate-600 pl-4 flex items-center space-x-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all text-left font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </button>
          <button onClick={() => onNavigate && onNavigate('home')} className="w-full text-slate-600 pl-4 flex items-center space-x-3 py-2.5 rounded-xl hover:bg-slate-100 transition-all text-left font-semibold text-sm">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Support</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="ml-0 md:ml-64 flex-1 h-screen flex flex-col w-full">
        {/* Top App Bar */}
        <header className="h-16 border-b border-[#e8e8e8] bg-white flex items-center justify-between px-6 shrink-0 shadow-sm">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">AI Content Studio</h2>
            <span className="px-2.5 py-1 bg-[#f0edec] text-[#5a3f47] text-xs font-bold rounded-full">Summer Campaign '24</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[#8e004b]">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span className="text-xs font-bold">Generation Complete</span>
            </div>
            <button 
              onClick={() => alert('Assets exported successfully!')}
              className="bg-[#8e004b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#b90064] transition-colors shadow-sm"
            >
              Export Assets
            </button>
          </div>
        </header>

        {/* 3-Column Architecture */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Controls */}
          <aside className="w-80 border-r border-[#e8e8e8] bg-white overflow-y-auto p-6 space-y-8 shrink-0">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 border-b border-[#e8e8e8] pb-2">Prompt Strategy</h3>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 bg-[#f0edec] border-b border-slate-300 focus:border-[#8e004b] focus:border-b-2 outline-none p-3 text-sm resize-none rounded-t-xl" 
                placeholder="Describe the scene..."
              ></textarea>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b border-[#e8e8e8] pb-2">Styling Parameters</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Lighting Rig</label>
                <select 
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full bg-[#f0edec] border-b border-slate-300 p-2.5 text-sm outline-none rounded-t-xl"
                >
                  <option>Studio Softbox (Neutral)</option>
                  <option>Morning Window Light</option>
                  <option>Harsh Flash (Editorial)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Composition</label>
                <select 
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  className="w-full bg-[#f0edec] border-b border-slate-300 p-2.5 text-sm outline-none rounded-t-xl"
                >
                  <option>Rule of Thirds</option>
                  <option>Macro / Close-up</option>
                  <option>Flat Lay (Overhead)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Color Grading</label>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full bg-[#fdf8f8] border border-slate-300 ring-2 ring-[#8e004b] ring-offset-1"></button>
                  <button className="w-8 h-8 rounded-full bg-[#e2bdc7] border border-slate-300"></button>
                  <button className="w-8 h-8 rounded-full bg-[#3e001e] border border-slate-300"></button>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <button 
                onClick={() => alert('Generating new variations (2 Credits used)...')}
                className="w-full border border-[#8e004b] text-[#8e004b] py-3 rounded-xl text-xs font-bold hover:bg-[#fde7f3] transition-colors flex items-center justify-center space-x-2"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                <span>Regenerate (2 Credits)</span>
              </button>
            </div>
          </aside>

          {/* Center Panel: Workspace */}
          <section className="flex-1 bg-[#fcf9f8] overflow-y-auto p-10 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e8e8e8 1px, transparent 1px), linear-gradient(90deg, #e8e8e8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="w-full max-w-xl bg-white p-5 rounded-2xl border border-[#e8e8e8] shadow-sm relative z-10">
              <div className="relative w-full aspect-[4/5] bg-[#f0edec] rounded-xl overflow-hidden group">
                <img 
                  className="w-full h-full object-cover" 
                  src={variations[selectedVariation].image} 
                  alt={variations[selectedVariation].alt} 
                />
                <div className="absolute inset-0 bg-slate-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button onClick={() => alert('Zoom in')} className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-slate-800 hover:text-[#8e004b] transition-colors shadow-md">
                    <span className="material-symbols-outlined">zoom_in</span>
                  </button>
                  <button onClick={() => alert('Crop tool')} className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-slate-800 hover:text-[#8e004b] transition-colors shadow-md">
                    <span className="material-symbols-outlined">crop</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center px-1">
                <div className="text-xs font-bold text-slate-500 flex items-center space-x-2">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  <span>2048 x 2560px (4:5) • 3.2MB</span>
                </div>
                <button onClick={() => alert('Metadata view')} className="text-[#8e004b] text-xs font-bold hover:underline">View Metadata</button>
              </div>
            </div>
          </section>

          {/* Right Panel: Assets & Variations */}
          <aside className="w-80 border-l border-[#e8e8e8] bg-white overflow-y-auto p-6 space-y-8 shrink-0">
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b border-[#e8e8e8] pb-2 mb-4">Current Session</h3>
              <div className="grid grid-cols-2 gap-2">
                {variations.map((v) => (
                  <div 
                    key={v.id}
                    onClick={() => setSelectedVariation(v.id)}
                    className={`aspect-square bg-[#f0edec] rounded-xl overflow-hidden relative cursor-pointer border-2 transition-all ${selectedVariation === v.id ? 'border-[#8e004b]' : 'border-[#e8e8e8] hover:border-slate-400'}`}
                  >
                    <img src={v.image} alt={v.alt} className="w-full h-full object-cover" />
                    {selectedVariation === v.id && (
                      <div className="absolute top-1.5 right-1.5 bg-[#8e004b] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-sm">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Variation */}
                <div 
                  onClick={() => alert('Generating new variation...')}
                  className="aspect-square bg-[#fcf9f8] rounded-xl border border-dashed border-[#e0bec6] flex flex-col items-center justify-center text-slate-500 hover:text-[#8e004b] hover:border-[#8e004b] cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined">add</span>
                  <span className="text-[11px] font-bold mt-1">Generate</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#e8e8e8]">
              <h3 className="text-lg font-bold text-slate-900">Export Pipeline</h3>
              <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-[#f0edec] rounded-xl transition-colors">
                <input defaultChecked className="form-checkbox text-[#8e004b] rounded border-slate-300 focus:ring-[#8e004b] h-4 w-4" type="checkbox"/>
                <span className="text-xs font-bold text-slate-800">High-Res PNG (Lossless)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-[#f0edec] rounded-xl transition-colors">
                <input className="form-checkbox text-[#8e004b] rounded border-slate-300 focus:ring-[#8e004b] h-4 w-4" type="checkbox"/>
                <span className="text-xs font-bold text-slate-800">WebP (Optimized)</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-[#f0edec] rounded-xl transition-colors">
                <input className="form-checkbox text-[#8e004b] rounded border-slate-300 focus:ring-[#8e004b] h-4 w-4" type="checkbox"/>
                <span className="text-xs font-bold text-slate-800">Save Metadata to DAM</span>
              </label>
              <button 
                onClick={() => {
                  alert('Pushed to Campaign successfully!');
                  onNavigate && onNavigate('social-feed');
                }}
                className="w-full bg-[#8e004b] text-white py-3 rounded-xl text-xs font-bold font-bold mt-4 hover:bg-[#b90064] transition-colors shadow-sm"
              >
                Push to Campaign
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
