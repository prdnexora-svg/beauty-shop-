import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ViewType } from '../types';

interface OrdersScreenProps {
  onNavigate?: (view: ViewType) => void;
}

interface Order {
  id: string;
  reference: string;
  date: string;
  total: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: {
    name: string;
    sku: string;
    qty: number;
    icon: string;
  }[];
  fulfillmentType: string;
  fulfillmentDetails: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    reference: '#ORD-77A902',
    date: 'Oct 24, 2024',
    total: '$1,450.00',
    status: 'Processing',
    items: [
      { name: 'Luminance Cellular Serum, 50ml', sku: 'NXR-SER-001', qty: 2, icon: 'spa' },
      { name: 'Artisan Sculpting Brush Set', sku: 'NXR-BRS-04A', qty: 1, icon: 'brush' }
    ],
    fulfillmentType: 'Standard Professional Delivery',
    fulfillmentDetails: 'Est. Arrival: Oct 28 - Oct 30'
  },
  {
    id: '2',
    reference: '#ORD-62B114',
    date: 'Oct 20, 2024',
    total: '$385.00',
    status: 'Shipped',
    items: [
      { name: 'Editorial Pro Palette - Autumn/Winter', sku: 'NXR-PAL-AW24', qty: 1, icon: 'palette' }
    ],
    fulfillmentType: 'Express Courier',
    fulfillmentDetails: 'Tracking: TRK-992837110'
  },
  {
    id: '3',
    reference: '#ORD-55C891',
    date: 'Oct 15, 2024',
    total: '$820.00',
    status: 'Delivered',
    items: [
      { name: 'Hydro-Infusion Botanical Mask, 500ml', sku: 'NXR-MSK-500', qty: 3, icon: 'water_drop' }
    ],
    fulfillmentType: 'Express Courier',
    fulfillmentDetails: 'Delivered on Oct 18, 2024'
  }
];

