import { DiscoverItem } from '../types';

export const mockDiscoverItems: DiscoverItem[] = [
  // PRODUCTS
  {
    id: 'disc-p1',
    type: 'product',
    title: 'Signature Repair Collection',
    subtitle: 'Oribe • Haircare System',
    category: 'Haircare',
    brand: 'Oribe',
    price: 185,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5LHIj4gMECStaGdQEO4j26XEmcps2O5pNXiiJhsUafWrQeoIRjcQmJosbBDLYLK_h4H5d4CMj8gv6hnr0NprQcOtfqqJcDPmkvZBIwpwSWx8tYTPmziHHFBUlB5869WJ4jCYYxYG5lePYjANRO-hsINN8yT2xkhVuM-uEMEfkZIsSsHxXtv0lqlu1TZOzXcV2AkofEWVSkdYK-nt_uMUF0WnejWXv96FHpd0MyWBfIZH2s6win5_MA',
    verified: true,
    rating: 4.9,
    reviewsCount: 142,
    availability: 'In Stock'
  },
  {
    id: 'disc-p2',
    type: 'product',
    title: 'Supersonic™ Pro Edition',
    subtitle: 'Dyson • Equipment',
    category: 'Salon Equipment',
    brand: 'Dyson Pro',
    price: 499,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQlVwcYp4vOrJTa3HWXv-puNmHtBYZOxIeTSkQ-eP3vWJCAFSMghGRv-uMfII3quR3djjeWEHknl4Z6BWXjV0DJcluCqY80eOTxsADRn878a1xwcq-TF185EsEnOwhrOav5kGdZ83tFxXcOKeILvDDcZtjXKcKqx7y9aeI2O-i3WX0o1n9kk4_NspOGZSVYGpQZS_lRbfRFEZqrwn0Z2-cl5sOFwY3yxvs3ETB41-zYOSIFA7nLB4luQ',
    verified: true,
    rating: 4.8,
    reviewsCount: 98,
    availability: 'In Stock'
  },
  {
    id: 'disc-p3',
    type: 'product',
    title: 'Advanced Botanical Serums',
    subtitle: 'Vintner\'s • Skincare',
    category: 'Skincare',
    brand: "Vintner's",
    price: 215,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg29XSdrHep1CaAnEgkoH2cWluxx9EUrEucAc3TwqIF9cs4n8u1H-r0pjJqho491R4Bt3LRBe9l7kMTpW7WLNzt11Pkk5cv6eXm1Gp9CXr10s-LutEnhIAeLYCLoc1jG3dgg3oVG6xnTxbFrbC8OVmrS9h0XZOZMUrXQWXbfSP3kqzAxrLX2x4TSTTkstb4z92KfVUkLNzQ0vOifPYmz7aBhECsQDDnailkJKaWk2-kUsopw5oRH8e5A',
    verified: true,
    rating: 4.7,
    reviewsCount: 64,
    availability: 'On Request'
  },
  {
    id: 'disc-p4',
    type: 'product',
    title: 'Chronologiste Intensive Caviar Mask',
    subtitle: 'Kérastase • Haircare',
    category: 'Haircare',
    brand: 'Kérastase',
    price: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCEYHls5dQkfThs3XyqW9f_9kZvwXOSV14QzZHCFfw1FodIBVpZSgtDQ3ZSalBdVOl0jctITjYB4GASJbCrblWVkIUheHS9gvvZCpG0fgly9fcJUzVnxsx8GgZ9NaGP0R5qYiURBCAX5NP736u3r4VazIT_27GvRIfuX7FKsW74PBz-hy7PvjsojlwTx-EgVQbt-APbmiYrfTaX7ySfkTRNhd7LfG3IPa-fIZslhLDgGODaCE-l3OY8w',
    verified: true,
    rating: 4.9,
    reviewsCount: 210,
    availability: 'In Stock'
  },
  {
    id: 'disc-p5',
    type: 'product',
    title: 'Precision Color Diagnostics Scanner',
    subtitle: 'L\'Oréal Professionnel • Diagnostics',
    category: 'Color Diagnostics',
    brand: 'L\'Oréal Professionnel',
    price: 850,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqLekdLcP6z2ctvmqVsExhdVyzOQsWY5Rfi7KWpU-G9vzNKw4ZgPvSRToxuQmHgseFjFkhfbCs3M-Uo3pm2gi9ijf5vrFCKNWUmMTqSXsg6HLCFV9oqD9nYbJZLlNM-gPlPItD6aNK9CjwdrbAqEt2E-YK2mwYeD39H0joyYbkM2FnZIED1a58KHeeiQ-AyliaIHavZJPsb777YHz0PGAyMfcBUYKQ_033IVVwG3Uhk3_jJAEyujWVcw',
    verified: true,
    rating: 4.6,
    reviewsCount: 38,
    availability: 'Pre-order'
  },

  // DISTRIBUTORS
  {
    id: 'disc-d1',
    type: 'distributor',
    title: 'LuxeSuite Distributors',
    subtitle: 'Milan, Italy • Premium Salon Supplier',
    category: 'Haircare',
    brand: 'Oribe, Kérastase, Dyson Pro',
    location: 'Milan, Italy',
    coverageArea: 'Global',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_WUj_PgdAz_-VkoWcS8B4BMtTRfwgrZVFWUsbjVj-s1wHhAdEkHcebxA0drtYFyle_Hc78qlR0qgi35Vt1yf9Ho7AApjIPbh2PoOdtZG0Ch6rwxImDeR_wL966QkWtebf2yJ9V6GM5B886PB5_a5ukM3I0BNEjgozThDRWhp-e4Qy9fROK80yGxVyi8rNGpCc3jcSlzfmGd0lCZ5AmLmZ49qIsO2mB08RGpiY0YUktvOVkdTbz9h3TQ',
    verified: true,
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: 'disc-d2',
    type: 'distributor',
    title: 'Élité Beauty Direct',
    subtitle: 'Paris, France • European Luxury Supply',
    category: 'Skincare',
    brand: "Vintner's, L'Oréal Professionnel",
    location: 'Paris, France',
    coverageArea: 'Regional',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjI9CQLjk5zwJxo4vP37RSnEyPkJqRyTnyIa9jFhbfHxB73TuFkvtcu6JXnmyRW0FB8-vmOBMuqNM8PK2R5dlsONUgCWtZnC4v0uFlKjeioTCSrZxjFeDXEDtRw38i5LX02x-TOtLfm8fBGvY49selPqBMiApijIiV5KhF2p2ZLJnUsBzfqYdpJHvdTnfpuv-NUh26PxF9hZeI6z88iT6Hv_q7s2YLzBF3wualemgkvZ1l8e-BpcIqPQ',
    verified: true,
    rating: 4.8,
    reviewsCount: 95
  },
  {
    id: 'disc-d3',
    type: 'distributor',
    title: 'Apex Salon Logistics',
    subtitle: 'New York, USA • North America Wholesale',
    category: 'Salon Equipment',
    brand: 'Dyson Pro, Takara Belmont',
    location: 'New York, USA',
    coverageArea: 'Global',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLfIahAuEC9vNgl1r6RqIKd9ileSrrJd4UtO6OxPSwG8RXQt5HGn9gi2QYdG9rQ-e3bWXmgzOabpczL2VCFjJQMnlaS-tYEVEUSupFfHBsJES6gy6zRJ--Sa4XqIJrOapNmVe62CR1uYBa9muC89T1gEvmlpBG5xq1EmPlx2w0zZr0oH4MQxTd_RlVSzQYUzAZpEKQudu1AKluNGlNC8HDUQ7j_EfoAv1elNEavgCnLMzgJ4GZIIh4Hw',
    verified: false,
    rating: 4.5,
    reviewsCount: 52
  },

  // CONTENT
  {
    id: 'disc-c1',
    type: 'content',
    title: '2026 High-Tech Salon Trends Report',
    subtitle: 'Editorial • 6 min read',
    category: 'Trends & Insights',
    author: 'Nexora Editorial Team',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtCSxJrL0BEZ3Nsw4mnQHOKR6rroZHtf7fshCMogVHd6o49a69k1eotdQB9MIziTxsKcsydrNFyyUJWaTcUCWK1bjNpB-tWjbs88Y2clcXzem1asg5L2rHamAb0c0bFy_sdJI0j1QBw96Jc9KFv5GMMr5YRXj128ovmLDR7-mZrpH33gLMHyP9uXd78epcplKsrtQF_sVvkGPZK9CJ1KvV_zv3QFt3x9YnuN4_9rKQcLeCIfU_pxTUJg',
    rating: 5.0,
    reviewsCount: 310
  },
  {
    id: 'disc-c2',
    type: 'content',
    title: 'Mastering French Balayage Diagnostics',
    subtitle: 'Masterclass • 12 min watch',
    category: 'Color Diagnostics',
    author: 'Jean-Luc Moreau',
    readTime: '12 min video',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5LHIj4gMECStaGdQEO4j26XEmcps2O5pNXiiJhsUafWrQeoIRjcQmJosbBDLYLK_h4H5d4CMj8gv6hnr0NprQcOtfqqJcDPmkvZBIwpwSWx8tYTPmziHHFBUlB5869WJ4jCYYxYG5lePYjANRO-hsINN8yT2xkhVuM-uEMEfkZIsSsHxXtv0lqlu1TZOzXcV2AkofEWVSkdYK-nt_uMUF0WnejWXv96FHpd0MyWBfIZH2s6win5_MA',
    rating: 4.9,
    reviewsCount: 180
  },

  // OFFERS
  {
    id: 'disc-o1',
    type: 'offer',
    title: 'Oribe Professional Opening Bundle',
    subtitle: 'Exclusive Wholesale Package',
    category: 'Haircare',
    discount: '25% OFF',
    price: 1450,
    originalPrice: 1930,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjbHJJkh6fXBPqoewYoo9PnTy-lu_OwIUk6vf3jt5wyyjiNAKZM8Wveu00tVo8bJ2mR6g-ZxyDTCCwiNr1s1gXPF4-0RzM82hNZiiBq7j2BKSOmNHdFf9mdn9xWtAp7IJaqqBtCWFMwGNGXuSpHlR7dKZCf47an4OdB68JqBWCR8b1MSr8VSFj4vawiCpRWW2-6vsahHAwLL1VRe21oW95JEHKvw4T7m957ogkg0SWqTw8Sp19f88EXg',
    verified: true,
    rating: 4.9,
    reviewsCount: 42
  },
  {
    id: 'disc-o2',
    type: 'offer',
    title: 'Dyson Pro Salon Fleet Starter Kit',
    subtitle: 'Buy 3 Get 1 Free Attachments Pack',
    category: 'Salon Equipment',
    discount: 'Complimentary Pack',
    price: 1497,
    originalPrice: 1750,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQlVwcYp4vOrJTa3HWXv-puNmHtBYZOxIeTSkQ-eP3vWJCAFSMghGRv-uMfII3quR3djjeWEHknl4Z6BWXjV0DJcluCqY80eOTxsADRn878a1xwcq-TF185EsEnOwhrOav5kGdZ83tFxXcOKeILvDDcZtjXKcKqx7y9aeI2O-i3WX0o1n9kk4_NspOGZSVYGpQZS_lRbfRFEZqrwn0Z2-cl5sOFwY3yxvs3ETB41-zYOSIFA7nLB4luQ',
    verified: true,
    rating: 5.0,
    reviewsCount: 29
  }
];

export const searchSuggestionsList = [
  'Oribe Signature Repair',
  'Kérastase Chronologiste',
  'Dyson Supersonic Pro',
  'Milan Distributors',
  'Paris Salon Wholesalers',
  'French Balayage Masterclass',
  'Color Diagnostics Tools',
  'Vintner\'s Botanical Serums'
];

export const initialRecentSearches = [
  'Professional Haircare',
  'Milan',
  'Skincare Systems',
  'Dyson Pro'
];
