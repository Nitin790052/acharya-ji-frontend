import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import AllUsers from "./pages/userManagment/AllUsers";
import NewRegistrations from "./pages/userManagment/NewRegistrations";
import UserDetailPage from "./pages/userManagment/UserDetailPage";
import ActiveUsers from "./pages/userManagment/ActiveUsers";
import BlockedUsers from "./pages/userManagment/BlockedUsers";
import PagePlaceholder from "./pages/PagePlaceholder";
import CategoryManager from "./pages/vendors/CategoryManager";
import NavbarManager from "./pages/content/NavbarManager";
import CarouselManager from "./pages/content/CarouselManager";
import AboutUsManager from "./pages/content/AboutUsManager";
import ServiceManager from "./pages/content/ServiceManager";
import PopularPujaManager from "./pages/content/PopularPujaManager";
import AstrologerManager from "./pages/content/AstrologerManager";
import KundliManager from "./pages/content/KundliManager";
import KundliPageManager from "./pages/content/KundliPageManager";
import VastuManager from "./pages/content/VastuManager";
import VastuPageManager from "./pages/content/VastuPageManager";
import TestimonialManager from "./pages/content/TestimonialManager";
import BlogManager from "./pages/content/BlogManager";
import AppDownloadManager from "./pages/content/AppDownloadManager";
import FAQManager from "./pages/content/FAQManager";
import FooterManager from "./pages/content/FooterManager";
import AboutPageManager from "./pages/content/AboutPageManager";
import PujaOfferingManager from "./pages/content/PujaOfferingManager";
import BookPujaManager from "./pages/content/BookPujaManager";
import BookPujaContentManager from "./pages/content/BookPujaContentManager";
import CareerContentManager from "./pages/content/CareerContentManager";
import MediaManager from "./pages/content/MediaManager";
import GalleryManager from "./pages/content/GalleryManager";
import ContactManager from "./pages/content/ContactManager";
import SEOManager from "./pages/content/SEOManager";
import AstrologyContentManager from "./pages/content/AstrologyContentManager";
import HealingPageManager from "./pages/content/HealingPageManager";
import DynamicShopManager from "./pages/content/DynamicShopManager";
import CourseManager from "./pages/content/CourseManager";
import UniversalPageManager from "./pages/content/UniversalPageManager";

function AdminApp() {

  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route index element={<Login />} />

        {/* Protected Routes - Layout wraps all dashboard pages */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          {/* Dashboard - Default route */}
          <Route index element={<Dashboard />} />

          {/* ... existing routes ... */}
          <Route path="users/all" element={<AllUsers />} />
          <Route path="users/new-registrations" element={<NewRegistrations />} />
          <Route path="users/detail" element={<UserDetailPage />} />
          <Route path="users/active" element={<ActiveUsers />} />
          <Route path="users/blocked" element={<BlockedUsers />} />
          <Route path="vendors/category/:categoryType" element={<CategoryManager />} />
          <Route path="vendors/all" element={<PagePlaceholder title="All Vendors" />} />
          <Route path="vendors/pending" element={<PagePlaceholder title="Pending Approvals" />} />
          <Route path="vendors/approved" element={<PagePlaceholder title="Approved Vendors" />} />
          <Route path="vendors/earnings" element={<PagePlaceholder title="Vendor Earnings" />} />
          <Route path="content/navbar" element={<NavbarManager />} />
          <Route path="content/blogs" element={<BlogManager />} />
          <Route path="content/testimonials" element={<TestimonialManager />} />
          <Route path="content/app-download" element={<AppDownloadManager />} />
          <Route path="content/carousels" element={<CarouselManager />} />
          <Route path="content/about" element={<AboutPageManager />} />
          <Route path="content/about-us" element={<AboutUsManager />} />
          <Route path="content/services" element={<ServiceManager />} />
          <Route path="content/puja-offerings" element={<PujaOfferingManager />} />
          <Route path="content/book-puja" element={<BookPujaManager />} />
          <Route path="content/book-puja-content" element={<BookPujaContentManager />} />
          <Route path="content/popular-pujas" element={<PopularPujaManager />} />
          <Route path="content/astrologers" element={<AstrologerManager />} />
          <Route path="content/kundli" element={<KundliManager />} />
          <Route path="content/kundli-pages" element={<KundliPageManager />} />
          <Route path="content/vastu" element={<VastuManager />} />
          <Route path="content/vastu-pages" element={<VastuPageManager />} />
          <Route path="content/astrology-pages" element={<AstrologyContentManager />} />
          <Route path="content/healing-pages" element={<HealingPageManager />} />
          <Route path="content/shop/:shopType" element={<DynamicShopManager />} />
          <Route path="content/learn/:type" element={<CourseManager />} />
          <Route path="content/universal" element={<UniversalPageManager />} />

          <Route path="content/faq" element={<FAQManager />} />
          <Route path="content/footer" element={<FooterManager />} />
          <Route path="content/career" element={<CareerContentManager />} />
          <Route path="content/media" element={<MediaManager />} />
          <Route path="content/gallery" element={<GalleryManager />} />
          <Route path="content/contact" element={<ContactManager />} />
          <Route path="seo/settings" element={<SEOManager />} />
          <Route path="seo/meta" element={<PagePlaceholder title="Meta Tags Management" />} />
          <Route path="admin/staff" element={<PagePlaceholder title="Staff Management" />} />
          <Route path="admin/settings" element={<PagePlaceholder title="General Settings" />} />
          <Route path="admin/password" element={<PagePlaceholder title="Change Password" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AdminApp;