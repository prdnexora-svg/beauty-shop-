import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { ViewType } from "../types";

interface LoginScreenProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

export default function LoginScreen({ onBack, onNavigate }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setToast({ message: 'Welcome back to Nexora.', type: 'success' });
        setTimeout(() => onNavigate('home'), 1000);
    }, 1500);
  };

  const handleDemoLogin = () => {
    // Pre-fill is not strictly needed if we just call the login function
    handleLogin();
  };

  return (
    <div className="bg-background text-on-surface h-screen w-screen overflow-hidden antialiased relative">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLu0R0cniNXBNdbLu7xGdFG3be9j5Pxfc5pT4MrI4F3f3w8l09Mfw5jbmT82f05YxvTqVrQq99cqZgFDztwYhQKXZVGB9J0eTDYVomScJPRRfMIdZOzcyKevfspx6dJz8nCUe5_EWm56xWZRIb5perd9Bg9ppMTry9xJtnMdTmPQeFKzREbLdE1AAoBifdedPpo1jrIiBh7vAOxxR7c8MQQYRYRw2-8ndDNBsfoE5fjinHKYLKqkvWpl4SYd')" }}></div>
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 h-full w-full flex flex-col p-6 md:p-10">
        <header className="w-full flex justify-between items-center max-w-[1440px] mx-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-white hover:text-primary-fixed-dim transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold text-sm">Back to Main</span>
          </button>
          <span className="text-2xl font-bold tracking-tighter text-white">Nexora</span>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="bg-white/70 backdrop-blur-md border border-white/20 w-full max-w-md rounded-xl p-8 flex flex-col gap-6 shadow-2xl relative">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-on-surface mb-2">Welcome Back</h1>
              <p className="text-body-md text-on-surface-variant">Access your premium management suite.</p>
            </div>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant" htmlFor="email">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                  <input id="email" type="email" required className="w-full bg-surface-container/50 border-0 border-b border-outline focus:border-primary p-2 pl-10" placeholder="name@luxury-salon.com" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant" htmlFor="password">Password</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('forgot-password'); }} className="text-xs text-primary font-semibold hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                  <input id="password" type={showPassword ? "text" : "password"} required className="w-full bg-surface-container/50 border-0 border-b border-outline focus:border-primary p-2 pl-10 pr-10" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button disabled={loading} type="submit" className="mt-2 w-full bg-primary hover:bg-primary-container text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                {loading ? "Authenticating..." : "Log In"}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
              
              <button disabled={loading} type="button" onClick={handleDemoLogin} className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                Login with Demo Account
              </button>
            </form>
            
            <div className="text-center text-sm text-on-surface-variant">
              Don't have an account? <a href="#" className="text-primary font-bold hover:underline">Request Access</a>
            </div>
          </div>
        </main>
      </div>
      {toast && (
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface text-on-surface px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 z-50">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              {toast.message}
          </motion.div>
      )}
    </div>
  );
}