export default function OrdersScreen({ onNavigate }: OrdersScreenProps) {
  const [activeTab, setActiveTab] = useState<string>('All Orders');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesTab = activeTab === 'All Orders' || order.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = order.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-[#fcf9f8] text-[#1c1b1b] font-sans antialiased min-h-screen flex flex-col md:flex-row w-full">
      {/* Mobile Top App Bar */}
      <header className="md:hidden flex justify-between items-center w-full px-5 py-4 bg-[#fcf9f8] border-b border-[#e8e8e8] sticky top-0 z-50">
        <div className="text-2xl font-bold tracking-tighter text-[#8e004b]">Nexora</div>
        <div className="flex items-center gap-4">
          <span 
            onClick={() => onNavigate && onNavigate('shop')}
            className="material-symbols-outlined text-[#8e004b] cursor-pointer hover:opacity-75"
          >
            shopping_bag
          </span>
          <span 
            onClick={() => onNavigate && onNavigate('home')}
            className="material-symbols-outlined text-[#8e004b] cursor-pointer hover:opacity-75"
          >
            favorite
          </span>
        </div>
      </header>

      {/* Desktop Side Navigation */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#fdf8f8] border-r border-[#f0edec] p-4 z-40 shadow-sm">
        <div className="mb-12 px-4 mt-4">
          <div className="text-xl font-semibold text-[#8e004b] mb-1">Nexora Suite</div>
          <div className="text-[11px] font-medium text-[#594047] uppercase tracking-widest">Professional Management</div>
        </div>

        <button 
          onClick={() => onNavigate && onNavigate('shop')}
          className="bg-[#8e004b] text-white font-semibold text-[13px] rounded-xl py-3 px-4 mb-8 w-full flex items-center justify-center gap-2 hover:bg-[#b90064] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Order / Shop
        </button>

        <nav className="flex-1 space-y-1.5">
          <button 
            onClick={() => onNavigate && onNavigate('home')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#594047] font-semibold text-[13px] hover:bg-[#ece7e7] transition-all text-left"
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('shop')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#594047] font-semibold text-[13px] hover:bg-[#ece7e7] transition-all text-left"
          >
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            Inventory & Shop
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('orders')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#fde7f3] text-[#8e004b] font-bold text-[13px] transition-all text-left"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
            Orders
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('distributor-directory')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#594047] font-semibold text-[13px] hover:bg-[#ece7e7] transition-all text-left"
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            Distributors
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#e8e8e8] space-y-1">
          <button 
            onClick={() => onNavigate && onNavigate('home')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#594047] font-semibold text-[13px] hover:bg-[#ece7e7] transition-all text-left"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('home')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#594047] font-semibold text-[13px] hover:bg-[#ece7e7] transition-all text-left"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            Support
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 px-5 md:px-10 py-8 max-w-[1024px] w-full mx-auto pb-32 md:pb-16">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">My Orders</h1>
            <p className="text-base text-slate-600 max-w-lg">Manage your luxury supply chain and client fulfillment operations.</p>
          </div>
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, SKUs..." 
              className="w-full bg-[#f0edec] border-b border-[#e8e8e8] focus:border-[#8e004b] focus:ring-0 py-2.5 pl-10 pr-4 text-sm outline-none rounded-t-xl transition-all"
            />
          </div>
        </header>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-[#e8e8e8] mb-8 no-scrollbar">
          {['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab 
                  ? 'text-[#8e004b] border-[#8e004b] font-bold' 
                  : 'text-slate-600 border-transparent hover:text-[#8e004b]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#e8e8e8] shadow-sm">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-3">inbox</span>
              <p className="text-base font-bold text-slate-700">No orders found</p>
              <p className="text-sm text-slate-500 mt-1">Try adjusting your search or status filter.</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.article 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#e8e8e8] rounded-2xl p-6 transition-all hover:shadow-lg shadow-sm"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#e8e8e8] pb-4 mb-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Order {order.reference}</span>
                    <div className="text-lg font-bold text-slate-900">{order.date} • {order.total}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold gap-1.5 ${
                      order.status === 'Processing' ? 'bg-[#f0edec] text-slate-700' :
                      order.status === 'Shipped' ? 'bg-[#fde7f3] text-[#8e004b]' :
                      order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        order.status === 'Processing' ? 'bg-slate-500' :
                        order.status === 'Shipped' ? 'bg-[#8e004b]' :
                        order.status === 'Delivered' ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}></span> 
                      {order.status}
                    </span>
                    <button 
                      onClick={() => onNavigate && onNavigate('order-confirmation')}
                      className="border border-[#8e004b] text-[#8e004b] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#fde7f3] transition-colors whitespace-nowrap shadow-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Items ({order.items.length})</h4>
                    <ul className="space-y-3">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#f0edec] rounded-xl flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[#8e004b]">{item.icon}</span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 mb-0.5">{item.name}</div>
                            <div className="text-xs text-slate-500 font-medium">SKU: {item.sku} • Qty: {item.qty}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:border-l md:border-[#e8e8e8] md:pl-6 flex flex-col justify-center">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fulfillment</h4>
                    <div className="text-sm font-bold text-slate-900 mb-1">{order.fulfillmentType}</div>
                    <div className="text-xs text-slate-600 mb-3 font-medium">{order.fulfillmentDetails}</div>
                    <div 
                      onClick={() => onNavigate && onNavigate('home')}
                      className="flex items-center gap-2 text-[#8e004b] text-xs font-bold cursor-pointer hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">support_agent</span> Contact Support
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[#fcf9f8] border-t border-[#e8e8e8] py-2.5 px-6 flex justify-between items-center z-50 shadow-lg">
        <div 
          onClick={() => onNavigate && onNavigate('home')}
          className="flex flex-col items-center text-slate-500 hover:text-[#8e004b] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Dashboard</span>
        </div>
        <div 
          onClick={() => onNavigate && onNavigate('orders')}
          className="flex flex-col items-center text-[#8e004b] font-bold transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
          <span className="text-[10px] font-bold mt-1">Orders</span>
        </div>
        <div 
          onClick={() => onNavigate && onNavigate('distributor-directory')}
          className="flex flex-col items-center text-slate-500 hover:text-[#8e004b] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-bold mt-1">Distributors</span>
        </div>
        <div 
          onClick={() => onNavigate && onNavigate('home')}
          className="flex flex-col items-center text-slate-500 hover:text-[#8e004b] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold mt-1">Settings</span>
        </div>
      </nav>
    </div>
  );
}
