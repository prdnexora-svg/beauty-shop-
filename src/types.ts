export type ViewType = 'splash' | 'welcome' | 'registration' | 'login' | 'forgot-password' | 'email-sent' | 'reset-password' | 'home' | 'discover' | 'distributor-directory' | 'distributor-profile' | 'shop' | 'product-detail' | 'checkout' | 'order-confirmation' | 'orders' | 'social-feed' | 'create-content' | 'ai-content-studio';

export interface Distributor {
    id: string;
    name: string;
    description: string;
    category: 'Salon Network' | 'Spa & Wellness' | 'Retail Boutiques' | 'Medical Aesthetics' | 'Equipment Direct';
    location: string;
    region: 'North America' | 'Europe' | 'Asia Pacific' | 'Middle East';
    coverage: string;
    revenueYtd?: string;
    verified: boolean;
    isFeatured?: boolean;
    image: string;
    logo?: string;
    rating?: number;
    salonsCount?: number;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
    brand?: string;
    availability?: 'In Stock' | 'On Request' | 'Pre-order';
    rating?: number;
    reviewsCount?: number;
}

export interface DiscoverItem {
    id: string;
    type: 'product' | 'distributor' | 'content' | 'offer';
    title: string;
    subtitle: string;
    category: string;
    brand?: string;
    location?: string;
    coverageArea?: string;
    price?: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    verified?: boolean;
    rating?: number;
    reviewsCount?: number;
    availability?: 'In Stock' | 'On Request' | 'Pre-order';
    readTime?: string;
    author?: string;
}
