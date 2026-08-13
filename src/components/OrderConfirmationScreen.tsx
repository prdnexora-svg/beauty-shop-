import { motion } from 'motion/react';
import { ViewType } from '../types';

interface OrderConfirmationScreenProps {
  onNavigate?: (view: ViewType) => void;
}

export default function OrderConfirmationScreen({ onNavigate }: OrderConfirmationScreenProps) {
  return (
    <div className="bg-[#fcf9f8] min-h-screen text-[#1c1b1b] font-sans antialiased overflow-x-hidden flex flex-col items-center justify-center relative">
      {/* Main Immersive Canvas */}
      <main className="relative min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-10">
        {/* Background Image with Parallax / Scale */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#fcf9f8]/40 mix-blend-overlay z-10" />
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transform origin-center transition-transform duration-1000 ease-out"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLsqnWQCW2eADx8A1tpXwOnpk4g2txe2wPbk38s3k3ciVn0WpycAmG4TOasCkzdokEsB0sbbpXSx4IoKQ_XWwFiu82fREsaa262iSO1a7hSB3_qih5MyNHy6d7L2MSUd0NqtQMIE6433hLWr_MX4avvU5ljl_N_oK4KZltY8LVZmgQGttmYPBnuMnDvaW5dz6W2jn5XVHvwdP2iBr4ZKMC5SLEOTwWvG-xurCl-vHXOVrW7szwV6rBxX5WN4')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcf9f8] via-transparent to-transparent z-10" />
        </div>

        {/* Glassmorphic Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center"
        >
          {/* Animated Success Checkmark SVG */}
          <div className="w-32 h-32 md:w-40 md:h-40 mb-6 flex items-center justify-center">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="50" cy="50" fill="none" r="45" stroke="#b90064" strokeDasharray="283" strokeDashoffset="0" strokeWidth="2" />
              <path d="M30 50 L45 65 L70 35" fill="none" stroke="#b90064" strokeDasharray="100" strokeDashoffset="0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            </svg>
          </div>

          {/* Success Text */}
          <div className="space-y-2 mb-8">
            <p className="text-[11px] font-bold text-rose-900 tracking-widest uppercase">Order Confirmed</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Thank You, Sarah</h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">Your premium beauty selections are being carefully prepared. An email with tracking details will arrive shortly.</p>
          </div>

          {/* Order Summary Snippet */}
          <div className="w-full bg-white/80 rounded-2xl p-6 border border-slate-200/80 mb-8 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Order Number</p>
                <p className="text-base font-extrabold text-slate-900">#NX-892401</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Amount</p>
                <p className="text-base font-extrabold text-slate-900">$245.00</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-4 relative z-0">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhHXCo8FvJkhbRlQtfns3Uo39psyuuLagrim3Z8E2M0vzApPqg9k67ZTj4C7MSmAJsmyYIvuK7b0m9M9TnvLYcF0ZRImKpf1BWCuFgi8tqfj6CCZtWO9Yl6BCS1FoiLlz3j1XN9z5rZkRYB6HjXa5ZiOuj6dq6cqCVuJLfaaeXz-20E7diJslhngrJxm1MWT1nwD7ppKuYxZhMDrN4wU3YboTmGsH9HoNE944WTk3QX38l4Mc4T_Iv-A" 
                    alt="Serum" 
                  />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCy7dyIAkmR903Dq1J9RbFx_lkufuwSzSTTBw2AqN8YohJIofhyQovjjqsSAZPgmY4ChmNvrBAz-Ehohh_YsB0Ft22VahYYQ4xguosEv2Mrae-16hiR0xJp2b_L4tXCvNgPmcijOowelny6l-c8vxzgaGi98UYq5JIi400zjwxOE7B9Wv5UaJwwkw00CgaR7UuXXOEierVDpodIUU2VnTf5cM77yUMhsvgujCXWmzUdJCuDOf8o2ro5g" 
                    alt="Lipstick" 
                  />
                </div>
              </div>
              <div className="text-sm font-bold text-slate-800 text-left">
                <p>Radiance Serum + 1 more item</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row w-full gap-4 justify-center">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className="bg-rose-900 text-white font-bold text-xs px-8 py-3.5 rounded-xl hover:bg-rose-950 transition-colors duration-200 shadow-md"
            >
              View Order Details
            </button>
            <button 
              id="order-confirmation-actions-return-to-shop-button"
              onClick={() => onNavigate && onNavigate('shop')}
              className="border border-rose-900 text-rose-900 font-bold text-xs px-8 py-3.5 rounded-xl hover:bg-pink-50 transition-colors duration-200"
            >
              Return to Shop
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
