import React from 'react'
import VendorPageHeader from '../../../components/VendorPageHeader';


const SguideDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="SPIRITUAL GUIDE DASHBOARD" 
        subtitle="Manage your spiritual guidance sessions and followers" 
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">Welcome to your dashboard</h2>
      </div>
    </div>
  )
}

export default SguideDashboard

