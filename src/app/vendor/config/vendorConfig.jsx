import React from 'react';
import { 
  House, 
  ClipboardList, 
  LayoutGrid, 
  Calendar, 
  Wallet, 
  Star, 
  Bell, 
  Settings, 
  Grid2x2, 
  Compass, 
  FileChartLine, 
  MessageSquare, 
  Package, 
  Tag, 
  Truck,
  Users,
  User,
  Info,
  BookOpen,
  HeartPulse,
  Award,
  BarChart3
} from "lucide-react";

/**
 * MASTER VENDOR CONFIGURATION
 * Now unified with the premium Orange/Amber theme for all categories.
 */

const SHARED_THEME = {
  primary: '#f97316', // Orange-500
  accent: '#fbbf24', // Amber-400
  gradient: 'from-orange-500 to-amber-500',
  light: 'bg-orange-50'
};

export const VENDOR_CONFIG = {
  categories: {
    'Pandit': {
      title: 'Acharya Dashboard',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'services', label: "My Puja Services", path: "/vendor/dashboard/services", icon: <LayoutGrid size={18} /> },
        { id: 'bookings', label: "Bookings", path: "/vendor/dashboard/bookings", icon: <ClipboardList size={18} /> },
        { id: 'calendar', label: "Availability Calendar", path: "/vendor/dashboard/calendar", icon: <Calendar size={18} /> },
        { id: 'wallet', label: "Wallet & Earnings", path: "/vendor/dashboard/wallet", icon: <Wallet size={18} /> },
        { id: 'reviews', label: "Reviews & Ratings", path: "/vendor/dashboard/reviews", icon: <Star size={18} /> },
        { id: 'notifications', label: "Notifications", path: "/vendor/dashboard/notifications", icon: <Bell size={18} /> },
        { id: 'settings', label: "Profile & KYC", path: "/vendor/dashboard/settings", icon: <Settings size={18} /> },
      ]
    },
    'Astrologer': {
      title: 'Jyotish Dashboard',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'consultations', label: "My Consultations", path: "/vendor/dashboard/consultations", icon: <Grid2x2 size={18} /> },
        { id: 'reports', label: "Reports & Kundli", path: "/vendor/dashboard/reports", icon: <Compass size={18} /> },
        { id: 'generate', label: "Kundli Generator", path: "/vendor/dashboard/generate", icon: <FileChartLine size={18} /> },
        { id: 'availability', label: "Availability", path: "/vendor/dashboard/availability", icon: <ClipboardList size={18} /> },
        { id: 'wallet', label: "Wallet & Earnings", path: "/vendor/dashboard/astroWallet", icon: <Wallet size={18} /> },
        { id: 'reviews', label: "Reviews & Ratings", path: "/vendor/dashboard/astroReviews", icon: <Star size={18} /> },
        { id: 'chat', label: "Chat Center", path: "/vendor/dashboard/chatCenter", icon: <MessageSquare size={18} /> },
        { id: 'notifications', label: "Notifications", path: "/vendor/dashboard/astroNotifications", icon: <Bell size={18} /> },
        { id: 'settings', label: "Profile & Branding", path: "/vendor/dashboard/profile", icon: <Settings size={18} /> },
      ]
    },
    'Puja Samagri Seller': {
      title: 'Store Dashboard',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'orders', label: "Orders", path: "/vendor/dashboard/orders_puja", icon: <ClipboardList size={18} /> },
        { id: 'products', label: "Products", path: "/vendor/dashboard/products_puja", icon: <LayoutGrid size={18} /> },
        { id: 'kits', label: "Puja Kits", path: "/vendor/dashboard/pujaKits_puja", icon: <Package size={18} /> },
        { id: 'inventory', label: "Inventory", path: "/vendor/dashboard/inventory_puja", icon: <Grid2x2 size={18} /> },
        { id: 'offers', label: "Offers & Coupons", path: "/vendor/dashboard/offers_puja", icon: <Tag size={18} /> },
        { id: 'delivery', label: "Shipping & Delivery", path: "/vendor/dashboard/delivery_puja", icon: <Truck size={18} /> },
        { id: 'wallet', label: "Wallet & Settlements", path: "/vendor/dashboard/settlement_puja", icon: <Wallet size={18} /> },
        { id: 'reviews', label: "Reviews & Ratings", path: "/vendor/dashboard/ratings_puja", icon: <Star size={18} /> },
        { id: 'settings', label: "Store Profile", path: "/vendor/dashboard/settings_puja", icon: <Settings size={18} /> },
      ]
    },
    'Temple Services': {
      title: 'Temple Admin',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'sevas', label: "Sevas / Pujas", path: "/vendor/dashboard/sevas_temple", icon: <LayoutGrid size={18} /> },
        { id: 'bookings', label: "Bookings", path: "/vendor/dashboard/bookings_temple", icon: <ClipboardList size={18} /> },
        { id: 'donations', label: "Donations", path: "/vendor/dashboard/donations_temple", icon: <Wallet size={18} /> },
        { id: 'events', label: "Events", path: "/vendor/dashboard/events_temple", icon: <Grid2x2 size={18} /> },
        { id: 'staff', label: "Staff / Pandit", path: "/vendor/dashboard/staff_temple", icon: <Users size={18} /> },
        { id: 'wallet', label: "Accounts", path: "/vendor/dashboard/wallet_temple", icon: <Wallet size={18} /> },
        { id: 'settings', label: "Settings", path: "/vendor/dashboard/settings_temple", icon: <Settings size={18} /> },
      ]
    },
    'Event Organizer': {
      title: 'Event Management',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'events', label: "Spiritual Events", path: "/vendor/dashboard/events_Organizer", icon: <Grid2x2 size={18} /> },
        { id: 'bookings', label: "Registrations", path: "/vendor/dashboard/bookings_Organizer", icon: <ClipboardList size={18} /> },
        { id: 'attendees', label: "Attendee List", path: "/vendor/dashboard/attendees_Organizer", icon: <Users size={18} /> },
        { id: 'wallet', label: "Wallet & Payments", path: "/vendor/dashboard/wallet_Organizer", icon: <Wallet size={18} /> },
        { id: 'analytics', label: "Event Analytics", path: "/vendor/dashboard/analytics_Organizer", icon: <BarChart3 size={18} /> },
        { id: 'settings', label: "Organizer Profile", path: "/vendor/dashboard/settings_Organizer", icon: <Settings size={18} /> },
      ]
    },
    'Spiritual Guide': {
      title: 'Mentorship Dashboard',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'sessions', label: "Guidance Sessions", path: "/vendor/dashboard/sessions", icon: <Users size={18} /> },
        { id: 'articles', label: "Articles & Wisdom", path: "/vendor/dashboard/articles", icon: <BookOpen size={18} /> },
        { id: 'followers', label: "My Followers", path: "/vendor/dashboard/followers", icon: <User size={18} /> },
        { id: 'wallet', label: "Earnings", path: "/vendor/dashboard/wallet", icon: <Wallet size={18} /> },
        { id: 'settings', label: "Mentor Profile", path: "/vendor/dashboard/settings", icon: <Settings size={18} /> },
      ]
    },
    'Spiritual Healer': {
      title: 'Healing Center',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'sessions', label: "Healing Sessions", path: "/vendor/dashboard/sessions", icon: <HeartPulse size={18} /> },
        { id: 'clients', label: "My Clients", path: "/vendor/dashboard/clients", icon: <User size={18} /> },
        { id: 'wallet', label: "Wallet", path: "/vendor/dashboard/wallet", icon: <Wallet size={18} /> },
        { id: 'settings', label: "Healer Profile", path: "/vendor/dashboard/settings", icon: <Settings size={18} /> },
      ]
    },
    'Vedic Scholar': {
      title: 'Scholar Dashboard',
      theme: SHARED_THEME,
      menu: [
        { id: 'dashboard', label: "Dashboard", path: "/vendor/dashboard", icon: <House size={18} /> },
        { id: 'articles', label: "Research Papers", path: "/vendor/dashboard/articles", icon: <FileChartLine size={18} /> },
        { id: 'requests', label: "Consultation Requests", path: "/vendor/dashboard/requests", icon: <MessageSquare size={18} /> },
        { id: 'publications', label: "My Publications", path: "/vendor/dashboard/publications", icon: <Award size={18} /> },
        { id: 'wallet', label: "Earnings", path: "/vendor/dashboard/wallet", icon: <Wallet size={18} /> },
        { id: 'settings', label: "Scholar Profile", path: "/vendor/dashboard/settings", icon: <Settings size={18} /> },
      ]
    }
  },

  // Resource Metadata - Tells Universal Manager how to display data for each page
  resources: {
    'services': { title: 'MY PUJA SERVICES', subtitle: 'Manage your spiritual offerings and service listings', buttonLabel: 'Add Service' },
    'bookings': { title: 'BOOKINGS MANAGEMENT', subtitle: 'Track and manage your upcoming spiritual appointments', buttonLabel: 'New Booking' },
    'calendar': { title: 'AVAILABILITY CALENDAR', subtitle: 'Set your working hours and manage your time slots', buttonLabel: 'Set Slots' },
    'wallet': { title: 'WALLET & EARNINGS', subtitle: 'Track your earnings and manage withdrawals', buttonLabel: 'Withdraw' },
    'reviews': { title: 'REVIEWS & RATINGS', subtitle: 'View customer feedback and maintain your reputation', buttonLabel: 'Respond' },
    'notifications': { title: 'MY NOTIFICATIONS', subtitle: 'Stay updated with latest activity and alerts', buttonLabel: 'Mark All Read' },
    'settings': { title: 'ACCOUNT SETTINGS', subtitle: 'Manage your profile and business information', buttonLabel: 'Update Profile' },
    'consultations': { title: 'ASTROLOGY CONSULTATIONS', subtitle: 'Manage your client horoscopes and sessions', buttonLabel: 'New Slot' },
    'reports': { title: 'KUNDLI REPORTS', subtitle: 'Manage and generate detailed astrological reports', buttonLabel: 'Generate New' },
    'chatCenter': { title: 'CLIENT CHAT CENTER', subtitle: 'Real-time communication with your clients', buttonLabel: 'New Chat' },
    'orders_puja': { title: 'PRODUCT ORDERS', subtitle: 'Manage your puja samagri sales and order status', buttonLabel: 'Create Order' },
    'products_puja': { title: 'STORE PRODUCTS', subtitle: 'Inventory and listing management for your store', buttonLabel: 'Add Product' },
    'pujaKits_puja': { title: 'CUSTOM PUJA KITS', subtitle: 'Create and manage specialized puja samagri kits', buttonLabel: 'Design Kit' },
    'inventory_puja': { title: 'INVENTORY STOCK', subtitle: 'Track your store stock levels and availability', buttonLabel: 'Add Stock' },
    'offers_puja': { title: 'MARKETING OFFERS', subtitle: 'Create discounts and promotional coupons', buttonLabel: 'Create Coupon' },
    'delivery_puja': { title: 'SHIPPING & DELIVERY', subtitle: 'Manage logistics and shipment tracking', buttonLabel: 'Track Shipments' },
    'sevas_temple': { title: 'TEMPLE SEVAS', subtitle: 'Manage temple rituals and special offerings', buttonLabel: 'Add Seva' },
    'bookings_temple': { title: 'SEVA BOOKINGS', subtitle: 'Manage devotee bookings for temple services', buttonLabel: 'New Booking' },
    'donations_temple': { title: 'DONATION RECORDS', subtitle: 'Track spiritual contributions and temple funds', buttonLabel: 'Add Record' },
    'events_temple': { title: 'TEMPLE EVENTS', subtitle: 'Schedule and manage upcoming temple festivals', buttonLabel: 'Schedule Event' },
    'staff_temple': { title: 'TEMPLE STAFF', subtitle: 'Manage temple priests and administrative staff', buttonLabel: 'Add Staff' },
    'wallet_temple': { title: 'TEMPLE ACCOUNTS', subtitle: 'Financial management for temple operations', buttonLabel: 'Manage Funds' },
    'settings_temple': { title: 'TEMPLE CONFIGURATION', subtitle: 'Manage temple profile and visitor information', buttonLabel: 'Update Info' },
    'events_Organizer': { title: 'SPIRITUAL EVENTS', subtitle: 'Manage and host spiritual gathering and events', buttonLabel: 'Host New Event' },
    'bookings_Organizer': { title: 'EVENT REGISTRATIONS', subtitle: 'Manage attendee registrations and tickets', buttonLabel: 'Add Attendee' },
    'attendees_Organizer': { title: 'EVENT ATTENDEES', subtitle: 'Track and manage your spiritual event guests', buttonLabel: 'Export List' },
    'analytics_Organizer': { title: 'EVENT PERFORMANCE', subtitle: 'Analyze event engagement and financial metrics', buttonLabel: 'View Reports' },
    'sessions': { title: 'GUIDANCE SESSIONS', subtitle: 'Manage your spiritual mentorship sessions', buttonLabel: 'New Session' },
    'articles': { title: 'WISDOM ARTICLES', subtitle: 'Share your spiritual knowledge and teachings', buttonLabel: 'Write Article' },
    'followers': { title: 'MY FOLLOWERS', subtitle: 'Engage with your spiritual community', buttonLabel: 'Broadcast' },
    'clients': { title: 'MY HEALING CLIENTS', subtitle: 'Track and manage your healing session clients', buttonLabel: 'Add Client' },
    'requests': { title: 'SCHOLAR REQUESTS', subtitle: 'Manage consultation and research requests', buttonLabel: 'Respond' },
    'publications': { title: 'MY PUBLICATIONS', subtitle: 'Manage your spiritual research and papers', buttonLabel: 'Add Paper' }
  }
};
