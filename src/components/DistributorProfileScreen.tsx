import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Share2, Plus, Check, Mail, MapPin, Star, Sparkles, X, Heart, ExternalLink, Package
} from 'lucide-react';
import { Distributor, ViewType } from '../types';

interface DistributorProfileScreenProps {
  distributor?: Distributor | null;
  onBack?: () => void;
  onNavigate?: (view: ViewType) => void;
}

export default function DistributorProfileScreen({ distributor, onBack, onNavigate }: DistributorProfileScreenProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    salonName: '',
    message: 'Hello, we are interested in stocking your wholesale skincare and professional makeup catalog in our salon.'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const name = distributor?.name || 'Lumière Beauty Group';
  const location = distributor?.location || 'Paris, France';
  const rating = distributor?.rating || 4.9;
  const reviewsCount = 124;
  const description = distributor?.description || 'Curating the finest in global beauty innovations. We partner with elite salons and retail across Europe to deliver premium skincare and professional makeup solutions.';

  const handleSendInquiry = (e: FormEvent) => {
    e.preventDefault();
    setIsInquiryModalOpen(false);
    showToast(`Inquiry successfully submitted to ${name}!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied to clipboard!');
    }
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

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack ? onBack : () => onNavigate && onNavigate('distributor-directory')}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-base md:text-lg text-slate-900 tracking-tight">
              {name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
              title="Share Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setIsFollowing(!isFollowing);
                showToast(isFollowing ? `Unfollowed ${name}` : `Following ${name}!`);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                isFollowing 
                  ? 'bg-slate-200 text-slate-800 hover:bg-slate-300' 
                  : 'bg-rose-900 text-white hover:bg-rose-950'
              }`}
            >
              {isFollowing ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1280px] mx-auto w-full px-4 md:px-8 py-6 md:py-8 space-y-10 flex-1">
        {/* Editorial Showcase Hero Layout */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Editorial Banner Image */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden h-[300px] sm:h-[380px] bg-slate-900 shadow-md group">
            <img
              src={distributor?.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-300 bg-pink-950/80 px-2.5 py-1 rounded-full border border-pink-700/50 backdrop-blur-sm mb-2 inline-block">
                GLOBAL INNOVATIONS 2026
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-tight text-amber-100 drop-shadow-md">
                THE BEAUTY DISTRIBUTOR
              </h2>
            </div>
          </div>

          {/* Right Column: Distributor Details */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 mb-3">
                Verified Distributor
              </span>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {name}
              </h1>

              <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-700" />
                  {location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {rating} ({reviewsCount} reviews)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {description}
            </p>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Skincare', 'Professional Makeup', 'Spa Supplies'].map((tag) => (
                <span key={tag} className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="flex-1 py-3 px-5 bg-rose-900 text-white rounded-xl text-xs font-bold hover:bg-rose-950 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Inquiry</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('featured-catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else showToast('Viewing products catalog');
                }}
                className="flex-1 py-3 px-5 bg-white text-rose-900 border border-rose-300 rounded-xl text-xs font-bold hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                <span>View Products</span>
              </button>
            </div>
          </div>
        </div>

        {/* Exclusive Brands Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Exclusive Brands
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['AURA', 'CELINE', 'NOVA', 'VEDA', 'LUXE', 'PURE'].map((brand) => (
              <div
                key={brand}
                className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group"
              >
                <span className="text-sm font-extrabold tracking-widest text-slate-400 group-hover:text-rose-900 transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Catalog Section */}
        <section id="featured-catalog" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Featured Catalog
            </h3>
            <button 
              onClick={() => showToast('Full catalog view loaded')}
              className="text-xs font-bold text-rose-800 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Large Card */}
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl overflow-hidden relative h-[320px] md:h-[380px] shadow-sm group cursor-pointer border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1608248597260-50c90c7406a6?auto=format&fit=crop&w=800&q=80"
                alt="Aura Botanical Serum Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                  NEW ARRIVAL
                </span>
                <h4 className="text-lg font-bold text-white pt-1">
                  Aura Botanical Serum Collection
                </h4>
                <p className="text-xs text-slate-300 font-medium">
                  Wholesale pricing available for Q3
                </p>
              </div>
            </div>

            {/* Right Column: Two Stacked Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {/* Top Card */}
              <div className="bg-slate-900 rounded-3xl overflow-hidden relative h-[170px] md:h-[180px] shadow-sm group cursor-pointer border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
                  alt="Professional Foundations"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-sm font-bold text-white">Professional Foundations</h4>
                </div>
              </div>

              {/* Bottom Card */}
              <div className="bg-slate-900 rounded-3xl overflow-hidden relative h-[170px] md:h-[180px] shadow-sm group cursor-pointer border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                  alt="Spa Essentials"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="text-sm font-bold text-white">Spa Essentials</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Send Inquiry Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-900" />
                  <h2 className="text-sm font-bold text-slate-900">Send Inquiry to {name}</h2>
                </div>
                <button
                  onClick={() => setIsInquiryModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendInquiry} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Salon / Business Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.salonName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, salonName: e.target.value })}
                    placeholder="e.g. Luxe Beauty Studio Paris"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    placeholder="elena@luxebeautystudio.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Inquiry Message</label>
                  <textarea
                    rows={3}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-rose-900 text-white rounded-xl font-bold hover:bg-rose-950 transition-colors shadow-md"
                  >
                    Submit Wholesale Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="font-bold text-rose-900">NEXORA ELITE DISTRIBUTORS</div>
          <div className="flex gap-4">
            <button className="hover:underline">Privacy Policy</button>
            <button className="hover:underline">Terms of Service</button>
            <button className="hover:underline">Partner Guidelines</button>
            <button className="hover:underline">Contact Support</button>
          </div>
          <div>© 2026 NEXORA SALON OS. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
