import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Search, Filter, X, Check, RotateCcw, AlertTriangle, 
  Sparkles, History, SlidersHorizontal, MapPin, Star, Building2, Package, Tag, BookOpen, Layers, Heart
} from 'lucide-react';
import DiscoverCard from './DiscoverCard';
import { mockDiscoverItems, searchSuggestionsList, initialRecentSearches } from '../data/discoverData';
import { DiscoverItem, ViewType } from '../types';

interface DiscoverScreenProps {
  onBack?: () => void;
  onNavigate?: (view: ViewType) => void;
}

type TabType = 'product' | 'distributor' | 'content' | 'offer' | 'saved';

const TABS: { id: TabType; label: string; icon: any }[] = [
  { id: 'product', label: 'Products', icon: Package },
  { id: 'distributor', label: 'Distributors', icon: Building2 },
  { id: 'content', label: 'Content', icon: BookOpen },
  { id: 'offer', label: 'Offers', icon: Tag },
  { id: 'saved', label: 'Saved', icon: Heart }
];

export default function DiscoverScreen({ onBack, onNavigate }: DiscoverScreenProps) {
  const [activeTab, setActiveTab] = useState<TabType>('product');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(initialRecentSearches);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DiscoverItem | null>(null);

  // Saved Items State with LocalStorage Persistence
  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_saved_items');
      return saved ? JSON.parse(saved) : ['p1', 'd1'];
    } catch {
      return ['p1', 'd1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexora_saved_items', JSON.stringify(savedItemIds));
    } catch (e) {
      console.error('Failed to update localStorage for saved items', e);
    }
  }, [savedItemIds]);

  const toggleSaveItem = (item: DiscoverItem) => {
    setSavedItemIds(prev => 
      prev.includes(item.id) 
        ? prev.filter(id => id !== item.id)
        : [...prev, item.id]
    );
  };

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedCoverage, setSelectedCoverage] = useState<string>('All');

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate tab change loading transition
  const handleTabChange = (tabId: TabType) => {
    setIsLoading(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'All') count++;
    if (selectedBrand !== 'All') count++;
    if (selectedPriceRange !== 'All') count++;
    if (selectedAvailability !== 'All') count++;
    if (selectedLocation !== 'All') count++;
    if (verifiedOnly) count++;
    if (minRating > 0) count++;
    if (selectedCoverage !== 'All') count++;
    return count;
  }, [
    selectedCategory, selectedBrand, selectedPriceRange, selectedAvailability,
    selectedLocation, verifiedOnly, minRating, selectedCoverage
  ]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedPriceRange('All');
    setSelectedAvailability('All');
    setSelectedLocation('All');
    setVerifiedOnly(false);
    setMinRating(0);
    setSelectedCoverage('All');
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return mockDiscoverItems.filter(item => {
      // Tab matching
      if (activeTab === 'saved') {
        if (!savedItemIds.includes(item.id)) return false;
      } else {
        if (item.type !== activeTab) return false;
      }

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery = 
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.brand && item.brand.toLowerCase().includes(q)) ||
          (item.location && item.location.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Filter: Category
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      // Filter: Brand
      if (selectedBrand !== 'All' && item.brand && !item.brand.includes(selectedBrand)) return false;

      // Filter: Price Range
      if (selectedPriceRange !== 'All' && item.price !== undefined) {
        if (selectedPriceRange === '<100' && item.price >= 100) return false;
        if (selectedPriceRange === '100-300' && (item.price < 100 || item.price > 300)) return false;
        if (selectedPriceRange === '>300' && item.price <= 300) return false;
      }

      // Filter: Availability
      if (selectedAvailability !== 'All' && item.availability !== selectedAvailability) return false;

      // Filter: Location
      if (selectedLocation !== 'All' && item.location && !item.location.includes(selectedLocation)) return false;

      // Filter: Verified
      if (verifiedOnly && !item.verified) return false;

      // Filter: Rating
      if (minRating > 0 && (!item.rating || item.rating < minRating)) return false;

      // Filter: Coverage
      if (selectedCoverage !== 'All' && item.coverageArea !== selectedCoverage) return false;

      return true;
    });
  }, [
    activeTab, savedItemIds, searchQuery, selectedCategory, selectedBrand, selectedPriceRange,
    selectedAvailability, selectedLocation, verifiedOnly, minRating, selectedCoverage
  ]);

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsSearchFocused(false);
    if (!recentSearches.includes(suggestion)) {
      setRecentSearches([suggestion, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleRemoveRecentSearch = (term: string) => {
    setRecentSearches(recentSearches.filter(s => s !== term));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-28 antialiased">
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <button 
              onClick={onBack ? onBack : () => onNavigate && onNavigate('home')} 
              className="p-2.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Search Input Container */}
            <div ref={searchContainerRef} className="relative flex-grow">
              <div className="flex items-center bg-slate-100 hover:bg-slate-150 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600 rounded-full px-4 py-2 transition-all border border-transparent focus-within:border-blue-600">
                <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab}s, brands, keywords...`} 
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent w-full outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown Overlay */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 p-4"
                  >
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && !searchQuery && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          <span className="flex items-center gap-1">
                            <History className="w-3.5 h-3.5 text-slate-500" />
                            Recent Searches
                          </span>
                          <button 
                            onClick={() => setRecentSearches([])} 
                            className="text-blue-600 hover:underline capitalize text-xs"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term) => (
                            <span 
                              key={term} 
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs cursor-pointer transition-colors"
                              onClick={() => handleSelectSuggestion(term)}
                            >
                              {term}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveRecentSearch(term);
                                }} 
                                className="text-slate-400 hover:text-slate-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Search Suggestions List */}
                    <div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        Popular Suggestions
                      </div>
                      <div className="space-y-1">
                        {searchSuggestionsList
                          .filter(s => !searchQuery || s.toLowerCase().includes(searchQuery.toLowerCase()))
                          .slice(0, 5)
                          .map((suggestion) => (
                            <div 
                              key={suggestion}
                              onClick={() => handleSelectSuggestion(suggestion)}
                              className="px-3 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-700 cursor-pointer flex items-center justify-between group transition-colors"
                            >
                              <span>{suggestion}</span>
                              <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 rotate-180 transition-transform group-hover:translate-x-1" />
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Drawer Toggle Button */}
            <button 
              onClick={() => setIsFilterOpen(true)} 
              className={`p-2.5 rounded-full border transition-all flex items-center justify-center relative shrink-0 ${
                activeFilterCount > 0 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              aria-label="Filter results"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar pb-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md scale-[1.02]' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-6xl mx-auto px-4 pt-4">
        {/* Active Filters Bar */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 bg-blue-50/60 p-3 rounded-2xl border border-blue-100">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              Active Filters:
            </span>

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-blue-800 rounded-full text-xs font-medium border border-blue-200 shadow-sm">
                Category: {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => setSelectedCategory('All')} />
              </span>
            )}

            {selectedBrand !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-blue-800 rounded-full text-xs font-medium border border-blue-200 shadow-sm">
                Brand: {selectedBrand}
                <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => setSelectedBrand('All')} />
              </span>
            )}

            {selectedLocation !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-blue-800 rounded-full text-xs font-medium border border-blue-200 shadow-sm">
                Location: {selectedLocation}
                <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => setSelectedLocation('All')} />
              </span>
            )}

            {verifiedOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-blue-800 rounded-full text-xs font-medium border border-blue-200 shadow-sm">
                Verified Only
                <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => setVerifiedOnly(false)} />
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-blue-800 rounded-full text-xs font-medium border border-blue-200 shadow-sm">
                Rating: ≥{minRating}★
                <X className="w-3 h-3 cursor-pointer hover:text-rose-600" onClick={() => setMinRating(0)} />
              </span>
            )}

            <button 
              onClick={clearAllFilters}
              className="ml-auto text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1 px-2 py-0.5"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        )}

        {/* Demo Error Trigger Switcher Bar for testing state handling */}
        <div className="flex items-center justify-end gap-3 mb-2 text-xs text-slate-400">
          <span>Simulate Error State:</span>
          <button 
            onClick={() => setHasError(!hasError)} 
            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${hasError ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
          >
            {hasError ? 'Error ON' : 'Error OFF'}
          </button>
        </div>

        {/* ERROR STATE */}
        {hasError ? (
          <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center shadow-sm my-8 max-w-md mx-auto">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Unable to Load Results</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              We encountered a network error while retrieving the discovery items. Please check your connection and try again.
            </p>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 400);
              }}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-600 transition-colors shadow-md"
            >
              Retry Connection
            </button>
          </div>
        ) : isLoading ? (
          /* LOADING STATE SKELETONS */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 animate-pulse space-y-3">
                <div className="w-full h-40 bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-10 bg-slate-200 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          /* EMPTY RESULTS STATE */
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center shadow-sm my-8 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'saved' ? <Heart className="w-8 h-8 fill-rose-500 text-rose-500" /> : <Search className="w-8 h-8 text-blue-600" />}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {activeTab === 'saved' ? 'No Saved Items Yet' : 'No Matching Results Found'}
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              {activeTab === 'saved'
                ? 'Save products, distributors, content, or offers by clicking the heart icon on any card for easy access.'
                : `We couldn't find any ${activeTab}s matching your current search terms or filter constraints.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {activeTab === 'saved' ? (
                <button 
                  onClick={() => setActiveTab('product')}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-600 transition-colors shadow-md"
                >
                  Explore Products
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    clearAllFilters();
                  }}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          /* RESULTS GRID */
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
          >
            {filteredItems.map((item) => (
              <DiscoverCard 
                key={item.id} 
                item={item} 
                isSaved={savedItemIds.includes(item.id)}
                onToggleSave={toggleSaveItem}
                onSelect={(selected) => setSelectedItem(selected)}
              />
            ))}
          </motion.div>
        )}
      </main>

      {/* FILTER DRAWER SLIDE-IN */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />

            {/* Slide-in Drawer Container */}
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    Filter {TABS.find(t => t.id === activeTab)?.label}
                  </h2>
                </div>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Options */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Category
                  </label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="All">All Categories</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Salon Equipment">Salon Equipment</option>
                    <option value="Color Diagnostics">Color Diagnostics</option>
                    <option value="Trends & Insights">Trends & Insights</option>
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Brand
                  </label>
                  <select 
                    value={selectedBrand} 
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="All">All Brands</option>
                    <option value="Oribe">Oribe</option>
                    <option value="Kérastase">Kérastase</option>
                    <option value="Dyson Pro">Dyson Pro</option>
                    <option value="L'Oréal">L'Oréal Professionnel</option>
                    <option value="Vintner's">Vintner's</option>
                  </select>
                </div>

                {/* Price Range Filter (For Products/Offers) */}
                {(activeTab === 'product' || activeTab === 'offer') && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Price Range
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'All', label: 'Any Price' },
                        { id: '<100', label: 'Under $100' },
                        { id: '100-300', label: '$100–$300' },
                        { id: '>300', label: '$300+' }
                      ].map((price) => (
                        <button 
                          key={price.id}
                          onClick={() => setSelectedPriceRange(price.id)}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                            selectedPriceRange === price.id 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {price.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Distributor-Specific Filters */}
                {activeTab === 'distributor' && (
                  <>
                    {/* Location Filter */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Location
                      </label>
                      <select 
                        value={selectedLocation} 
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="All">All Locations</option>
                        <option value="Milan">Milan, Italy</option>
                        <option value="Paris">Paris, France</option>
                        <option value="New York">New York, USA</option>
                      </select>
                    </div>

                    {/* Coverage Area Filter */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Coverage Area
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['All', 'Global', 'Regional'].map((cov) => (
                          <button 
                            key={cov}
                            onClick={() => setSelectedCoverage(cov)}
                            className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-colors ${
                              selectedCoverage === cov 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {cov}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Verified Toggle */}
                <div className="pt-2">
                  <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="text-sm font-semibold text-slate-800">Verified Partners Only</span>
                    <input 
                      type="checkbox" 
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                    />
                  </label>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Minimum Rating
                  </label>
                  <div className="flex gap-2">
                    {[0, 4.0, 4.5, 4.8].map((rating) => (
                      <button 
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors flex items-center justify-center gap-1 ${
                          minRating === rating 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}★`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-slate-200 bg-slate-50/50 flex gap-3">
                <button 
                  onClick={clearAllFilters}
                  className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-200 transition-colors"
                >
                  Reset All
                </button>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-3 px-4 bg-slate-900 text-white font-semibold rounded-xl text-xs hover:bg-blue-600 transition-colors shadow-md"
                >
                  Apply Filters ({activeFilterCount})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ITEM DETAIL MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200"
            >
              <div className="relative h-48 bg-slate-100">
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>{selectedItem.category}</span>
                  {selectedItem.verified && <span>✓ Verified Partner</span>}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedItem.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedItem.subtitle}</p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold">
                  {selectedItem.price !== undefined && <span className="text-xl font-bold">${selectedItem.price}</span>}
                  {selectedItem.location && <span className="text-slate-500">📍 {selectedItem.location}</span>}
                </div>

                <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Inquire Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
