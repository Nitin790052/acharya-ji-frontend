import React, { useState } from 'react';
import { 
  Star, 
  Filter, 
  Download, 
  MoreVertical,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  X,
  Edit,
  Trash2,
  ArrowUpRight,
  CalendarDays,
  User,
  Package,
  TrendingUp
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const ReviewsPuja = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock Data
  const reviewsData = {
    overallStats: {
      averageRating: 4.7,
      totalReviews: 342,
      fiveStar: 245,
      fourStar: 68,
      threeStar: 18,
      twoStar: 8,
      oneStar: 3,
      responseRate: '92%',
      avgResponseTime: '4 hours'
    },
    
    recentReviews: [
      {
        id: 'REV-001',
        product: 'Premium Diya Set',
        customer: 'Rajesh Kumar',
        rating: 5,
        comment: 'Excellent quality! The diyas are beautifully crafted and burn perfectly. Highly recommended for home puja.',
        date: '2 hours ago',
        status: 'published',
        verified: true,
        helpful: 12,
        images: ['🪔', '🪔'],
        productId: 'P001',
        response: {
          text: 'Thank you for your kind words! We\'re glad you liked our diya set. 🙏',
          date: '1 hour ago',
          status: 'replied'
        }
      },
      {
        id: 'REV-002',
        product: 'Pure Cow Ghee',
        customer: 'Priya Sharma',
        rating: 4,
        comment: 'Good quality ghee, authentic smell. Packaging could be better though.',
        date: '5 hours ago',
        status: 'published',
        verified: true,
        helpful: 8,
        productId: 'P002',
        response: null
      },
      {
        id: 'REV-003',
        product: 'Natural Agarbatti',
        customer: 'Amit Patel',
        rating: 3,
        comment: 'Average fragrance, burns quickly. Expected better for the price.',
        date: '1 day ago',
        status: 'pending',
        verified: false,
        helpful: 3,
        productId: 'P003',
        response: null
      },
      {
        id: 'REV-004',
        product: 'Sandalwood Paste',
        customer: 'Sunita Singh',
        rating: 5,
        comment: 'Pure sandalwood! Perfect consistency and authentic fragrance. Will buy again.',
        date: '2 days ago',
        status: 'published',
        verified: true,
        helpful: 15,
        productId: 'P005',
        response: {
          text: 'We\'re delighted you found our sandalwood paste authentic! Thank you for your review. 🎨',
          date: '1 day ago',
          status: 'replied'
        }
      },
      {
        id: 'REV-005',
        product: 'Flower Garland',
        customer: 'Vikram Mehta',
        rating: 2,
        comment: 'Flowers were wilted on arrival. Very disappointed.',
        date: '3 days ago',
        status: 'reported',
        verified: true,
        helpful: 2,
        productId: 'P006',
        response: {
          text: 'We apologize for the issue. Please check your email for refund details.',
          date: '2 days ago',
          status: 'replied'
        }
      },
    ],
    
    topProducts: [
      { id: 'P001', name: 'Premium Diya Set', rating: 4.9, reviews: 89, sales: 420 },
      { id: 'P002', name: 'Pure Cow Ghee', rating: 4.7, reviews: 67, sales: 380 },
      { id: 'P003', name: 'Natural Agarbatti', rating: 4.5, reviews: 45, sales: 520 },
      { id: 'P005', name: 'Sandalwood Paste', rating: 4.8, reviews: 32, sales: 245 },
      { id: 'P010', name: 'Brass Bell', rating: 4.6, reviews: 28, sales: 150 },
    ],
    
    reportedReviews: [
      { id: 'REP-001', reviewId: 'REV-005', reason: 'Product damaged', status: 'resolved', date: '2 days ago' },
      { id: 'REP-002', reviewId: 'REV-008', reason: 'Inappropriate content', status: 'pending', date: '5 days ago' },
      { id: 'REP-003', reviewId: 'REV-012', reason: 'Fake review', status: 'investigating', date: '1 week ago' },
    ]
  };

  // Status styling
  const getStatusStyles = (status) => {
    const base = "px-2 py-0.5 rounded-full text-sm font-medium flex items-center gap-1";
    switch(status) {
      case 'published': 
        return `${base} bg-green-50 text-green-700`;
      case 'pending': 
        return `${base} bg-yellow-50 text-yellow-600`;
      case 'reported': 
        return `${base} bg-red-50 text-red-700`;
      case 'replied': 
        return `${base} bg-blue-50 text-blue-600`;
      case 'resolved': 
        return `${base} bg-green-50 text-green-700`;
      case 'investigating': 
        return `${base} bg-orange-50 text-orange-500`;
      default: 
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'published': 
      case 'replied':
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
      case 'investigating':
        return <Clock className="w-4 h-4" />;
      case 'reported':
        return <AlertTriangle className="w-4 h-4" />;
      default: 
        return <MoreVertical className="w-4 h-4" />;
    }
  };

  // Star rating display
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Format date
  const formatDate = (dateStr) => {
    return dateStr;
  };

  // Handle actions
  const handleAction = (action, reviewId = null) => {
    setIsLoading(true);
    
    switch(action) {
      case 'reply':
        setSelectedReview(reviewId);
        break;
        
      case 'submitReply':
        console.log('Submitting reply:', replyText);
        // In a real app, you would save this to backend
        setReplyText('');
        setSelectedReview(null);
        break;
        
      case 'deleteReview':
        if (window.confirm('Are you sure you want to delete this review?')) {
          console.log('Deleting review:', reviewId);
        }
        break;
        
      case 'markHelpful':
        console.log('Marking review as helpful:', reviewId);
        break;
        
      case 'reportSpam':
        console.log('Reporting review as spam:', reviewId);
        break;
        
      case 'downloadReport':
        const reportData = {
          date: new Date().toLocaleDateString('en-IN'),
          stats: reviewsData.overallStats,
          recentReviews: reviewsData.recentReviews,
          topProducts: reviewsData.topProducts
        };
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `reviews-report-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
        
      case 'viewProduct':
        console.log('Viewing product for review:', reviewId);
        break;
        
      case 'markAsResolved':
        console.log('Marking as resolved:', reviewId);
        break;
    }
    
    setTimeout(() => setIsLoading(false), 500);
  };

  // Filter reviews
  const filteredReviews = reviewsData.recentReviews.filter(review => {
    // Search filter
    if (searchTerm) {
      return (
        review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (filter !== 'all' && review.status !== filter) {
      return false;
    }
    
    return true;
  });

  // Calculate rating percentage
  const calculatePercentage = (count) => {
    return Math.round((count / reviewsData.overallStats.totalReviews) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="REVIEWS & RATINGS" 
        subtitle="Manage customer feedback and ratings" 
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700">Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-4 p-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg px-3 py-2 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <p className="text-[18px] text-gray-600 ">
                Monitor and respond to customer feedback
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Avg. Response Time</p>
                <p className="text-[15px] font-semibold text-orange-500">
                  {reviewsData.overallStats.avgResponseTime}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-50 rounded flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Average Rating */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {reviewsData.overallStats.averageRating}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-green-700">Excellent</span>
                </div>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>

          {/* Total Reviews */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {reviewsData.overallStats.totalReviews}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3 text-green-700" />
                  <span className="text-sm text-green-700">+42 this month</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Response Rate */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {reviewsData.overallStats.responseRate}
                </p>
                <p className="text-sm text-gray-500 mt-2">315 replies</p>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
              </div>
            </div>
          </div>

          {/* Reported Reviews */}
          <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-gray-200 px-3 py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reported Reviews</p>
                <p className="text-xl font-semibold text-gray-800 mt-1">
                  {reviewsData.reportedReviews.length}
                </p>
                <p className="text-xs text-orange-500 mt-2">Action needed</p>
              </div>
              <div className="p-2 bg-red-50 rounded">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Recent Reviews */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reviews by product, customer, or comment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                {/* Filter */}
                <div className="flex gap-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Reviews</option>
                    <option value="published">Published</option>
                    <option value="pending">Pending</option>
                    <option value="reported">Reported</option>
                    <option value="replied">Replied</option>
                  </select>
                  
                  <button 
                    onClick={() => handleAction('downloadReport')}
                    className="px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Reviews List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40">
                <div className="flex items-center justify-between ">
                  <h3 className="text-[15px] font-bold text-gray-800">Recent Reviews</h3>
                  <span className="text-sm text-gray-600">{filteredReviews.length} reviews</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="p-4 hover:bg-gray-50 transition-colors">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1">
                            <h4 className="text-[14px] font-semibold text-gray-800">{review.product}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {renderStars(review.rating)}
                              <span className={getStatusStyles(review.status)}>
                                {getStatusIcon(review.status)}
                                <span className="hidden sm:inline ml-1">{review.status}</span>
                              </span>
                              {review.verified && (
                                <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-700 flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {review.customer}
                            </span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <button 
                            onClick={() => handleAction('viewProduct', review.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Review Comment */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {review.comment}
                      </p>
                      
                      {/* Review Images */}
                      {review.images && (
                        <div className="flex gap-2 mt-2">
                          {review.images.map((img, idx) => (
                            <div key={idx} className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                              {img}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Helpful Count */}
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          {review.helpful} people found this helpful
                        </span>
                      </div>
                    </div>

                    {/* Owner Response */}
                    {review.response && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-xs font-semibold text-orange-600">Y</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800">Your Response</span>
                          <span className="text-xs text-gray-500">{review.response.date}</span>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                          <p className="text-sm text-gray-700">{review.response.text}</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                      {!review.response && (
                        <button 
                          onClick={() => handleAction('reply', review.id)}
                          className="px-3 py-1.5 bg-orange-50 text-orange-500 text-sm font-medium rounded border border-orange-300 hover:bg-orange-100 flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Reply
                        </button>
                      )}
                      
                      <button 
                        onClick={() => handleAction('markHelpful', review.id)}
                        className="px-3 py-1.5 bg-gray-50 text-gray-800 text-sm font-medium rounded border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark Helpful
                      </button>
                      
                      <button 
                        onClick={() => handleAction('reportSpam', review.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded border border-red-300 hover:bg-red-100 flex items-center gap-2"
                      >
                        <AlertTriangle className="w-4 h-4" />
                        Report Spam
                      </button>
                      
                      <button 
                        onClick={() => handleAction('deleteReview', review.id)}
                        className="px-3 py-1.5 bg-white text-red-600 text-sm font-medium rounded border border-red-300 hover:bg-red-50 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>

                    {/* Reply Form */}
                    {selectedReview === review.id && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply to the customer..."
                          className="w-full px-4 py-2 rounded-lg border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                          rows="3"
                        />
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setSelectedReview(null)}
                            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => handleAction('submitReply')}
                            className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
                          >
                            Submit Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Top Products */}
          <div className="space-y-4">
            {/* Rating Distribution */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-800">Rating Distribution</h3>
                <button className="text-sm text-orange-500 font-medium">
                  View Details →
                </button>
              </div>
              
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{stars} ★</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ 
                              width: `${calculatePercentage(
                                stars === 5 ? reviewsData.overallStats.fiveStar :
                                stars === 4 ? reviewsData.overallStats.fourStar :
                                stars === 3 ? reviewsData.overallStats.threeStar :
                                stars === 2 ? reviewsData.overallStats.twoStar :
                                reviewsData.overallStats.oneStar
                              )}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {stars === 5 ? reviewsData.overallStats.fiveStar :
                         stars === 4 ? reviewsData.overallStats.fourStar :
                         stars === 3 ? reviewsData.overallStats.threeStar :
                         stars === 2 ? reviewsData.overallStats.twoStar :
                         reviewsData.overallStats.oneStar}
                        ({calculatePercentage(
                          stars === 5 ? reviewsData.overallStats.fiveStar :
                          stars === 4 ? reviewsData.overallStats.fourStar :
                          stars === 3 ? reviewsData.overallStats.threeStar :
                          stars === 2 ? reviewsData.overallStats.twoStar :
                          reviewsData.overallStats.oneStar
                        )}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Rated Products */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-800">Top Rated Products</h3>
                <button className="text-sm text-orange-500 font-medium">
                  See All →
                </button>
              </div>
              
              <div className="space-y-3">
                {reviewsData.topProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">{product.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(product.rating)}
                          <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">{product.sales} sold</div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reported Reviews */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-[15px] font-bold text-gray-800 mb-4">Reported Reviews</h3>
              
              <div className="space-y-3">
                {reviewsData.reportedReviews.map((report) => (
                  <div key={report.id} className="p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-gray-800">{report.reviewId}</div>
                      <span className={getStatusStyles(report.status)}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1">{report.status}</span>
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{report.reason}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{report.date}</span>
                      <button 
                        onClick={() => handleAction('markAsResolved', report.id)}
                        className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded border border-green-300 hover:bg-green-100"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tip Card */}
            <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg p-3 border border-orange-200">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">Best Practice</h4>
                  <p className="text-xs text-gray-700">
                    Respond to reviews within 24 hours. Personalized responses improve customer satisfaction by 42%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Need help managing reviews?</p>
              <p className="text-[14px] text-gray-800">Contact support: +91 98765 43210</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('downloadReport')}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
              >
                Download Report
              </button>
              <button 
                onClick={() => console.log('View all reviews')}
                className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-300 to-orange-300 text-gray-800 hover:text-white rounded hover:from-orange-500 hover:to-orange-600"
              >
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPuja;