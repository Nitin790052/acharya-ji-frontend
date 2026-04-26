import { useState, useEffect } from 'react';
import { 
  Star, MessageSquare, Filter, Search,
  ThumbsUp, Award, TrendingUp, Users,
  ChevronDown, ChevronUp, MoreVertical,
  Edit, Trash2, CheckCircle, XCircle,
  AlertCircle, Clock, Calendar, User,
  Shield, Heart, Flag, Share2,
  Download, Printer, Mail, RefreshCw,
  Plus, X, ArrowUpRight, BarChart,
  Quote, FileText, Home, Globe,
  Building, Hash, Crown, Sparkles
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const ReviewsRatings = () => {
  const [filter, setFilter] = useState('all'); // all, 5-star, 4-star, 3-star, 2-star, 1-star
  const [sortBy, setSortBy] = useState('recent'); // recent, highest, lowest, helpful
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Rating statistics
  const ratingStats = {
    average: 4.8,
    total: 142,
    breakdown: [
      { stars: 5, count: 120, percent: 84 },
      { stars: 4, count: 18, percent: 13 },
      { stars: 3, count: 3, percent: 2 },
      { stars: 2, count: 1, percent: 1 },
      { stars: 1, count: 0, percent: 0 }
    ],
    lastMonth: 4.9,
    trend: 'up'
  };

  // Review categories
  const categories = [
    { id: 'accuracy', name: 'Accuracy', rating: 4.9, count: 128 },
    { id: 'guidance', name: 'Guidance', rating: 4.8, count: 142 },
    { id: 'communication', name: 'Communication', rating: 4.7, count: 135 },
    { id: 'remedies', name: 'Remedies', rating: 4.6, count: 98 },
    { id: 'timeliness', name: 'Timeliness', rating: 4.9, count: 140 }
  ];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      client: 'Rajesh Kumar',
      rating: 5,
      date: '2024-01-15',
      service: 'Ganpati Puja',
      type: 'home',
      content: 'Excellent guidance! The puja was conducted with great devotion. The remedies suggested have already shown positive effects in my life.',
      helpful: 8,
      verified: true,
      reply: {
        content: 'Thank you Rajesh! Glad to hear the remedies are working for you.',
        date: '2024-01-15',
        time: '2:30 PM'
      },
      tags: ['Accurate Predictions', 'Helpful Remedies', 'Professional']
    },
    {
      id: 2,
      client: 'Priya Sharma',
      rating: 4,
      date: '2024-01-14',
      service: 'Satyanarayan Katha',
      type: 'online',
      content: 'Very knowledgeable astrologer. Explained everything clearly and provided practical solutions. Would recommend to others.',
      helpful: 5,
      verified: true,
      reply: null,
      tags: ['Clear Explanation', 'Knowledgeable']
    },
    {
      id: 3,
      client: 'Amit Patel',
      rating: 5,
      date: '2024-01-13',
      service: 'Vastu Consultation',
      type: 'home',
      content: 'Changed the entire energy of our home! The vastu corrections suggested were easy to implement and made a noticeable difference.',
      helpful: 12,
      verified: true,
      reply: {
        content: 'Happy to help Amit! Vastu corrections often bring immediate positive changes.',
        date: '2024-01-13',
        time: '6:15 PM'
      },
      tags: ['Life Changing', 'Practical Solutions']
    },
    {
      id: 4,
      client: 'Sonia Verma',
      rating: 3,
      date: '2024-01-12',
      service: 'Navgraha Shanti',
      type: 'online',
      content: 'Good service but expected more detailed explanation. The predictions were accurate though.',
      helpful: 2,
      verified: false,
      reply: null,
      tags: ['Could be Better']
    },
    {
      id: 5,
      client: 'Vikram Singh',
      rating: 5,
      date: '2024-01-10',
      service: 'Maha Mrityunjay Jaap',
      type: 'temple',
      content: 'Exceptional service! My health issues have significantly improved after following the suggested remedies. Truly a life-changing experience.',
      helpful: 15,
      verified: true,
      reply: {
        content: 'Thank you Vikram! Maha Mrityunjay Jaap is powerful for health issues.',
        date: '2024-01-10',
        time: '11:45 AM'
      },
      tags: ['Life Saving', 'Highly Recommended', 'Expert']
    }
  ];

  // Featured testimonials
  const testimonials = [
    {
      id: 1,
      client: 'Neha Kapoor',
      rating: 5,
      excerpt: 'Best astrologer I have ever consulted. Predictions were 100% accurate.',
      fullContent: 'I have consulted many astrologers over the years, but none were as accurate as this. The guidance provided was practical and easy to follow. My life has changed for the better after following the suggested remedies.',
      service: 'Marriage Consultation',
      date: '2024-01-08'
    },
    {
      id: 2,
      client: 'Ravi Malhotra',
      rating: 5,
      excerpt: 'Career guidance was spot on! Got the promotion I wanted.',
      fullContent: 'The career consultation was extremely helpful. The astrologer not only predicted the promotion but also suggested the right time to approach my boss. Followed the advice and got exactly what I wanted!',
      service: 'Career Guidance',
      date: '2024-01-05'
    }
  ];

  // Stats cards
  const stats = [
    { 
      title: 'Average Rating', 
      value: ratingStats.average.toFixed(1), 
      change: '+0.1', 
      icon: Star, 
      color: 'orange',
      trend: 'up'
    },
    { 
      title: 'Total Reviews', 
      value: ratingStats.total, 
      change: '+12', 
      icon: MessageSquare, 
      color: 'blue',
      trend: 'up'
    },
    { 
      title: 'Response Rate', 
      value: '94%', 
      change: '+3%', 
      icon: TrendingUp, 
      color: 'green',
      trend: 'up'
    },
    { 
      title: 'Verified Clients', 
      value: '138', 
      change: '+8', 
      icon: Users, 
      color: 'purple',
      trend: 'up'
    }
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

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch(type) {
      case 'home': return <Home className="w-3.5 h-3.5 text-orange-600" />;
      case 'online': return <Globe className="w-3.5 h-3.5 text-blue-600" />;
      case 'temple': return <Building className="w-3.5 h-3.5 text-purple-600" />;
      default: return <Home className="w-3.5 h-3.5" />;
    }
  };

  // Filter reviews based on current filter
  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === '5-star') return review.rating === 5;
    if (filter === '4-star') return review.rating === 4;
    if (filter === '3-star') return review.rating === 3;
    if (filter === '2-star') return review.rating === 2;
    if (filter === '1-star') return review.rating === 1;
    return true;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  // Handle reply submission
  const handleReplySubmit = (reviewId) => {
    if (!replyText.trim()) return;
    
    // In real app, this would be an API call
    console.log(`Replying to review ${reviewId}: ${replyText}`);
    
    // Reset state
    setShowReplyBox(null);
    setReplyText('');
    
    // Show success message
    alert('Reply submitted successfully!');
  };

  // Review Card Component
  const ReviewCard = ({ review }) => {
    const [showActions, setShowActions] = useState(false);
    const [isHelpful, setIsHelpful] = useState(false);
    const [helpfulCount, setHelpfulCount] = useState(review.helpful);

    const handleHelpful = () => {
      if (!isHelpful) {
        setHelpfulCount(helpfulCount + 1);
        setIsHelpful(true);
      }
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-xs hover:shadow-sm transition-all">
        <div className="p-4">
          {/* Review Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                            flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">
                  {review.client.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">{review.client}</h3>
                  {review.verified && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600">
                    {formatDate(review.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {getTypeIcon(review.type)}
                  <span className="text-sm text-gray-600">{review.service}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowActions(!showActions)}
                className="p-1 hover:bg-gray-100 rounded text-gray-500"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
                  <button 
                    onClick={() => {
                      setSelectedReview(review);
                      setShowReplyBox(review.id);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <MessageSquare className="w-3 h-3" /> Reply
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                    <Edit className="w-3 h-3" /> Edit Reply
                  </button>
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Flag className="w-3 h-3" /> Report
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Review Content */}
          <div className="mb-3">
            <p className="text-gray-700">{review.content}</p>
          </div>

          {/* Tags */}
          {review.tags && review.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {review.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Reply Section */}
          {review.reply && (
            <div className="ml-6 pl-4 border-l-2 border-orange-300 mb-3">
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-orange-800">Your Reply</span>
                  <span className="text-xs text-orange-600">
                    {review.reply.date} • {review.reply.time}
                  </span>
                </div>
                <p className="text-orange-700 text-sm">{review.reply.content}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button
                onClick={handleHelpful}
                className={`flex items-center gap-1 text-sm ${
                  isHelpful ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-orange-600' : ''}`} />
                Helpful ({helpfulCount})
              </button>
              
              {!review.reply && (
                <button
                  onClick={() => setShowReplyBox(review.id)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  <MessageSquare className="inline w-4 h-4 mr-1" />
                  Reply
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reply Box */}
          {showReplyBox === review.id && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-transparent"
              />
              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setShowReplyBox(null);
                    setReplyText('');
                  }}
                  className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReplySubmit(review.id)}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700"
                >
                  Submit Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="REVIEWS & RATINGS" 
        subtitle="Manage your reputation and client feedback" 
      />

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
                    <span className={`text-xs font-medium flex items-center ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? 
                        <ArrowUpRight className="w-3 h-3" /> : 
                        <ArrowDownRight className="w-3 h-3" />
                      }
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

        {/* Rating Overview */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-base font-semibold text-gray-800">Rating Overview</h2>
            <p className="text-sm text-gray-600 mt-0.5">How clients rate your services</p>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-800">{ratingStats.average}</div>
                    <div className="flex items-center justify-center mt-1">
                      {renderStars(ratingStats.average)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{ratingStats.total} reviews</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800 mb-2">Category Ratings</div>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{category.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium ml-1">{category.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-xs text-gray-500">({category.count})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Star Breakdown */}
              <div>
                <div className="space-y-2">
                  {ratingStats.breakdown.map((rating) => (
                    <div key={rating.stars} className="flex items-center">
                      <div className="w-10 text-sm text-gray-700">{rating.stars} star</div>
                      <div className="flex-1 mx-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                            style={{ width: `${rating.percent}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-10 text-sm text-gray-600 text-right">
                        {rating.percent}%
                      </div>
                      <div className="w-8 text-sm text-gray-500 text-right">
                        ({rating.count})
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Rating Trend */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-800">Rating Trend</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      Last month: <span className="font-bold">{ratingStats.lastMonth}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Your average rating has improved by 0.1 points compared to last month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-800">Featured Testimonials</h2>
                <p className="text-sm text-gray-600 mt-0.5">Highlighted positive feedback from clients</p>
              </div>
              <button className="text-sm text-orange-600 hover:text-orange-700">
                <Plus className="inline w-4 h-4 mr-1" />
                Add Testimonial
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gradient-to-r from-orange-50 to-yellow-50 
                                                    p-4 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                                  flex items-center justify-center flex-shrink-0">
                      <Quote className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800">{testimonial.client}</h3>
                        {renderStars(testimonial.rating)}
                      </div>
                      <div className="text-sm text-gray-600 mt-0.5">{testimonial.service}</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-700 italic">"{testimonial.excerpt}"</p>
                    <p className="text-sm text-gray-600 mt-2">{testimonial.fullContent}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-orange-200">
                    <span className="text-xs text-gray-500">{formatDate(testimonial.date)}</span>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-orange-600 hover:bg-orange-100 rounded">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-orange-600 hover:bg-orange-100 rounded">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Filter & Sort */}
        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex gap-1">
                {['all', '5-star', '4-star', '3-star', '2-star', '1-star'].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-3 py-1 text-sm rounded transition-all ${
                      filter === filterOption
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {filterOption === 'all' ? 'All' : filterOption}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm"
              >
                <Filter className="w-4 h-4" />
                Filter: {filter}
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
              
              <button className="p-1.5 border border-gray-300 rounded hover:bg-gray-50">
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2">
                {['all', '5-star', '4-star', '3-star', '2-star', '1-star'].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => {
                      setFilter(filterOption);
                      setShowFilters(false);
                    }}
                    className={`px-2 py-1 text-xs rounded transition-all ${
                      filter === filterOption
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {filterOption === 'all' ? 'All' : filterOption}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="space-y-3">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {sortedReviews.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <MessageSquare className="text-gray-400 w-6 h-6" />
            </div>
            <h3 className="text-base font-medium text-gray-700 mb-1.5">No reviews found</h3>
            <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
              {filter !== 'all' ? `No ${filter} reviews available` : 'No reviews available yet'}
            </p>
          </div>
        )}

        {/* Response Rate & Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Response Rate: 94%</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Replied within 24 hours</span>
                <span className="text-sm font-medium text-green-600">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Average reply time</span>
                <span className="text-sm font-medium text-gray-800">4.2 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Pending replies</span>
                <span className="text-sm font-medium text-orange-600">3 reviews</span>
              </div>
            </div>
            <button className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded text-sm hover:from-orange-600 hover:to-orange-700">
              Reply to All Pending
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-800">Tips for Better Ratings</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Reply to all reviews within 24 hours
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Thank clients for positive reviews
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Address concerns in negative reviews professionally
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Ask satisfied clients to leave reviews
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Report Review Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Report Review</h2>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Reporting *
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500">
                    <option value="">Select a reason</option>
                    <option value="spam">Spam or fake review</option>
                    <option value="inappropriate">Inappropriate content</option>
                    <option value="harassment">Harassment or bullying</option>
                    <option value="false">False information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500"
                    placeholder="Please provide more details about why you are reporting this review..."
                  />
                </div>

                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-yellow-700">
                        Reported reviews will be reviewed by our moderation team within 24-48 hours.
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Note: You cannot delete client reviews, only report inappropriate content.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      alert('Review reported successfully. Our team will review it shortly.');
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700 text-sm w-full sm:w-auto"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Details Modal */}
      {selectedReview && !showReplyBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Review Details</h2>
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 
                                flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {selectedReview.client.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-800">{selectedReview.client}</h3>
                      {selectedReview.verified && (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Verified Client
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(selectedReview.rating)}
                      <span className="text-gray-600">{formatDate(selectedReview.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {getTypeIcon(selectedReview.type)}
                      <span className="text-gray-700">{selectedReview.service}</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedReview.content}</p>
                </div>

                {/* Tags */}
                {selectedReview.tags && selectedReview.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags from this review</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedReview.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Section */}
                {selectedReview.reply ? (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Your Reply</h4>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-orange-800">You replied on</span>
                        <span className="text-sm text-orange-600">
                          {selectedReview.reply.date} at {selectedReview.reply.time}
                        </span>
                      </div>
                      <p className="text-orange-700">{selectedReview.reply.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">No reply yet</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Consider replying to this review to show engagement with your clients.
                    </p>
                    <button
                      onClick={() => setShowReplyBox(selectedReview.id)}
                      className="mt-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded text-sm hover:from-orange-600 hover:to-orange-700"
                    >
                      Reply Now
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded text-sm">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email Client
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                    <Printer className="inline w-4 h-4 mr-1" />
                    Print Review
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                    <Share2 className="inline w-4 h-4 mr-1" />
                    Share
                  </button>
                  <button 
                    onClick={() => setShowReportModal(true)}
                    className="px-4 py-2 border border-gray-300 text-red-600 rounded hover:bg-red-50 text-sm"
                  >
                    <Flag className="inline w-4 h-4 mr-1" />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsRatings;
