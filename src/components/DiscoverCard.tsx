import { useState, Key, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, MapPin, CheckCircle2, ShoppingBag, ArrowRight, Tag, BookOpen, Clock } from 'lucide-react';
import { DiscoverItem } from '../types';

interface DiscoverCardProps {
  key?: Key;
  item: DiscoverItem;
  isSaved?: boolean;
  onToggleSave?: (item: DiscoverItem) => void;
  onSelect?: (item: DiscoverItem) => void;
}

export default function DiscoverCard({ item, isSaved, onToggleSave, onSelect }: DiscoverCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const activeSaved = isSaved !== undefined ? isSaved : isWishlisted;

  const handleHeartClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(item);
    } else {
      setIsWishlisted(!isWishlisted);
    }
  };

  const getBadgeColor = () => {
    switch (item.type) {
      case 'product':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'distributor':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'content':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'offer':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getCtaText = () => {
    switch (item.type) {
      case 'product':
        return 'View Details';
      case 'distributor':
        return 'Contact Distributor';
      case 'content':
        return 'Read Article';
      case 'offer':
        return 'Claim Offer';
      default:
        return 'Explore';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

        {/* Badge & Wishlist Top Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md shadow-sm ${getBadgeColor()}`}>
            {item.type}
          </span>
          <button
            onClick={handleHeartClick}
            aria-label="Wishlist item"
            className="p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600 shadow-md transition-colors"
          >
            <Heart className={`w-4 h-4 transition-all ${activeSaved ? 'fill-rose-600 text-rose-600 scale-110' : ''}`} />
          </button>
        </div>

        {/* Bottom Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium z-10">
          {item.discount && (
            <span className="px-2.5 py-0.5 rounded-md bg-rose-600 text-white font-bold shadow-sm flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {item.discount}
            </span>
          )}

          {item.location && (
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {item.location}
            </span>
          )}

          {item.readTime && (
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md ml-auto">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              {item.readTime}
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-medium text-slate-500 truncate">{item.category}</span>
          {item.verified && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
          {item.title}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {item.subtitle}
        </p>

        {/* Metadata Footer Block */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
          {item.price !== undefined ? (
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-slate-900 text-lg">${item.price}</span>
              {item.originalPrice && (
                <span className="text-xs text-slate-400 line-through">${item.originalPrice}</span>
              )}
            </div>
          ) : item.author ? (
            <span className="text-xs text-slate-500 italic">By {item.author}</span>
          ) : item.coverageArea ? (
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
              Coverage: {item.coverageArea}
            </span>
          ) : (
            <span className="text-xs text-slate-400">Available</span>
          )}

          {item.rating && (
            <div className="flex items-center gap-1 text-xs text-slate-700 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-semibold border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{item.rating}</span>
              {item.reviewsCount && <span className="text-slate-400 font-normal">({item.reviewsCount})</span>}
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => onSelect && onSelect(item)}
          className="mt-4 w-full py-2.5 px-4 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 group/btn shadow-sm"
        >
          <span>{getCtaText()}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
