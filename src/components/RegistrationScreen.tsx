import React, { useState } from "react";
import { ArrowLeft, User, Mail, Lock, UserPlus } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";

interface RegistrationScreenProps {
  onBack: () => void;
}

export default function RegistrationScreen({ onBack }: RegistrationScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div className="bg-off-white min-h-screen p-4 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-lg flex overflow-hidden">
        {/* Left Side (Simplified) */}
        <div className="hidden lg:flex w-1/2 bg-surface-container p-10 flex-col justify-between">
           <h2 className="text-4xl font-bold text-primary">Build your presence.</h2>
           <p className="text-on-surface-variant">Grow your beauty business.</p>
        </div>
        
        {/* Right Side (Form) */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16">
          <motion.div 
            className="w-full aspect-[16/9] relative overflow-hidden rounded-lg shadow-xl mb-8 cursor-pointer [perspective:1000px] bg-surface-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {!isLoaded && (
              <div className="absolute inset-0 w-full h-full animate-pulse bg-surface-container" />
            )}
            <motion.img 
              src="https://lh3.googleusercontent.com/aida/AP1WRLu0R0cniNXBNdbLu7xGdFG3be9j5Pxfc5pT4MrI4F3f3w8l09Mfw5jbmT82f05YxvTqVrQq99cqZgFDztwYhQKXZVGB9J0eTDYVomScJPRRfMIdZOzcyKevfspx6dJz8nCUe5_EWm56xWZRIb5perd9Bg9ppMTry9xJtnMdTmPQeFKzREbLdE1AAoBifdedPpo1jrIiBh7vAOxxR7c8MQQYRYRw2-8ndDNBsfoE5fjinHKYLKqkvWpl4SYd" 
              alt="Nexora Luxury Beauty Editorial Header" 
              className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: "translateZ(20px)" }}
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4">
              <span className="text-white text-xs font-serif opacity-80 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                Nexora Editorial | 2024 Collection
              </span>
              <button className="bg-white/20 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-white/40 transition-colors" style={{ transform: "translateZ(30px)" }}>
                View Collection
              </button>
            </div>
          </motion.div>
          <button onClick={onBack} className="text-primary flex items-center mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Welcome
          </button>
          
          <h2 className="text-3xl font-bold mb-8">Create your account</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="w-full border-b border-outline p-2 focus:border-primary" />
              <input type="text" placeholder="Last Name" className="w-full border-b border-outline p-2 focus:border-primary" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full border-b border-outline p-2 focus:border-primary" />
            <input type="password" placeholder="Password" className="w-full border-b border-outline p-2 focus:border-primary" />
            
            <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-full flex justify-center items-center font-bold">
              <UserPlus className="w-4 h-4 mr-2" /> Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
