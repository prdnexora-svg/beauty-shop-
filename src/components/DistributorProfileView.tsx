import { useState } from "react";
import { ArrowLeft, Share2, MoreVertical, LayoutDashboard, Package, ListVideo, Tag, Star, User, Store, Film, Send } from "lucide-react";

export default function DistributorProfileView() {
  return (
    <div className="bg-off-white min-h-screen text-on-surface antialiased font-body-md overflow-x-hidden pb-24 md:pb-0">
      {/* Mobile Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-16 bg-off-white/90 backdrop-blur-md border-b border-outline-subtle md:hidden">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
            <ArrowLeft className="w-6 h-6 text-on-surface" />
          </button>
          <span className="font-headline-sm text-headline-sm text-on-surface">Profile</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
            <Share2 className="w-6 h-6 text-on-surface" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
            <MoreVertical className="w-6 h-6 text-on-surface" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen pt-16 md:pt-0">
        {/* Hero Section */}
        <section className="relative w-full h-[409px] md:h-[512px] md:mt-16 flex">
          <div 
            className="w-full md:w-2/3 h-full relative" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtCSxJrL0BEZ3Nsw4mnQHOKR6rroZHtf7fshCMogVHd6o49a69k1eotdQB9MIziTxsKcsydrNFyyUJWaTcUCWK1bjNpB-tWjbs88Y2clcXzem1asg5L2rHamAb0c0bFy_sdJI0j1QBw96Jc9KFv5GMMr5YRXj128ovmLDR7-mZrpH33gLMHyP9uXd78epcplKsrtQF_sVvkGPZK9CJ1KvV_zv3QFt3x9YnuN4_9rKQcLeCIfU_pxTUJg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          <div 
            className="hidden md:block w-1/3 h-full relative border-l border-white/20" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjbHJJkh6fXBPqoewYoo9PnTy-lu_OwIUk6vf3jt5wyyjiNAKZM8Wveu00tVo8bJ2mR6g-ZxyDTCCwiNr1s1gXPF4-0RzM82hNZiiBq7j2BKSOmNHdFf9mdn9xWtAp7IJaqqBtCWFMwGNGXuSpHlR7dKZCf47an4OdB68JqBWCR8b1MSr8VSFj4vawiCpRWW2-6vsahHAwLL1VRe21oW95JEHKvw4T7m957ogkg0SWqTw8Sp19f88EXg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 transform translate-y-1/2">
            <div className="max-w-screen-xl mx-auto flex items-end gap-6">
              <div className="relative group">
                <img 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] object-cover z-10 relative" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_WUj_PgdAz_-VkoWcS8B4BMtTRfwgrZVFWUsbjVj-s1wHhAdEkHcebxA0drtYFyle_Hc78qlR0qgi35Vt1yf9Ho7AApjIPbh2PoOdtZG0Ch6rwxImDeR_wL966QkWtebf2yJ9V6GM5B886PB5_a5ukM3I0BNEjgozThDRWhp-e4Qy9fROK80yGxVyi8rNGpCc3jcSlzfmGd0lCZ5AmLmZ49qIsO2mB08RGpiY0YUktvOVkdTbz9h3TQ"
                  alt="Profile Logo"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="h-16 md:h-24"></div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-10 space-y-16 pb-16">
          {/* Header Info */}
          <section className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2 tracking-tight">LuxeSuite Distributors</h1>
            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-medium mb-6">
              <span>Milan, Italy</span>
              <span className="w-1 h-1 rounded-full bg-outline-subtle"></span>
              <span>Global Coverage</span>
              <span className="w-1 h-1 rounded-full bg-outline-subtle"></span>
              <span className="text-primary flex items-center gap-1 font-semibold"><Star className="w-4 h-4 fill-current" /> 4.9 (128 Reviews)</span>
            </div>
          </section>

          {/* About Section */}
          <section className="max-w-4xl border-t border-outline-subtle pt-16">
            <h2 className="text-xl font-bold text-on-surface mb-4">About the Distributor</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed font-light">
              Curating the world's most exceptional beauty and professional salon brands. LuxeSuite Distributors connects elite creators with premium establishments across Europe and the Americas. Our meticulously selected portfolio represents the pinnacle of modern aesthetics, performance, and sustainable luxury.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
