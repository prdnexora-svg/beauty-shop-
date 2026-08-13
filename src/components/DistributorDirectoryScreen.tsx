import { useState, useMemo, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, Bell, ArrowLeft, Plus, MapPin, TrendingUp, CheckCircle2, 
  Grid, List, Sparkles, Building2, Store, X, BarChart3, Globe, ShieldCheck, 
  Settings, HelpCircle, LogOut, ArrowRight, User, ChevronRight, SlidersHorizontal, AlertCircle, Flower2
} from 'lucide-react';
import { Distributor, ViewType } from '../types';
import { initialDistributors } from '../data/distributorData';

interface DistributorDirectoryScreenProps {
  onBack?: () => void;
  onNavigate?: (view: ViewType) => void;
  onSelectDistributor?: (distributor: Distributor) => void;
}

export default function DistributorDirectoryScreen({ onBack, onNavigate, onSelectDistributor }: DistributorDirectoryScreenProps) {
  // Main Data & Persistence
  const [distributors, setDistributors] = useState<Distributor[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_distributors');
      return saved ? JSON.parse(saved) : initialDistributors;
    } catch {
      return initialDistributors;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexora_distributors', JSON.stringify(distributors));
    } catch (e) {
      console.error('Failed to save distributors to localStorage', e);
    }
  }, [distributors]);

  // View States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Pending'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'directory' | 'analytics' | 'region_maps' | 'settings'>('directory');
  
  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Distributor Form State
  const [newDist, setNewDist] = useState({
    name: '',
    category: 'Salon Network' as Distributor['category'],
    location: '',
    region: 'Europe' as Distributor['region'],
    coverage: '',
    revenueYtd: '$500K YTD',
    verified: true,
    description: '',
    salonsCount: 20,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter Logic
  const filteredDistributors = useMemo(() => {
    return distributors.filter((d) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(d.category)) {
        return false;
      }

      // Region
      if (selectedRegion !== 'All' && d.region !== selectedRegion) {
        return false;
      }

      // Status
      if (statusFilter === 'Verified' && !d.verified) return false;
      if (statusFilter === 'Pending' && d.verified) return false;

      return true;
    });
  }, [distributors, searchQuery, selectedCategories, selectedRegion, statusFilter]);

  const toggleCategoryFilter = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleAddDistributor = (e: FormEvent) => {
    e.preventDefault();
    if (!newDist.name.trim() || !newDist.location.trim()) {
      showToast('Please fill out all required fields');
      return;
    }

    const created: Distributor = {
      id: `dist-${Date.now()}`,
      name: newDist.name,
      category: newDist.category,
      location: newDist.location,
      region: newDist.region,
      coverage: newDist.coverage || `${newDist.salonsCount} locations`,
      revenueYtd: newDist.revenueYtd,
      verified: newDist.verified,
      description: newDist.description || 'Custom distribution partner added to Nexora Network.',
      rating: 4.8,
      salonsCount: Number(newDist.salonsCount),
      image: newDist.image
    };

    setDistributors([created, ...distributors]);
    setIsAddModalOpen(false);
    showToast(`Added ${created.name} to Elite Distributors Network!`);
    // Reset form
    setNewDist({
      name: '',
      category: 'Salon Network',
      location: '',
      region: 'Europe',
      coverage: '',
      revenueYtd: '$500K YTD',
      verified: true,
      description: '',
      salonsCount: 20,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
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

      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo & Back button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack ? onBack : () => onNavigate && onNavigate('home')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg md:text-xl tracking-tight text-rose-900">
                ELITE DISTRIBUTORS
              </span>
              <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Luxe Edition
              </span>
            </div>
          </div>

          {/* Desktop Search Bar & Action Controls */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md ml-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search distributors, regions, categories..."
                className="w-full bg-slate-100 focus:bg-white text-xs font-medium text-slate-900 pl-9 pr-8 py-2 rounded-full border border-transparent focus:border-rose-700 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-700 relative transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white" />
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900">Notifications</span>
                      <span className="text-[10px] bg-rose-100 text-rose-700 font-semibold px-2 py-0.5 rounded-full">2 New</span>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="p-2 bg-rose-50 rounded-lg border border-rose-100">
                        <p className="font-semibold text-slate-900">Lumière Paris Verified</p>
                        <p className="text-[11px] text-slate-600">Annual ledger compliance check passed.</p>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="font-semibold text-slate-900">New Region Inquiry</p>
                        <p className="text-[11px] text-slate-600">Tokyo Aesthetics requested partner expansion.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-rose-200 shadow-sm shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Manager Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 bg-rose-700 text-white rounded-full shadow-sm"
              title="Add Distributor"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <SlidersHorizontal className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="px-4 pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search distributors..."
              className="w-full bg-slate-100 focus:bg-white text-xs font-medium text-slate-900 pl-9 pr-8 py-2 rounded-full border border-slate-200 focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Workspace Container */}
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 py-6 flex gap-8 flex-1">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border border-slate-200 rounded-3xl p-5 shadow-sm h-fit sticky top-24">
          <div className="mb-6">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Distribution</h2>
            <p className="text-base font-bold text-slate-900 mt-1">Luxury Network</p>
          </div>

          <nav className="space-y-1.5 flex-1">
            <button
              onClick={() => setActiveTab('directory')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'directory'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building2 className={`w-4 h-4 ${activeTab === 'directory' ? 'text-rose-700' : 'text-slate-400'}`} />
              <span>Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${activeTab === 'analytics' ? 'text-rose-700' : 'text-slate-400'}`} />
              <span>Analytics Overview</span>
            </button>

            <button
              onClick={() => setStatusFilter(statusFilter === 'Verified' ? 'All' : 'Verified')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'Verified'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Verified Partners</span>
              </div>
              {statusFilter === 'Verified' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
            </button>

            <button
              onClick={() => setActiveTab('region_maps')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'region_maps'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Globe className={`w-4 h-4 ${activeTab === 'region_maps' ? 'text-rose-700' : 'text-slate-400'}`} />
              <span>Region Maps</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-rose-700' : 'text-slate-400'}`} />
              <span>Settings</span>
            </button>
          </nav>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full mt-6 py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-rose-800 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD DISTRIBUTOR</span>
          </button>

          <div className="mt-8 pt-4 border-t border-slate-100 space-y-1">
            <button 
              onClick={() => showToast('Help Desk & Documentation loaded')}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('welcome')}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-rose-600 hover:text-rose-800"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Editorial Content Column */}
        <main className="flex-1 min-w-0">
          {/* Hero Banner Editorial Header */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 text-white mb-8 shadow-sm">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

            <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="max-w-xl">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-pink-300 mb-2 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-700/50 backdrop-blur-sm">
                  Nexora Luxe Directory
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Global Partners
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Curated selection of premium distribution channels representing the Nexora standard worldwide.
                </p>
              </div>

              {/* Embedded Quick Search Card */}
              <div className="w-full md:w-auto bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 shadow-lg flex items-center gap-3 min-w-[280px]">
                <Search className="w-4 h-4 text-pink-300 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find a distributor..."
                  className="bg-transparent text-xs text-white placeholder-slate-300 outline-none w-full font-medium"
                />
              </div>
            </div>
          </div>

          {/* VIEW TAB: DIRECTORY */}
          {activeTab === 'directory' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Refine Search Sidebar (3 Columns on Desktop) */}
              <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900">Refine Search</h3>
                  {(selectedCategories.length > 0 || selectedRegion !== 'All' || statusFilter !== 'All') && (
                    <button
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedRegion('All');
                        setStatusFilter('All');
                      }}
                      className="text-[11px] font-semibold text-rose-700 hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Category Filter Checkboxes */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Category</h4>
                  <div className="space-y-2">
                    {[
                      'Salon Network',
                      'Spa & Wellness',
                      'Retail Boutiques',
                      'Medical Aesthetics',
                      'Equipment Direct'
                    ].map((cat) => {
                      const isChecked = selectedCategories.includes(cat);
                      return (
                        <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-slate-900">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategoryFilter(cat)}
                            className="w-4 h-4 rounded text-rose-700 border-slate-300 focus:ring-rose-600"
                          />
                          <span>{cat}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Region Dropdown Select */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Region</h4>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-rose-700"
                  >
                    <option value="All">All Regions</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Middle East">Middle East</option>
                  </select>
                </div>

                {/* Status Chips */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {(['All', 'Verified', 'Pending'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                          statusFilter === st
                            ? 'bg-rose-50 text-rose-800 border-rose-300 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Distributor Cards Area (9 Columns on Desktop) */}
              <div className="lg:col-span-9 space-y-4">
                {/* Header View Controls */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-500">
                    Showing {filteredDistributors.length} Partners
                  </span>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="Grid View"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Empty State */}
                {filteredDistributors.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-sm my-4 max-w-md mx-auto">
                    <AlertCircle className="w-10 h-10 text-rose-600 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-900 mb-1">No Distributors Found</h3>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      No distribution partners match your current criteria. Try resetting filters or adding a new partner.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategories([]);
                        setSelectedRegion('All');
                        setStatusFilter('All');
                      }}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-rose-700"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  /* Cards Display */
                  <div className={viewMode === 'grid' ? 'space-y-4' : 'space-y-3'}>
                    {/* Featured Top Highlight Card (if featured distributor matches filter) */}
                    {filteredDistributors.filter(d => d.isFeatured).map((dist) => (
                      <div
                        key={dist.id}
                        onClick={() => {
                          if (onSelectDistributor) onSelectDistributor(dist);
                          if (onNavigate) onNavigate('distributor-profile');
                          else setSelectedDistributor(dist);
                        }}
                        className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 relative overflow-hidden cursor-pointer"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-700 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        
                        <div className="relative w-full md:w-60 h-48 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                          <img src={dist.image} alt={dist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          {dist.verified && (
                            <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-rose-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-rose-200 shadow-sm flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
                              <span>Premium</span>
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                                {dist.category}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">{dist.region}</span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                              {dist.name}
                            </h3>

                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                              {dist.description}
                            </p>

                            <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-slate-700">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                                {dist.location}
                              </span>
                              {dist.revenueYtd && (
                                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                  <TrendingUp className="w-3.5 h-3.5" />
                                  {dist.revenueYtd}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex justify-end">
                            <button className="text-xs font-bold text-rose-700 hover:text-rose-900 border border-rose-200 hover:bg-rose-50 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5">
                              <span>View Profile</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Standard Grid of Remaining Items */}
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                      {filteredDistributors.filter(d => !d.isFeatured).map((dist) => (
                        <div
                          key={dist.id}
                          onClick={() => {
                            if (onSelectDistributor) onSelectDistributor(dist);
                            if (onNavigate) onNavigate('distributor-profile');
                            else setSelectedDistributor(dist);
                          }}
                          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-rose-700 border border-slate-200 group-hover:bg-rose-50 transition-colors">
                                {dist.category === 'Spa & Wellness' ? (
                                  <Flower2 className="w-5 h-5" />
                                ) : dist.category === 'Retail Boutiques' ? (
                                  <Store className="w-5 h-5" />
                                ) : (
                                  <Building2 className="w-5 h-5" />
                                )}
                              </div>
                              {dist.verified && (
                                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                                  Verified
                                </span>
                              )}
                            </div>

                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-700 transition-colors leading-snug">
                              {dist.name}
                            </h3>

                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {dist.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]">
                              {dist.category}
                            </span>
                            <span className="text-slate-500">{dist.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW TAB: ANALYTICS OVERVIEW */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Network Performance Analytics</h2>
                  <p className="text-xs text-slate-500">Real-time ledger analytics across luxury distributor channels.</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  +18.4% YOY Growth
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Total Network Revenue</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">$15.2M YTD</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Active Salons Covered</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">307 Salons</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Verified Channel Rate</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">92.4%</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Global Regions</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">4 Regions</p>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB: REGION MAPS */}
          {activeTab === 'region_maps' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-center">
              <Globe className="w-12 h-12 text-rose-700 mx-auto" />
              <h2 className="text-lg font-bold text-slate-900">Global Geographic Distribution</h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Nexora distribution channels are active across Europe, North America, and Asia Pacific.
              </p>
            </div>
          )}

          {/* VIEW TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 max-w-lg">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Directory Preferences</h2>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <span>Auto-verify new partner applications</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-rose-700 rounded" />
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <span>Send WhatsApp notification on ledger updates</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-rose-700 rounded" />
                </label>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD DISTRIBUTOR MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h2 className="text-base font-bold text-slate-900">Add New Distributor Channel</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddDistributor} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Distributor / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newDist.name}
                    onChange={(e) => setNewDist({ ...newDist, name: e.target.value })}
                    placeholder="e.g. Milan Luxury Beauty Co."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-700 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={newDist.category}
                      onChange={(e) => setNewDist({ ...newDist, category: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-700 text-xs"
                    >
                      <option value="Salon Network">Salon Network</option>
                      <option value="Spa & Wellness">Spa & Wellness</option>
                      <option value="Retail Boutiques">Retail Boutiques</option>
                      <option value="Medical Aesthetics">Medical Aesthetics</option>
                      <option value="Equipment Direct">Equipment Direct</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Region</label>
                    <select
                      value={newDist.region}
                      onChange={(e) => setNewDist({ ...newDist, region: e.target.value as any })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-700 text-xs"
                    >
                      <option value="Europe">Europe</option>
                      <option value="North America">North America</option>
                      <option value="Asia Pacific">Asia Pacific</option>
                      <option value="Middle East">Middle East</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      value={newDist.location}
                      onChange={(e) => setNewDist({ ...newDist, location: e.target.value })}
                      placeholder="e.g. Milan, IT"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Est. YTD Revenue</label>
                    <input
                      type="text"
                      value={newDist.revenueYtd}
                      onChange={(e) => setNewDist({ ...newDist, revenueYtd: e.target.value })}
                      placeholder="$1.2M YTD"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-700 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newDist.description}
                    onChange={(e) => setNewDist({ ...newDist, description: e.target.value })}
                    placeholder="Brief channel coverage details..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-700 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-rose-700 transition-colors shadow-md"
                  >
                    Save Distributor Channel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DISTRIBUTOR PROFILE DETAIL MODAL */}
      <AnimatePresence>
        {selectedDistributor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200"
            >
              <div className="relative h-44 bg-slate-100">
                <img
                  src={selectedDistributor.image}
                  alt={selectedDistributor.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedDistributor(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700">
                  <span>{selectedDistributor.category}</span>
                  {selectedDistributor.verified && (
                    <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Partner
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-slate-900">{selectedDistributor.name}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedDistributor.description}</p>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-bold text-slate-800">{selectedDistributor.location}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">Coverage:</span>
                    <span className="font-bold text-slate-800">{selectedDistributor.coverage}</span>
                  </div>
                  {selectedDistributor.revenueYtd && (
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-500">YTD Ledger:</span>
                      <span className="font-bold text-emerald-700">{selectedDistributor.revenueYtd}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    showToast(`Inquiry sent to ${selectedDistributor.name}`);
                    setSelectedDistributor(null);
                  }}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-md"
                >
                  Contact Distributor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="font-bold text-rose-900">NEXORA ELITE DISTRIBUTORS</div>
          <div className="flex gap-4">
            <button className="hover:underline">Privacy Policy</button>
            <button className="hover:underline">Terms of Service</button>
            <button className="hover:underline">Partner Guidelines</button>
          </div>
          <div>© 2026 NEXORA SALON OS. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
