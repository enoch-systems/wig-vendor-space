"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu,
  Search,
  Bell,
  User,
  Eye,
  DollarSign,
  Package,
  Users,
  TrendingUp,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  ChevronDown,
  ChevronDown as ChevronDownIcon,
  X,
  LayoutDashboard,
  ShoppingCart,
  Settings as SettingsIcon,
  LogOut,
  Calendar,
  Receipt,
  ArrowLeft,
  Settings,
  LogOut as LogOutIcon
} from 'lucide-react';
import { recentActivityOrders } from './constants';

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timePeriod, setTimePeriod] = useState('today');
  const [currentPath, setCurrentPath] = useState('/admin');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Set current path on mount
    setCurrentPath(window.location.pathname);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (profileDropdownOpen && !target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
      if (notificationModalOpen && !target.closest('.notification-modal')) {
        setNotificationModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen, notificationModalOpen]);

  const revenueData = {
    all: '₦2,500,000',
    today: '₦85,000',
    yesterday: '₦92,000',
    thisWeek: '₦650,000',
    thisMonth: '₦2,500,000'
  };

  const ordersData = {
    all: '1,250',
    today: '42',
    yesterday: '38',
    thisWeek: '325',
    thisMonth: '1,250'
  };

  const timePeriods = [
    { value: 'all', label: 'All' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' }
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: SettingsIcon, label: 'Settings', href: '/admin/settings' },
  ];

  const metrics = [
    { 
      label: 'Total Orders', 
      value: ordersData[timePeriod as keyof typeof ordersData], 
      change: '+4.35%', 
      icon: ShoppingCart, 
      color: 'amber',
      trend: 'up',
      showDropdown: true
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-800 border-b border-gray-700">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Menu size={20} className="text-gray-300" />
            </button>
            <a href="/admin" className="flex items-center space-x-2">
              <img src="/wig.png" alt="Logo" className="h-8 w-auto object-contain" />
              <span className="text-white font-semibold text-lg">Wigga</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setNotificationModalOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative"
            >
              <Bell size={20} className="text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <img 
                  src="/admin.png" 
                  alt="Admin Profile" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                />
                <ChevronDownIcon size={16} className="text-gray-400" />
              </button>
              
              {profileDropdownOpen && (
                <>
                  {/* Blur Overlay */}
                  <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  {/* Profile Header */}
                  <div className="px-4 py-3 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/admin.png" 
                        alt="Admin Profile" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                      />
                      <div>
                        <p className="text-white font-medium">Enoch Chukwudi</p>
                        <p className="text-gray-400 text-sm">enochc.official@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dropdown Menu Items */}
                  <div className="py-2">
                    <a
                      href="/admin/settings"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Settings size={16} className="mr-3" />
                      <span>Account Settings</span>
                    </a>
                    <a
                      href="/signout"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <LogOutIcon size={16} className="mr-3" />
                      <span>Log out</span>
                    </a>
                  </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Standalone Search Bar */}
      <div className="fixed top-16 left-0 right-0 z-30 px-6 pt-10 py-4 bg-gray-800 border-b border-gray-700">
        <div className="mx-auto max-w-2xl">
          <div className="bg-gray-700 group mx-auto flex w-fit items-center gap-4 rounded-full border border-gray-600 p-2 pl-4 shadow-md transition-colors duration-300">
            <input
              type="text"
              placeholder="Search products...."
              className="text-white text-sm bg-transparent outline-none w-64 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="block h-4 w-0.5 border-l bg-gray-500"></span>
            <div className="bg-gray-600 group-hover:bg-gray-500 size-6 overflow-hidden rounded-full duration-500 flex items-center justify-center">
              <Search className="m-auto size-3 text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6 mt-33">
        {/* Metrics Cards */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gray-700 rounded-lg`}>
                  <metric.icon size={24} className="text-amber-200" />
                </div>
                {metric.showDropdown ? (
                  <div className="relative">
                    <button 
                      onClick={() => {
                        const dropdown = document.getElementById(`time-dropdown-${index}`);
                        if (dropdown) {
                          dropdown.classList.toggle('hidden');
                        }
                      }}
                      className="flex items-center space-x-1 px-2 py-1 bg-gray-700 rounded-lg text-gray-300 text-sm hover:bg-gray-600 transition-colors"
                    >
                      <span>{timePeriods.find(p => p.value === timePeriod)?.label}</span>
                      <ChevronDown size={14} />
                    </button>
                    <div 
                      id={`time-dropdown-${index}`}
                      className="absolute top-full right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg hidden z-10"
                    >
                      {timePeriods.map((period) => (
                        <button
                          key={period.value}
                          onClick={() => {
                            setTimePeriod(period.value);
                            const dropdown = document.getElementById(`time-dropdown-${index}`);
                            if (dropdown) {
                              dropdown.classList.add('hidden');
                            }
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                        >
                          {period.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    <span>{metric.change}</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
              <p className="text-gray-400 text-sm mt-1">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          {/* Charts section removed */}
        </div>

        {/* Bottom Section */}
        <div className="mb-8">
          {/* Recent Activity */}
          <div id="recent-activity" className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>

            <div className="space-y-4">
              {/* Order 1 - Wig 21 */}
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src="/wig21.jpeg" alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-white font-medium">Curly Hair Long Hair</p>
                    <p className="text-gray-400 text-sm">From: 09162919586</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Adeola Johnson</p>
                  <p className="text-green-400 text-xs">Order Placed</p>
                  <p className="text-gray-500 text-xs">3/1/26 2:39PM</p>
                </div>
              </div>

              {/* Order 2 - Wig 22 */}
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src="/wig22.jpeg" alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-white font-medium">Classic Bob Straight Hair</p>
                    <p className="text-gray-400 text-sm">From: 09162919587</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Nneka Okafor</p>
                  <p className="text-green-400 text-xs">Order Placed</p>
                  <p className="text-gray-500 text-xs">3/1/26 11:39AM</p>
                </div>
              </div>

              {/* Order 3 - Wig 23 */}
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src="/wig23.jpeg" alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-white font-medium">Long Wavy Curly Hair</p>
                    <p className="text-gray-400 text-sm">From: 09162919588</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Chinwe Adebayo</p>
                  <p className="text-green-400 text-xs">Order Placed</p>
                  <p className="text-gray-500 text-xs">3/1/26 9:39AM</p>
                </div>
              </div>

              {/* Order 4 - Wig 24 */}
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src="/wig24.jpeg" alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-white font-medium">Pixie Cut Wavy Hair</p>
                    <p className="text-gray-400 text-sm">From: 09162919589</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Amaka Eze</p>
                  <p className="text-green-400 text-xs">Order Placed</p>
                  <p className="text-gray-500 text-xs">3/1/26 8:39AM</p>
                </div>
              </div>

              {/* Order 5 - Wig 25 */}
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src="/wig25.jpeg" alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-white font-medium">Layered Lob Short Hair</p>
                    <p className="text-gray-400 text-sm">From: 09162919590</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Ifeoma Nwosu</p>
                  <p className="text-green-400 text-xs">Order Placed</p>
                  <p className="text-gray-500 text-xs">3/1/26 6:39AM</p>
                </div>
              </div>

              {/* Order 6 - Wig 26 */}
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src="/wig26.jpeg" alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="text-white font-medium">Sleek Straight Long Hair</p>
                    <p className="text-gray-400 text-sm">From: 09162919591</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-300 text-sm">Ngozi Okoro</p>
                  <p className="text-green-400 text-xs">Order Placed</p>
                  <p className="text-gray-500 text-xs">3/1/26 4:39AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Left Side Menu */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 delay-300 ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/10 bg-opacity-50 backdrop-blur-lg"
          onClick={() => setMenuOpen(false)}
        ></div>
        
        {/* Menu Panel */}
        <div className={`absolute top-0 left-0 h-full w-64 bg-gray-800 shadow-xl transform transition-transform duration-700 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <a href="/admin" className="flex items-center space-x-2">
                <img src="/wig.png" alt="Logo" className="h-6 w-auto object-contain" />
                <span className="text-white font-semibold">Wigga</span>
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X size={20} className="text-gray-300" />
              </button>
            </div>
          </div>
        
          <nav className="p-4">
            {/* Back to Store Button */}
            <a
              href="/"
              className="flex items-center p-3 mb-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors group"
              onClick={() => setMenuOpen(false)}
            >
              <ArrowLeft size={20} className="min-w-[20px]" />
              <span className="ml-3 font-medium">Back to Store</span>
            </a>
            
            {menuItems.map((item, index) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center p-3 mb-2 rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-slate-600 text-white'
                      : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <item.icon size={20} className={`min-w-[20px] ${isActive ? 'text-white' : ''}`} />
                  <span className="ml-3 font-medium">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Notification Modal */}
      {notificationModalOpen && (
        <>
          {/* Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => setNotificationModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="notification-modal bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                <button
                  onClick={() => setNotificationModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              
              {/* Modal Body - Scrollable */}
              <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  {recentActivityOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={order.productImage} alt="Product" className="w-12 h-12 object-cover rounded-lg" />
                        <div>
                          <p className="text-white font-medium">{order.productName}</p>
                          <p className="text-gray-400 text-sm">From: {order.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300 text-sm">
                          {order.firstName}<br />
                          {order.lastName}
                        </p>
                        <p className="text-green-400 text-xs">{order.status}</p>
                        <p className="text-gray-500 text-xs">{order.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
