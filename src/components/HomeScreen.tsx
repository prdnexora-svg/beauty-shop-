import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Bell, ShoppingBag, Menu, Store, Play, Briefcase, User, Compass } from "lucide-react";
import { ViewType, Product } from "../types";
import { mockProducts } from "../data";
import ProductCardSkeleton from "./ProductCardSkeleton";
import CategoriesSection from "./CategoriesSection";
import BentoGridSection from "./BentoGridSection";
import ProductCard from "./ProductCard";
import ProfileModal from "./ProfileModal";
import DistributorProfileView from "./DistributorProfileView";

interface HomeScreenProps {
  onNavigate: (view: ViewType) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-background min-h-screen text-on-background antialiased font-body-md">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-off-white/90 backdrop-blur-md border-b border-outline-subtle">
        <div className="flex justify-between items-center h-16 px-6 md:px-10 max-w-[1440px] mx-auto">
          <button className="md:hidden text-on-surface-variant"><Menu className="w-6 h-6" /></button>
          <div className="text-xl font-bold tracking-tighter text-primary cursor-pointer" onClick={() => onNavigate('home')}>Nexora</div>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => onNavigate('home')} className="text-primary font-bold border-b-2 border-primary pb-1">Home</button>
            <button onClick={() => onNavigate('shop')} className="text-on-surface-variant hover:text-primary transition-colors pb-1">Shop</button>
            <button onClick={() => onNavigate('discover')} className="text-on-surface-variant hover:text-primary transition-colors pb-1">Discover</button>
            <button onClick={() => onNavigate('distributor-directory')} className="text-on-surface-variant hover:text-primary transition-colors pb-1">Distributors</button>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAvailable(!isAvailable)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  isAvailable ? "bg-emerald-100 text-emerald-800" : "bg-surface-variant text-on-surface"
              }`}
            >
              {isAvailable ? "Accepting Clients" : "Busy"}
            </button>
            <Search className="text-on-surface-variant cursor-pointer w-5 h-5" />
            <Bell className="text-on-surface-variant cursor-pointer w-5 h-5" />
            <ShoppingBag onClick={() => onNavigate('shop')} className="text-on-surface-variant hover:text-primary cursor-pointer w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="pt-16 pb-24 md:pb-16 max-w-[1440px] mx-auto">
        <DistributorProfileView />
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] bg-surface-container-low flex items-center justify-center overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLu0R0cniNXBNdbLu7xGdFG3be9j5Pxfc5pT4MrI4F3f3w8l09Mfw5jbmT82f05YxvTqVrQq99cqZgFDztwYhQKXZVGB9J0eTDYVomScJPRRfMIdZOzcyKevfspx6dJz8nCUe5_EWm56xWZRIb5perd9Bg9ppMTry9xJtnMdTmPQeFKzREbLdE1AAoBifdedPpo1jrIiBh7vAOxxR7c8MQQYRYRw2-8ndDNBsfoE5fjinHKYLKqkvWpl4SYd"/>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-10"
            >
                <motion.h1 variants={itemVariants} className="text-white text-4xl md:text-5xl font-bold tracking-tighter max-w-2xl mb-4">The New Era of Precision Beauty</motion.h1>
                <motion.p variants={itemVariants} className="text-white/90 text-lg max-w-lg mb-8">Discover the high-performance suite trusted by elite artists worldwide.</motion.p>
                <motion.button variants={itemVariants} className="bg-primary text-white px-8 py-3 rounded font-semibold w-max hover:opacity-90">Explore Collection</motion.button>
            </motion.div>
        </section>

        <CategoriesSection />

        {/* Featured Products */}
        <section className="px-6 md:px-10 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-outline-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {loading ? (
                [1, 2, 3].map((i) => <ProductCardSkeleton key={i} />)
            ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleWishlist={() => toggleWishlist(product.id)}
                    />
                ))
            ) : (
                <p className="text-on-surface-variant">No products found matching your search.</p>
            )}
          </div>
        </section>

        <BentoGridSection />
      </main>

      {/* Mobile NavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-2 md:hidden bg-white border-t border-outline-subtle shadow-lg rounded-t-xl">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center justify-center text-primary bg-accent-pink-soft rounded-full px-3 py-1"><Store className="w-5 h-5" /><span className="text-[10px] mt-0.5 font-bold">Home</span></button>
        <button onClick={() => onNavigate('shop')} className="flex flex-col items-center justify-center text-tertiary"><ShoppingBag className="w-5 h-5" /><span className="text-[10px] mt-0.5">Shop</span></button>
        <button onClick={() => onNavigate('discover')} className="flex flex-col items-center justify-center text-tertiary"><Compass className="w-5 h-5" /><span className="text-[10px] mt-0.5">Discover</span></button>
        <button onClick={() => onNavigate('distributor-directory')} className="flex flex-col items-center justify-center text-tertiary"><Briefcase className="w-5 h-5" /><span className="text-[10px] mt-0.5">Distributors</span></button>
        <button onClick={() => setIsProfileModalOpen(true)} className="flex flex-col items-center justify-center text-tertiary"><User className="w-5 h-5" /><span className="text-[10px] mt-0.5">Account</span></button>
      </nav>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </div>
  );
}
