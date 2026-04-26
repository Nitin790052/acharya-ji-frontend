import React, { useState, useEffect } from 'react';
import VendorPageHeader from '../../../components/VendorPageHeader';
import { useAuth } from '../../../auth/AuthContext';
import { useGetVendorProfileQuery, useUpdateVendorProfileMutation, useUploadVendorFileMutation } from '../../../../../services/vendorApi';
import { toast } from 'react-toastify';
import { getImageUrl } from '../../../../../config/apiConfig';

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
  const { user } = useAuth();
  const { data: profileResponse, isLoading: isFetching, refetch } = useGetVendorProfileQuery(user?._id, {
    skip: !user?._id
  });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateVendorProfileMutation();
  const [uploadFile] = useUploadVendorFileMutation();

  const [isLoading, setIsLoading] = useState(false);

  // ============ HANDLE COPY ============
  const handleCopy = (text, label) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  };
  const [activeTab, setActiveTab] = useState('temple');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState('');

  const vendorData = profileResponse?.data;

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
    name: '',
    subtitle: '',
    established: '',
    registrationNo: '',
    pan: '',
    tan: '',
    gstin: '',
    address: {
      line1: '', line2: '', city: '', district: '', state: '', pincode: '', country: 'India'
    },
    contact: {
      phone: '', alternatePhone: '', email: '', alternateEmail: '', website: ''
    },
    social: {
      facebook: '', twitter: '', instagram: '', youtube: ''
    },
    about: '',
    facilities: [],
    logo: null,
    avatar: null,
    coverPhoto: null
  });

  useEffect(() => {
    if (vendorData) {
      setTempleInfo({
        name: vendorData.name || '',
        subtitle: vendorData.businessName || '',
        established: vendorData.categoryData?.established || '',
        registrationNo: vendorData.categoryData?.registrationNo || '',
        pan: vendorData.panNumber || '',
        tan: vendorData.categoryData?.tan || '',
        gstin: vendorData.categoryData?.gstin || '',
        address: {
          line1: vendorData.categoryData?.address?.line1 || '',
          line2: vendorData.categoryData?.address?.line2 || '',
          city: vendorData.categoryData?.address?.city || vendorData.categoryData?.location || '',
          district: vendorData.categoryData?.address?.district || '',
          state: vendorData.categoryData?.address?.state || '',
          pincode: vendorData.categoryData?.address?.pincode || '',
          country: vendorData.categoryData?.address?.country || 'India'
        },
        contact: {
          phone: vendorData.phone || '',
          alternatePhone: vendorData.categoryData?.alternatePhone || '',
          email: vendorData.email || '',
          alternateEmail: vendorData.categoryData?.alternateEmail || '',
          website: vendorData.categoryData?.website || ''
        },
        social: vendorData.categoryData?.social || { facebook: '', twitter: '', instagram: '', youtube: '' },
        about: vendorData.categoryData?.about || '',
        facilities: vendorData.categoryData?.facilities || [],
        logo: vendorData.logo || null,
        avatar: vendorData.avatar || null,
        coverPhoto: vendorData.categoryData?.coverPhoto || null
      });
    }
  }, [vendorData]);

  // ============ TIMINGS DATA ============
  const [timings, setTimings] = useState({
    temple: {
      monday: { morning: '', evening: '', closed: false },
      tuesday: { morning: '', evening: '', closed: false },
      wednesday: { morning: '', evening: '', closed: false },
      thursday: { morning: '', evening: '', closed: false },
      friday: { morning: '', evening: '', closed: false },
      saturday: { morning: '', evening: '', closed: false },
      sunday: { morning: '', evening: '', closed: false },
      holidays: ''
    },
    aarti: [],
    specialTimings: []
  });

  // ============ BANK DETAILS DATA ============
  const [bankDetails, setBankDetails] = useState({
    primary: { bankName: '', branch: '', accountName: '', accountNumber: '', ifsc: '', upiId: '', verified: false, isPrimary: true },
    secondary: { bankName: '', branch: '', accountName: '', accountNumber: '', ifsc: '', upiId: '', verified: false, isPrimary: false }
  });

  useEffect(() => {
    if (vendorData) {
      // ... previous templeInfo set ...
      
      if (vendorData.categoryData?.timings) {
        setTimings(vendorData.categoryData.timings);
      }
      if (vendorData.categoryData?.bankDetails) {
        setBankDetails(vendorData.categoryData.bankDetails);
      }
    }
  }, [vendorData]);

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
  const handleSave = async (section, message = 'Settings saved successfully!', updatedData = null, updatedBankDetails = null, updatedTimings = null) => {
    try {
      setIsLoading(true);
      
      const dataToSave = updatedData || templeInfo;
      const bankToSave = updatedBankDetails || bankDetails;
      const timingsToSave = updatedTimings || timings;

      const formData = new FormData();
      
      formData.append('name', dataToSave.name);
      formData.append('businessName', dataToSave.subtitle);
      formData.append('phone', dataToSave.contact.phone);
      formData.append('email', dataToSave.contact.email);
      
      if (dataToSave.logoFile) formData.append('logo', dataToSave.logoFile);
      if (dataToSave.avatarFile) formData.append('avatar', dataToSave.avatarFile);

      const categoryData = {
        ...vendorData?.categoryData,
        established: dataToSave.established,
        registrationNo: dataToSave.registrationNo,
        tan: dataToSave.tan,
        gstin: dataToSave.gstin,
        address: dataToSave.address,
        alternatePhone: dataToSave.contact.alternatePhone,
        alternateEmail: dataToSave.contact.alternateEmail,
        website: dataToSave.contact.website,
        social: dataToSave.social,
        about: dataToSave.about,
        facilities: dataToSave.facilities,
        coverPhoto: dataToSave.coverPhoto,
        timings: timingsToSave,
        bankDetails: bankToSave
      };
      
      formData.append('categoryData', JSON.stringify(categoryData));
      formData.append('panNumber', dataToSave.pan);

      const result = await updateProfile({ id: user?._id, data: formData }).unwrap();
      
      if (result.success) {
        setSuccessMessage(message);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        refetch();
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.data?.message || 'Failed to update settings');
    } finally {
      setIsLoading(false);
    }
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
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);

    if (!showEditModal) return null;

    const INDIAN_BANKS = [
      "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", 
      "Bank of Baroda", "Canara Bank", "Union Bank of India", "Bank of India", "Indian Bank",
      "IndusInd Bank", "Kotak Mahindra Bank", "Yes Bank", "IDFC First Bank", "Federal Bank",
      "Standard Chartered Bank", "IDBI Bank", "RBL Bank", "Bandhan Bank", "UCO Bank"
    ];

    const validateIFSC = (ifsc) => {
      const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      return regex.test(ifsc);
    };

    const handleInputChange = (e) => {
      const { name, value, type, files } = e.target;
      
      if (type === 'file') {
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
            // Store the base64 for preview, and the file object for upload
            setFormData(prev => ({ 
              ...prev, 
              [name]: reader.result,
              [`${name}File`]: file 
            }));
          };
          reader.readAsDataURL(file);
        }
        return;
      }

      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error when typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const handleSubmit = () => {
      // Create a temporary object to hold updates
      let updatedInfo = { ...templeInfo };

      // Validation for Bank Details
      if (editType === 'Bank Details' || editType === 'Secondary Bank') {
        const newErrors = {};
        if (formData.ifsc && !validateIFSC(formData.ifsc)) {
          newErrors.ifsc = 'Invalid IFSC Format (e.g., ICIC0001234)';
        }
        if (formData.ifsc && formData.ifsc.length !== 11) {
          newErrors.ifsc = 'IFSC must be exactly 11 characters';
        }
        
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          toast.error('Please fix validation errors');
          return;
        }
      }

      // Merge formData into updatedInfo
      switch(editType) {
        case 'Temple Info':
          if (formData.field1) updatedInfo.name = formData.field1;
          if (formData.subtitle) updatedInfo.subtitle = formData.subtitle;
          if (formData.established) updatedInfo.established = formData.established;
          break;
        case 'Contact Info':
          updatedInfo.contact = {
            ...updatedInfo.contact,
            phone: formData.phone || updatedInfo.contact.phone,
            email: formData.email || updatedInfo.contact.email,
            alternatePhone: formData.alternatePhone || updatedInfo.contact.alternatePhone,
            alternateEmail: formData.alternateEmail || updatedInfo.contact.alternateEmail
          };
          break;
        case 'Address Details':
          updatedInfo.address = {
            ...updatedInfo.address,
            line1: formData.line1 || updatedInfo.address.line1,
            line2: formData.line2 || updatedInfo.address.line2,
            city: formData.city || updatedInfo.address.city,
            state: formData.state || updatedInfo.address.state,
            pincode: formData.pincode || updatedInfo.address.pincode
          };
          break;
        case 'Tax Info':
          if (formData.pan) updatedInfo.pan = formData.pan;
          if (formData.tan) updatedInfo.tan = formData.tan;
          if (formData.gstin) updatedInfo.gstin = formData.gstin;
          break;
        case 'Logo':
          if (formData.logoFile) {
            updatedInfo.logoFile = formData.logoFile;
            updatedInfo.logo = formData.logo; 
          }
          break;
        case 'Profile Photo':
          if (formData.avatarFile) {
            updatedInfo.avatarFile = formData.avatarFile;
            updatedInfo.avatar = formData.avatar;
          }
          break;
        case 'Bank Details':
        case 'Secondary Bank':
          const bankType = editType === 'Bank Details' ? 'primary' : 'secondary';
          const newBankData = {
            ...bankDetails[bankType],
            bankName: formData.bankName || bankDetails[bankType].bankName,
            ifsc: formData.ifsc || bankDetails[bankType].ifsc,
            accountNumber: formData.accountNumber || bankDetails[bankType].accountNumber,
            accountName: formData.accountName || bankDetails[bankType].accountName,
            upiId: formData.upiId || bankDetails[bankType].upiId
          };
          
          // Update the local state
          updateBankAccount(bankType, 'bankName', newBankData.bankName);
          updateBankAccount(bankType, 'ifsc', newBankData.ifsc);
          updateBankAccount(bankType, 'accountNumber', newBankData.accountNumber);
          
          // Pass the fresh bank data to handleSave
          const freshBankDetails = { ...bankDetails, [bankType]: newBankData };
          handleSave(editType, `${editType} updated successfully!`, updatedInfo, freshBankDetails);
          setShowEditModal(false);
          setImagePreview(null);
          return; // Exit early as we called handleSave manually with freshBankDetails
      }

      handleSave(editType, `${editType} updated successfully!`, updatedInfo);
      setShowEditModal(false);
      setImagePreview(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[110] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800">Edit {editType}</h3>
            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
          </div>

          <div className="p-8 space-y-4">
            {(editType === 'Bank Details' || editType === 'Secondary Bank') ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Bank</label>
                  <select name="bankName" onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm">
                    <option value="">Choose Bank...</option>
                    {INDIAN_BANKS.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">IFSC Code</label>
                  <input type="text" name="ifsc" placeholder="e.g. ICIC0001234" maxLength={11} onChange={handleInputChange} className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 uppercase outline-none shadow-sm ${errors.ifsc ? 'ring-2 ring-red-300 border-red-500' : ''}`} />
                  {errors.ifsc && <p className="text-[10px] text-red-500 font-bold mt-1 ml-1">{errors.ifsc}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account Number</label>
                  <input type="text" name="accountNumber" placeholder="Enter account number" onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
              </div>
            ) : editType === 'Logo' ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-orange-100 rounded-3xl bg-orange-50/30">
                  {imagePreview ? (
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-2 border-white mb-4">
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      <button onClick={() => setImagePreview(null)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><X className="w-3 h-3" /></button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-white rounded-2xl flex flex-col items-center justify-center text-orange-300 mb-4 border border-orange-100">
                      <Camera className="w-8 h-8 mb-1" />
                      <span className="text-[8px] font-black uppercase tracking-widest">No Logo</span>
                    </div>
                  )}
                  <input type="file" id="logo-upload" name="logo" accept="image/*" onChange={handleInputChange} className="hidden" />
                  <button onClick={() => document.getElementById('logo-upload').click()} className="px-6 py-2 bg-white text-orange-600 font-black rounded-xl border border-orange-200 hover:bg-orange-50 transition-all text-[10px] uppercase tracking-widest shadow-sm">
                    Select Logo
                  </button>
                </div>
              </div>
            ) : editType === 'Temple Info' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Temple Name</label>
                  <input type="text" name="field1" defaultValue={templeInfo.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subtitle / Business Name</label>
                  <input type="text" name="subtitle" defaultValue={templeInfo.subtitle} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Established Year</label>
                  <input type="text" name="established" defaultValue={templeInfo.established} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
              </div>
            ) : editType === 'Contact Info' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Phone</label>
                    <input type="text" name="phone" defaultValue={templeInfo.contact.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alternate Phone</label>
                    <input type="text" name="alternatePhone" defaultValue={templeInfo.contact.alternatePhone} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Primary Email</label>
                  <input type="email" name="email" defaultValue={templeInfo.contact.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alternate Email</label>
                  <input type="email" name="alternateEmail" defaultValue={templeInfo.contact.alternateEmail} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
              </div>
            ) : editType === 'Address Details' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address Line 1</label>
                  <input type="text" name="line1" defaultValue={templeInfo.address.line1} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                  <input type="text" name="city" defaultValue={templeInfo.address.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State</label>
                    <input type="text" name="state" defaultValue={templeInfo.address.state} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pincode</label>
                    <input type="text" name="pincode" defaultValue={templeInfo.address.pincode} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                  </div>
                </div>
              </div>
            ) : editType === 'Tax Info' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PAN Number</label>
                  <input type="text" name="pan" defaultValue={templeInfo.pan} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">TAN Number</label>
                  <input type="text" name="tan" defaultValue={templeInfo.tan} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">GSTIN</label>
                  <input type="text" name="gstin" defaultValue={templeInfo.gstin} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{editType} Field</label>
                  <input type="text" name="field1" placeholder={`Enter ${editType}`} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all font-bold text-gray-800 outline-none shadow-sm" />
                </div>
              </div>
            )}
            
            <div className="flex gap-3 pt-6">
              <button onClick={() => setShowEditModal(false)} className="flex-1 px-6 py-3 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">Cancel</button>
              <button onClick={handleSubmit} className="flex-1 px-6 py-3 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
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
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {templeInfo.logo ? (
                    <img src={templeInfo.logo.startsWith('data:') ? templeInfo.logo : getImageUrl(templeInfo.logo)} alt="Temple Logo" className="w-full h-full object-cover" />
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
                <button 
                  onClick={() => handleCopy(templeInfo.contact.phone, 'Phone number')}
                  className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                >
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
                <button 
                  onClick={() => handleCopy(templeInfo.contact.email, 'Email address')}
                  className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                >
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
                  setEditType('Address Details');
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
                  <button 
                    onClick={() => handleCopy(templeInfo.pan, 'PAN Number')}
                    className="p-1 text-gray-400 hover:text-orange-600 transition-colors"
                  >
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
