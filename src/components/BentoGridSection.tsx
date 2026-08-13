import { ArrowRight, Store } from "lucide-react";

export default function BentoGridSection() {
  return (
    <section className="px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-surface-container-lowest rounded-xl border border-outline-subtle p-8 relative overflow-hidden flex flex-col justify-end h-64 group cursor-pointer">
        <img className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtn5cpSEtrxS5whFz4wz5RXg2Ls7hWA_Mo7yCilRvdCO6bGCvAXTMtH7EpTWWN0feJE2HVVOEtsHylVYq2A6kz7BkUjs-A7RZH7tNVgqhT32I704eW5bZrBfvT4rpy7UiE-Afyq49S3ZuhnzR_kvPSOKQdQoi3hponxm1Q0VvtMBHnATaMTDGyet_ZwLSQA1zaaj4fIZ8Njky7Fr_0I9TXEmzjZ-ANtXA0KTPLjFa2wjjMMQVkkIPnnA" alt="Salon Interior" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative z-10 text-white">
          <h3 className="text-xl font-semibold mb-2">Find a Distributor</h3>
          <p className="text-white/80 mb-4 max-w-sm">Locate authorized Nexora professionals near you.</p>
          <span className="inline-flex items-center text-primary-fixed-dim text-sm font-semibold">Locate <ArrowRight className="ml-1 w-4 h-4" /></span>
        </div>
      </div>
      <div className="bg-accent-pink-soft rounded-xl border border-outline-variant p-8 flex flex-col justify-center h-64 cursor-pointer hover:bg-primary-container hover:text-white transition-colors group">
        <Store className="w-10 h-10 text-primary group-hover:text-white mb-4" />
        <h3 className="text-xl font-semibold text-primary group-hover:text-white mb-2">Shop New Arrivals</h3>
        <p className="text-primary/80 group-hover:text-white/80">Explore the latest innovations.</p>
      </div>
    </section>
  );
}
