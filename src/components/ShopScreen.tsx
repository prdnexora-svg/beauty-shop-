import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, ShoppingBag, Heart, Compass, Sparkles, SlidersHorizontal, 
  Settings, HelpCircle, X, ChevronDown, Check, ArrowLeft, User, Filter,
  ShoppingBasket, Plus, Minus, Trash2
} from 'lucide-react';
import { ViewType, Product } from '../types';

interface ShopScreenProps {
  onBack?: () => void;
  onNavigate?: (view: ViewType) => void;
  onSelectProduct?: (product: Product) => void;
}

export interface ShopProduct {
  id: string;
  name: string;
  brand: string;
  category: 'Skincare' | 'Makeup Artistry' | 'Hair Care';
  price: number;
  description: string;
  image: string;
  stockStatus: 'In Stock' | 'Limited' | 'Pre-order';
  badge?: 'New' | 'Bestseller' | 'Limited';
}

const shopProducts: ShopProduct[] = [
  {
    id: 'sp-1',
    name: 'Precision Onyx Liner',
    brand: 'AURA PRO',
    category: 'Makeup Artistry',
    price: 38.00,
    description: '0.1mm micro-tip liquid eyeliner formulated with carbon-black pigments for 24-hour waterproof wear.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvRhtJ2PpWxkxaouLIrTl4RCoAMHZhS3qySc-UTSXFXwJWG6ulLugG1EfO7J2yh90clWvDded8IVj9NjOihVcRpnwvMauCBJ9iYc41JQSSUxZjw8u_15M5dE3qzUwfmVoI39Py3TFDDCDs74F2pNybaCIvsF61W4l-bXHigYsCWNSqU967sgoxZfx642tQiU3dHJKiQalgiY6TGBk1XZRidM7lGz-9EEbe_mN5sTegh_IMTTiXP3z7Yw',
    stockStatus: 'In Stock',
    badge: 'New'
  },
  {
    id: 'sp-2',
    name: 'Silk Canvas Foundation',
    brand: 'LUMIÈRE',
    category: 'Makeup Artistry',
    price: 85.00,
    description: 'Weightless, medium-to-full coverage fluid foundation infused with hyaluronic acid matrix.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK_StE86JEQVKxfDQyOvMfzTHyFeyhF8oiHv6zGYH3XBNQ5pjJ38X-U1iuGmEXO0FPVZYqb3hWqn8fRFCCPr5JSnHwc2m2DawHn0ocjl6Yayz8ZOQahLcuT-AXNYL962r8tnpNwkel1QQXtKOpIRKWxDKpZtEPOUALV2CSbszQ2L7GQGvNQJ7uR_DGvPDUDAxwIj91R9iAFY0YE2JG4wPX_fXjNS8kZweLnNw771uxpC0ftQq3-27TEQ',
    stockStatus: 'In Stock',
    badge: 'Bestseller'
  },
  {
    id: 'sp-3',
    name: 'Architecture Palette',
    brand: 'STRUCTURA',
    category: 'Makeup Artistry',
    price: 120.00,
    description: '12 curated essential neutral tones engineered for structural contouring and highlighting.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNJGea2g1J7kZGNuo3VFjdMRNnxH2l5uI1waf4OPJGKs0iJrhdaM-A-XXpCLgc9NOFJ8pRtP24J5-YNaoA0sWIwH4QVTa_MolNBFxXEX6YLlll15zgl3fol1sAEE6udfsFIAsuXK7EkVs3G9K0FzRX5Y4rQl9kdfBz8Jv28R910NrQ7e3ghj6shNAEqlIxpZLMUrbivNoKmIqgPsQxdB1yar-W7sKY0aEl6lhIoh88P-2VSUP4R_GM_A',
    stockStatus: 'Limited',
    badge: 'Limited'
  },
  {
    id: 'sp-4',
    name: 'Glass Finish Lip Glaze',
    brand: 'AURA PRO',
    category: 'Makeup Artistry',
    price: 42.00,
    description: 'High-refractive index polymers deliver a non-sticky, glass-like finish with peptide hydration.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOoE7z_wXegsb7iDc8o5OF1H9trNomVyvURnsUJAu_amMN7XTk7gFORmyH1ENYYFFwbHi8PZ7io5Iptep2w_hEK0fOt1pEp0reHFAb0CifiAUim0pUmM19ej4uwOG1fnr_P66nuxBlq55N7y1VFhQ5F9GP3Dl6A2VXS53HfKq0Oz62eqZBmVtrflAH2d4MBCSxTdfbRS6AyrZVp5K1DPQeMRg2gh_uXLSDb9Ghv7Lejo0YgbWLkFQFrw',
    stockStatus: 'In Stock'
  },
  {
    id: 'sp-5',
    name: 'Lumina Glow Serum',
    brand: 'AURA BEAUTY',
    category: 'Skincare',
    price: 95.00,
    description: 'Advanced illuminating concentrate for deep hydration, texture refining and natural radiance.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLsGpTrXDzuzmYkC6GD5_CMSPqmv3QKZ4YEYKvxKmv02v_GWoW8v5G2PA9eX06wMvfPVI_CCFfQb5SZMcIRviZj9iVUNfeT0r-S0DuAfD57tFmfOXasYjhpqsMrrwAnR-CSRb0PcVwl4TAuSDnZksfF8WboGfD2yOdgwKSZwNVYGoDt-0ViZ_eUkVvzFrfM8krNXpy5faCrD0HkMnc7BppXVMwe-JOvv97FjmAFN-7sg60pznCou_6tpsD0',
    stockStatus: 'In Stock',
    badge: 'New'
  },
  {
    id: 'sp-6',
    name: 'Velvet Matte Lipstick',
    brand: 'NEXORA ARTISTRY',
    category: 'Makeup Artistry',
    price: 32.00,
    description: 'Highly pigmented long-wear formula with a weightless silk finish and satin comfort.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLt7pyHheLI08HPLmC8dboVS4Oft8VUI9qVILkf_jhWw9I47WkhnNgoqsJFsQDFnu6B2NS4P9b2nOpderi2C4RZ5E6eQJa7lv4jNzAVuY-jG8sW44n1w0W4nA3FJSTLCQmXKQ2b5OpqzdqbTPS11vLwdoQ1RPsDJctdrbl8kyyZSljWbYOA3MmFxewEdZjThig81w52lg1_laGbvD3O1d5dwuW_Y_Y7pyHJbHoZys0EQejqpz9CrykAnmZg',
    stockStatus: 'In Stock',
    badge: 'Bestseller'
  },
  {
    id: 'sp-7',
    name: 'Aura Botanical Toner',
    brand: 'BOTANICA',
    category: 'Skincare',
    price: 48.00,
    description: 'Soothing floral essence with rosewater and chamomile to balance and refine skin texture.',
    image: 'https://images.unsplash.com/photo-1608248597260-50c90c7406a6?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock'
  },
  {
    id: 'sp-8',
    name: 'Cellular Night Cream',
    brand: 'DERMA LUXE',
    category: 'Skincare',
    price: 110.00,
    description: 'Intensive overnight repair matrix with bio-active peptide complex for firming and cellular renewal.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    stockStatus: 'In Stock',
    badge: 'New'
  }
];

