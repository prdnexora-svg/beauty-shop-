import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, ExternalLink, RefreshCcw } from "lucide-react";
import { ViewType } from "../types";

interface EmailSentScreenProps {
  onBack: () => void;
  onNavigate: (view: ViewType) => void;
}

export default function EmailSentScreen({ onBack }: EmailSentScreenProps) {
  const [isResending, setIsResending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResend = () => {
    if (isResending) return;
    setIsResending(true);
    
    setTimeout(() => {
        setIsResending(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="h-full bg-off-white text-on-surface antialiased font-body-md relative flex items-center justify-center p-6 md:p-10 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLu0R0cniNXBNdbLu7xGdFG3be9j5Pxfc5pT4MrI4F3f3w8l09Mfw5jbmT82f05YxvTqVrQq99cqZgFDztwYhQKXZVGB9J0eTDYVomScJPRRfMIdZOzcyKevfspx6dJz8nCUe5_EWm56xWZRIb5perd9Bg9ppMTry9xJtnMdTmPQeFKzREbLdE1AAoBifdedPpo1jrIiBh7vAOxxR7c8MQQYRYRw2-8ndDNBsfoE5fjinHKYLKqkvWpl4SYd')" }}>
            <div className="absolute inset-0 bg-off-white/40 backdrop-blur-md"></div>
        </div>

        {/* Glassmorphism Card */}
        <div className="glass-card z-10 w-full max-w-md rounded-xl p-8 md:p-10 flex flex-col items-center text-center bg-white/85 backdrop-blur-3xl border border-white/30 shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-on-background mb-8">Nexora</h1>
            
            <div className="w-24 h-24 mb-6 rounded-full bg-accent-pink-soft/50 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-primary" />
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-on-surface mb-4">Check your Inbox</h2>
            <p className="text-body-md text-on-surface-variant mb-8 px-4">
                We've sent a password reset link to your registered email address.
            </p>

            <div className="bg-surface-container border border-outline-subtle rounded-full py-2 px-4 mb-8 flex items-center gap-2">
                <Mail className="text-tertiary w-4 h-4" />
                <span className="text-sm font-semibold text-on-surface">n*******@example.com</span>
            </div>

            <div className="w-full flex flex-col gap-4 mt-2">
                <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm">
                    Open Gmail
                    <ExternalLink className="w-4 h-4" />
                </button>
                <button onClick={onBack} className="w-full border border-primary text-primary font-semibold py-3 rounded-lg hover:bg-accent-pink-soft transition-colors">
                    Back to Login
                </button>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-subtle w-full text-center">
                <p className="text-xs text-tertiary mb-2">Didn't receive it? Check your spam folder or</p>
                <button onClick={handleResend} disabled={isResending} className="text-sm font-semibold text-primary hover:underline transition-all flex items-center justify-center mx-auto min-h-[24px]">
                    {isResending ? (
                        <>
                            <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
                            Resending...
                        </>
                    ) : "Resend Link"}
                </button>
            </div>
        </div>

        {/* Success Toast */}
        {showToast && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 font-label-md">
                    <CheckCircle className="text-primary-fixed w-5 h-5" />
                    Password Reset Email Sent Again
                </div>
            </div>
        )}
    </div>
  );
}
