import { motion } from "motion/react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="bg-off-white text-on-background h-screen w-screen flex flex-col justify-center items-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        onAnimationComplete={onComplete}
        className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm border border-outline-subtle"
      >
        <img 
          alt="Nexora Brand Logo" 
          className="w-full h-full object-cover rounded-full p-2" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLb9n7sQMm1vGrrBubgAfjStuLCr_Ph4MH171J7Us4NsIQrATq85fUkMmZhmpNOJ4AeptE7GQU42j_E46vvXhU-iXc4ugKnC-CEk8DFdYrE5PkX4uVEr9UxL4Aycr8Urhf5Gup5g7_pPmF-XgKj28voTRpUpb_se1aDQTvWXhPMKObhSTuStak-j_dzQifG6fG3nsQVZ5v3G8Mi6dJ7PfnWaG-p3p8AU9HsQEdQBHrQwKSkowu0l41dknvlcZHWNd27Kk"
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1], delay: 0.6 }}
        className="text-center mt-stack-lg"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary">NEXORA</h1>
        <p className="text-sm text-on-surface-variant uppercase tracking-widest opacity-80 mt-stack-sm">New Beauty Industry</p>
      </motion.div>
    </div>
  );
}
