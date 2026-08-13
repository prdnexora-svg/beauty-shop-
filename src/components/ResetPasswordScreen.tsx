import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ViewType } from "../types";

interface ResetPasswordScreenProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

export default function ResetPasswordScreen({ onBack, onNavigate }: ResetPasswordScreenProps) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="h-full bg-off-white text-on-surface antialiased font-body-md flex min-h-screen w-full relative">
      {/* Left Side: Luxury Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface-container">
        <img alt="Luxury Salon Interior" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLu0R0cniNXBNdbLu7xGdFG3be9j5Pxfc5pT4MrI4F3f3w8l09Mfw5jbmT82f05YxvTqVrQq99cqZgFDztwYhQKXZVGB9J0eTDYVomScJPRRfMIdZOzcyKevfspx6dJz8nCUe5_EWm56xWZRIb5perd9Bg9ppMTry9xJtnMdTmPQeFKzREbLdE1AAoBifdedPpo1jrIiBh7vAOxxR7c8MQQYRYRw2-8ndDNBsfoE5fjinHKYLKqkvWpl4SYd"/>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-off-white/10 mix-blend-overlay"></div>
      </div>

      {/* Right Side: Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-10 py-8 relative overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          {/* Back Button */}
          <button onClick={onBack} className="text-on-surface-variant text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1 mb-16" type="button">
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          {/* Icon & Header */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-accent-pink-soft rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="text-primary w-6 h-6" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tighter text-on-surface mb-2">
              Create a new password
            </h1>
            <p className="text-body-md text-on-surface-variant">
              Please enter a strong password to secure your Nexora account.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* New Password Field */}
            <div className="relative group">
              <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">New Password</label>
              <div className="relative">
                <input className="w-full bg-surface-container border-b border-outline-subtle px-4 py-3 text-on-surface focus:ring-0 focus:border-b-2 focus:border-primary outline-none" placeholder="••••••••" required type={showNewPassword ? "text" : "password"}/>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors" onClick={() => setShowNewPassword(!showNewPassword)} type="button">
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative group">
              <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-2">Confirm Password</label>
              <div className="relative">
                <input className="w-full bg-surface-container border-b border-outline-subtle px-4 py-3 text-on-surface focus:ring-0 focus:border-b-2 focus:border-primary outline-none" placeholder="••••••••" required type={showConfirmPassword ? "text" : "password"}/>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button className="w-full bg-primary text-white font-semibold py-4 hover:bg-primary-container transition-colors duration-300 flex items-center justify-center gap-2" type="submit">
              Update Password
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
            {isSuccess && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-off-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-10"
                >
                    <div className="text-center max-w-sm">
                        <CheckCircle2 className="w-24 h-24 mx-auto mb-8 text-primary" />
                        <h2 className="text-2xl font-semibold text-on-surface mb-4">Password Updated Successfully</h2>
                        <p className="text-body-md text-on-surface-variant mb-8">
                            Your account is now secure. You can log in with your new credentials.
                        </p>
                        <button className="w-full bg-primary text-white font-semibold py-4 hover:bg-primary-container transition-colors" onClick={() => onNavigate('login')}>
                            Return to Login
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
