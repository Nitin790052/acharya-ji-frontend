import React from 'react'
import VendorPageHeader from '../../../components/VendorPageHeader';

const HealerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="SPIRITUAL HEALER DASHBOARD" 
        subtitle="Manage your healing sessions and client records" 
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Welcome to your dashboard</h2>
      </div>
    </div>
  )
}

export default HealerDashboard

