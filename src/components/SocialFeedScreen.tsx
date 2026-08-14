import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';

interface SocialFeedScreenProps {
  onNavigate?: (view: ViewType) => void;
}

export default function SocialFeedScreen({ onNavigate }: SocialFeedScreenProps) {
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({ post1: true });
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({ post1: 2400, post2: 890 });
  const [shareCounts, setShareCounts] = useState<{ [key: string]: number }>({ post1: 340, post2: 120 });
  const [commentCounts, setCommentCounts] = useState<{ [key: string]: number }>({ post1: 156, post2: 45 });
  const [savedPosts, setSavedPosts] = useState<{ [key: string]: boolean }>({ post1: true });
  const [showMetricsModal, setShowMetricsModal] = useState<string | null>(null);

  const toggleLike = (postId: string) => {
    const isLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setLikeCounts(prev => ({
      ...prev,
      [postId]: isLiked ? prev[postId] - 1 : prev[postId] + 1
    }));
  };

  const handleShare = (postId: string) => {
    setShareCounts(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
    alert('Post link copied to clipboard! Shared successfully.');
  };

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-['Inter'] antialiased min-h-screen flex flex-col overflow-x-hidden" style={{ background: 'radial-gradient(circle at top right, rgba(138, 0, 75, 0.08), transparent 40%), radial-gradient(circle at bottom left, rgba(253, 231, 243, 0.4), transparent 40%)' }}>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/80 backdrop-blur-md border-b border-[#e8e8e8]">
        <div className="flex justify-between items-center w-full px-6 md:px-10 max-w-[1440px] mx-auto h-20">
          {/* Brand Logo */}
          <div className="text-3xl font-bold tracking-tighter text-[#8e004b] cursor-pointer" onClick={() => onNavigate && onNavigate('home')}>
            Nexora
          </div>
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex gap-8 items-center">
            <button onClick={() => onNavigate && onNavigate('social-feed')} className="text-[#8e004b] border-b-2 border-[#8e004b] font-bold text-sm py-2">Feed</button>
            <button onClick={() => onNavigate && onNavigate('discover')} className="text-slate-600 font-medium text-sm hover:text-[#8e004b] transition-colors py-2">Explore</button>
            <button onClick={() => onNavigate && onNavigate('shop')} className="text-slate-600 font-medium text-sm hover:text-[#8e004b] transition-colors py-2">Trending</button>
          </nav>
          {/* Trailing Icons */}
          <div className="flex items-center gap-2 text-[#8e004b]">
            <button onClick={() => alert('Notifications')} className="p-2 hover:bg-[#fde7f3] rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button onClick={() => onNavigate && onNavigate('shop')} className="p-2 hover:bg-[#fde7f3] rounded-full transition-colors">
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-20 max-w-[1440px] mx-auto w-full relative">
        {/* SideNavBar (Desktop) */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-5rem)] w-64 p-4 gap-8 border-r border-[#e8e8e8] fixed left-0 top-20 bg-[#fdf8f8]/50 backdrop-blur-sm z-40">
          <div className="flex items-center gap-3 mt-4">
            <img 
              alt="User Profile Avatar" 
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_CAM_M2lD-iUK9w6l7sibvx7XjlYABaD3wr--7RxgA-QxcB2QIJ24fJN0yt6MbZElmBck0CCSxiqLx6xo2yo8yDlOk_q6YWvYS-5AiYsrtGOQEVsu1IkY7yljPM1VrxsWLQh0MrxwjY43EeYvktXsM3YWLfybiA3o3D6ckE-jSvb-3oQdTlzezWOO-2M2kc10cQA3VLofBd_Ck3cd5w0I9KDiyMo5RJ5N0yoDgyXQ5dSbf7NqvLkS3w" 
            />
            <div>
              <div className="font-semibold text-slate-900">Nexora Artistry</div>
              <div className="text-xs text-slate-500">Premium Member</div>
            </div>
          </div>

          <nav className="flex flex-col gap-2 mt-4 flex-1">
            <button onClick={() => onNavigate && onNavigate('social-feed')} className="flex items-center gap-3 px-4 py-3 text-[#8e004b] bg-[#fde7f3] rounded-xl font-bold text-sm text-left transition-all">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
              Home
            </button>
            <button onClick={() => onNavigate && onNavigate('discover')} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#8e004b] hover:bg-slate-100 transition-all rounded-xl text-sm text-left font-medium">
              <span className="material-symbols-outlined">search</span>
              Discover
            </button>
            <button onClick={() => alert('Create Post modal triggered')} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#8e004b] hover:bg-slate-100 transition-all rounded-xl text-sm text-left font-medium">
              <span className="material-symbols-outlined">add_circle</span>
              Create
            </button>
            <button onClick={() => onNavigate && onNavigate('distributor-directory')} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#8e004b] hover:bg-slate-100 transition-all rounded-xl text-sm text-left font-medium">
              <span className="material-symbols-outlined">group</span>
              Community
            </button>
            <button onClick={() => onNavigate && onNavigate('home')} className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-[#8e004b] hover:bg-slate-100 transition-all rounded-xl text-sm text-left font-medium">
              <span className="material-symbols-outlined">person</span>
              Profile
            </button>
          </nav>

          <button onClick={() => alert('New Artistry Post')} className="w-full bg-[#8e004b] text-white font-semibold text-sm py-3 rounded-xl shadow-sm hover:bg-[#b90064] transition-colors mt-auto mb-4">
            Post Artistry
          </button>

          <div className="flex flex-col gap-2 border-t border-[#e8e8e8] pt-4">
            <button onClick={() => onNavigate && onNavigate('home')} className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:text-[#8e004b] rounded-xl text-sm text-left font-medium">
              <span className="material-symbols-outlined">settings</span>
              Settings
            </button>
            <button onClick={() => onNavigate && onNavigate('home')} className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:text-[#8e004b] rounded-xl text-sm text-left font-medium">
              <span className="material-symbols-outlined">help_outline</span>
              Help
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 w-full px-5 md:px-10 py-8 pb-28 lg:pb-12">
          {/* Immersive Reels Carousel */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[#8e004b] mb-4 px-2">Spotlight</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none snap-x">
              {/* Reel 1 */}
              <div className="relative w-64 h-96 flex-none rounded-2xl overflow-hidden snap-center group cursor-pointer shadow-sm border border-[#e8e8e8]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZJ7ObNbj28_TWLXPD5yPIB1P5J1YxaSvPPAkCw4I3looRZGNpEFOgQgEY5UJDEF2DZYTUJGj0ngXJynBTY9dSQyta3UY4zJZq8SFOro8_lFECdVF8adl9iWVqJw59zMgzmv7LTWxJUI91rlaZjHDaLPao9TTRUKgiITx3pZQpfrIk4ZBVLPt8W8gtqJnYYLBuAN54Anmjfn8zofwcBimFMZNCIKKbZu2Nqr-fq8xvqHmo1brHlFrSvg" 
                  alt="Reel 1" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-white">auto_awesome</span>
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase">Beauty Tips</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ30a6KzLw6mkteGB4HA5lqSgAjiq-GwG2c3AcCu8dX93yBUKGsGRGHoS9RMGA72z4y9Pn5gEBi98q7NYVL0DNtmi9CvzXcGHEIHmtyWJFzmvHweLzri1UsuJRy-R32wSOYrELOgw5HbREZ0kqJ2pl9LbevETg2yhsU6ZsxQGoC1GYiCRHA7mWHLxkQwLcTH0jMSGkc8A8TowSSxAem8PFWeLGTuPC_6GNDVs6t0xkYT-TIMk7PkaDaA" 
                      alt="Artist" 
                      className="w-8 h-8 rounded-full border border-white/50 object-cover" 
                    />
                    <span className="text-sm font-bold">@ElenaArt</span>
                  </div>
                  <p className="text-xs text-white/90 line-clamp-2">Mastering the graphic liner for your evening gala look. #Artistry</p>
                </div>
                <div className="absolute right-4 bottom-20 flex flex-col gap-4 items-center">
                  <button className="text-white hover:text-pink-200 transition-colors flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    <span className="text-[10px]">12K</span>
                  </button>
                  <button className="text-white hover:text-pink-200 transition-colors flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span className="text-[10px]">342</span>
                  </button>
                </div>
              </div>

              {/* Reel 2 */}
              <div className="relative w-64 h-96 flex-none rounded-2xl overflow-hidden snap-center group cursor-pointer shadow-sm border border-[#e8e8e8]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIkFdEqKT-1YMiM1uNorm9bIblT2xyrLUu_Qgz6HcmUtw-MSHDMMb2Gvl3ugm516lD1OadB_3pLXVX_fpeap8G7yefz28Yqc5Fi1o0qfpONiBu5LQoGWSA4gP9Cl-_pmJ_l2PsMoA06enwJqfuIzpFMV4a5nBFfeyQldeNOOoiTCi4iLZNlQIG0S4-56lKNG4h05axXE_-nC2QCYnFeNz8sPqjrC6TUsg9Plhu9jgXrIlR5f_O-EKraw" 
                  alt="Reel 2" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-white">science</span>
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase">Skin Science</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9ofTVOP7rogGQUQYlyVdeyu6WgNEV-3uzOotXrKc3w-Dp-eXPtWoo5sh0gET-fPntxr3xihosD2c6dtSUIsSsue5b0ZyYZ3JWwXGcc8_nJ6rO1nob4WMapR0dZ8SYSzY82j2KDAITmUBdibdaM0n0vF4ENcaWaZTBJz4va2ZVxxSevkmcJ1NezLVavkj9vpP5FCZ4U4zylK4WyILF3ZzZctPXXpvFx5UbWulsYSQ1CGjy4tQkg9PvPA" 
                      alt="Artist" 
                      className="w-8 h-8 rounded-full border border-white/50 object-cover" 
                    />
                    <span className="text-sm font-bold">@DermaGlow</span>
                  </div>
                  <p className="text-xs text-white/90 line-clamp-2">The ultimate morning hydration routine for flawless application.</p>
                </div>
                <div className="absolute right-4 bottom-20 flex flex-col gap-4 items-center">
                  <button className="text-white hover:text-pink-200 transition-colors flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="text-[10px]">8.5K</span>
                  </button>
                  <button className="text-white hover:text-pink-200 transition-colors flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span className="text-[10px]">128</span>
                  </button>
                </div>
              </div>

              {/* Reel 3 */}
              <div className="relative w-64 h-96 flex-none rounded-2xl overflow-hidden snap-center group cursor-pointer shadow-sm border border-[#e8e8e8]">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANDloscJtdTJ-l0Xxyu6ZG77UxRa3foZfvT7rZZ4FfeIOJ4PS-x1M5dJoxm5u835Kxp8i4yecrC2ccH77te4ouvfEMLS3ly8cMGjWDld6sye6-fiz0KGdPqHXoDRs-UZjqVK1Tltmuhf0uAdCb27Yo6qsHkvY9yLvjqTlG8uGkc2E-8uDEiKueB9kzXeSrRgFFCtypTYkFL4XQY7Wd0X_Nz6YcaSx33ARy4DCQh5rpujICLzp-dEoFyg" 
                  alt="Reel 3" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-white">photo_camera</span>
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase">BTS</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeGHbKJWtZ1b-Vkva6NCq0OWTcmMs1Q2N6tALUi5_uoKwSAhdji6GwaINkANbaxbpsqw84l5mG_XWFJf17d6-C01wb9gd-PohpJH7CNftyRsT2qhHVRVO8MNoskhnrLX8auLAThv49OZlXzV2n-cth6AlMKyQoHpLNpEGCyWtiMJCDhY2vEuKcU5OVCLTmOAv4lhuBDQ8XgCl9C3pcHFlhb4-Bd3exos4NiEpUXUegOkG4YeGoCQQMFg" 
                      alt="Artist" 
                      className="w-8 h-8 rounded-full border border-white/50 object-cover" 
                    />
                    <span className="text-sm font-bold">@StudioNex</span>
                  </div>
                  <p className="text-xs text-white/90 line-clamp-2">Prepping for the fall campaign. Pure magic happening on set today.</p>
                </div>
                <div className="absolute right-4 bottom-20 flex flex-col gap-4 items-center">
                  <button className="text-white hover:text-pink-200 transition-colors flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="text-[10px]">5.2K</span>
                  </button>
                  <button className="text-white hover:text-pink-200 transition-colors flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    <span className="text-[10px]">89</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Main Feed */}
          <section className="max-w-2xl mx-auto flex flex-col gap-8">
            {/* Feed Post 1 */}
            <article className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#8e004b]/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9e0AWL13Kt-Ghy4pIbewdftimA2f_3T0ZMbxjx_SQ1sK68YALGdRoGxTWfPA4vOVD4CDhVciDyne-g5uUBmwNpaDw3KinibWd5mmwFtq0rSIML-ROcTwGAbh6uQI5lwguUFL2Ft2O4kv4VqhRMZygqKOQbdewIw_4_O_ks2DK7yBhaHIg0FVzTedXyHmjUnf2XlXHG7aVcbqQPSuAkjfEpsJIkXkbwJduMcV-FISrEYnAS2VI0u93SA" 
                    alt="Author" 
                    className="w-10 h-10 rounded-full border border-[#e8e8e8] object-cover" 
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Sophia Lauren</h3>
                    <p className="text-[11px] text-slate-500">Paris, France • 2h ago</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-[#8e004b]">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>

              <div className="mb-4 relative z-10">
                <p className="text-sm text-slate-800 mb-3 leading-relaxed">
                  Embracing the minimalist aesthetic today. A touch of gloss, brushed brows, and the perfect luminous base. Sometimes less truly is more. ✨
                </p>
                <div className="relative rounded-xl overflow-hidden group/image shadow-sm">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKJlfGGeJnSfdbmjxwyjFZ_avKm75AHUPohS76KO5ryUm1BBW3zXG2_ExghV5wUrFWswV6DqRLtM0oCiiHaMly6O466q_p9VzrQgn-LT34Uj8D3w06vquqC19Jwm2gYtCUJPebbOiYgx6VPoh-mhnEFwbgcAiDiIOrDJjAS-HewRFzB2eJcTXtbLsvyjDQDpBGU_0nvSEdKcZyMbJCpLK4EXP7OtHLGRZRM__5oP0JBcEzvzII5tVSdg" 
                    alt="Post Image" 
                    className="w-full h-auto object-cover max-h-[500px]" 
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => onNavigate && onNavigate('shop')}
                      className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform translate-y-4 group-hover/image:translate-y-0 transition-all duration-300 hover:bg-white"
                    >
                      <span className="material-symbols-outlined text-[#8e004b]">shopping_bag</span>
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/50 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#8e004b] animate-pulse"></span>
                    <span className="text-xs text-slate-900 font-bold">Luminous Base</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#e8e8e8]/60 pt-3 relative z-10">
                {/* Salon Performance Metrics Bar */}
                <div className="bg-[#fde7f3]/50 border border-[#e0bec6]/60 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-700 font-semibold">
                    <span className="flex items-center gap-1 text-[#8e004b] font-bold">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span> 14.8% Engagement
                    </span>
                    <span className="text-slate-400">•</span>
                    <span>Reach: 18.4K</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#8e004b] bg-white px-2 py-0.5 rounded-full shadow-2xs">Salon Performance High</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <button 
                      onClick={() => toggleLike('post1')}
                      className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${likedPosts['post1'] ? 'text-[#8e004b]' : 'text-slate-600 hover:text-[#8e004b]'}`}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: likedPosts['post1'] ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                      <span>{likeCounts['post1']} Likes</span>
                    </button>
                    <button 
                      onClick={() => alert('Comments drawer: 156 client reviews & inquiries')}
                      className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#8e004b] font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined">chat_bubble_outline</span>
                      <span>{commentCounts['post1']} Comments</span>
                    </button>
                    <button 
                      onClick={() => handleShare('post1')}
                      className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#8e004b] font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined">share</span>
                      <span>{shareCounts['post1']} Shares</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => toggleSave('post1')}
                    className={`p-1 rounded transition-colors ${savedPosts['post1'] ? 'text-[#8e004b]' : 'text-slate-400 hover:text-[#8e004b]'}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: savedPosts['post1'] ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Feed Post 2 */}
            <article className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fde7f3]/50 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#74565f] flex items-center justify-center text-white font-bold text-sm">
                    E
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Editorial Eye</h3>
                    <p className="text-[11px] text-slate-500">Trend Report • 4h ago</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 relative z-10">
                <h4 className="text-lg font-bold text-slate-900 mb-2">The Return of Structural Blush</h4>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Draping is back, but with a sharper, more architectural focus. We're seeing artists use deep, saturated berries and terracottas to sculpt the cheekbone rather than just flush it.
                </p>
                {/* Bento Grid */}
                <div className="grid grid-cols-2 gap-2 h-64">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB4vTygpRNJvPB0eeWMVlV0uaBXrbthBMdj15yJ3pMFozj_2eiUmMN1H9vknqAuRxETMGWkL5okGKku8fqbuIMlugeHiLgve-NnC7mlUSURdNDeS8eV52VhKXq67xLb0DMsngLgordKKUj89hoji9GfiKyG0eyuY1L4Q9SHXQeYTQn92HDxyx8xDdayq6lEC6IWmnvR3A0Jgj_hgzwQe9ELaXzm8DsuWgfb5IgPYXIzTCPRG0a7h5tgw" 
                    alt="Trend Image 1" 
                    className="w-full h-full object-cover rounded-xl shadow-sm" 
                  />
                  <div className="grid grid-rows-2 gap-2">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTO_3UwrMv2kXkgma9VmUyeCoNZnlk1uOBLZCr5ucOp8ubMHKKXgh-eA3prpW5F7QBhF7_Gv43qbO1T_eqA4q80izY7WwV3pLtJvCYvJ6EV2pK1yiR3Wr2CMPZDuEVP1V_cMX9zzt1hsbxuIRi58oPjrP1o5C0FvwxnzdfgLqk6VIQFXWxWzLeV9o1gRKwB299-unLRiAW3YOyTo0QswsgpfnAsRPgX-gwDvVnB2RVtDW53WduQEhIbg" 
                      alt="Trend Image 2" 
                      className="w-full h-full object-cover rounded-xl shadow-sm" 
                    />
                    <div className="bg-[#8e004b]/5 rounded-xl flex items-center justify-center p-4 border border-[#e8e8e8]">
                      <p className="text-center text-xs font-semibold text-[#8e004b] italic">"Sculpt, don't just flush."</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#e8e8e8]/60 pt-3 relative z-10">
                {/* Salon Performance Metrics Bar */}
                <div className="bg-[#fde7f3]/50 border border-[#e0bec6]/60 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-700 font-semibold">
                    <span className="flex items-center gap-1 text-[#8e004b] font-bold">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span> 11.2% Engagement
                    </span>
                    <span className="text-slate-400">•</span>
                    <span>Reach: 9.2K</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#8e004b] bg-white px-2 py-0.5 rounded-full shadow-2xs">Trending Post</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <button 
                      onClick={() => toggleLike('post2')}
                      className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${likedPosts['post2'] ? 'text-[#8e004b]' : 'text-slate-600 hover:text-[#8e004b]'}`}
                    >
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: likedPosts['post2'] ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                      <span>{likeCounts['post2']} Likes</span>
                    </button>
                    <button 
                      onClick={() => alert('Comments drawer: 45 discussions')}
                      className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#8e004b] font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined">chat_bubble_outline</span>
                      <span>{commentCounts['post2']} Comments</span>
                    </button>
                    <button 
                      onClick={() => handleShare('post2')}
                      className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#8e004b] font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined">share</span>
                      <span>{shareCounts['post2']} Shares</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => toggleSave('post2')}
                    className={`p-1 rounded transition-colors ${savedPosts['post2'] ? 'text-[#8e004b]' : 'text-slate-400 hover:text-[#8e004b]'}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: savedPosts['post2'] ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                  </button>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 bg-[#fcf9f8]/95 backdrop-blur-md z-50 rounded-t-2xl shadow-lg border-t border-[#e8e8e8]">
        <button onClick={() => onNavigate && onNavigate('social-feed')} className="flex flex-col items-center justify-center text-[#8e004b] font-bold text-[11px] p-1.5">
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          Home
        </button>
        <button onClick={() => onNavigate && onNavigate('discover')} className="flex flex-col items-center justify-center text-slate-500 hover:text-[#8e004b] font-medium text-[11px] p-1.5">
          <span className="material-symbols-outlined text-[22px]">search</span>
          Search
        </button>
        <button onClick={() => alert('Create Post')} className="flex flex-col items-center justify-center text-slate-500 hover:text-[#8e004b] font-medium text-[11px] p-1.5">
          <span className="material-symbols-outlined text-[22px]">add_box</span>
          Create
        </button>
        <button onClick={() => onNavigate && onNavigate('orders')} className="flex flex-col items-center justify-center text-slate-500 hover:text-[#8e004b] font-medium text-[11px] p-1.5">
          <span className="material-symbols-outlined text-[22px]">receipt_long</span>
          Orders
        </button>
        <button onClick={() => onNavigate && onNavigate('home')} className="flex flex-col items-center justify-center text-slate-500 hover:text-[#8e004b] font-medium text-[11px] p-1.5">
          <span className="material-symbols-outlined text-[22px]">person</span>
          Profile
        </button>
      </nav>

      {/* Floating Action Button (Mobile Contextual - Create Post) */}
      <button 
        onClick={() => alert('New Post modal')}
        className="lg:hidden fixed bottom-20 right-5 bg-[#8e004b] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-40"
      >
        <span className="material-symbols-outlined">edit</span>
      </button>
    </div>
  );
}
