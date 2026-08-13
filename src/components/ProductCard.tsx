import { Key } from "react";
import { Heart } from "lucide-react";
import { Product } from "../types";

export interface ProductCardProps {
  key?: Key;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

export default function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  return (
    <div className="flex-shrink-0 w-64 bg-surface-container-lowest rounded-lg border border-outline-subtle p-stack-md hover:scale-[1.02] transition-transform cursor-pointer">
      <div className="w-full h-48 bg-surface-container-low rounded-DEFAULT mb-4 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <button 
          onClick={onToggleWishlist}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-primary text-primary" : "text-outline"}`} />
        </button>
      </div>
      <h3 className="text-title-md font-semibold text-on-surface mb-1 truncate">{product.name}</h3>
      <p className="text-body-md text-on-surface-variant mb-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-title-md font-bold text-primary">${product.price}</span>
        <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors">
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
}
