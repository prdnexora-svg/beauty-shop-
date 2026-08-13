import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Heart, ShoppingBag, Star, Sparkles, Menu, Bell,
  Compass, ShieldCheck, Check, Settings, HelpCircle, X,
  Droplets, Flower2, RefreshCw, Truck, ChevronRight, Plus, Minus, Trash2,
  Store, Search, User
} from 'lucide-react';
import { ViewType, Product } from '../types';

interface ProductDetailScreenProps {
  product?: Product | null;
  onBack?: () => void;
  onNavigate?: (view: ViewType) => void;
}

const defaultImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAvT3mT7j7SrEk9xl9KGccW8XEacpyci8nsp_DFvOoZ4jL0jQ3gIyqdDRZf9CR0Fth4EYC3B0NJCkBDrJdmZ0ekEET6Nb0zusf7tuh6UiIPDBuW8niTSpXq9J-p6pQFDkVPZ2Xv3Fww2PV3SbPviJttt0B4RsjuFMpfy6fpp3-AwBfv3u6MaIUBwRrk_x1ZTrNC9MPZ5RX_b2MCokKMo7B7aZ-Z7y0qbItNfYhbEttR3qFev7lbtWDGtA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDcScpVc2jqYsozF8uBbXcUdnKe9Fw1Vv7Oed7Pjt5eUH8Ny3Fl23S89VBHIWniDCwm1tInw_m7RVRsWoEsJi6_G_r0nCnkB4JaAn9_mBBAHHn8aQvJzUCd9zcPOk_-W2JWhRahQRdr27Qh2pdNZeYCCjrjS0FyeOVHHDKscfEJ4N1xHPi8lIKVArOlMFegdDHcS0NL-NeJXNcj7r1q1W4lvVQ0kzlGADq0ynVfHbhZoqz6RXAuu4tMxg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB6qwlvVitrBTuaskj82EEI-NyUoDh7PV-BfLfKj37ZCV-3KFRcf2IV9mXGBRTz6_x7fMRi4tL82fSFYMIXCZji8J5SQesW5eDv45kgSf0UIbUVm5FacfSatez7TAvI2r_YLlgPcIHt1WDx-TyCDACImwaec595WHK5nljuXLO6MTIygWXLAofjiLdM4TiKrSKN_wgWXpzBUqVZYo7gbFjgiHZSzwts-R1td6iIFSh2Sc0CE12iGZlpOg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCEu6Dp6wTIV0LEiTrWboX8bw-wdQ9fTaAEW8gIdeNiNPMnw_0AQLs0YT5_Zs6d9l3kVn9BBZs2C_anYJiLG1AeryLydj11NRMFjyKeaLi8Mng7TSarVG5rWwyo9IFdiwZINluDnjRezm-7WASBuJdKC4QabnGylefc7SXTint6BBdOLkcYLGsChXPlpnIKW1IE0DGkTWuHL8mz3dXcuC5y3Md9DPNAMlcDoX-q6a0vwMTX76TRIXxfng'
];

