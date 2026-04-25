import React, { useState } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';

import {
  // Core Icons
  Building2,
  Clock,
  Landmark,
  FileText,
  Settings as SettingsIcon,
  Bell,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  Upload,
  Download,
  Edit3,
  PlusCircle,
  Trash2,
  CreditCard,
  IndianRupee,
  Sun,
  Moon,
  CalendarDays,
  UserCircle,
  Shield,
  Award,
  Heart,
  Gift,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Link,
  Copy,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

const SettingsTemple = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('temple');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');

  // ============ UNREAD COUNT ============
  const unreadCount = 2;

  // ============ TAB CONFIGURATION ============
  const tabs = [
    { id: 'temple', label: 'Temple Info', icon: Building2 },
    { id: 'timings', label: 'Timings', icon: Clock },
    { id: 'bank', label: 'Bank Details', icon: Landmark },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  // ============ TEMPLE INFO DATA ============
  const [templeInfo, setTempleInfo] = useState({
    name: 'Shri Ram Mandir',
    subtitle: 'श्री राम मंदिर',
    established: '1952',
    registrationNo: 'TRUST/1952/00123',
    pan: 'ABCDE1234F',
    tan: 'MUMT12345A',
    gstin: '27ABCDE1234F1Z5',
    address: {
      line1: '12, Temple Road',
      line2: 'Juhu Scheme',
      city: 'Mumbai',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      pincode: '400049',
      country: 'India'
    },
    contact: {
      phone: '+91 98765 43210',
      alternatePhone: '+91 98765 43211',
      email: 'contact@rammandir.com',
      alternateEmail: 'admin@rammandir.com',
      website: 'www.rammandir.com'
    },
    social: {
      facebook: 'facebook.com/rammandir',
      twitter: 'twitter.com/rammandir',
      instagram: 'instagram.com/rammandir',
      youtube: 'youtube.com/rammandir'
    },
    about: 'Shri Ram Mandir is a historic temple dedicated to Lord Rama, established in 1952. The temple is known for its beautiful architecture, peaceful atmosphere, and regular spiritual programs. We serve thousands of devotees daily and conduct various religious and cultural events throughout the year.',
    facilities: ['Parking', 'Prasadam', 'Book Shop', 'Shoe Stand', 'Drinking Water', 'Wheelchair Access'],
    logo: null,
    coverPhoto: null,
    read: false
  });

  // ============ TIMINGS DATA ============
  const [timings, setTimings] = useState({
    temple: {
      monday: { morning: '05:30 AM - 12:00 PM', evening: '04:00 PM - 09:00 PM', closed: false },
      tuesday: { morning: '05:30 AM - 12:00 PM', evening: '04:00 PM - 09:00 PM', closed: false },
      wednesday: { morning: '05:30 AM - 12:00 PM', evening: '04:00 PM - 09:00 PM', closed: false },
      thursday: { morning: '05:30 AM - 12:00 PM', evening: '04:00 PM - 09:00 PM', closed: false },
      friday: { morning: '05:30 AM - 12:00 PM', evening: '04:00 PM - 09:00 PM', closed: false },
      saturday: { morning: '05:00 AM - 01:00 PM', evening: '03:00 PM - 10:00 PM', closed: false },
      sunday: { morning: '05:00 AM - 01:00 PM', evening: '03:00 PM - 10:00 PM', closed: false },
      holidays: 'Open on all major festivals. Closed on Diwali day.'
    },
    aarti: [
      { id: 1, name: 'Mangala Aarti', time: '05:30 AM', duration: '30 mins', description: 'Morning awakening aarti', active: true },
      { id: 2, name: 'Shringar Aarti', time: '08:30 AM', duration: '30 mins', description: 'Decorating the deity', active: true },
      { id: 3, name: 'Rajbhog Aarti', time: '12:00 PM', duration: '30 mins', description: 'Midday offering', active: true },
      { id: 4, name: 'Sandhya Aarti', time: '07:00 PM', duration: '30 mins', description: 'Evening aarti', active: true },
      { id: 5, name: 'Shayan Aarti', time: '08:30 PM', duration: '30 mins', description: 'Night bedtime aarti', active: true }
    ],
    specialTimings: [
      { id: 1, name: 'Mahashivratri', date: '26 Feb 2026', timings: '04:00 AM - 11:00 PM', description: 'Special puja and abhishek' },
      { id: 2, name: 'Ram Navami', date: '06 Apr 2026', timings: '04:00 AM - 11:00 PM', description: 'Birth celebration of Lord Rama' },
      { id: 3, name: 'Hanuman Jayanti', date: '12 Apr 2026', timings: '04:00 AM - 10:00 PM', description: 'Birth celebration of Lord Hanuman' }
    ],
    read: false
  });

  // ============ BANK DETAILS DATA ============
  const [bankDetails, setBankDetails] = useState({
    primary: {
      id: 1,
      bankName: 'ICICI Bank',
      branch: 'Juhu Branch, Mumbai',
      accountName: 'Shri Ram Mandir Trust',
      accountNumber: '123456789012',
      maskedAccount: 'XXXX XXXX 9012',
      ifsc: 'ICIC001234',
      micr: '400229012',
      accountType: 'Current Account',
      upiId: 'rammandir@icici',
      swiftCode: 'ICICINBBXXX',
      verified: true,
      isPrimary: true
    },
    secondary: {
      id: 2,
      bankName: 'State Bank of India',
      branch: 'Juhu Branch, Mumbai',
      accountName: 'Shri Ram Mandir Donation',
      accountNumber: '12345678901',
      maskedAccount: 'XXXX XXXX 8901',
      ifsc: 'SBIN001234',
      micr: '400002012',
      accountType: 'Savings Account',
      upiId: 'rammandir@sbi',
      swiftCode: 'SBININBBXXX',
      verified: false,
      isPrimary: false
    },
    read: false
  });

  // ============ DOCUMENTS DATA ============
  const [documents, setDocuments] = useState({
    trust: [
      { id: 1, name: 'Trust Registration Certificate', number: 'TRUST/1952/00123', issueDate: '15 Jan 1952', expiryDate: 'Lifetime', status: 'verified', file: 'trust_certificate.pdf', size: '245 KB', uploadedOn: '15 Jan 1952' },
      { id: 2, name: 'Trust Deed', number: 'DEED/1952/0456', issueDate: '15 Jan 1952', expiryDate: 'Lifetime', status: 'verified', file: 'trust_deed.pdf', size: '512 KB', uploadedOn: '15 Jan 1952' },
      { id: 3, name: '12A Registration', number: '12A/ABC/1952', issueDate: '20 Mar 1952', expiryDate: 'Lifetime', status: 'verified', file: '12a_certificate.pdf', size: '189 KB', uploadedOn: '20 Mar 1952' },
      { id: 4, name: '80G Registration', number: '80G/XYZ/1952', issueDate: '20 Mar 1952', expiryDate: '31 Mar 2026', status: 'verified', file: '80g_certificate.pdf', size: '201 KB', uploadedOn: '20 Mar 1952' }
    ],
    property: [
      { id: 1, name: 'Property Tax Receipt', number: 'PT-2025-00123', issueDate: '15 Dec 2025', expiryDate: '31 Dec 2026', status: 'verified', file: 'property_tax_2025.pdf', size: '156 KB', uploadedOn: '15 Dec 2025' },
      { id: 2, name: 'Land Ownership Document', number: 'LAND/1952/0789', issueDate: '15 Jan 1952', expiryDate: 'Lifetime', status: 'verified', file: 'ownership.pdf', size: '1.2 MB', uploadedOn: '15 Jan 1952' }
    ],
    financial: [
      { id: 1, name: 'PAN Card', number: 'ABCDE1234F', issueDate: '10 Feb 2020', expiryDate: 'Lifetime', status: 'verified', file: 'pan_card.pdf', size: '98 KB', uploadedOn: '10 Feb 2020' },
      { id: 2, name: 'TAN Card', number: 'MUMT12345A', issueDate: '15 Mar 2020', expiryDate: 'Lifetime', status: 'verified', file: 'tan_card.pdf', size: '87 KB', uploadedOn: '15 Mar 2020' },
      { id: 3, name: 'GST Registration', number: '27ABCDE1234F1Z5', issueDate: '01 Jul 2017', expiryDate: 'Lifetime', status: 'verified', file: 'gst_certificate.pdf', size: '234 KB', uploadedOn: '01 Jul 2017' }
    ],
    read: false
  });

  // ============ PREFERENCES DATA ============
  const [preferences, setPreferences] = useState({
    notifications: {
      email: {
        newBooking: true,
        bookingReminder: true,
        newDonation: true,
        donationReceipt: true,
        eventReminder: true,
        lowStock: true,
        staffUpdates: false,
        newsletter: false
      },
      sms: {
        newBooking: true,
        bookingReminder: false,
        newDonation: true,
        donationReceipt: true,
        eventReminder: false,
        lowStock: true,
        staffUpdates: false
      },
      push: {
        newBooking: true,
        bookingReminder: true,
        newDonation: true,
        donationReceipt: false,
        eventReminder: true,
        lowStock: true,
        staffUpdates: true
      }
    },
    display: {
      theme: 'light',
      language: 'English',
      dateFormat: 'DD MMM YYYY',
      timeFormat: '12h',
      currency: 'INR',
      itemsPerPage: 20,
      dashboardLayout: 'compact',
      showRecentActivity: true,
      showStatsCards: true
    },
    booking: {
      autoConfirm: false,
      maxBookingsPerDay: 100,
      advanceBookingDays: 30,
      cancellationWindow: 24,
      refundPercentage: 90,
      allowSameDayBooking: true,
      requireDevoteeDetails: true,
      requirePanForHighValue: true,
      panThresholdAmount: 5000
    },
    privacy: {
      showDevoteeNames: true,
      showDonationAmounts: true,
      publicAttendance: false,
      shareEventPhotos: true,
      shareSocialMedia: true
    },
    read: false
  });

  // ============ EXACT MATCH to NotificationsPuja ============
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch(status) {
      case 'verified':
        return `${base} bg-green-50 text-green-700`;
      case 'pending':
        return `${base} bg-orange-50 text-orange-500`;
      case 'expired':
        return `${base} bg-red-50 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // ============ HANDLE SAVE ============
  const handleSave = (section, message = 'Settings saved successfully!') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(message);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  // ============ TEMPLE INFO UPDATES ============
  const updateTempleInfo = (field, value) => {
    setTempleInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAddress = (field, value) => {
    setTempleInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const updateContact = (field, value) => {
    setTempleInfo(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const addFacility = (facility) => {
    if (facility && !templeInfo.facilities.includes(facility)) {
      setTempleInfo(prev => ({
        ...prev,
        facilities: [...prev.facilities, facility]
      }));
    }
  };

  const removeFacility = (facility) => {
    setTempleInfo(prev => ({
      ...prev,
      facilities: prev.facilities.filter(f => f !== facility)
    }));
  };

  // ============ TIMINGS UPDATES ============
  const updateTempleTiming = (day, period, value) => {
    setTimings(prev => ({
      ...prev,
      temple: {
        ...prev.temple,
        [day]: {
          ...prev.temple[day],
          [period]: value
        }
      }
    }));
  };

  const updateAarti = (id, field, value) => {
    setTimings(prev => ({
      ...prev,
      aarti: prev.aarti.map(a => 
        a.id === id ? { ...a, [field]: value } : a
      )
    }));
  };

  const addAarti = (newAarti) => {
    setTimings(prev => ({
      ...prev,
      aarti: [...prev.aarti, { id: Date.now(), ...newAarti }]
    }));
  };

  const deleteAarti = (id) => {
    setTimings(prev => ({
      ...prev,
      aarti: prev.aarti.filter(a => a.id !== id)
    }));
  };

  const addSpecialEvent = (event) => {
    setTimings(prev => ({
      ...prev,
      specialTimings: [...prev.specialTimings, { id: Date.now(), ...event }]
    }));
  };

  const deleteSpecialEvent = (id) => {
    setTimings(prev => ({
      ...prev,
      specialTimings: prev.specialTimings.filter(e => e.id !== id)
    }));
  };

  // ============ BANK DETAILS UPDATES ============
  const updateBankAccount = (type, field, value) => {
    setBankDetails(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const verifyBankAccount = (type) => {
    setBankDetails(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        verified: true
      }
    }));
    handleSave('Bank', 'Bank account verified successfully!');
  };

  const setPrimaryAccount = (type) => {
    setBankDetails(prev => ({
      primary: {
        ...prev[type],
        isPrimary: true
      },
      secondary: {
        ...prev[type === 'primary' ? 'secondary' : 'primary'],
        isPrimary: false
      }
    }));
    handleSave('Bank', 'Primary account updated!');
  };

  // ============ DOCUMENTS UPDATES ============
  const uploadDocument = (category, file) => {
    // Simulate file upload
    const newDoc = {
      id: Date.now(),
      name: file.name,
      number: `DOC-${Date.now()}`,
      issueDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      expiryDate: 'Lifetime',
      status: 'pending',
      file: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      uploadedOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setDocuments(prev => ({
      ...prev,
      [category]: [...prev[category], newDoc]
    }));
    handleSave('Documents', 'Document uploaded successfully!');
  };

  const deleteDocument = (category, id) => {
    setDocuments(prev => ({
      ...prev,
      [category]: prev[category].filter(doc => doc.id !== id)
    }));
    handleSave('Documents', 'Document deleted successfully!');
  };

  const verifyDocument = (category, id) => {
    setDocuments(prev => ({
      ...prev,
      [category]: prev[category].map(doc =>
        doc.id === id ? { ...doc, status: 'verified' } : doc
      )
    }));
    handleSave('Documents', 'Document verified successfully!');
  };

  // ============ PREFERENCES UPDATES ============
  const updateNotification = (channel, key, value) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [channel]: {
          ...prev.notifications[channel],
          [key]: value
        }
      }
    }));
  };

  const updateDisplay = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value
      }
    }));
  };

  const updateBooking = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      booking: {
        ...prev.booking,
        [key]: value
      }
    }));
  };

  const updatePrivacy = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  // ============ MODALS ============

  // Edit Modal
  const EditModal = () => {
    const [formData, setFormData] = useState({});

    if (!showEditModal) return null;

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = () => {
      // Handle different edit types
      switch(editType) {
        case 'Temple Info':
        case 'Contact Info':
        case 'Address':
        case 'Tax Info':
        case 'About':
          handleSave(editType, `${editType} updated successfully!`);
          break;
        case 'Temple Timings':
        case 'Aarti Timings':
        case 'Special Timings':
          handleSave(editType, `${editType} updated successfully!`);
          break;
        case 'Bank Details':
        case 'Secondary Bank':
          handleSave(editType, `${editType} updated successfully!`);
          break;
        case 'Notifications':
        case 'Display':
        case 'Booking':
        case 'Privacy':
          handleSave(editType, `${editType} updated successfully!`);
          break;
        default:
          handleSave('Settings', 'Settings updated successfully!');
      }
      setShowEditModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Edit {editType}
                </h3>
              </div>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">
              Update your {editType.toLowerCase()} information below.
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  {editType} Field
                </label>
                <input
                  type="text"
                  name="field1"
                  placeholder={`Enter ${editType.toLowerCase()}`}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <textarea
                  name="field2"
                  rows="3"
                  placeholder="Enter additional details..."
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </div>
            
            {/* Modal Actions - EXACT match */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Upload Document Modal
  const UploadModal = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    if (!showUploadModal) return null;

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setFileName(file.name);
      }
    };

    const handleUpload = () => {
      if (selectedFile) {
        uploadDocument(uploadType, selectedFile);
        setShowUploadModal(false);
        setSelectedFile(null);
        setFileName('');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Upload className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Upload Document
                </h3>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-gray-50 rounded-full mb-3">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  PDF, JPG, PNG up to 10MB
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <button
                  onClick={() => document.getElementById('file-upload').click()}
                  className="px-4 py-2 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 transition-colors"
                >
                  Select File
                </button>
              </div>
            </div>

            {selectedFile && (
              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{fileName}</p>
                    <p className="text-xs text-gray-500">{Math.round(selectedFile.size / 1024)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 text-sm text-white rounded flex items-center gap-2 transition-colors ${
                  selectedFile 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Confirmation Modal
  const DeleteConfirmModal = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 px-4 py-3 border-b border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Confirm Delete
                </h3>
              </div>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            
            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteItem) {
                    if (deleteItem.type === 'aarti') {
                      deleteAarti(deleteItem.id);
                    } else if (deleteItem.type === 'event') {
                      deleteSpecialEvent(deleteItem.id);
                    } else if (deleteItem.type === 'document') {
                      deleteDocument(deleteItem.category, deleteItem.id);
                    } else if (deleteItem.type === 'facility') {
                      removeFacility(deleteItem.value);
                    }
                  }
                  setShowDeleteConfirm(false);
                  setDeleteItem(null);
                }}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ TEMPLE INFO TAB ============
  const TempleInfoTab = () => {
    const [newFacility, setNewFacility] = useState('');

    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Temple Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  {templeInfo.logo ? (
                    <img src={templeInfo.logo} alt="Temple Logo" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Building2 className="w-8 h-8 text-orange-600" />
                  )}
                </div>
                <button 
                  onClick={() => {
                    setEditType('Logo');
                    setShowEditModal(true);
                  }}
                  className="absolute -bottom-1 -right-1 p-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[16px] font-bold text-gray-800">{templeInfo.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {templeInfo.subtitle}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {templeInfo.address.line1}, {templeInfo.address.city}, {templeInfo.address.state} - {templeInfo.address.pincode}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">Est. {templeInfo.established}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-500">Reg: {templeInfo.registrationNo}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setEditType('Temple Info');
                setShowEditModal(true);
              }}
              className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                Contact Information
              </h3>
              <button
                onClick={() => {
                  setEditType('Contact Info');
                  setShowEditModal(true);
                }}
                className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Primary Phone</p>
                  <p className="text-sm font-medium text-gray-800">{templeInfo.contact.phone}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Alternate Phone</p>
                  <p className="text-sm font-medium text-gray-800">{templeInfo.contact.alternatePhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{templeInfo.contact.email}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Alternate Email</p>
                  <p className="text-sm font-medium text-gray-800">{templeInfo.contact.alternateEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Website</p>
                  <p className="text-sm font-medium text-gray-800">{templeInfo.contact.website}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Address Details
              </h3>
              <button
                onClick={() => {
                  setEditType('Address');
                  setShowEditModal(true);
                }}
                className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-800">{templeInfo.address.line1}</p>
              <p className="text-sm text-gray-800">{templeInfo.address.line2}</p>
              <p className="text-sm text-gray-800">{templeInfo.address.city}, {templeInfo.address.district}</p>
              <p className="text-sm text-gray-800">{templeInfo.address.state} - {templeInfo.address.pincode}</p>
              <p className="text-sm text-gray-800">{templeInfo.address.country}</p>
            </div>
          </div>

          {/* Tax Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Tax Information
              </h3>
              <button
                onClick={() => {
                  setEditType('Tax Info');
                  setShowEditModal(true);
                }}
                className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">PAN</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{templeInfo.pan}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">TAN</span>
                <span className="text-sm font-medium text-gray-800">{templeInfo.tan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">GSTIN</span>
                <span className="text-sm font-medium text-gray-800">{templeInfo.gstin}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Registration No.</span>
                <span className="text-sm font-medium text-gray-800">{templeInfo.registrationNo}</span>
              </div>
            </div>
          </div>

          {/* About & Facilities */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                About & Facilities
              </h3>
              <button
                onClick={() => {
                  setEditType('About');
                  setShowEditModal(true);
                }}
                className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-700">{templeInfo.about}</p>
              
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-gray-700">Facilities</p>
                  <button
                    onClick={() => {
                      const facility = prompt('Enter new facility:');
                      if (facility) addFacility(facility);
                    }}
                    className="p-1 text-gray-500 hover:text-orange-600"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {templeInfo.facilities.map((facility, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center gap-1 group"
                    >
                      {facility}
                      <button
                        onClick={() => {
                          setDeleteItem({ type: 'facility', value: facility });
                          setShowDeleteConfirm(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Social Media Links
              </h3>
              <button
                onClick={() => {
                  setEditType('Social Media');
                  setShowEditModal(true);
                }}
                className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center">
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Facebook</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{templeInfo.social.facebook}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-sky-100 rounded flex items-center justify-center">
                  <Twitter className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Twitter</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{templeInfo.social.twitter}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-pink-100 rounded flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Instagram</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{templeInfo.social.instagram}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-red-100 rounded flex items-center justify-center">
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">YouTube</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{templeInfo.social.youtube}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ TIMINGS TAB ============
  const TimingsTab = () => {
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', date: '', timings: '', description: '' });

    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Temple Timings */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50/30 to-amber-50/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-100 rounded">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">Temple Opening Hours</h3>
              </div>
              <button
                onClick={() => {
                  setEditType('Temple Timings');
                  setShowEditModal(true);
                }}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Timings
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {Object.entries(timings.temple).map(([day, value]) => {
              if (day === 'holidays') return null;
              return (
                <div key={day} className="p-3 flex items-center justify-between hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-800 capitalize">{day}</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-700">{value.morning}</span>
                    <span className="text-xs text-gray-500 mx-2">•</span>
                    <span className="text-sm text-gray-700">{value.evening}</span>
                    {value.closed && (
                      <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs">
                        Closed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="p-3 bg-gray-50">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Holidays:</span> {timings.temple.holidays}
              </p>
            </div>
          </div>
        </div>

        {/* Aarti Schedule */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Daily Aarti Schedule</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newAarti = {
                      name: 'New Aarti',
                      time: '00:00 AM',
                      duration: '30 mins',
                      description: 'New aarti description',
                      active: true
                    };
                    addAarti(newAarti);
                  }}
                  className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Aarti
                </button>
                <button
                  onClick={() => {
                    setEditType('Aarti Timings');
                    setShowEditModal(true);
                  }}
                  className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {timings.aarti.map((aarti) => (
              <div key={aarti.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-800">{aarti.name}</p>
                    {!aarti.active && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{aarti.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-orange-600">{aarti.time}</p>
                    <p className="text-xs text-gray-500">{aarti.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setDeleteItem({ type: 'aarti', id: aarti.id });
                        setShowDeleteConfirm(true);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Event Timings */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Special Event Timings</h3>
              <button
                onClick={() => setShowAddEvent(true)}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Event
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {timings.specialTimings.map((event) => (
              <div key={event.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{event.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">{event.timings}</span>
                  <button
                    onClick={() => {
                      setDeleteItem({ type: 'event', id: event.id });
                      setShowDeleteConfirm(true);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-gray-800">Add Special Event</h3>
                  <button onClick={() => setShowAddEvent(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Event Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Date (e.g., 26 Feb 2026)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Timings"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  onChange={(e) => setNewEvent({ ...newEvent, timings: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowAddEvent(false)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newEvent.name && newEvent.date && newEvent.timings) {
                        addSpecialEvent(newEvent);
                        setShowAddEvent(false);
                        setNewEvent({ name: '', date: '', timings: '', description: '' });
                      }
                    }}
                    className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============ BANK DETAILS TAB ============
  const BankTab = () => {
    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Primary Bank Account */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-50 rounded">
                <Landmark className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[15px] font-bold text-gray-800">Primary Bank Account</h3>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                    Default
                  </span>
                </div>
                {bankDetails.primary.verified && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!bankDetails.primary.verified && (
                <button
                  onClick={() => verifyBankAccount('primary')}
                  className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Verify
                </button>
              )}
              <button
                onClick={() => {
                  setEditType('Bank Details');
                  setShowEditModal(true);
                }}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Bank Name</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.primary.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Branch</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.primary.branch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Account Name</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.primary.accountName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{bankDetails.primary.maskedAccount}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">IFSC Code</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{bankDetails.primary.ifsc}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">MICR Code</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.primary.micr}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Account Type</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.primary.accountType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">UPI ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{bankDetails.primary.upiId}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Bank Account */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-800">Secondary Bank Account</h3>
                {!bankDetails.secondary.verified && (
                  <span className="px-2 py-0.5 bg-orange-50 text-orange-500 rounded-full text-xs font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    Pending Verification
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPrimaryAccount('secondary')}
                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded border border-blue-300 hover:bg-blue-100 flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                Set as Primary
              </button>
              <button
                onClick={() => {
                  setEditType('Secondary Bank');
                  setShowEditModal(true);
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Bank Name</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.secondary.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Account Name</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.secondary.accountName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{bankDetails.secondary.maskedAccount}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">IFSC Code</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{bankDetails.secondary.ifsc}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Account Type</span>
                <span className="text-sm font-medium text-gray-800">{bankDetails.secondary.accountType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">UPI ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{bankDetails.secondary.upiId}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ DOCUMENTS TAB ============
  const DocumentsTab = () => {
    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Trust Documents */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-gray-800">Trust Documents</h3>
              <button
                onClick={() => {
                  setUploadType('trust');
                  setShowUploadModal(true);
                }}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {documents.trust.map((doc) => (
              <div key={doc.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-1.5 bg-gray-100 rounded">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                      <span className={getStatusStyles(doc.status)}>{doc.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-gray-500">Number: {doc.number}</p>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                    <p className="text-xs text-gray-500">Valid: {doc.issueDate} - {doc.expiryDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.status === 'pending' && (
                    <button
                      onClick={() => verifyDocument('trust', doc.id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteItem({ type: 'document', category: 'trust', id: doc.id });
                      setShowDeleteConfirm(true);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Documents */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[15px] font-bold text-gray-800">Property Documents</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {documents.property.map((doc) => (
              <div key={doc.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-1.5 bg-gray-100 rounded">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                      <span className={getStatusStyles(doc.status)}>{doc.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-gray-500">Number: {doc.number}</p>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                    <p className="text-xs text-gray-500">Valid: {doc.issueDate} - {doc.expiryDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Documents */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[15px] font-bold text-gray-800">Financial Documents</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {documents.financial.map((doc) => (
              <div key={doc.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-1.5 bg-gray-100 rounded">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                      <span className={getStatusStyles(doc.status)}>{doc.status}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <p className="text-xs text-gray-500">Number: {doc.number}</p>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                    <p className="text-xs text-gray-500">Valid: {doc.issueDate} - {doc.expiryDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============ PREFERENCES TAB ============
  const PreferencesTab = () => {
    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              Notification Settings
            </h3>
            <button
              onClick={() => {
                setEditType('Notifications');
                setShowEditModal(true);
              }}
              className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Email Notifications</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(preferences.notifications.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={value} 
                        onChange={() => updateNotification('email', key, !value)}
                        className="sr-only peer" 
                      />
                      <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                        value ? 'bg-orange-500' : 'bg-gray-200'
                      }`}></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">SMS Notifications</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(preferences.notifications.sms).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={value} 
                        onChange={() => updateNotification('sms', key, !value)}
                        className="sr-only peer" 
                      />
                      <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                        value ? 'bg-orange-500' : 'bg-gray-200'
                      }`}></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              Display Settings
            </h3>
            <button
              onClick={() => {
                setEditType('Display');
                setShowEditModal(true);
              }}
              className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Theme</span>
              <select 
                value={preferences.display.theme}
                onChange={(e) => updateDisplay('theme', e.target.value)}
                className="text-sm font-medium text-gray-800 border border-gray-300 rounded px-2 py-1"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Language</span>
              <select 
                value={preferences.display.language}
                onChange={(e) => updateDisplay('language', e.target.value)}
                className="text-sm font-medium text-gray-800 border border-gray-300 rounded px-2 py-1"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी</option>
                <option value="Marathi">मराठी</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Date Format</span>
              <select 
                value={preferences.display.dateFormat}
                onChange={(e) => updateDisplay('dateFormat', e.target.value)}
                className="text-sm font-medium text-gray-800 border border-gray-300 rounded px-2 py-1"
              >
                <option value="DD MMM YYYY">22 Feb 2026</option>
                <option value="MM/DD/YYYY">02/22/2026</option>
                <option value="DD/MM/YYYY">22/02/2026</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Time Format</span>
              <select 
                value={preferences.display.timeFormat}
                onChange={(e) => updateDisplay('timeFormat', e.target.value)}
                className="text-sm font-medium text-gray-800 border border-gray-300 rounded px-2 py-1"
              >
                <option value="12h">12-hour (02:30 PM)</option>
                <option value="24h">24-hour (14:30)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Booking Preferences */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              Booking Settings
            </h3>
            <button
              onClick={() => {
                setEditType('Booking');
                setShowEditModal(true);
              }}
              className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Auto Confirm</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={preferences.booking.autoConfirm} 
                  onChange={(e) => updateBooking('autoConfirm', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                  preferences.booking.autoConfirm ? 'bg-green-600' : 'bg-gray-200'
                }`}></div>
              </label>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Max Bookings/Day</span>
              <input
                type="number"
                value={preferences.booking.maxBookingsPerDay}
                onChange={(e) => updateBooking('maxBookingsPerDay', parseInt(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Advance Booking</span>
              <input
                type="number"
                value={preferences.booking.advanceBookingDays}
                onChange={(e) => updateBooking('advanceBookingDays', parseInt(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Cancellation Window</span>
              <input
                type="number"
                value={preferences.booking.cancellationWindow}
                onChange={(e) => updateBooking('cancellationWindow', parseInt(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Privacy Preferences */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Privacy Settings
            </h3>
            <button
              onClick={() => {
                setEditType('Privacy');
                setShowEditModal(true);
              }}
              className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            {Object.entries(preferences.privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-xs text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={value} 
                    onChange={(e) => updatePrivacy(key, e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                    value ? 'bg-purple-600' : 'bg-gray-200'
                  }`}></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============ RENDER ACTIVE TAB ============
  const renderTab = () => {
    switch(activeTab) {
      case 'temple':
        return <TempleInfoTab />;
      case 'timings':
        return <TimingsTab />;
      case 'bank':
        return <BankTab />;
      case 'documents':
        return <DocumentsTab />;
      case 'preferences':
        return <PreferencesTab />;
      default:
        return <TempleInfoTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay - EXACT match */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Saving...</p>
          </div>
        </div>
      )}

      <VendorPageHeader 
        title="SETTINGS" 
        subtitle="Manage temple profile and configurations" 
      />


      {/* Main Content - EXACT spacing */}
      <div className="p-6">
        <div className='flex justify-end mb-4'>
          <button className="px-3 py-1.5 bg-white text-gray-700 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync
            </button>
        </div>
        {/* Tabs Navigation - EXACT match to NotificationsPuja filter bar style */}
        <div className="bg-white rounded-lg border border-gray-200 p-1 mb-4 overflow-x-auto">
          <div className="flex flex-wrap gap-1 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    isActive 
                      ? 'bg-orange-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {renderTab()}
        </div>

        {/* Bottom Section - EXACT match */}
        <div className="mt-6 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">All changes are auto-saved</p>
              <p className="text-[14px] text-gray-800">Last synced: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200">
                Reset to Default
              </button>
              <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600">
                Export Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && <EditModal />}
      {showUploadModal && <UploadModal />}
      {showDeleteConfirm && <DeleteConfirmModal />}
    </div>
  );
};

export default SettingsTemple;