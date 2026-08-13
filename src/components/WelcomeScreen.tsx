import { ArrowLeft, Compass, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import { ViewType } from "../types";

interface WelcomeScreenProps {
  onNext: (view: ViewType) => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="bg-off-white min-h-screen flex flex-col items-center pt-24 pb-8 px-margin-mobile">
      <header className="w-full flex items-center justify-between px-margin-mobile py-stack-md fixed top-0 bg-off-white z-50">
        <button className="text-primary">
          <ArrowLeft />
        </button>
        <span className="text-2xl font-bold tracking-tighter text-primary">NEXORA</span>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center pt-16 max-w-7xl w-full">
        <div className="text-center mb-stack-lg max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-on-background tracking-tight mb-stack-sm">
            The New Standard of Beauty Industry.
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Connect with distributors, discover new products, and grow your business in one ecosystem.
          </p>
        </div>

        <div className="w-full mb-section-gap relative">
            <div className="flex overflow-x-auto snap-x hide-scrollbar gap-gutter pb-4">
                <div className="flex-shrink-0 w-64 snap-center bg-white border border-outline-subtle rounded-lg p-stack-md">
                    <div className="w-12 h-12 rounded-full bg-accent-pink-soft flex items-center justify-center mb-stack-md text-primary">
                        <Compass />
                    </div>
                    <h3 className="font-title-md text-on-surface">Discover</h3>
                    <p className="text-body-md text-on-surface-variant text-sm">Find elite beauty distributors and exclusive partnerships.</p>
                </div>
                <div className="flex-shrink-0 w-64 snap-center bg-white border border-outline-subtle rounded-lg p-stack-md">
                    <div className="w-12 h-12 rounded-full bg-accent-pink-soft flex items-center justify-center mb-stack-md text-primary">
                        <ShoppingBag />
                    </div>
                    <h3 className="font-title-md text-on-surface">Shop</h3>
                    <p className="text-body-md text-on-surface-variant text-sm">Access the latest professional beauty products with premium pricing.</p>
                </div>
                <div className="flex-shrink-0 w-64 snap-center bg-white border border-outline-subtle rounded-lg p-stack-md">
                    <div className="w-12 h-12 rounded-full bg-accent-pink-soft flex items-center justify-center mb-stack-md text-primary">
                        <Sparkles />
                    </div>
                    <h3 className="font-title-md text-on-surface">Create</h3>
                    <p className="text-body-md text-on-surface-variant text-sm">Share and consume high-end social content within the community.</p>
                </div>
                <div className="flex-shrink-0 w-64 snap-center bg-white border border-outline-subtle rounded-lg p-stack-md">
                    <div className="w-12 h-12 rounded-full bg-accent-pink-soft flex items-center justify-center mb-stack-md text-primary">
                        <TrendingUp />
                    </div>
                    <h3 className="font-title-md text-on-surface">Grow</h3>
                    <p className="text-body-md text-on-surface-variant text-sm">Scale with AI Studio and precision advertising tools.</p>
                </div>
            </div>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-stack-sm">
          <button onClick={() => onNext('registration')} className="w-full bg-primary text-on-primary py-3 rounded-full font-bold">
            Get Started
          </button>
          <button onClick={() => onNext('login')} className="w-full border border-primary text-primary py-3 rounded-full font-bold">
            Log In
          </button>
        </div>
      </main>
    </div>
  );
}
