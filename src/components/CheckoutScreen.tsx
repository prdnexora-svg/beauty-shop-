import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Lock, ShieldCheck, Check, ShoppingBag, 
  ChevronRight, MapPin, CreditCard, Sparkles, HelpCircle 
} from 'lucide-react';
import { ViewType } from '../types';

interface CheckoutScreenProps {
  onBack?: () => void;
  onNavigate?: (view: ViewType) => void;
}

export default function CheckoutScreen({ onBack, onNavigate }: CheckoutScreenProps) {
  const [currentStep, setCurrentStep] = useState<'address' | 'review' | 'payment' | 'confirmation'>('address');
  const [formData, setFormData] = useState({
    email: 'sarah.jenkins@luxesalon.com',
    phone: '+1 (555) 382-9011',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    address1: '742 Evergreen Terrace',
    address2: 'Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94110'
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSubmitAddress = (e: FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
    showToast('Shipping address saved. Proceeding to review.');
  };

  const handleCompleteOrder = () => {
    setCurrentStep('confirmation');
    showToast('Order successfully placed! Receipt sent to email.');
  };

  return (
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-sans antialiased min-h-screen flex flex-col selection:bg-pink-100 selection:text-rose-900">
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

      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 sticky top-0">
        <div className="flex justify-between items-center px-4 md:px-10 py-4 max-w-[1440px] mx-auto w-full">
          <button 
            onClick={onBack ? onBack : () => onNavigate && onNavigate('shop')}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </button>
          
          <h1 className="font-extrabold text-xl md:text-2xl tracking-tighter text-rose-900">
            LUXE ARTISTRY
          </h1>

          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      <div className="flex flex-1 w-full max-w-[1440px] mx-auto relative">
        {/* SideNavBar (Checkout Progress - Desktop) */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-73px)] sticky top-[73px] w-64 bg-white/60 backdrop-blur-md border-r border-slate-200/80 z-30 pt-8">
          <div className="px-6 mb-8">
            <h2 className="text-lg font-extrabold text-rose-900">Checkout</h2>
            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Secure Transaction</p>
          </div>
          <nav className="flex-1 flex flex-col gap-2">
            <button
              onClick={() => setCurrentStep('address')}
              className={`flex items-center gap-4 px-6 py-4 font-bold text-xs text-left transition-all ${
                currentStep === 'address'
                  ? 'text-rose-900 border-r-4 border-rose-800 bg-pink-50'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>1. Address</span>
            </button>
            <button
              onClick={() => setCurrentStep('review')}
              className={`flex items-center gap-4 px-6 py-4 font-bold text-xs text-left transition-all ${
                currentStep === 'review'
                  ? 'text-rose-900 border-r-4 border-rose-800 bg-pink-50'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>2. Review</span>
            </button>
            <button
              onClick={() => setCurrentStep('payment')}
              className={`flex items-center gap-4 px-6 py-4 font-bold text-xs text-left transition-all ${
                currentStep === 'payment'
                  ? 'text-rose-900 border-r-4 border-rose-800 bg-pink-50'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>3. Payment</span>
            </button>
            <button
              onClick={() => setCurrentStep('confirmation')}
              className={`flex items-center gap-4 px-6 py-4 font-bold text-xs text-left transition-all ${
                currentStep === 'confirmation'
                  ? 'text-rose-900 border-r-4 border-rose-800 bg-pink-50'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>4. Confirmation</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full px-4 lg:px-10 py-8 lg:py-16">
          {/* Mobile Progress Bar */}
          <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep === 'address' ? 'bg-rose-900 text-white' : 'bg-slate-100 text-slate-600'}`}>1</div>
              <span className="text-[11px] font-bold text-rose-900">Address</span>
            </div>
            <div className="h-[1px] flex-1 bg-slate-200 mx-2" />
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep === 'review' ? 'bg-rose-900 text-white' : 'bg-slate-100 text-slate-600'}`}>2</div>
              <span className="text-[11px] font-bold text-slate-600">Review</span>
            </div>
            <div className="h-[1px] flex-1 bg-slate-200 mx-2" />
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-rose-900 text-white' : 'bg-slate-100 text-slate-600'}`}>3</div>
              <span className="text-[11px] font-bold text-slate-600">Pay</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form / Step Content */}
            <div className="col-span-1 lg:col-span-7 space-y-6">
              {currentStep === 'address' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Shipping Details</h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">Please enter your delivery address to ensure accurate wholesale shipping rates.</p>
                  </div>

                  <form onSubmit={handleSubmitAddress} className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900">Contact Information</h3>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 space-y-3">
                      <h3 className="text-sm font-extrabold text-slate-900">Shipping Address</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">First Name</label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Last Name</label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={formData.address1}
                          onChange={(e) => setFormData({...formData, address1: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">State</label>
                          <select
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                          >
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">ZIP Code</label>
                          <input
                            type="text"
                            required
                            value={formData.zip}
                            onChange={(e) => setFormData({...formData, zip: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-rose-800"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 py-4 bg-rose-900 text-white font-bold text-xs rounded-xl hover:bg-rose-950 transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Continue to Review</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}

              {currentStep === 'review' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Review Your Order</h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">Please verify items and shipping destination before final payment.</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Shipping Address</h3>
                    <p className="text-xs font-bold text-slate-900">{formData.firstName} {formData.lastName}</p>
                    <p className="text-xs text-slate-600">{formData.address1}, {formData.city}, {formData.state} {formData.zip}</p>
                    <p className="text-xs text-slate-600">{formData.email} • {formData.phone}</p>
                    <button onClick={() => setCurrentStep('address')} className="text-rose-800 text-xs font-bold hover:underline pt-1 block">Edit Address</button>
                  </div>

                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="w-full py-4 bg-rose-900 text-white font-bold text-xs rounded-xl hover:bg-rose-950 transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Secure Payment</h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">All transactions are encrypted and secured via Stripe.</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Card Number</label>
                      <input type="text" placeholder="4242 •••• •••• 4242" defaultValue="4242 4242 4242 4242" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Expiration Date</label>
                        <input type="text" defaultValue="12/28" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">CVV Security Code</label>
                        <input type="password" defaultValue="888" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-4 bg-rose-900 text-white font-bold text-xs rounded-xl hover:bg-rose-950 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay $319.34 & Place Order</span>
                  </button>
                </motion.div>
              )}

              {currentStep === 'confirmation' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Order Confirmed!</h2>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">Thank you for your wholesale purchase with Luxe Artistry. Your tracking receipt has been emailed to {formData.email}.</p>
                  <button
                    onClick={() => onNavigate && onNavigate('shop')}
                    className="px-6 py-3 bg-rose-900 text-white font-bold text-xs rounded-xl shadow-md hover:bg-rose-950"
                  >
                    Return to Shop Catalog
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right Column: Sticky Order Summary */}
            <div className="col-span-1 lg:col-span-5">
              <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-lg font-extrabold text-slate-900">Order Summary</h3>

                {/* Items */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  <div className="flex gap-4 items-center">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcTyGrjmqW-v4pJz_Lu5sSd5E_0MKgaonAI-tQpBE1KiOea9TdxxehHf0Mma_QMgyLOqfuoFYahBYjNe8nBtl2_dHxCaEKw1g3_cJZueN0NpDS6PD-7v7AOgGLsMq0zIxdz8d4IXEenwIzHqS1GJEzOonkGnTNgAqWbMKnuVe-ajuxCLBX6oYV-SqPZdccPo36DW2rc089OksBfJGqH8Nx3denKNG0TpUoF84-wZlP_5aCHBRjjcfHng" 
                      alt="Serum" 
                      className="w-16 h-20 object-cover rounded-xl bg-slate-50 p-1 shrink-0" 
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-900 truncate">Luminance Renewal Serum</p>
                      <p className="text-slate-500 font-medium">30ml / Single Box</p>
                      <p className="text-slate-400 mt-1 font-semibold">Qty: 1</p>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">$185.00</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9XhGyltmypAG-UGW4B5y_cce9C6RfTVuPpfoz5j5M6yxmE9EiAifRNTTILWWsGHzwa3vXrAFluag9KQi2xU_7vo_kTpi5DW5dB1Y2XOi85M19KQKL1WSR0etEKT_LhKHWtAbtE-c5hnCPnNflSaBtgcp92hDAIQAKjDGMHYhy_TktvWiPKT7nywlio1Cvuh1qaqOFr-DwpDMK6Jn0BFtGyJZh_6VQiz8DW0NWcrP7NO4-QC27MXPWSw" 
                      alt="Blush" 
                      className="w-16 h-20 object-cover rounded-xl bg-slate-50 p-1 shrink-0" 
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-slate-900 truncate">Velvet Crème Blush</p>
                      <p className="text-slate-500 font-medium">Shade: Roseate</p>
                      <p className="text-slate-400 mt-1 font-semibold">Qty: 2</p>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">$110.00</span>
                  </div>
                </div>

                <div className="h-px bg-slate-200" />

                {/* Totals */}
                <div className="space-y-2 text-xs font-medium text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">$295.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="text-emerald-700 font-bold">Free (Wholesale)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="font-bold text-slate-900">$24.34</span>
                  </div>
                  <div className="pt-3 flex justify-between text-base font-black text-slate-900 border-t border-slate-200">
                    <span>Total</span>
                    <span className="text-rose-900">$319.34</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-2 flex items-center justify-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-rose-800" />
                    <span>Secure</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-800" />
                    <span>SSL Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white w-full py-8 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center mt-auto border-t border-slate-200 text-xs text-slate-500 font-medium">
        <div className="font-extrabold text-rose-900 text-base mb-3 md:mb-0">
          LUXE ARTISTRY
        </div>
        <div className="flex gap-6 mb-3 md:mb-0 font-bold">
          <a href="#" className="hover:text-rose-900">Privacy Policy</a>
          <a href="#" className="hover:text-rose-900">Terms of Service</a>
          <a href="#" className="hover:text-rose-900">Shipping Info</a>
        </div>
        <div>© 2026 LUXE ARTISTRY. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}