export default function ProductDetailScreen({ product, onBack, onNavigate }: ProductDetailScreenProps) {
  // Product state fallback
  const brand = product?.brand || 'Aura Botanica';
  const name = product?.name || 'Hydration Cloud Cream';
  const basePrice = product?.price || 68.00;
  const description = product?.description || 'A weightless, whipped gel-cream that floods the skin with continuous moisture. Formulated with molecular hyaluronic acid and rare botanical extracts for an instantly plump, glass-skin finish.';
  
  // Interactivity States
  const [selectedImage, setSelectedImage] = useState<string>(product?.image || defaultImages[0]);
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'clinical'>('ingredients');
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const price = selectedSize === '100ml' ? basePrice * 1.6 : basePrice;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + quantity);
    showToast(`Added ${quantity}x ${name} (${selectedSize}) to Shopping Bag!`);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-pink-100 selection:text-rose-900">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Background & Ambient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-[#fcf9f8] via-[#fde7f3]/50 to-[#f0edec]" />
      <div className="fixed -top-24 -left-24 w-[450px] h-[450px] bg-pink-200/50 rounded-full blur-[90px] pointer-events-none z-0 animate-pulse" />
      <div className="fixed -bottom-32 -right-24 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Sticky Top Header Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-colors">
        <div className="flex justify-between items-center w-full px-4 md:px-10 py-4 max-w-[1440px] mx-auto">
          {/* Mobile Back / Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack ? onBack : () => onNavigate && onNavigate('shop')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500 hidden sm:inline-block">Back to Shop</span>
          </div>

          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => onNavigate && onNavigate('shop')}>
            <h1 className="font-extrabold text-xl md:text-2xl tracking-tighter text-rose-900">
              Nexora Shop
            </h1>
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => showToast('Notifications up to date')}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-800 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Screen Layout Container */}
      <div className="flex min-h-screen pt-4 pb-24 md:pb-12 relative z-10">
        {/* SideNavBar (Desktop Only) */}
        <aside className="bg-white/60 backdrop-blur-md border-r border-slate-200/80 w-64 hidden md:flex flex-col fixed left-0 top-0 h-screen p-6 z-40 pt-24 overflow-y-auto">
          <nav className="flex-1 flex flex-col gap-1.5 mt-4">
            <button
              onClick={() => onNavigate && onNavigate('discover')}
              className="flex items-center gap-3 px-4 py-3 bg-rose-100/70 text-rose-900 font-bold rounded-xl transition-all shadow-sm border border-rose-200/60 text-xs"
            >
              <Compass className="w-4 h-4 text-rose-800" />
              <span>Discover</span>
            </button>
            <button
              onClick={() => showToast('Collections catalog open')}
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-rose-900 hover:bg-slate-100/80 font-medium rounded-xl transition-all text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Collections</span>
            </button>
            <button
              onClick={() => showToast('New arrivals loaded')}
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-rose-900 hover:bg-slate-100/80 font-medium rounded-xl transition-all text-xs"
            >
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span>New Arrivals</span>
            </button>
            <button
              onClick={() => showToast('Brands page loaded')}
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-rose-900 hover:bg-slate-100/80 font-medium rounded-xl transition-all text-xs"
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <span>Brands</span>
            </button>
            <button
              onClick={() => showToast(isFavorite ? 'In Favorites' : 'Saved to Favorites')}
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-rose-900 hover:bg-slate-100/80 font-medium rounded-xl transition-all text-xs"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-600 fill-rose-600' : 'text-slate-400'}`} />
              <span>Favorites</span>
            </button>
          </nav>

          <div className="mt-auto flex flex-col gap-2 border-t border-slate-200/80 pt-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-rose-900 font-bold text-xs hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Cart ({cartCount})</span>
            </button>
            <button
              onClick={() => showToast('Settings loaded')}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-slate-900 text-xs font-medium"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => showToast('Support line open')}
              className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-slate-900 text-xs font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </button>
          </div>
        </aside>

        {/* Main Product Details Canvas */}
        <main className="flex-1 w-full md:pl-64 px-4 md:px-10 py-6 max-w-[1440px] mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={onBack ? onBack : () => onNavigate && onNavigate('shop')}
              className="text-slate-500 hover:text-rose-900 transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Skincare</span>
            </button>
          </div>

          {/* Bento Grid Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Immersive Product Imagery (7 cols desktop) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Hero Image Glass Container */}
              <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden relative aspect-square sm:aspect-[4/3] md:aspect-[4/5] flex items-center justify-center shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 via-transparent to-transparent z-10 pointer-events-none" />
                <img
                  src={selectedImage}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <span className="bg-pink-100/90 backdrop-blur-md text-rose-900 text-xs font-extrabold px-3 py-1 rounded-full border border-pink-200 inline-flex items-center gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                    <span>Bestseller</span>
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery Strip */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {defaultImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex-shrink-0 overflow-hidden border-2 transition-all shadow-sm ${
                      selectedImage === img
                        ? 'border-rose-800 scale-98 shadow-md'
                        : 'border-slate-200/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Details & Primary Actions (5 cols desktop) */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
              {/* Title & Rating Box */}
              <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">{brand}</p>
                  <button
                    onClick={() => {
                      setIsFavorite(!isFavorite);
                      showToast(isFavorite ? 'Removed from Wishlist' : 'Saved to Wishlist!');
                    }}
                    className="p-2 rounded-full hover:bg-rose-50 text-slate-500 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'text-rose-600 fill-rose-600' : ''}`} />
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {name}
                </h1>

                <div className="flex items-center gap-4 pt-1">
                  <span className="text-2xl font-black text-rose-900">
                    ${price.toFixed(2)}
                  </span>
                  <div className="h-5 w-px bg-slate-200" />
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                    <div className="flex text-amber-500">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <Star className="w-3.5 h-3.5 fill-amber-200 text-amber-400" />
                    </div>
                    <span>(124 Reviews)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {description}
                </p>
              </div>

              {/* Size Selector Box */}
              <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl shadow-sm space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>Size Option:</span>
                  <span className="text-rose-900">{selectedSize}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedSize('50ml')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                      selectedSize === '50ml'
                        ? 'border-rose-800 bg-white text-rose-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    50ml Standard
                  </button>
                  <button
                    onClick={() => setSelectedSize('100ml')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                      selectedSize === '100ml'
                        ? 'border-rose-800 bg-white text-rose-900 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    100ml Value Size
                  </button>
                </div>
              </div>

              {/* Quantity & Add to Cart Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Add To Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-rose-900 text-white font-bold text-xs rounded-xl hover:bg-rose-950 transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — ${(price * quantity).toFixed(2)}</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500 pt-1">
                  <Truck className="w-4 h-4 text-rose-800" />
                  <span>Free standard shipping on wholesale orders over $50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: Details Tabs */}
          <div className="mt-12">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              {/* Tab Header Bar */}
              <div className="flex gap-6 border-b border-slate-200 pb-3 mb-6 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                    activeTab === 'ingredients'
                      ? 'border-rose-800 text-rose-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Key Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                    activeTab === 'usage'
                      ? 'border-rose-800 text-rose-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  How to Use
                </button>
                <button
                  onClick={() => setActiveTab('clinical')}
                  className={`pb-2 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                    activeTab === 'clinical'
                      ? 'border-rose-800 text-rose-900'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Clinical Results
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'ingredients' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      Our proprietary Cloud Hydration Complex utilizes multi-weight hyaluronic molecules to penetrate different layers of the epidermis, ensuring deep, lasting moisture without a heavy feel.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5 text-rose-900">
                          <Droplets className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Snow Mushroom Extract</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Holds up to 500x its weight in water for intense plumping.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5 text-rose-900">
                          <Flower2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Tiger Grass (Cica)</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Visibly calms redness and soothes irritated skin barriers.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl overflow-hidden h-64 md:h-72 shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                      alt="Botanical Ingredients"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
                  <p>
                    <strong>Morning & Night Routine:</strong> Apply a dime-sized amount to freshly cleansed, toned skin. Gently press into face, neck, and décolletage in upward circular motions.
                  </p>
                  <p>
                    <strong>Makeup Prep Tip:</strong> Allow cream 2 minutes to fully absorb before applying foundation or sunscreen for a seamless glass-skin primer base.
                  </p>
                </div>
              )}

              {activeTab === 'clinical' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-pink-50/60 p-5 rounded-2xl border border-pink-100">
                    <span className="text-2xl sm:text-3xl font-extrabold text-rose-900">98%</span>
                    <p className="text-xs text-slate-600 mt-1 font-semibold">Noticed immediate skin hydration</p>
                  </div>
                  <div className="bg-pink-50/60 p-5 rounded-2xl border border-pink-100">
                    <span className="text-2xl sm:text-3xl font-extrabold text-rose-900">94%</span>
                    <p className="text-xs text-slate-600 mt-1 font-semibold">Saw a plumper glass-skin finish in 7 days</p>
                  </div>
                  <div className="bg-pink-50/60 p-5 rounded-2xl border border-pink-100">
                    <span className="text-2xl sm:text-3xl font-extrabold text-rose-900">100%</span>
                    <p className="text-xs text-slate-600 mt-1 font-semibold font-semibold">Reported zero greasy residue</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-rose-900" />
                  <h2 className="text-base font-bold text-slate-900">Your Shopping Bag ({cartCount})</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                <div className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 items-center">
                  <img src={selectedImage} alt={name} className="w-16 h-16 object-cover rounded-xl bg-white p-1 shrink-0" />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-slate-900 truncate">{name}</p>
                    <p className="text-slate-500 font-medium">Size: {selectedSize} • ${price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => setCartCount(Math.max(1, cartCount - 1))} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100">
                        <Minus className="w-3 h-3 text-slate-600" />
                      </button>
                      <span className="font-bold text-slate-800">{cartCount}</span>
                      <button onClick={() => setCartCount(cartCount + 1)} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100">
                        <Plus className="w-3 h-3 text-slate-600" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-extrabold text-slate-900">${(price * cartCount).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-200 space-y-3 bg-slate-50">
                <div className="flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Subtotal:</span>
                  <span>${(price * cartCount).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onNavigate) onNavigate('checkout');
                  }}
                  className="w-full py-3.5 bg-rose-900 text-white font-bold text-xs rounded-xl hover:bg-rose-950 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Proceed to Wholesale Checkout</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-white border-t border-slate-200 md:hidden fixed bottom-0 w-full flex justify-around items-center px-4 py-2 z-50">
        <button 
          onClick={() => onNavigate && onNavigate('shop')}
          className="flex flex-col items-center justify-center text-rose-900 font-bold text-[10px]"
        >
          <Store className="w-5 h-5" />
          <span className="mt-0.5">Shop</span>
        </button>
        <button 
          onClick={() => onNavigate && onNavigate('discover')}
          className="flex flex-col items-center justify-center text-slate-500 text-[10px]"
        >
          <Search className="w-5 h-5" />
          <span className="mt-0.5">Search</span>
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center text-slate-500 text-[10px] relative"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="mt-0.5">Bag ({cartCount})</span>
        </button>
        <button 
          onClick={() => onNavigate && onNavigate('home')}
          className="flex flex-col items-center justify-center text-slate-500 text-[10px]"
        >
          <User className="w-5 h-5" />
          <span className="mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
}
