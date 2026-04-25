import React, { useState } from 'react';
import {
  // Core Icons
  Building2,
  Landmark,
  Shield,
  Image,
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
  FileText,
  Copy,
  Link,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  RefreshCw,
  Check,
  Ban,
  RotateCcw,
  Eye,
  EyeOff,
  Star,
  Award,
  Gift,
  Clock
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const ProfileSettings_Organizer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState('');
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');
  const [copiedField, setCopiedField] = useState('');

  // ============ UNREAD COUNT ============
  const [unreadCount, setUnreadCount] = useState(2);

  // ============ TAB CONFIGURATION ============
  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: Building2 },
    { id: 'bank', label: 'Bank Details', icon: Landmark },
    { id: 'kyc', label: 'KYC', icon: Shield },
    { id: 'branding', label: 'Branding', icon: Image },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  // ============ PROFILE INFO DATA ============
  const [profileInfo, setProfileInfo] = useState({
    companyName: 'Shri Ram Mandir',
    legalName: 'Shri Ram Mandir Trust',
    tagline: 'सियावर रामचन्द्र की जय',
    established: '1952',
    registrationNo: 'TRUST/1952/00123',
    gstin: '27ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    tan: 'MUMT12345A',
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
      primaryPhone: '+91 98765 43210',
      alternatePhone: '+91 98765 43211',
      primaryEmail: 'contact@rammandir.com',
      alternateEmail: 'admin@rammandir.com',
      website: 'www.rammandir.com',
      supportEmail: 'support@rammandir.com',
      supportPhone: '+91 98765 43212'
    },
    social: {
      facebook: 'https://facebook.com/rammandir',
      twitter: 'https://twitter.com/rammandir',
      instagram: 'https://instagram.com/rammandir',
      youtube: 'https://youtube.com/rammandir',
      linkedin: 'https://linkedin.com/company/rammandir'
    },
    about: 'Shri Ram Mandir is a historic temple dedicated to Lord Rama, established in 1952. The temple is known for its beautiful architecture, peaceful atmosphere, and regular spiritual programs. We serve thousands of devotees daily and conduct various religious and cultural events throughout the year.',
    logo: null,
    favicon: null,
    coverImage: null,
    read: false
  });

  // ============ BANK DETAILS DATA ============
  const [bankDetails, setBankDetails] = useState({
    accounts: [
      {
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
        isPrimary: true,
        addedOn: '15 Jan 1952'
      },
      {
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
        isPrimary: false,
        addedOn: '20 Mar 2020'
      }
    ],
    read: false
  });

  // ============ KYC DOCUMENTS DATA ============
  const [kycDocs, setKycDocs] = useState({
    trust: [
      { id: 1, name: 'Trust Registration Certificate', number: 'TRUST/1952/00123', issuedBy: 'Charity Commissioner', issueDate: '15 Jan 1952', expiryDate: 'Lifetime', status: 'verified', file: 'trust_certificate.pdf', size: '245 KB', uploadedOn: '15 Jan 1952' },
      { id: 2, name: 'Trust Deed', number: 'DEED/1952/0456', issuedBy: 'Sub-Registrar', issueDate: '15 Jan 1952', expiryDate: 'Lifetime', status: 'verified', file: 'trust_deed.pdf', size: '512 KB', uploadedOn: '15 Jan 1952' },
      { id: 3, name: '12A Registration', number: '12A/ABC/1952', issuedBy: 'Income Tax Dept', issueDate: '20 Mar 1952', expiryDate: 'Lifetime', status: 'verified', file: '12a_certificate.pdf', size: '189 KB', uploadedOn: '20 Mar 1952' },
      { id: 4, name: '80G Registration', number: '80G/XYZ/1952', issuedBy: 'Income Tax Dept', issueDate: '20 Mar 1952', expiryDate: '31 Mar 2026', status: 'verified', file: '80g_certificate.pdf', size: '201 KB', uploadedOn: '20 Mar 1952' }
    ],
    identity: [
      { id: 1, name: 'PAN Card', number: 'ABCDE1234F', issuedBy: 'Income Tax Dept', issueDate: '10 Feb 2020', expiryDate: 'Lifetime', status: 'verified', file: 'pan_card.pdf', size: '98 KB', uploadedOn: '10 Feb 2020' },
      { id: 2, name: 'TAN Card', number: 'MUMT12345A', issuedBy: 'Income Tax Dept', issueDate: '15 Mar 2020', expiryDate: 'Lifetime', status: 'verified', file: 'tan_card.pdf', size: '87 KB', uploadedOn: '15 Mar 2020' },
      { id: 3, name: 'GST Registration', number: '27ABCDE1234F1Z5', issuedBy: 'GST Council', issueDate: '01 Jul 2017', expiryDate: 'Lifetime', status: 'verified', file: 'gst_certificate.pdf', size: '234 KB', uploadedOn: '01 Jul 2017' }
    ],
    address: [
      { id: 1, name: 'Property Tax Receipt', number: 'PT-2025-00123', issuedBy: 'MCGM', issueDate: '15 Dec 2025', expiryDate: '31 Dec 2026', status: 'verified', file: 'property_tax_2025.pdf', size: '156 KB', uploadedOn: '15 Dec 2025' },
      { id: 2, name: 'Land Ownership Document', number: 'LAND/1952/0789', issuedBy: 'Revenue Dept', issueDate: '15 Jan 1952', expiryDate: 'Lifetime', status: 'verified', file: 'ownership.pdf', size: '1.2 MB', uploadedOn: '15 Jan 1952' }
    ],
    read: false
  });

  // ============ BRANDING DATA ============
  const [branding, setBranding] = useState({
    logo: null,
    logoPreview: null,
    favicon: null,
    faviconPreview: null,
    coverImage: null,
    coverPreview: null,
    primaryColor: '#f97316',
    secondaryColor: '#ea580c',
    accentColor: '#fdba74',
    fontFamily: 'Inter',
    emailTemplate: 'default',
    receiptTemplate: 'standard',
    invoicePrefix: 'RCT',
    invoiceNumberFormat: 'RCT-YYYY-####',
    currency: 'INR',
    dateFormat: 'DD MMM YYYY',
    timeFormat: '12h',
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
    privacy: {
      showDevoteeNames: true,
      showDonationAmounts: true,
      publicAttendance: false,
      shareEventPhotos: true,
      shareSocialMedia: true
    },
    localization: {
      country: 'India',
      timezone: 'Asia/Kolkata',
      firstDayOfWeek: 'Monday',
      measurementSystem: 'Metric'
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

  // ============ COPY TO CLIPBOARD ============
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
    showToastMessage('Copied to clipboard!', 'success');
  };

  // ============ TOAST MESSAGE ============
  const showToastMessage = (message, type = 'success') => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // ============ HANDLE SAVE ============
  const handleSave = (section, message = 'Settings saved successfully!') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToastMessage(message, 'success');
    }, 800);
  };

  // ============ PROFILE INFO UPDATES ============
  const updateProfileInfo = (field, value) => {
    setProfileInfo(prev => ({
      ...prev,
      [field]: value
    }));
    handleSave('Profile', 'Profile updated successfully!');
  };

  const updateContact = (field, value) => {
    setProfileInfo(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
    handleSave('Contact', 'Contact information updated!');
  };

  const updateAddress = (field, value) => {
    setProfileInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
    handleSave('Address', 'Address updated successfully!');
  };

  const updateSocial = (platform, value) => {
    setProfileInfo(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [platform]: value
      }
    }));
    handleSave('Social', 'Social links updated!');
  };

  // ============ BANK ACTIONS ============
  const addBankAccount = (newAccount) => {
    const newId = Math.max(...bankDetails.accounts.map(a => a.id), 0) + 1;
    setBankDetails(prev => ({
      ...prev,
      accounts: [...prev.accounts, {
        id: newId,
        ...newAccount,
        verified: false,
        isPrimary: false,
        addedOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      }]
    }));
    handleSave('Bank', 'Bank account added successfully!');
  };

  const updateBankAccount = (id, field, value) => {
    setBankDetails(prev => ({
      ...prev,
      accounts: prev.accounts.map(acc => 
        acc.id === id ? { ...acc, [field]: value } : acc
      )
    }));
    handleSave('Bank', 'Bank account updated successfully!');
  };

  const setPrimaryAccount = (id) => {
    setBankDetails(prev => ({
      ...prev,
      accounts: prev.accounts.map(acc => ({
        ...acc,
        isPrimary: acc.id === id
      }))
    }));
    handleSave('Bank', 'Primary account updated successfully!');
  };

  const verifyBankAccount = (id) => {
    setBankDetails(prev => ({
      ...prev,
      accounts: prev.accounts.map(acc => 
        acc.id === id ? { ...acc, verified: true } : acc
      )
    }));
    handleSave('Bank', 'Bank account verified successfully!');
  };

  const deleteBankAccount = (id) => {
    setBankDetails(prev => ({
      ...prev,
      accounts: prev.accounts.filter(acc => acc.id !== id)
    }));
    setShowDeleteConfirm(false);
    handleSave('Bank', 'Bank account deleted successfully!');
  };

  // ============ KYC ACTIONS ============
  const addDocument = (category, newDoc) => {
    const newId = Math.max(...kycDocs[category].map(d => d.id), 0) + 1;
    setKycDocs(prev => ({
      ...prev,
      [category]: [...prev[category], {
        id: newId,
        ...newDoc,
        status: 'pending',
        uploadedOn: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      }]
    }));
    handleSave('KYC', 'Document uploaded successfully!');
  };

  const verifyDocument = (category, id) => {
    setKycDocs(prev => ({
      ...prev,
      [category]: prev[category].map(doc =>
        doc.id === id ? { ...doc, status: 'verified' } : doc
      )
    }));
    handleSave('KYC', 'Document verified successfully!');
  };

  const deleteDocument = (category, id) => {
    setKycDocs(prev => ({
      ...prev,
      [category]: prev[category].filter(doc => doc.id !== id)
    }));
    setShowDeleteConfirm(false);
    handleSave('KYC', 'Document deleted successfully!');
  };

  // ============ BRANDING ACTIONS ============
  const uploadLogo = (file) => {
    const preview = URL.createObjectURL(file);
    setBranding(prev => ({
      ...prev,
      logo: file,
      logoPreview: preview
    }));
    handleSave('Branding', 'Logo uploaded successfully!');
  };

  const uploadFavicon = (file) => {
    const preview = URL.createObjectURL(file);
    setBranding(prev => ({
      ...prev,
      favicon: file,
      faviconPreview: preview
    }));
    handleSave('Branding', 'Favicon uploaded successfully!');
  };

  const uploadCover = (file) => {
    const preview = URL.createObjectURL(file);
    setBranding(prev => ({
      ...prev,
      coverImage: file,
      coverPreview: preview
    }));
    handleSave('Branding', 'Cover image uploaded successfully!');
  };

  const updateBrandColor = (colorType, value) => {
    setBranding(prev => ({
      ...prev,
      [colorType]: value
    }));
  };

  const updateInvoiceSetting = (field, value) => {
    setBranding(prev => ({
      ...prev,
      [field]: value
    }));
    handleSave('Branding', 'Invoice settings updated!');
  };

  // ============ PREFERENCES ACTIONS ============
  const toggleEmailNotification = (key) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        email: {
          ...prev.notifications.email,
          [key]: !prev.notifications.email[key]
        }
      }
    }));
  };

  const toggleSmsNotification = (key) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        sms: {
          ...prev.notifications.sms,
          [key]: !prev.notifications.sms[key]
        }
      }
    }));
  };

  const togglePushNotification = (key) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        push: {
          ...prev.notifications.push,
          [key]: !prev.notifications.push[key]
        }
      }
    }));
  };

  const updateDisplayPreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value
      }
    }));
  };

  const togglePrivacySetting = (key) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const updateLocalization = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      localization: {
        ...prev.localization,
        [key]: value
      }
    }));
  };

  // ============ EDIT MODAL ============
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
      switch(editType) {
        case 'Company Profile':
          if (formData.companyName) updateProfileInfo('companyName', formData.companyName);
          if (formData.tagline) updateProfileInfo('tagline', formData.tagline);
          if (formData.established) updateProfileInfo('established', formData.established);
          if (formData.registrationNo) updateProfileInfo('registrationNo', formData.registrationNo);
          break;
        case 'Contact Info':
          if (formData.primaryPhone) updateContact('primaryPhone', formData.primaryPhone);
          if (formData.alternatePhone) updateContact('alternatePhone', formData.alternatePhone);
          if (formData.primaryEmail) updateContact('primaryEmail', formData.primaryEmail);
          if (formData.alternateEmail) updateContact('alternateEmail', formData.alternateEmail);
          if (formData.website) updateContact('website', formData.website);
          if (formData.supportEmail) updateContact('supportEmail', formData.supportEmail);
          if (formData.supportPhone) updateContact('supportPhone', formData.supportPhone);
          break;
        case 'Address':
          if (formData.line1) updateAddress('line1', formData.line1);
          if (formData.line2) updateAddress('line2', formData.line2);
          if (formData.city) updateAddress('city', formData.city);
          if (formData.district) updateAddress('district', formData.district);
          if (formData.state) updateAddress('state', formData.state);
          if (formData.pincode) updateAddress('pincode', formData.pincode);
          if (formData.country) updateAddress('country', formData.country);
          break;
        case 'Tax Info':
          if (formData.gstin) updateProfileInfo('gstin', formData.gstin);
          if (formData.pan) updateProfileInfo('pan', formData.pan);
          if (formData.tan) updateProfileInfo('tan', formData.tan);
          break;
        case 'About':
          if (formData.about) updateProfileInfo('about', formData.about);
          break;
        case 'Social Links':
          if (formData.facebook) updateSocial('facebook', formData.facebook);
          if (formData.twitter) updateSocial('twitter', formData.twitter);
          if (formData.instagram) updateSocial('instagram', formData.instagram);
          if (formData.youtube) updateSocial('youtube', formData.youtube);
          if (formData.linkedin) updateSocial('linkedin', formData.linkedin);
          break;
        case 'Bank Account':
          if (editMode === 'add') {
            addBankAccount(formData);
          } else {
            if (selectedItem) {
              Object.keys(formData).forEach(key => {
                updateBankAccount(selectedItem.id, key, formData[key]);
              });
            }
          }
          break;
        default:
          handleSave(editType);
      }
      setShowEditModal(false);
    };

    const renderFormFields = () => {
      switch(editType) {
        case 'Company Profile':
          return (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  defaultValue={profileInfo.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={profileInfo.tagline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Established Year</label>
                <input
                  type="text"
                  name="established"
                  defaultValue={profileInfo.established}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Registration No.</label>
                <input
                  type="text"
                  name="registrationNo"
                  defaultValue={profileInfo.registrationNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </>
          );
        case 'Contact Info':
          return (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Primary Phone</label>
                <input
                  type="text"
                  name="primaryPhone"
                  defaultValue={profileInfo.contact.primaryPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Alternate Phone</label>
                <input
                  type="text"
                  name="alternatePhone"
                  defaultValue={profileInfo.contact.alternatePhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Primary Email</label>
                <input
                  type="email"
                  name="primaryEmail"
                  defaultValue={profileInfo.contact.primaryEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Alternate Email</label>
                <input
                  type="email"
                  name="alternateEmail"
                  defaultValue={profileInfo.contact.alternateEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  defaultValue={profileInfo.contact.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </>
          );
        case 'Address':
          return (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                  type="text"
                  name="line1"
                  defaultValue={profileInfo.address.line1}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  name="line2"
                  defaultValue={profileInfo.address.line2}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={profileInfo.address.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">District</label>
                <input
                  type="text"
                  name="district"
                  defaultValue={profileInfo.address.district}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  defaultValue={profileInfo.address.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  defaultValue={profileInfo.address.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  defaultValue={profileInfo.address.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </>
          );
        case 'Tax Info':
          return (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">GSTIN</label>
                <input
                  type="text"
                  name="gstin"
                  defaultValue={profileInfo.gstin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">PAN</label>
                <input
                  type="text"
                  name="pan"
                  defaultValue={profileInfo.pan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">TAN</label>
                <input
                  type="text"
                  name="tan"
                  defaultValue={profileInfo.tan}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </>
          );
        case 'About':
          return (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">About Temple</label>
              <textarea
                name="about"
                rows="5"
                defaultValue={profileInfo.about}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>
          );
        case 'Social Links':
          return (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  defaultValue={profileInfo.social.facebook}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  defaultValue={profileInfo.social.twitter}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  defaultValue={profileInfo.social.instagram}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">YouTube</label>
                <input
                  type="url"
                  name="youtube"
                  defaultValue={profileInfo.social.youtube}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  defaultValue={profileInfo.social.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </>
          );
        case 'Bank Account':
          return (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Enter bank name"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Branch</label>
                <input
                  type="text"
                  name="branch"
                  placeholder="Enter branch name"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  placeholder="Enter account holder name"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Enter account number"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  name="ifsc"
                  placeholder="Enter IFSC code"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Account Type</label>
                <select
                  name="accountType"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                >
                  <option value="Current Account">Current Account</option>
                  <option value="Savings Account">Savings Account</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  placeholder="Enter UPI ID"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
                />
              </div>
            </>
          );
        default:
          return (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">{editType}</label>
              <input
                type="text"
                name="value"
                placeholder={`Enter ${editType.toLowerCase()}`}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>
          );
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Modal Header - EXACT match */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100 sticky top-0">
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
            {renderFormFields()}
            
            {/* Modal Actions - EXACT match */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2"
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

  // ============ UPLOAD MODAL ============
  const UploadModal = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    if (!showUploadModal) return null;

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    };

    const handleUpload = () => {
      if (selectedFile) {
        switch(uploadType) {
          case 'Logo':
            uploadLogo(selectedFile);
            break;
          case 'Favicon':
            uploadFavicon(selectedFile);
            break;
          case 'Cover':
            uploadCover(selectedFile);
            break;
          case 'Document':
            // Handle document upload
            break;
        }
        setShowUploadModal(false);
        setSelectedFile(null);
        setPreview(null);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-4 py-3 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                  <Upload className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-[15px] font-bold text-gray-800">
                  Upload {uploadType}
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

          <div className="p-6 space-y-4">
            {preview ? (
              <div className="flex flex-col items-center">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-40 max-w-full object-contain mb-4"
                />
                <p className="text-sm font-medium text-gray-800">{selectedFile?.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile?.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-gray-50 rounded-full mb-3">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {uploadType === 'Logo' ? 'PNG, JPG, SVG up to 5MB' : 
                     uploadType === 'Favicon' ? 'ICO, PNG, SVG up to 1MB' :
                     uploadType === 'Cover' ? 'JPG, PNG up to 10MB' :
                     'PDF, JPG, PNG up to 10MB'}
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={uploadType === 'Logo' ? 'image/*' : 
                            uploadType === 'Favicon' ? 'image/*' :
                            uploadType === 'Cover' ? 'image/*' :
                            '.pdf,image/*'}
                  />
                  <button
                    onClick={() => document.getElementById('file-upload').click()}
                    className="px-4 py-2 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100"
                  >
                    Select File
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setPreview(null);
                }}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 text-sm text-white rounded flex items-center gap-2 ${
                  selectedFile 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============ DELETE CONFIRM MODAL ============
  const DeleteConfirmModal = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 px-4 py-3 border-b border-red-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-800">Confirm Delete</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this {deleteItem?.type}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteItem?.type === 'bank') {
                    deleteBankAccount(deleteItem.id);
                  } else if (deleteItem?.type === 'document') {
                    deleteDocument(deleteItem.category, deleteItem.id);
                  }
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
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

  // ============ PROFILE INFO TAB ============
  const ProfileInfoTab = () => {
    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Company Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                  {branding.logoPreview ? (
                    <img src={branding.logoPreview} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Building2 className="w-8 h-8 text-orange-600" />
                  )}
                </div>
                <button 
                  onClick={() => {
                    setUploadType('Logo');
                    setShowUploadModal(true);
                  }}
                  className="absolute -bottom-1 -right-1 p-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-bold text-gray-800">{profileInfo.companyName}</h3>
                  <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                    {profileInfo.legalName}
                  </span>
                </div>
                <p className="text-sm text-orange-600 mt-0.5">{profileInfo.tagline}</p>
                <p className="text-xs text-gray-500 mt-1">Est. {profileInfo.established} • Reg: {profileInfo.registrationNo}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditType('Company Profile');
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
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Primary Phone</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{profileInfo.contact.primaryPhone}</span>
                  <button 
                    onClick={() => copyToClipboard(profileInfo.contact.primaryPhone, 'primaryPhone')}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === 'primaryPhone' ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Alternate Phone</span>
                <span className="text-sm font-medium text-gray-800">{profileInfo.contact.alternatePhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Primary Email</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{profileInfo.contact.primaryEmail}</span>
                  <button 
                    onClick={() => copyToClipboard(profileInfo.contact.primaryEmail, 'primaryEmail')}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === 'primaryEmail' ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Alternate Email</span>
                <span className="text-sm font-medium text-gray-800">{profileInfo.contact.alternateEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Website</span>
                <span className="text-sm font-medium text-gray-800">{profileInfo.contact.website}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Support</span>
                <span className="text-sm font-medium text-gray-800">{profileInfo.contact.supportEmail}</span>
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
              <p className="text-sm text-gray-800">{profileInfo.address.line1}</p>
              <p className="text-sm text-gray-800">{profileInfo.address.line2}</p>
              <p className="text-sm text-gray-800">{profileInfo.address.city}, {profileInfo.address.district}</p>
              <p className="text-sm text-gray-800">{profileInfo.address.state} - {profileInfo.address.pincode}</p>
              <p className="text-sm text-gray-800">{profileInfo.address.country}</p>
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
                <span className="text-xs text-gray-600">GSTIN</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{profileInfo.gstin}</span>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs">Verified</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">PAN</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{profileInfo.pan}</span>
                  <button 
                    onClick={() => copyToClipboard(profileInfo.pan, 'pan')}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === 'pan' ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">TAN</span>
                <span className="text-sm font-medium text-gray-800">{profileInfo.tan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Registration No.</span>
                <span className="text-sm font-medium text-gray-800">{profileInfo.registrationNo}</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Social Media
              </h3>
              <button
                onClick={() => {
                  setEditType('Social Links');
                  setShowEditModal(true);
                }}
                className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center">
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Facebook</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{profileInfo.social.facebook}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(profileInfo.social.facebook, 'facebook')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  {copiedField === 'facebook' ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-sky-100 rounded flex items-center justify-center">
                  <Twitter className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Twitter</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{profileInfo.social.twitter}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(profileInfo.social.twitter, 'twitter')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  {copiedField === 'twitter' ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-pink-100 rounded flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Instagram</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{profileInfo.social.instagram}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(profileInfo.social.instagram, 'instagram')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  {copiedField === 'instagram' ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-red-100 rounded flex items-center justify-center">
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">YouTube</p>
                  <p className="text-xs font-medium text-gray-800 truncate">{profileInfo.social.youtube}</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(profileInfo.social.youtube, 'youtube')}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  {copiedField === 'youtube' ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-gray-800">About Temple</h3>
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
          <p className="text-sm text-gray-700 leading-relaxed">{profileInfo.about}</p>
        </div>
      </div>
    );
  };

  // ============ BANK DETAILS TAB ============
  const BankDetailsTab = () => {
    const [editMode, setEditMode] = useState('add');
    const [selectedAccount, setSelectedAccount] = useState(null);

    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Add Bank Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditMode('add');
              setEditType('Bank Account');
              setShowEditModal(true);
            }}
            className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add Bank Account
          </button>
        </div>

        {/* Bank Accounts List */}
        {bankDetails.accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  account.isPrimary ? 'bg-green-50' : 'bg-gray-50'
                }`}>
                  <Landmark className={`w-5 h-5 ${
                    account.isPrimary ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-bold text-gray-800">{account.bankName}</h3>
                    {account.isPrimary && (
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        Primary
                      </span>
                    )}
                    {account.verified ? (
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-500 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{account.branch}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!account.isPrimary && (
                  <button
                    onClick={() => setPrimaryAccount(account.id)}
                    className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded border border-blue-300 hover:bg-blue-100 flex items-center gap-1"
                  >
                    <Star className="w-3 h-3" />
                    Set as Primary
                  </button>
                )}
                {!account.verified && (
                  <button
                    onClick={() => verifyBankAccount(account.id)}
                    className="px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Verify
                  </button>
                )}
                <button
                  onClick={() => {
                    setEditMode('edit');
                    setSelectedAccount(account);
                    setEditType('Bank Account');
                    setShowEditModal(true);
                  }}
                  className="p-1.5 text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setDeleteItem({ type: 'bank', id: account.id });
                    setShowDeleteConfirm(true);
                  }}
                  className="p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-xs text-gray-500">Account Name</p>
                <p className="text-sm font-medium text-gray-800 mt-1">{account.accountName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Account Number</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-gray-800">{account.maskedAccount}</span>
                  <button 
                    onClick={() => copyToClipboard(account.accountNumber, `acc-${account.id}`)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === `acc-${account.id}` ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">IFSC Code</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-gray-800">{account.ifsc}</span>
                  <button 
                    onClick={() => copyToClipboard(account.ifsc, `ifsc-${account.id}`)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === `ifsc-${account.id}` ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">UPI ID</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-gray-800">{account.upiId}</span>
                  <button 
                    onClick={() => copyToClipboard(account.upiId, `upi-${account.id}`)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    {copiedField === `upi-${account.id}` ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ============ KYC TAB ============
  const KYCTab = () => {
    const [activeDocTab, setActiveDocTab] = useState('trust');

    const docTabs = [
      { id: 'trust', label: 'Trust Documents', count: kycDocs.trust.length },
      { id: 'identity', label: 'Identity', count: kycDocs.identity.length },
      { id: 'address', label: 'Address Proof', count: kycDocs.address.length }
    ];

    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Document Type Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 p-1 overflow-x-auto">
          <div className="flex flex-wrap gap-1 min-w-max">
            {docTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDocTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                  activeDocTab === tab.id 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                  activeDocTab === tab.id 
                    ? 'bg-white text-orange-500' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setUploadType('Document');
              setShowUploadModal(true);
            }}
            className="px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {kycDocs[activeDocTab]?.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-gray-800">{doc.name}</h4>
                        <span className={getStatusStyles(doc.status)}>{doc.status}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 mt-2">
                        <div>
                          <p className="text-xs text-gray-500">Document No.</p>
                          <p className="text-xs font-medium text-gray-800 mt-0.5">{doc.number}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Issued By</p>
                          <p className="text-xs font-medium text-gray-800 mt-0.5">{doc.issuedBy}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Issue Date</p>
                          <p className="text-xs font-medium text-gray-800 mt-0.5">{doc.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expiry Date</p>
                          <p className="text-xs font-medium text-gray-800 mt-0.5">{doc.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">{doc.file}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{doc.size}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">Uploaded: {doc.uploadedOn}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {doc.status === 'pending' && (
                      <button
                        onClick={() => verifyDocument(activeDocTab, doc.id)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Verify Document"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      className="p-1.5 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteItem({ type: 'document', category: activeDocTab, id: doc.id });
                        setShowDeleteConfirm(true);
                      }}
                      className="p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============ BRANDING TAB ============
  const BrandingTab = () => {
    return (
      <div className="space-y-4">
        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Logo Upload */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-[15px] font-bold text-gray-800 mb-4">Temple Logo</h3>
            <div className="flex flex-col items-center">
              <div className="relative group mb-4">
                <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {branding.logoPreview ? (
                    <img src={branding.logoPreview} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <Building2 className="w-12 h-12 text-orange-600" />
                  )}
                </div>
                <button 
                  onClick={() => {
                    setUploadType('Logo');
                    setShowUploadModal(true);
                  }}
                  className="absolute -bottom-2 -right-2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setUploadType('Logo');
                    setShowUploadModal(true);
                  }}
                  className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Logo
                </button>
                {branding.logoPreview && (
                  <button 
                    onClick={() => {
                      setBranding(prev => ({ ...prev, logo: null, logoPreview: null }));
                      handleSave('Branding', 'Logo removed successfully!');
                    }}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                  >
                    Remove
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-3">Recommended: 512x512px PNG or SVG</p>
            </div>
          </div>

          {/* Favicon */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-[15px] font-bold text-gray-800 mb-4">Favicon</h3>
            <div className="flex flex-col items-center">
              <div className="relative group mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {branding.faviconPreview ? (
                    <img src={branding.faviconPreview} alt="Favicon" className="w-full h-full object-contain" />
                  ) : (
                    <Building2 className="w-8 h-8 text-orange-600" />
                  )}
                </div>
                <button 
                  onClick={() => {
                    setUploadType('Favicon');
                    setShowUploadModal(true);
                  }}
                  className="absolute -bottom-2 -right-2 p-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <button 
                onClick={() => {
                  setUploadType('Favicon');
                  setShowUploadModal(true);
                }}
                className="px-3 py-1.5 text-sm bg-orange-50 text-orange-500 rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Favicon
              </button>
              <p className="text-xs text-gray-500 mt-3">Recommended: 32x32px ICO or PNG</p>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">
            <h3 className="text-[15px] font-bold text-gray-800 mb-4">Cover Image</h3>
            <div className="relative h-40 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg flex items-center justify-center overflow-hidden">
              {branding.coverPreview ? (
                <img src={branding.coverPreview} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Image className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No cover image uploaded</p>
                </div>
              )}
              <button 
                onClick={() => {
                  setUploadType('Cover');
                  setShowUploadModal(true);
                }}
                className="absolute bottom-3 right-3 px-3 py-1.5 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-2 shadow-sm"
              >
                <Upload className="w-4 h-4" />
                {branding.coverPreview ? 'Change Cover' : 'Upload Cover'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Recommended: 1200x300px JPG or PNG</p>
          </div>

          {/* Brand Colors */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">
            <h3 className="text-[15px] font-bold text-gray-800 mb-4">Brand Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: branding.primaryColor }}
                  ></div>
                  <input
                    type="text"
                    value={branding.primaryColor}
                    onChange={(e) => updateBrandColor('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: branding.secondaryColor }}
                  ></div>
                  <input
                    type="text"
                    value={branding.secondaryColor}
                    onChange={(e) => updateBrandColor('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-2">Accent Color</label>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg border-2 border-white shadow-sm"
                    style={{ backgroundColor: branding.accentColor }}
                  ></div>
                  <input
                    type="text"
                    value={branding.accentColor}
                    onChange={(e) => updateBrandColor('accentColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">
            <h3 className="text-[15px] font-bold text-gray-800 mb-4">Invoice & Receipt Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Invoice Prefix</label>
                <input
                  type="text"
                  value={branding.invoicePrefix}
                  onChange={(e) => updateInvoiceSetting('invoicePrefix', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Number Format</label>
                <input
                  type="text"
                  value={branding.invoiceNumberFormat}
                  onChange={(e) => updateInvoiceSetting('invoiceNumberFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email Template</label>
                <select 
                  value={branding.emailTemplate}
                  onChange={(e) => updateInvoiceSetting('emailTemplate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="default">Default Template</option>
                  <option value="professional">Professional</option>
                  <option value="simple">Simple</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Receipt Template</label>
                <select 
                  value={branding.receiptTemplate}
                  onChange={(e) => updateInvoiceSetting('receiptTemplate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="standard">Standard</option>
                  <option value="detailed">Detailed</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Email Notification Preferences */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-orange-500" />
              Email Notifications
            </h3>
            
            <div className="space-y-3">
              {Object.entries(preferences.notifications.email).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={value} 
                      onChange={() => toggleEmailNotification(key)}
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

          {/* SMS Notification Preferences */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-green-600" />
              SMS Notifications
            </h3>
            
            <div className="space-y-3">
              {Object.entries(preferences.notifications.sms).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={value} 
                      onChange={() => toggleSmsNotification(key)}
                      className="sr-only peer" 
                    />
                    <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${
                      value ? 'bg-green-600' : 'bg-gray-200'
                    }`}></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Sun className="w-5 h-5 text-yellow-500" />
              Display Settings
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Theme</span>
                <select 
                  value={preferences.display.theme}
                  onChange={(e) => updateDisplayPreference('theme', e.target.value)}
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
                  onChange={(e) => updateDisplayPreference('language', e.target.value)}
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
                  onChange={(e) => updateDisplayPreference('dateFormat', e.target.value)}
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
                  onChange={(e) => updateDisplayPreference('timeFormat', e.target.value)}
                  className="text-sm font-medium text-gray-800 border border-gray-300 rounded px-2 py-1"
                >
                  <option value="12h">12-hour (02:30 PM)</option>
                  <option value="24h">24-hour (14:30)</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Items Per Page</span>
                <select 
                  value={preferences.display.itemsPerPage}
                  onChange={(e) => updateDisplayPreference('itemsPerPage', parseInt(e.target.value))}
                  className="text-sm font-medium text-gray-800 border border-gray-300 rounded px-2 py-1"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-purple-600" />
              Privacy Settings
            </h3>
            
            <div className="space-y-3">
              {Object.entries(preferences.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={value} 
                      onChange={() => togglePrivacySetting(key)}
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

          {/* Localization */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:col-span-2">
            <h3 className="text-[15px] font-bold text-gray-800 flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-blue-600" />
              Localization
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Country</label>
                <select 
                  value={preferences.localization.country}
                  onChange={(e) => updateLocalization('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Timezone</label>
                <select 
                  value={preferences.localization.timezone}
                  onChange={(e) => updateLocalization('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="Asia/Dubai">Asia/Dubai</option>
                  <option value="Asia/Singapore">Asia/Singapore</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">First Day of Week</label>
                <select 
                  value={preferences.localization.firstDayOfWeek}
                  onChange={(e) => updateLocalization('firstDayOfWeek', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="Monday">Monday</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Currency</label>
                <select 
                  value={preferences.display.currency}
                  onChange={(e) => updateDisplayPreference('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save All Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleSave('All Preferences', 'All preferences saved successfully!')}
            className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save All Preferences
          </button>
        </div>
      </div>
    );
  };

  // ============ RENDER ACTIVE TAB ============
  const renderTab = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileInfoTab />;
      case 'bank':
        return <BankDetailsTab />;
      case 'kyc':
        return <KYCTab />;
      case 'branding':
        return <BrandingTab />;
      case 'preferences':
        return <PreferencesTab />;
      default:
        return <ProfileInfoTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="PROFILE & SETTINGS" 
        subtitle="Manage company info, bank details, and preferences" 
      />

      {/* Main Content - EXACT spacing */}
      <div className="p-6">
        {/* Tabs Navigation - EXACT match */}
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
              <p className="text-sm text-gray-600">Changes are auto-saved</p>
              <p className="text-[14px] text-gray-800">Last synced: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleSave('Sync', 'Settings synced successfully!')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Sync Now
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

export default ProfileSettings_Organizer;