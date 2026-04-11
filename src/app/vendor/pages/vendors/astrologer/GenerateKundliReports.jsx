import { useState, useRef, useEffect } from 'react';
import { 
  FileText, Download, Upload, Printer, 
  Search, Filter, Plus, MoreVertical,
  Edit, Eye, Trash2, Share2, Send,
  Clock, CheckCircle, AlertCircle, XCircle,
  ChevronDown, ChevronUp, X, Users,
  BarChart, Calendar, User, Star,
  Globe, Home, Building, Hash,
  RefreshCw, Settings, LayoutTemplate,
  Mail, Smartphone, Database, Lock,
  Shield, History, FileArchive, Cloud,
  Sparkles, Calculator, Compass, Target, PieChart
} from 'lucide-react';

const GeneratorKundliReports = () => {
  const [activeTab, setActiveTab] = useState('generated');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [generationStep, setGenerationStep] = useState(1);
  const [reportType, setReportType] = useState('kundli');

  // Tabs
  const tabs = [
    { id: 'generated', label: 'Generated', count: 24, icon: FileText },
    { id: 'pending', label: 'Pending', count: 8, icon: Clock },
    { id: 'drafts', label: 'Drafts', count: 4, icon: Edit },
    { id: 'templates', label: 'Templates', count: 12, icon: LayoutTemplate }
  ];

  // Report types - Updated to use available icons
  const reportTypes = [
    { id: 'kundli', name: 'Kundli Report', icon: PieChart, color: 'from-purple-500 to-purple-600' },
    { id: 'dasha', name: 'Dasha Analysis', icon: BarChart, color: 'from-blue-500 to-blue-600' },
    { id: 'matching', name: 'Compatibility', icon: Users, color: 'from-pink-500 to-pink-600' },
    { id: 'horoscope', name: 'Horoscope', icon: Sparkles, color: 'from-yellow-500 to-yellow-600' },
    { id: 'yearly', name: 'Yearly Forecast', icon: Calendar, color: 'from-green-500 to-green-600' },
    { id: 'business', name: 'Business Report', icon: Building, color: 'from-orange-400 to-orange-500' }
  ];

  // Sample reports data
  const reports = {
    generated: [
      {
        id: 1,
        client: 'Rajesh Kumar',
        type: 'kundli',
        title: 'Detailed Kundli Analysis',
        generatedOn: '2024-01-15',
        status: 'delivered',
        size: '2.4 MB',
        pages: 24,
        language: 'English',
        deliveryMethod: 'email',
        previewUrl: '#',
        template: 'Professional View'
      },
      {
        id: 2,
        client: 'Priya Sharma',
        type: 'matching',
        title: 'Marriage Compatibility Report',
        generatedOn: '2024-01-14',
        status: 'delivered',
        size: '3.1 MB',
        pages: 18,
        language: 'Hindi',
        deliveryMethod: 'both',
        previewUrl: '#',
        template: 'Detailed Matching'
      },
      {
        id: 3,
        client: 'Amit Patel',
        type: 'dasha',
        title: 'Current Dasha Analysis',
        generatedOn: '2024-01-13',
        status: 'pending_delivery',
        size: '1.8 MB',
        pages: 12,
        language: 'English',
        deliveryMethod: 'app',
        previewUrl: '#',
        template: 'Standard'
      }
    ],
    pending: [
      {
        id: 4,
        client: 'Neha Kapoor',
        type: 'kundli',
        title: 'Birth Chart Analysis',
        requestedOn: '2024-01-16',
        status: 'in_progress',
        estimatedTime: '15 mins',
        progress: 75,
        assignedTo: 'Auto-generator',
        priority: 'high'
      },
      {
        id: 5,
        client: 'Ravi Malhotra',
        type: 'yearly',
        title: '2024 Yearly Forecast',
        requestedOn: '2024-01-16',
        status: 'queued',
        estimatedTime: '25 mins',
        progress: 20,
        assignedTo: 'Manual',
        priority: 'medium'
      }
    ],
    drafts: [
      {
        id: 6,
        client: 'Sonia Verma',
        type: 'business',
        title: 'Business Horoscope Draft',
        lastEdited: '2024-01-15',
        status: 'draft',
        sections: 3,
        autoSaved: '10 mins ago',
        previewUrl: '#'
      }
    ]
  };

  // Templates
  const templates = [
    {
      id: 1,
      name: 'Professional View',
      type: 'kundli',
      pages: 24,
      languages: ['English', 'Hindi'],
      isPopular: true,
      preview: 'Detailed planetary positions with remedies'
    },
    {
      id: 2,
      name: 'Simple Kundli',
      type: 'kundli',
      pages: 8,
      languages: ['English'],
      isPopular: false,
      preview: 'Basic birth chart with essential details'
    },
    {
      id: 3,
      name: 'Detailed Matching',
      type: 'matching',
      pages: 16,
      languages: ['Hindi', 'English'],
      isPopular: true,
      preview: 'Detailed compatibility analysis'
    },
    {
      id: 4,
      name: 'Standard',
      type: 'dasha',
      pages: 12,
      languages: ['English'],
      isPopular: false,
      preview: 'Period-based predictions'
    }
  ];

  // Stats
  const stats = [
    { title: 'Total Reports', value: '36', change: '+12%', icon: FileText, color: 'orange' },
    { title: 'This Month', value: '8', change: '+2', icon: Calendar, color: 'blue' },
    { title: 'Avg. Generation', value: '4.2 mins', change: '-0.8', icon: Clock, color: 'green' },
    { title: 'Client Satisfaction', value: '96%', change: '+3%', icon: Star, color: 'purple' }
  ];

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Get status badge - Fixed to match image exactly
  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-medium">
          ✓ Delivered
        </span>;
      case 'pending_delivery':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 text-xs font-medium">
          <Clock className="w-3 h-3" /> Pending Delivery
        </span>;
      case 'in_progress':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
          <RefreshCw className="w-3 h-3" /> In Progress
        </span>;
      case 'queued':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-xs font-medium">
          <Clock className="w-3 h-3" /> Queued
        </span>;
      case 'draft':
        return <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-medium">
          <Edit className="w-3 h-3" /> Draft
        </span>;
      default:
        return null;
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    const typeData = reportTypes.find(t => t.id === type);
    return typeData ? <typeData.icon className="w-4 h-4" /> : <FileText className="w-4 h-4" />;
  };

  // Get type color
  const getTypeColor = (type) => {
    const typeData = reportTypes.find(t => t.id === type);
    return typeData ? typeData.color : 'from-gray-500 to-gray-600';
  };

  // Event handlers for report actions
  const handleViewReport = (report) => {
    console.log('Viewing report:', report.title);
    setSelectedReport(report);
  };

  const handleDownloadReport = (report) => {
    console.log('Downloading report:', report.title);
    alert(`Downloading ${report.title}...`);
  };

  const handleSendReport = (report) => {
    console.log('Sending report:', report.title);
    alert(`Sending ${report.title} to ${report.client}...`);
  };

  const handlePrintReport = (report) => {
    console.log('Printing report:', report.title);
    alert(`Printing ${report.title}...`);
  };

  const handleResendReport = (report) => {
    console.log('Resending report:', report.title);
    alert(`Resending ${report.title} to ${report.client}...`);
  };

  const handleDeleteReport = (report) => {
    console.log('Deleting report:', report.title);
    if (window.confirm(`Are you sure you want to delete "${report.title}"?`)) {
      alert(`Report "${report.title}" deleted successfully.`);
    }
  };

  const handlePreviewReport = (report) => {
    console.log('Previewing report:', report.title);
    setSelectedReport(report);
  };

  const handleShareReport = (report) => {
    console.log('Sharing report:', report.title);
    alert(`Sharing link for ${report.title}...`);
  };

  // Custom hook to handle click outside
  const useClickOutside = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  };

  // Report Card Component - Fixed with all functionality
  const ReportCard = ({ report, tab }) => {
    const [showActions, setShowActions] = useState(false);
    const actionsRef = useRef(null);
    
    // Use the click outside hook
    useClickOutside(actionsRef, () => {
      if (showActions) setShowActions(false);
    });

    // Render template section with specific buttons as shown in image
    const renderTemplateSection = () => {
      if (tab !== 'generated' || !report.template) return null;
      
      return (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Template: {report.template}</span>
            <div className="flex gap-1">
              {report.client === 'Rajesh Kumar' ? (
                <>
                  <button 
                    onClick={() => handleResendReport(report)}
                    className="px-2 py-0.5 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    Resend
                  </button>
                  <button 
                    onClick={() => handleDeleteReport(report)}
                    className="px-2 py-0.5 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => handleViewReport(report)}
                  className="px-2 py-0.5 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  View
                </button>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-all">
        <div className="p-3">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-2 flex-1">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getTypeColor(report.type)} 
                              flex items-center justify-center flex-shrink-0`}>
                {getTypeIcon(report.type)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{report.title}</h3>
                  {getStatusBadge(report.status)}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-700">{report.client}</span>
                </div>
              </div>
            </div>
            
            <div className="relative" ref={actionsRef}>
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
                  <button 
                    onClick={() => {
                      handlePreviewReport(report);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </button>
                  <button 
                    onClick={() => {
                      handleDownloadReport(report);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3 h-3" /> Download
                  </button>
                  <button 
                    onClick={() => {
                      handleShareReport(report);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <Share2 className="w-3 h-3" /> Share
                  </button>
                  <button 
                    onClick={() => {
                      handleSendReport(report);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-3 h-3" /> Resend
                  </button>
                  <button 
                    onClick={() => {
                      handleDeleteReport(report);
                      setShowActions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details - Simplified to match image */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs text-gray-700">
                {tab === 'generated' ? 'Generated: ' : 
                 tab === 'pending' ? 'Requested: ' : 
                 'Last Edited: '}
                {formatDate(report.generatedOn || report.requestedOn || report.lastEdited)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs text-gray-700">{report.size || 'N/A'}</span>
            </div>
          </div>

          {/* Language for Priya Sharma's report */}
          {report.client === 'Priya Sharma' && report.language && (
            <div className="mb-2">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-700">{report.language}</span>
              </div>
            </div>
          )}

          {/* Template section - exactly as shown in image */}
          {renderTemplateSection()}

          {/* Progress for pending reports */}
          {tab === 'pending' && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Progress: {report.progress}%</span>
                <span>{report.estimatedTime} remaining</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                  style={{ width: `${report.progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Assigned to: {report.assignedTo} • Priority: 
                <span className={`ml-1 px-1.5 py-0.5 rounded ${
                  report.priority === 'high' ? 'bg-red-100 text-red-700' :
                  report.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {report.priority}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100">
            <button 
              onClick={() => handleViewReport(report)}
              className="flex-1 px-2 py-1.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-xs hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              <Eye className="inline w-3.5 h-3.5 mr-1" />
              View
            </button>
            <button 
              onClick={() => handleDownloadReport(report)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleSendReport(report)}
              className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handlePrintReport(report)}
              className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Template Card Component with functionality
  const TemplateCard = ({ template }) => {
    const handleUseTemplate = () => {
      console.log('Using template:', template.name);
      setReportType(template.type);
      setShowGenerator(true);
      setGenerationStep(3);
    };

    const handlePreviewTemplate = () => {
      console.log('Previewing template:', template.name);
      alert(`Previewing ${template.name} template...`);
    };

    const handleEditTemplate = () => {
      console.log('Editing template:', template.name);
      alert(`Editing ${template.name} template...`);
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-all">
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-start gap-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getTypeColor(template.type)} 
                              flex items-center justify-center flex-shrink-0`}>
                {getTypeIcon(template.type)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-gray-800 text-sm">{template.name}</h3>
                  {template.isPopular && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                      <Star className="w-3 h-3" />
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{template.pages} pages</p>
              </div>
            </div>
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-700 mb-3 line-clamp-2">{template.preview}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {template.languages.map((lang, idx) => (
                <span key={idx} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                  {lang}
                </span>
              ))}
            </div>
            <div className="flex gap-1">
              <button 
                onClick={handleUseTemplate}
                className="p-1.5 text-orange-600 hover:bg-orange-50 rounded transition-colors" 
                title="Use Template"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button 
                onClick={handlePreviewTemplate}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={handleEditTemplate}
                className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition-colors" 
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=''>
      {/* Header Section - Exact Same Styling */}
      <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40  
                    px-3 py-1.5 border border-orange-100">
        
        {/* Mobile: Column, Desktop: Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          
          {/* Title Section */}
          <div className="text-left sm:text-left flex items-end gap-2">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-orange-900 uppercase
                            leading-tight">
                Reports & Kundli Generator
              </h1>
              {/* Mobile: Below heading, Desktop: Right side */}
              <p className="sm:hidden text-sm text-gray-600 mt-0.5">
                Generate and manage astrological reports
              </p>
            </div>
            
            {/* Desktop: Right side of heading */}
            <p className="hidden sm:block text-sm text-gray-600 mb-0.5">
              Generate and manage astrological reports
            </p>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUploadModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 
                         border border-orange-500 text-orange-600 
                         rounded-lg hover:bg-orange-50 
                         transition-all shadow-sm text-sm"
            >
              <Upload className="w-4 h-4" />
              Upload Report
            </button>
            <button
              onClick={() => setShowGenerator(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 
                         bg-gradient-to-r from-orange-400 to-orange-500 text-white 
                         rounded-lg hover:from-orange-600 hover:to-orange-700 
                         transition-all shadow-sm text-sm"
            >
              <Plus className="w-4 h-4" />
              Generate New
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 
                                      p-3 rounded-lg border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-800">{stat.title}</p>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
                    <span className="text-xs font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-1.5 rounded ${
                  stat.color === 'orange' ? 'bg-orange-50' :
                  stat.color === 'blue' ? 'bg-blue-50' :
                  stat.color === 'green' ? 'bg-green-50' :
                  'bg-purple-50'
                }`}>
                  <stat.icon className={`w-4 h-4 ${
                    stat.color === 'orange' ? 'text-orange-500' :
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'green' ? 'text-green-500' :
                  'text-purple-500'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-wrap gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports by client name, type, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden sm:flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[120px]"
              >
                <option value="all">All Types</option>
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              
              {activeTab !== 'templates' && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent min-w-[120px]"
                >
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending_delivery">Pending Delivery</option>
                  <option value="in_progress">In Progress</option>
                </select>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="sm:hidden mt-3 p-3 border border-gray-200 rounded bg-gray-50">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All Types</option>
                    {reportTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                {activeTab !== 'templates' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="all">All Status</option>
                      <option value="delivered">Delivered</option>
                      <option value="pending_delivery">Pending Delivery</option>
                      <option value="in_progress">In Progress</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'generated' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {reports.generated.map(report => (
              <ReportCard key={report.id} report={report} tab="generated" />
            ))}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {reports.pending.map(report => (
              <ReportCard key={report.id} report={report} tab="pending" />
            ))}
          </div>
        )}

        {activeTab === 'drafts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {reports.drafts.map(report => (
              <ReportCard key={report.id} report={report} tab="drafts" />
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {templates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}

        {((activeTab === 'generated' && reports.generated.length === 0) ||
          (activeTab === 'pending' && reports.pending.length === 0) ||
          (activeTab === 'drafts' && reports.drafts.length === 0)) && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <FileText className="text-gray-400 w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-gray-700 mb-1.5">No reports found</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
              {activeTab === 'generated' ? 'No reports have been generated yet' :
               activeTab === 'pending' ? 'No pending report generation requests' :
               'No draft reports saved'}
            </p>
            <button
              onClick={() => setShowGenerator(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              Generate First Report
            </button>
          </div>
        )}
      </div>

      {/* Kundli Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Generate New Report</h2>
                <button 
                  onClick={() => {
                    setShowGenerator(false);
                    setGenerationStep(1);
                  }}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Steps */}
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3, 4].map(step => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === generationStep 
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' 
                        : step < generationStep 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {step < generationStep ? <CheckCircle className="w-4 h-4" /> : step}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">
                      {step === 1 && 'Select Type'}
                      {step === 2 && 'Enter Details'}
                      {step === 3 && 'Choose Template'}
                      {step === 4 && 'Generate'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Select Report Type */}
              {generationStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-800">Select Report Type</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {reportTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setReportType(type.id);
                          setGenerationStep(2);
                        }}
                        className={`p-4 border rounded-lg text-center transition-all hover:shadow-md ${
                          reportType === type.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-300 hover:border-orange-300'
                        }`}
                      >
                        <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-r ${type.color} 
                                      flex items-center justify-center mb-2`}>
                          <type.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Enter Details */}
              {generationStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-800">Enter Birth Details</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Client *
                        </label>
                        <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                          <option value="">Choose a client...</option>
                          <option value="1">Rajesh Kumar</option>
                          <option value="2">Priya Sharma</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Or Enter New Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                          placeholder="Client name"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Birth Details</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Date of Birth *</label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Time of Birth *</label>
                          <input
                            type="time"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Gender *</label>
                          <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-xs text-gray-600 mb-1">Place of Birth *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                          placeholder="City, State, Country"
                        />
                      </div>
                    </div>

                    {/* For matching reports */}
                    {reportType === 'matching' && (
                      <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Partner Details</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Partner Name"
                            className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                          />
                          <input
                            type="date"
                            placeholder="Partner DOB"
                            className="px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setGenerationStep(1)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setGenerationStep(3)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm"
                      >
                        Next: Choose Template →
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Choose Template */}
              {generationStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-800">Choose Report Template</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {templates
                      .filter(t => t.type === reportType || reportType === 'all')
                      .map(template => (
                        <div key={template.id} className="border border-gray-300 rounded-lg p-3 hover:border-orange-500 cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-semibold text-gray-800">{template.name}</h4>
                                {template.isPopular && (
                                  <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">Popular</span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">{template.pages} pages • {template.languages.join(', ')}</p>
                              <p className="text-sm text-gray-700 mt-1">{template.preview}</p>
                            </div>
                            <input type="radio" name="template" className="mt-1" />
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setGenerationStep(2)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setGenerationStep(4)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm"
                    >
                      Next: Generate →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Generate */}
              {generationStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-gray-800">Generate & Deliver</h3>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-800">Ready to Generate</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      Your {reportTypes.find(t => t.id === reportType)?.name} report will be generated with the selected template.
                    </p>
                  </div>

                  {/* Delivery Options */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-800">Delivery Options</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <label className="flex items-center gap-2 p-3 border border-gray-300 rounded hover:border-orange-500 cursor-pointer">
                        <input type="checkbox" className="text-orange-500" />
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium text-gray-800">Email</div>
                          <div className="text-xs text-gray-600">Send to client's email</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-gray-300 rounded hover:border-orange-500 cursor-pointer">
                        <input type="checkbox" className="text-orange-500" />
                        <Smartphone className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium text-gray-800">App</div>
                          <div className="text-xs text-gray-600">Deliver in app</div>
                        </div>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-gray-300 rounded hover:border-orange-500 cursor-pointer">
                        <input type="checkbox" className="text-orange-500" />
                        <Download className="w-5 h-5 text-gray-500" />
                        <div>
                          <div className="font-medium text-gray-800">Download</div>
                          <div className="text-xs text-gray-600">Save to your library</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="text-orange-500 rounded" />
                      <span className="text-sm text-gray-700">Include Dasha Analysis</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="text-orange-500 rounded" />
                      <span className="text-sm text-gray-700">Add Personalized Remedies</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="text-orange-500 rounded" />
                      <span className="text-sm text-gray-700">Generate PDF with Charts</span>
                    </label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setGenerationStep(3)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowGenerator(false);
                        setGenerationStep(1);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:from-green-600 hover:to-green-700 text-sm"
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="px-5 py-3 sm:px-5 sm:py-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">Upload Manual Report</h2>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-orange-500 transition-colors">
                  <Upload className="w-12 h-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-800 mb-1">Drop PDF file here</h3>
                  <p className="text-sm text-gray-600 mb-3">or click to browse</p>
                  <input type="file" accept=".pdf" className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm cursor-pointer hover:from-orange-600 hover:to-orange-700">
                    Select File
                  </label>
                  <p className="text-xs text-gray-500 mt-2">Max file size: 10MB</p>
                </div>

                {/* Report Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Report Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      placeholder="e.g., Kundli Analysis for Rajesh"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client *
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                        <option value="">Select client...</option>
                        <option value="1">Rajesh Kumar</option>
                        <option value="2">Priya Sharma</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Report Type
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                        {reportTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                      placeholder="Brief description of the report..."
                    />
                  </div>
                </div>

                {/* Delivery Status */}
                <div className="bg-gray-50 px-3 py-2 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="text-orange-500 rounded" />
                    <div>
                      <span className="font-medium text-gray-800 text-sm">Mark as Delivered</span>
                      <p className="text-sm text-gray-600">Client has already received this report</p>
                    </div>
                  </label>
                </div>

                {/* Modal Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Upload Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[85vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Report Details</h2>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Report Info */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${getTypeColor(selectedReport.type)} 
                                    flex items-center justify-center flex-shrink-0`}>
                        {getTypeIcon(selectedReport.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{selectedReport.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-sm text-gray-700">
                            <User className="w-4 h-4" /> {selectedReport.client}
                          </span>
                          {getStatusBadge(selectedReport.status)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Report Preview */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">PDF Preview</h4>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleDownloadReport(selectedReport)}
                          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handlePrintReport(selectedReport)}
                          className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="h-64 bg-gray-50 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Delivery Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">Generated On</label>
                        <div className="font-medium">{formatDate(selectedReport.generatedOn)}</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">File Size</label>
                        <div className="font-medium">{selectedReport.size}</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Pages</label>
                        <div className="font-medium">{selectedReport.pages}</div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Language</label>
                        <div className="font-medium">{selectedReport.language}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-4">
                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <button 
                        onClick={() => handleDownloadReport(selectedReport)}
                        className="w-full flex items-center gap-2 p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                      >
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                      <button 
                        onClick={() => handleSendReport(selectedReport)}
                        className="w-full flex items-center gap-2 p-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                      >
                        <Send className="w-4 h-4" /> Resend to Client
                      </button>
                      <button 
                        onClick={() => handleShareReport(selectedReport)}
                        className="w-full flex items-center gap-2 p-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
                      >
                        <Share2 className="w-4 h-4" /> Share Link
                      </button>
                      <button 
                        onClick={() => handlePrintReport(selectedReport)}
                        className="w-full flex items-center gap-2 p-2 bg-gray-50 text-gray-700 rounded hover:bg-gray-100 transition-colors"
                      >
                        <Printer className="w-4 h-4" /> Print Copy
                      </button>
                    </div>
                  </div>

                  {/* Dasha Analysis */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Dasha Analysis</h4>
                    <p className="text-sm text-gray-600 mb-3">Current planetary periods and effects</p>
                    <button 
                      onClick={() => {
                        setShowGenerator(true);
                        setReportType('dasha');
                        setSelectedReport(null);
                      }}
                      className="w-full px-3 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded text-sm hover:from-orange-600 hover:to-orange-700 transition-all"
                    >
                      Generate Dasha Report
                    </button>
                  </div>

                  {/* Report Templates */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Available Templates</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded border border-gray-200 transition-colors">
                        Professional Vedic Format
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded border border-gray-200 transition-colors">
                        Simple Summary Format
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded border border-gray-200 transition-colors">
                        Detailed Analysis Format
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratorKundliReports;