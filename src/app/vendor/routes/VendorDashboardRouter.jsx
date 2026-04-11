import { useAuth } from "@/app/vendor/auth/AuthContext";

// Dashboards
import PanditDashboard from "../../vendor/pages/vendors/pandit/PanditDashboard";
import AstrologerDashboard from "../../vendor/pages/vendors/astrologer/AstrologerDashboard";
import SellerDashboard from "../../vendor/pages/vendors/poojaSamagri/SellerDashboard";
import TempleDashboard from "../../vendor/pages/vendors/templeService/TempleDashboard";
import EventDashboard from "../../vendor/pages/vendors/eventOrganizer/EventDashboard";
import HealerDashboard from "../../vendor/pages/vendors/spiritualHealer/HealerDashboard";
import VedicDashboard from "../../vendor/pages/vendors/vedicScholar/VedicDashboard";
import SguideDashboard from "../../vendor/pages/vendors/spiritualGuide/SguideDashboard";
import CommonDashboard from "../../vendor/pages/vendors/common/CommonDashboard";

const VendorDashboardRouter = () => {
  const { user, loading } = useAuth();

  // wait for auth restore
  if (loading) return null;

  if (!user) return null;

  const type = user.vendorType;

  switch (type) {
    case "Pandit":
      return <PanditDashboard />;

    case "Astrologer":
      return <AstrologerDashboard />;

    case "Puja Samagri Seller":
      return <SellerDashboard />;

    case "Temple Services":
      return <TempleDashboard />;

    case "Event Organizer":
      return <EventDashboard />;

    case "Spiritual Guide":
      return <SguideDashboard />;

    case "Spiritual Healer":
      return <HealerDashboard />;

    case "Vedic Scholar":
      return <VedicDashboard />;

    default:
      return <CommonDashboard />;
  }
};

export default VendorDashboardRouter;
