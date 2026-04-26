import React, { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import FloatingButtons from "./components/FloatingButtons";
import SocialSidebar from "./components/home/SocialSidebar";
import SupportSpeedDial from "./components/common/SupportSpeedDial";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ AUTH PROVIDERS
import { AuthProvider as VendorAuthProvider } from "@/app/vendor/auth/AuthContext";
import { AuthProvider as UserAuthProvider } from "./app/user/auth/AuthContext";

// ✅ Route Guards & Routers
import VendorRouteGuard from "./app/vendor/routes/VendorRouteGuard";
import VendorDashboardRouter from "./app/vendor/routes/VendorDashboardRouter";
import ProtectedRoute from "./app/user/ProtectedRoute";
// ✅ Lazy Loading Pages for Performance
const Index = lazy(() => import("./pages/Index"));
const PujaEssentials = lazy(() => import("./pages/samagri/PujaEssentials"));
const PujaSamagri = lazy(() => import("./pages/samagri/ShopPujaSamagri"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Gallery = lazy(() => import("./pages/Gallery"));
const TwoBidders = lazy(() => import("./pages/TwoBidders"));
const AboutUs = lazy(() => import("./pages/About"));
const Media = lazy(() => import("./pages/Media"));
const PujaServices = lazy(() => import("./pages/pujaServices/PujaServices"));
const BookPuja = lazy(() => import("./pages/pujaServices/BookPuja"));
const Career = lazy(() => import("./pages/Career"));
const GrihaPraveshPuja = lazy(() => import("./pages/pujaServices/GirhaPraveshPuja"));
const Login = lazy(() => import("../src/app/vendor/login/Login"));
const VendorRegister = lazy(() => import("../src/app/vendor/pages/VendorRegister"));
const PujaDetails = lazy(() => import("./pages/PujaDetails"));
const UniversalPage = lazy(() => import("./pages/UniversalPage"));
const CartCheckout = lazy(() => import("./pages/CartCheckout"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));

// Vendor Pages
const UniversalResourceManager = lazy(() => import("./app/vendor/pages/vendors/common/UniversalResourceManager"));
const MyPujaServices = lazy(() => import("../src/app/vendor/pages/vendors/pandit/MyPujaServices"));

const Bookings = lazy(() => import("../src/app/vendor/pages/vendors/pandit/Bookings"));
const AvailabilityCalendar = lazy(() => import("../src/app/vendor/pages/vendors/pandit/AvailabilityCalender"));
const WalletEarning = lazy(() => import("../src/app/vendor/pages/vendors/pandit/WalletEarning"));
const ReviewsRating = lazy(() => import("../src/app/vendor/pages/vendors/pandit/ReviewsRating"));
const Notifications = lazy(() => import("../src/app/vendor/pages/vendors/pandit/Notifications"));
const ProfileKyc = lazy(() => import("../src/app/vendor/pages/vendors/pandit/ProfileKyc"));
const MyConsultations = lazy(() => import("./app/vendor/pages/vendors/astrologer/MyConsultations"));
const ReportsKundli = lazy(() => import("./app/vendor/pages/vendors/astrologer/ReportsKundli"));
const GeneratorKundliReports = lazy(() => import("./app/vendor/pages/vendors/astrologer/GenerateKundliReports"));
const AvailabilitySchedule = lazy(() => import("./app/vendor/pages/vendors/astrologer/AvailabilitySchedule"));
const WalletEarnings = lazy(() => import("./app/vendor/pages/vendors/astrologer/WalletEarnings"));
const ReviewsRatings = lazy(() => import("./app/vendor/pages/vendors/astrologer/ReviewsRatings"));
const ChatCenter = lazy(() => import("./app/vendor/pages/vendors/astrologer/ChatCenter"));
const ProfileBranding = lazy(() => import("./app/vendor/pages/vendors/astrologer/ProfileBranding"));
const AstroNotifications = lazy(() => import("./app/vendor/pages/vendors/astrologer/AstroNotifications"));
const Orders = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/Orders"));
const Products = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/Products"));
const PujaKits = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/Pujakits"));
const Inventory = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/Inventory"));
const OffersCoupons = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/OffersCoupons"));
const ShippingDelivery = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/ShippingDelivery"));
const ReviewsPuja = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/ReviewsPuja"));
const WalletPuja = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/WalletPuja"));
const NotificationPuja = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/Notifications"));
const StoreProfile = lazy(() => import("./app/vendor/pages/vendors/poojaSamagri/StoreProfile"));
const SevasPujas = lazy(() => import("./app/vendor/pages/vendors/templeService/SevasPujas"));
const BookingsTemple = lazy(() => import("./app/vendor/pages/vendors/templeService/Bookings"));
const Donations = lazy(() => import("./app/vendor/pages/vendors/templeService/Donations"));
const EventsTemple = lazy(() => import("./app/vendor/pages/vendors/templeService/EventsTemple"));
const StaffManagement = lazy(() => import("./app/vendor/pages/vendors/templeService/StaffManagement"));
const WalletTemple = lazy(() => import("./app/vendor/pages/vendors/templeService/WalletTemple"));
const SettingsTemple = lazy(() => import("./app/vendor/pages/vendors/templeService/SettingsTemple"));
const OrganizerEvents = lazy(() => import("./app/vendor/pages/vendors/eventOrganizer/OrganizerEvents"));
const Bookings_Organizer = lazy(() => import("./app/vendor/pages/vendors/eventOrganizer/Bookings_Organizer"));
const Attendees_Organizer = lazy(() => import("./app/vendor/pages/vendors/eventOrganizer/Attendees_Organizer"));
const WalletPayments_Organizer = lazy(() => import("./app/vendor/pages/vendors/eventOrganizer/WalletPayments_Organizer"));
const Analytics_Oraganizer = lazy(() => import("./app/vendor/pages/vendors/eventOrganizer/Analytics_Organizer"));
const ProfileSettings_Organizer = lazy(() => import("./app/vendor/pages/vendors/eventOrganizer/ProfileSettings_Organizer"));

// User Pages
const UserLogin = lazy(() => import("./app/user/pages/UserLogin"));
const RegistrationForm = lazy(() => import("./app/user/pages/RegistrationForm"));
const UserDashboard = lazy(() => import("./app/user/pages/UserDashboard"));
const UserOrders = lazy(() => import("./app/user/pages/orders/UserOrders"));
const UserProfile = lazy(() => import("./app/user/pages/headerProfile/UserProfile"));
const UserHistory = lazy(() => import("./app/user/pages/UserHistory"));
const UserPayments = lazy(() => import("./app/user/pages/UserPayments"));
const PendingOrders = lazy(() => import("./app/user/pages/orders/PendingOrders"));
const ProcessingOrders = lazy(() => import("./app/user/pages/orders/ProcessingOrders"));
const CancelledOrders = lazy(() => import("./app/user/pages/orders/CancelledOrders"));
const CompletedOrders = lazy(() => import("./app/user/pages/orders/CompletedOrders"));
const Invoice = lazy(() => import("./app/user/pages/invoice/Invoice"));
const ViewInvoice = lazy(() => import("./app/user/components/ViewInvoice"));

// Service Pages
const TalkToAstrologer = lazy(() => import("./pages/astrologyServices/TalkToAstrologer"));
const AstrologyServicePage = lazy(() => import("./pages/astrologyServices/AstrologyServicePage"));
const CommonHealingPage = lazy(() => import("./pages/healing/CommonHealingPage"));
const VastuConsultation = lazy(() => import("./pages/vastu/VastuConsultation"));
const HomeOfficeVastu = lazy(() => import("./pages/vastu/HomeOfficeVastu"));
const ShopPujaSamagri = lazy(() => import("./pages/samagri/ShopPujaSamagri"));
const AstrologyCourses = lazy(() => import("./pages/learn/AstrologyCourses"));
const CourseDetail = lazy(() => import("./pages/learn/CourseDetail"));
const CommonLearningPage = lazy(() => import("./pages/learn/CommonLearningPage"));
const CommonKundliPage = lazy(() => import("./pages/kundli/CommonKundliPage"));
const CommonVastuPage = lazy(() => import("./pages/vastu/CommonVastuPage"));

// Admin & Others
const AdminApp = lazy(() => import("./app/Admin_panel_acharya/src/App"));
const NotFound = lazy(() => import("./pages/NotFound"));
const VendorDashboardLayout = lazy(() => import("../src/app/vendor/layout/VendorDashboardLayout"));
const UserDashboardLayout = lazy(() => import("../src/app/user/layout/UserDashboardLayout"));


const queryClient = new QueryClient();

const GlobalFloatingButtons = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isDashboard = location.pathname.includes("/dashboard") ||
        location.pathname.startsWith("/user") ||
        location.pathname.startsWith("/vendor") ||
        location.pathname.startsWith("/admin-acharya") ||
        location.pathname === "/login" ||
        location.pathname === "/vendorRegister";

    if (isDashboard) return null;

    return (
        <>
            <FloatingButtons isHomePage={isHomePage} />
            <SocialSidebar isHomePage={isHomePage} />
            <SupportSpeedDial isHomePage={isHomePage} />
        </>
    );
};

const App = () => (
    <>
        <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
        />
        <QueryClientProvider client={queryClient}>
            <ScrollToTop />
            <VendorAuthProvider>
                <UserAuthProvider>
                    <GlobalFloatingButtons />
                    <CartProvider>
                        <TooltipProvider>
                            <Suspense fallback={
                                <div className="flex items-center justify-center min-h-screen bg-orange-50/30">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                                        <div className="mt-4 text-orange-800 font-medium">Loading...</div>
                                    </div>
                                </div>
                            }>
                                <Routes>
                                    <Route path="/" element={<Index />} />
                                    <Route path="/about" element={<AboutUs />} />
                                    <Route path="/pujaServices" element={<PujaServices />} />
                                    <Route path="/pujaServices/bookPuja" element={<BookPuja />} />
                                    <Route path="/pujaServices/girhaPraveshPuja" element={<GrihaPraveshPuja />} />
                                    <Route path="/puja/:slug" element={<PujaDetails />} />
                                    <Route path="/samagri/essentials" element={<PujaSamagri />} />
                                    <Route path="/samagri/idols" element={<PujaSamagri />} />
                                    <Route path="/samagri/hawan" element={<PujaSamagri />} />
                                    <Route path="/products" element={<PujaSamagri />} />
                                    <Route path="/puja-samagri" element={<PujaSamagri />} />
                                    <Route path="/products/prasad" element={<PujaSamagri />} />
                                    <Route path="/products/kits" element={<PujaSamagri />} />
                                    <Route path="/products/festival" element={<PujaSamagri />} />
                                    <Route path="/bidders" element={<TwoBidders />} />
                                    <Route path="/career" element={<Career />} />
                                    <Route path="/media" element={<Media />} />
                                    <Route path="/gallery" element={<Gallery />} />
                                    <Route path="/blog" element={<Blog />} />
                                    <Route path="/blog/:id" element={<Blog />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/astrologer" element={<TalkToAstrologer />} />
                                    <Route path="/astrologer/:id" element={<TalkToAstrologer />} />
                                    <Route path="/career-astrology" element={<AstrologyServicePage slug="career-astrology" />} />
                                    <Route path="/marriage-astrology" element={<AstrologyServicePage slug="marriage-astrology" />} />
                                    <Route path="/business-astrology" element={<AstrologyServicePage slug="business-astrology" />} />
                                    <Route path="/health-astrology" element={<AstrologyServicePage slug="health-astrology" />} />
                                    <Route path="/numerology" element={<AstrologyServicePage slug="numerology" />} />
                                    <Route path="/tarot-reading" element={<AstrologyServicePage slug="tarot-reading" />} />
                                    <Route path="/palmistry" element={<AstrologyServicePage slug="palmistry" />} />
                                    <Route path="/gemstone-suggestion" element={<AstrologyServicePage slug="gemstone-suggestion" />} />
                                    <Route path="/kundli" element={<CommonKundliPage />} />
                                    <Route path="/kundli/:slug" element={<CommonKundliPage />} />
                                    <Route path="/healing/:slug" element={<CommonHealingPage />} />
                                    <Route path="/reiki-healing" element={<CommonHealingPage />} />
                                    <Route path="/crystal-healing" element={<CommonHealingPage />} />
                                    <Route path="/vastu/:slug" element={<CommonVastuPage />} />
                                    <Route path="/vastu-consultation" element={<CommonVastuPage slugOverride="vastu-consultation" />} />
                                    <Route path="/home-office-vastu" element={<CommonVastuPage slugOverride="home-office-vastu" />} />
                                    <Route path="/shop/:shopType" element={<ShopPujaSamagri />} />
                                    <Route path="/shop-puja-samagri" element={<ShopPujaSamagri shopTypeOverride="puja-samagri" />} />
                                    <Route path="/gemstones" element={<ShopPujaSamagri shopTypeOverride="gemstones" />} />
                                    <Route path="/yantra" element={<ShopPujaSamagri shopTypeOverride="yantra" />} />

                                    <Route path="/learn/astrology" element={<CommonLearningPage slug="astrology" />} />
                                    <Route path="/learn/puja-vidhi" element={<CommonLearningPage slug="puja-vidhi" />} />
                                    <Route path="/learn/mantra" element={<CommonLearningPage slug="mantra" />} />
                                    <Route path="/learn/:slug" element={<CommonLearningPage />} />
                                    <Route path="/learn/:slug/:itemSlug" element={<CourseDetail />} />
                                    <Route path="/p/:slug" element={<UniversalPage />} />
                                    <Route path="/cart" element={<CartCheckout />} />
                                    <Route path="/payment-success" element={<PaymentSuccess />} />

                                    <Route path="/user_login" element={<UserLogin />} />
                                    <Route path="/user_login/registeration" element={<RegistrationForm />} />

                                    <Route
                                        path="/user/dashboard"
                                        element={
                                            <ProtectedRoute>
                                                <UserDashboardLayout />
                                            </ProtectedRoute>
                                        }
                                    >
                                        <Route index element={<UserDashboard />} />
                                        <Route path="order-user/order-all" element={<UserOrders />} />
                                        <Route path="order-user/order-pendings" element={<PendingOrders />} />
                                        <Route path="order-user/order-processing" element={<ProcessingOrders />} />
                                        <Route path="order-user/order-cancelled" element={<CancelledOrders />} />
                                        <Route path="order-user/order-completed" element={<CompletedOrders />} />
                                        <Route path="profile-user" element={<UserProfile />} />
                                        <Route path="history-user" element={<UserHistory />} />
                                        <Route path="payments-user" element={<UserPayments />} />
                                        <Route path="invoice/:id" element={<Invoice />} />
                                        <Route path="modal/invoice/:id" element={<ViewInvoice />} />
                                    </Route>

                                    <Route path="/login" element={<Login />} />
                                    <Route path="/vendorRegister" element={<VendorRegister />} />

                                    <Route
                                        path="/vendor/dashboard"
                                        element={
                                            <VendorRouteGuard>
                                                <VendorDashboardLayout />
                                            </VendorRouteGuard>
                                        }
                                    >
                                        <Route index element={<VendorDashboardRouter />} />
                                        
                                        {/* Dynamic Resource Management - Handles ALL listing pages */}
                                        <Route path="manage/:resourceType" element={<UniversalResourceManager />} />
                                        
                                        {/* Standard Mappings for Sidebar Compatibility */}
                                        <Route path="services" element={<UniversalResourceManager overrideType="services" />} />
                                        <Route path="bookings" element={<UniversalResourceManager overrideType="bookings" />} />
                                        <Route path="orders_puja" element={<UniversalResourceManager overrideType="orders_puja" />} />
                                        <Route path="products_puja" element={<UniversalResourceManager overrideType="products_puja" />} />
                                        <Route path="inventory_puja" element={<UniversalResourceManager overrideType="inventory_puja" />} />
                                        <Route path="pujaKits_puja" element={<UniversalResourceManager overrideType="pujaKits_puja" />} />
                                        <Route path="offers_puja" element={<UniversalResourceManager overrideType="offers_puja" />} />
                                        <Route path="delivery_puja" element={<UniversalResourceManager overrideType="delivery_puja" />} />
                                        <Route path="settlement_puja" element={<UniversalResourceManager overrideType="settlement_puja" />} />
                                        <Route path="ratings_puja" element={<UniversalResourceManager overrideType="ratings_puja" />} />
                                        <Route path="notifications_puja" element={<UniversalResourceManager overrideType="notifications_puja" />} />
                                        <Route path="settings_puja" element={<UniversalResourceManager overrideType="settings_puja" />} />

                                        {/* Temple & Others */}
                                        <Route path="sevas_temple" element={<SevasPujas />} />
                                        <Route path="bookings_temple" element={<BookingsTemple />} />
                                        <Route path="donations_temple" element={<Donations />} />
                                        <Route path="events_temple" element={<EventsTemple />} />
                                        <Route path="staff_temple" element={<StaffManagement />} />
                                        <Route path="wallet_temple" element={<WalletTemple />} />
                                        <Route path="settings_temple" element={<SettingsTemple />} />

                                        {/* Event Organizer */}
                                        <Route path="events_Organizer" element={<UniversalResourceManager overrideType="events_Organizer" />} />
                                        <Route path="bookings_Organizer" element={<UniversalResourceManager overrideType="bookings_Organizer" />} />
                                        <Route path="attendees_Organizer" element={<UniversalResourceManager overrideType="attendees_Organizer" />} />
                                        <Route path="wallet_Organizer" element={<UniversalResourceManager overrideType="wallet_Organizer" />} />
                                        <Route path="analytics_Organizer" element={<UniversalResourceManager overrideType="analytics_Organizer" />} />
                                        <Route path="settings_Organizer" element={<UniversalResourceManager overrideType="settings_Organizer" />} />

                                        {/* Spiritual Healer & Guide */}
                                        <Route path="sessions" element={<UniversalResourceManager overrideType="sessions" />} />
                                        <Route path="articles" element={<UniversalResourceManager overrideType="articles" />} />
                                        <Route path="followers" element={<UniversalResourceManager overrideType="followers" />} />
                                        <Route path="clients" element={<UniversalResourceManager overrideType="clients" />} />
                                        <Route path="requests" element={<UniversalResourceManager overrideType="requests" />} />
                                        <Route path="publications" element={<UniversalResourceManager overrideType="publications" />} />

                                        {/* Core Pages (Still using specific components) */}
                                        <Route path="calendar" element={<AvailabilityCalendar />} />
                                        <Route path="wallet" element={<WalletEarning />} />
                                        <Route path="reviews" element={<ReviewsRating />} />
                                        <Route path="notifications" element={<Notifications />} />
                                        <Route path="settings" element={<ProfileKyc />} />
                                        <Route path="chatCenter" element={<ChatCenter />} />
                                        <Route path="profile" element={<ProfileBranding />} />
                                        <Route path="reports" element={<ReportsKundli />} />
                                        <Route path="generate" element={<GeneratorKundliReports />} />
                                        <Route path="availability" element={<AvailabilitySchedule />} />
                                        <Route path="consultations" element={<MyConsultations />} />
                                        <Route path="astroNotifications" element={<AstroNotifications />} />
                                        <Route path="astroReviews" element={<ReviewsRatings />} />
                                        <Route path="astroWallet" element={<WalletEarnings />} />
                                    </Route>

                                    <Route path="/admin-acharya/*" element={<AdminApp />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </TooltipProvider>
                    </CartProvider>
                </UserAuthProvider>
            </VendorAuthProvider>
        </QueryClientProvider>
    </>
);

export default App;
