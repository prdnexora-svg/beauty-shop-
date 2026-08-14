/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewType, Distributor, Product } from './types';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import RegistrationScreen from './components/RegistrationScreen';
import LoginScreen from './components/LoginScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import EmailSentScreen from './components/EmailSentScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';
import HomeScreen from './components/HomeScreen';
import DiscoverScreen from './components/DiscoverScreen';
import DistributorDirectoryScreen from './components/DistributorDirectoryScreen';
import DistributorProfileScreen from './components/DistributorProfileScreen';
import ShopScreen from './components/ShopScreen';
import ProductDetailScreen from './components/ProductDetailScreen';
import CheckoutScreen from './components/CheckoutScreen';
import OrderConfirmationScreen from './components/OrderConfirmationScreen';
import OrdersScreen from './components/OrdersScreen';
import SocialFeedScreen from './components/SocialFeedScreen';
import CreateContentScreen from './components/CreateContentScreen';
import AiContentStudioScreen from './components/AiContentStudioScreen';
import LoadingOverlay from './components/LoadingOverlay';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('product-detail');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState<Distributor | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigate = (view: ViewType) => {
    setIsLoading(true);
    setTimeout(() => {
        setCurrentView(view);
        setIsLoading(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Screen Switcher Bar for Quick Testing & Navigation */}
      <div className="fixed bottom-3 right-3 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full shadow-2xl border border-slate-700 hidden sm:flex items-center gap-2">
        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Screen:</span>
        <button 
          onClick={() => navigate('product-detail')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'product-detail' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Product Detail
        </button>
        <button 
          onClick={() => navigate('checkout')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'checkout' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Checkout
        </button>
        <button 
          onClick={() => navigate('shop')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'shop' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Shop
        </button>
        <button 
          onClick={() => navigate('home')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'home' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Home
        </button>
        <button 
          onClick={() => navigate('discover')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'discover' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Discover
        </button>
        <button 
          onClick={() => navigate('distributor-directory')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'distributor-directory' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Distributors
        </button>
        <button 
          onClick={() => navigate('distributor-profile')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'distributor-profile' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Distributor Profile
        </button>
        <button 
          onClick={() => navigate('order-confirmation')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'order-confirmation' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Confirmation
        </button>
        <button 
          onClick={() => navigate('orders')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'orders' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Orders
        </button>
        <button 
          onClick={() => navigate('social-feed')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'social-feed' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Feed
        </button>
        <button 
          onClick={() => navigate('create-content')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'create-content' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          Create
        </button>
        <button 
          onClick={() => navigate('ai-content-studio')} 
          className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${currentView === 'ai-content-studio' ? 'bg-rose-800 text-white' : 'text-slate-300 hover:text-white'}`}
        >
          AI Studio
        </button>
      </div>

      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {currentView === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen onComplete={() => navigate('welcome')} />
          </motion.div>
        )}
        {currentView === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeScreen onNext={(view) => navigate(view)} />
          </motion.div>
        )}
        {currentView === 'registration' && (
          <motion.div
            key="registration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RegistrationScreen onBack={() => navigate('welcome')} />
          </motion.div>
        )}
        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginScreen onBack={() => navigate('welcome')} onNavigate={(view) => navigate(view)} />
          </motion.div>
        )}
        {currentView === 'forgot-password' && (
          <motion.div
            key="forgot-password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ForgotPasswordScreen onBack={() => navigate('login')} onNavigate={(view) => navigate(view)} />
          </motion.div>
        )}
        {currentView === 'email-sent' && (
          <motion.div
            key="email-sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EmailSentScreen onBack={() => navigate('login')} onNavigate={(view) => navigate(view)} />
          </motion.div>
        )}
        {currentView === 'reset-password' && (
          <motion.div
            key="reset-password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResetPasswordScreen onBack={() => navigate('login')} onNavigate={(view) => navigate(view)} />
          </motion.div>
        )}
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HomeScreen onNavigate={(view) => navigate(view)} />
          </motion.div>
        )}
        {currentView === 'discover' && (
          <motion.div
            key="discover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiscoverScreen onBack={() => navigate('home')} onNavigate={(view) => navigate(view)} />
          </motion.div>
        )}
        {currentView === 'distributor-directory' && (
          <motion.div
            key="distributor-directory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DistributorDirectoryScreen 
              onBack={() => navigate('home')} 
              onNavigate={(view) => navigate(view)}
              onSelectDistributor={(dist) => setSelectedDistributor(dist)} 
            />
          </motion.div>
        )}
        {currentView === 'distributor-profile' && (
          <motion.div
            key="distributor-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DistributorProfileScreen 
              distributor={selectedDistributor} 
              onBack={() => navigate('distributor-directory')} 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
        {currentView === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ShopScreen 
              onBack={() => navigate('home')} 
              onNavigate={(view) => navigate(view)} 
              onSelectProduct={(prod) => setSelectedProduct(prod)}
            />
          </motion.div>
        )}
        {currentView === 'product-detail' && (
          <motion.div
            key="product-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductDetailScreen 
              product={selectedProduct} 
              onBack={() => navigate('shop')} 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
        {currentView === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckoutScreen 
              onBack={() => navigate('product-detail')} 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
        {currentView === 'order-confirmation' && (
          <motion.div
            key="order-confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OrderConfirmationScreen 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
        {currentView === 'orders' && (
          <motion.div
            key="orders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OrdersScreen 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
        {currentView === 'social-feed' && (
          <motion.div
            key="social-feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SocialFeedScreen 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
        {currentView === 'create-content' && (
          <motion.div
            key="create-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CreateContentScreen 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
        {currentView === 'ai-content-studio' && (
          <motion.div
            key="ai-content-studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AiContentStudioScreen 
              onNavigate={(view) => navigate(view)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