export default function ShopScreen({ onBack, onNavigate, onSelectProduct }: ShopScreenProps) {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Makeup Artistry']);
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50-150' | '150plus'>('150plus');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  
  // Interactivity States
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<{ product: ShopProduct; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from Favorites' : 'Saved to Favorites!');
      return updated;
    });
  };

  const addToCart = (product: ShopProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to Shopping Bag!`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as { product: ShopProduct; quantity: number }[]);
  };

  const totalCartCount = useMemo(() => cart.reduce((acc, curr) => acc + curr.quantity, 0), [cart]);
  const totalCartPrice = useMemo(() => cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0), [cart]);

  // Filtering Products
  const filteredProducts = useMemo(() => {
    let result = shopProducts.filter(p => {
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = p.name.toLowerCase().includes(q) || 
                        p.brand.toLowerCase().includes(q) || 
                        p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }

      // Price Range
      if (priceRange === 'under50' && p.price >= 50) return false;
      if (priceRange === '50-150' && (p.price < 50 || p.price > 150)) return false;
      if (priceRange === '150plus' && p.price < 150) return false;

      // In Stock Only
      if (inStockOnly && p.stockStatus === 'Pre-order') return false;

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, inStockOnly, sortBy]);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex antialiased">
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

      {/* SideNavBar (Desktop Fixed) */}
      <nav className="bg-slate-100 border-r border-slate-200 w-64 hidden md:flex flex-col fixed left-0 top-0 h-screen p-6 z-40 overflow-y-auto">
        {/* Brand Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <button 
              onClick={onBack ? onBack : () => onNavigate && onNavigate('home')} 
              className="p-1 rounded-full hover:bg-slate-200 text-slate-600 mr-1"
              title="Return Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="font-extrabold text-xl text-rose-900 tracking-tight">Nexora Shop</h1>
          </div>
          <p className="text-[11px] font-semibold text-slate-500 mt-0.5 tracking-wider uppercase">Editorial Excellence</p>
        </div>

        {/* Main Nav Links */}
        <ul className="flex flex-col gap-1.5 font-semibold text-xs text-slate-600">
          <li>
            <button 
              onClick={() => onNavigate && onNavigate('discover')}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Discover</span>
            </button>
          </li>
          <li>
            <button 
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-rose-100/80 text-rose-900 font-bold rounded-xl shadow-sm border border-rose-200"
            >
              <Sparkles className="w-4 h-4 text-rose-700" />
              <span>Collections</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => showToast('New Arrivals filtered')}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-400" />
              <span>New Arrivals</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => showToast('Brands directory loaded')}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <span>Brands</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => showToast(`Showing ${favorites.length} saved favorites`)}
              className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-200 text-slate-700 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-rose-600 fill-rose-600' : 'text-slate-400'}`} />
                <span>Favorites</span>
              </div>
              {favorites.length > 0 && (
                <span className="text-[10px] bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
          </li>
        </ul>

        {/* Refine By Filters Sidebar */}
        <div className="mt-8 border-t border-slate-200 pt-6 space-y-6">
          <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Refine By</h3>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2">Category</h4>
            <div className="space-y-2 text-xs">
              {['Skincare', 'Makeup Artistry', 'Hair Care'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded text-rose-800 border-slate-300 focus:ring-rose-800"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2">Price Range</h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under50', label: 'Under $50' },
                { id: '50-150', label: '$50 - $150' },
                { id: '150plus', label: '$150+' },
              ].map((range) => (
                <label key={range.id} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700 hover:text-slate-900">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === range.id}
                    onChange={() => setPriceRange(range.id as any)}
                    className="w-4 h-4 text-rose-800 border-slate-300 focus:ring-rose-800"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2">Availability</h4>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 hover:text-slate-900">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-rose-800 border-slate-300 focus:ring-rose-800"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Footer Settings & Support */}
        <div className="border-t border-slate-200 pt-4 mt-auto space-y-1 text-xs">
          <button 
            onClick={() => showToast('Settings loaded')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 font-medium"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button 
            onClick={() => showToast('Support contact opened')}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 font-medium"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </button>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-8 h-16 max-w-[1440px] mx-auto gap-4">
            {/* Mobile Title */}
            <div className="md:hidden flex items-center gap-2">
              <button 
                onClick={onBack ? onBack : () => onNavigate && onNavigate('home')} 
                className="p-1 text-slate-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="font-extrabold text-base text-rose-900">Nexora Shop</span>
            </div>

            {/* Desktop Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="w-full bg-slate-100 focus:bg-white text-xs font-medium text-slate-900 pl-9 pr-8 py-2 rounded-xl border border-transparent focus:border-rose-800 outline-none transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Trailing Action Icons */}
            <div className="flex items-center gap-3 ml-auto">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-700 relative transition-colors"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-900 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {totalCartCount}
                  </span>
                )}
              </button>

              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-rose-200 shadow-sm shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="px-4 pb-3 md:hidden">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full bg-slate-100 text-xs font-medium text-slate-900 pl-9 pr-8 py-2 rounded-xl border border-slate-200 outline-none"
              />
            </div>
          </div>
        </header>

        {/* Main Body Catalog */}
        <main className="p-4 md:p-8 flex-1 max-w-[1440px] mx-auto w-full">
          {/* Header Title & Sorting Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Professional Artistry
              </h2>
              <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-2xl font-medium leading-relaxed">
                High-performance formulations designed for exact precision and enduring wear in demanding studio environments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-slate-800 border-none outline-none cursor-pointer focus:ring-0 p-0 pr-6"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center max-w-md mx-auto my-8 shadow-sm">
              <ShoppingBasket className="w-12 h-12 text-rose-800 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">No Catalog Items Found</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Try expanding your search query or unchecking category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories(['Skincare', 'Makeup Artistry', 'Hair Care']);
                  setPriceRange('all');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-rose-900 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => {
                const isFav = favorites.includes(p.id);
                return (
                  <article
                    key={p.id}
                    className="bg-white border border-slate-200 rounded-2xl flex flex-col hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    {/* Image Area */}
                    <div 
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(p);
                        if (onNavigate) onNavigate('product-detail');
                      }}
                      className="relative aspect-[4/5] bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-center overflow-hidden cursor-pointer"
                    >
                      {p.badge && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            p.badge === 'New' 
                              ? 'bg-rose-100 text-rose-900 border border-rose-200' 
                              : p.badge === 'Bestseller'
                              ? 'bg-slate-200 text-slate-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {p.badge}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-600 hover:text-rose-600 transition-colors shadow-sm"
                        title="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'text-rose-600 fill-rose-600' : ''}`} />
                      </button>

                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1 text-[11px] font-bold">
                          <span className="text-slate-400 uppercase tracking-wider">{p.brand}</span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            p.stockStatus === 'In Stock' 
                              ? 'bg-slate-100 text-slate-700' 
                              : 'bg-rose-50 text-rose-700'
                          }`}>
                            {p.stockStatus}
                          </span>
                        </div>

                        <h3 
                          onClick={() => {
                            if (onSelectProduct) onSelectProduct(p);
                            if (onNavigate) onNavigate('product-detail');
                          }}
                          className="text-base font-bold text-slate-900 group-hover:text-rose-900 transition-colors leading-snug cursor-pointer"
                        >
                          {p.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-extrabold text-slate-900">
                            ${p.price.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => addToCart(p)}
                          className="w-full bg-rose-900 text-white text-xs font-bold py-3 rounded-xl hover:bg-rose-950 transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-98"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* SHOPPING BAG / CART DRAWER */}
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
                  <h2 className="text-base font-bold text-slate-900">Your Shopping Bag ({totalCartCount})</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <ShoppingBasket className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-medium">Your shopping bag is empty.</p>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 items-center">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-contain rounded-lg bg-white p-1 shrink-0" />
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-bold text-slate-900 truncate">{product.name}</p>
                        <p className="text-slate-500 font-medium">${product.price.toFixed(2)} each</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(product.id, -1)} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100">
                            <Minus className="w-3 h-3 text-slate-600" />
                          </button>
                          <span className="font-bold text-slate-800">{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, 1)} className="p-1 rounded bg-white border border-slate-200 hover:bg-slate-100">
                            <Plus className="w-3 h-3 text-slate-600" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <p className="font-extrabold text-slate-900">${(product.price * quantity).toFixed(2)}</p>
                        <button onClick={() => updateQuantity(product.id, -quantity)} className="text-rose-600 hover:text-rose-800 mt-2 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-200 space-y-3 bg-slate-50">
                  <div className="flex justify-between text-sm font-extrabold text-slate-900">
                    <span>Subtotal:</span>
                    <span>${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => {
                      showToast('Order successfully placed! Checkout ledger confirmed.');
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3.5 bg-rose-900 text-white font-bold text-xs rounded-xl hover:bg-rose-950 transition-colors shadow-md"
                  >
                    Proceed to Wholesale Checkout
                  </button>
                </div>
              )}
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
          <ShoppingBag className="w-5 h-5" />
          <span className="mt-0.5">Shop</span>
        </button>
        <button 
          onClick={() => onNavigate && onNavigate('discover')}
          className="flex flex-col items-center justify-center text-slate-500 text-[10px]"
        >
          <Compass className="w-5 h-5" />
          <span className="mt-0.5">Discover</span>
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center text-slate-500 text-[10px] relative"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="mt-0.5">Bag ({totalCartCount})</span>
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
