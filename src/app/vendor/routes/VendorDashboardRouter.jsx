import React from 'react';
import PremiumCommonDashboard from "../pages/vendors/common/PremiumCommonDashboard";

/**
 * VENDOR DASHBOARD ROUTER
 * Now uses the PremiumCommonDashboard for all categories, 
 * which dynamically adapts its UI based on the user's vendor type.
 */
const VendorDashboardRouter = () => {
  return <PremiumCommonDashboard />;
};

export default VendorDashboardRouter;
