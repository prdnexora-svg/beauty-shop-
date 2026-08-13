import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, RefreshCcw, ArrowRight } from "lucide-react";
import { ViewType } from "../types";

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

export default function ForgotPasswordScreen({ onBack, onNavigate }: ForgotPasswordScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        onNavigate('email-sent');
    }, 1500);
  };

  return (
    <div className="bg-background text-on-surface h-screen w-screen overflow-hidden antialiased relative flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-cover bg-center absolute inset-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLu0R0cniNXBNdbLu7xGdFG3be9j5Pxfc5pT4MrI4F3f3w8l09Mfw5jbmT82f05YxvTqVrQq99cqZgFDztwYhQKXZVGB9J0eTDYVomScJPRRfMIdZOzcyKevfspx6dJz8nCUe5_EWm56xWZRIb5perd9Bg9ppMTry9xJtnMdTmPQeFKzREbLdE1AAoBifdedPpo1jrIiBh7vAOxxR7c8MQQYRYRw2-8ndDNBsfoE5fjinHKYLKqkvWpl4SYd')" }}></div>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 w-full max-w-[520px] px-6 md:px-0 flex flex-col items-center">
        {/* Brand Anchor */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white drop-shadow-lg">Nexora</h1>
        </div>

        {/* Glassmorphism Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-10 md:p-14 shadow-2xl text-center"
        >
          {/* Icon area */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/40 flex items-center justify-center shadow-inner">
            <RefreshCcw className="text-primary w-8 h-8" />
          </div>
          
          {/* Content */}
          <h2 className="text-2xl font-semibold text-on-surface mb-4 drop-shadow-sm">Reset your password</h2>
          <p className="text-body-md text-on-surface mb-8 opacity-90">Enter your email address and we'll send you a link to reset your password.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-on-surface ml-1 drop-shadow-sm" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary w-5 h-5" />
                <input className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/50 text-on-surface rounded-lg focus:border-primary focus:bg-white/80 shadow-inner" id="email" name="email" placeholder="name@example.com" required type="email"/>
              </div>
            </div>
            
            {/* CTA */}
            <button className="mt-4 w-full py-3.5 px-6 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2" type="submit">
                {loading ? "Sending..." : "Send Reset Link"}
                {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
          
          {/* Back to Login */}
          <div className="mt-8 pt-4 border-t border-white/30">
            <button onClick={onBack} className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface hover:text-primary transition-colors drop-shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                Back to login
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
