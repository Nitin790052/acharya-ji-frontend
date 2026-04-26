import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  Flag,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  User,
  Calendar,
  Clock,
  ThumbsUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronRight,
  MoreVertical,
  Sparkles,
  Award,
  Target,
  BarChart3,
  RefreshCw
} from 'lucide-react';

import VendorPageHeader from '../../../components/VendorPageHeader';

const ReviewsRating = () => {
  const [filter, setFilter] = useState('all'); // all, 5star, 4star, 3star, 2star, 1star
  const [sortBy, setSortBy] = useState('recent'); // recent, highest, lowest
  const [activeReview, setActiveReview] = useState(null);

  // Reviews Data
  const reviewsData = {
    averageRating: 4.8,
    totalReviews: 42,
    responseRate: '85%',
    recentRating: 4.9,

    ratingBreakdown: {
      5: 28,
      4: 10,
      3: 3,
      2: 1,
      1: 0
    },

    reviews: [
      {
        id: 1,
        customerName: "Sharma Family",
        pujaName: "Satyanarayan Katha",
        rating: 5,
        comment: "Excellent puja ceremony. Pandit Ji was very knowledgeable and explained everything well. Highly recommended!",
        date: "2 days ago",
        reply: "Thank you for your kind words! It was a pleasure performing the puja for your family.",
        replied: true,
        helpful: 12
      },
      {
        id: 2,
        customerName: "Patel Ji",
        pujaName: "Ganesh Puja",
        rating: 5,
        comment: "Very punctual and professional. The puja was conducted with great devotion.",
        date: "1 week ago",
        reply: null,
        replied: false,
        helpful: 8
      },
      {
        id: 3,
        customerName: "Rohit Kumar",
        pujaName: "Online Rudrabhishek",
        rating: 4,
        comment: "Good online session. Clear explanation but had some audio issues initially.",
        date: "2 weeks ago",
        reply: "Thank you for the feedback. We'll improve our audio setup for better online sessions.",
        replied: true,
        helpful: 5
      },
      {
        id: 4,
        customerName: "Verma Ji",
        pujaName: "Griha Pravesh",
        rating: 3,
        comment: "Puja was good but started 30 minutes late. Could improve punctuality.",
        date: "3 weeks ago",
        reply: null,
        replied: false,
        helpful: 3
      },
      {
        id: 5,
        customerName: "Gupta Family",
        pujaName: "Mundan Ceremony",
        rating: 5,
        comment: "Perfect ceremony! Very patient with the child. Made everyone comfortable.",
        date: "1 month ago",
        reply: "Thank you! It was a beautiful ceremony. Blessings to the child.",
        replied: true,
        helpful: 15
      },
      {
        id: 6,
        customerName: "Singh Ji",
        pujaName: "Havan",
        rating: 2,
        comment: "Disappointed with the arrangements. Some items were missing and there was lack of communication.",
        date: "1 month ago",
        reply: "We sincerely apologize for the inconvenience. We'll ensure better preparation in future.",
        replied: true,
        helpful: 2
      }
    ],

    tips: {
      punctuality: "Aim to reach 15 minutes before scheduled time",
      communication: "Send confirmation message 1 day before puja",
      preparation: "Double-check puja samagri list before leaving",
      explanation: "Explain each step of the puja to family members",
      followUp: "Send thank you message after puja completion"
    }
  };

  // Calculate percentages
  const totalReviewsCount = reviewsData.totalReviews;
  const ratingPercentages = {};
  Object.keys(reviewsData.ratingBreakdown).forEach(rating => {
    ratingPercentages[rating] = (reviewsData.ratingBreakdown[rating] / totalReviewsCount) * 100;
  });

  // Filter and sort reviews
  const filteredReviews = reviewsData.reviews
    .filter(review => {
      if (filter === 'all') return true;
      return review.rating === parseInt(filter[0]);
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return 0; // Already sorted by date
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return 0;
    });

  // Get low rating reviews (3 stars or below)
  const lowRatingReviews = reviewsData.reviews.filter(review => review.rating <= 3);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  // Get rating color
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-700 bg-green-50 border-green-200';
    if (rating >= 4) return 'text-green-600 bg-green-50 border-green-200';
    if (rating >= 3) return 'text-orange-500 bg-orange-50 border-orange-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  // Get rating label
  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4) return 'Very Good';
    if (rating >= 3) return 'Good';
    if (rating >= 2) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <VendorPageHeader 
        title="REVIEWS & RATINGS" 
        subtitle="Build trust and improve through customer feedback" 
      />
      {/* Main Content - आपके spacing guidelines के according */}
      <div className="space-y-4 px-6 pb-6 pt-2">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3">


          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-3 py-1.5 text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Rating Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Average Rating */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-50 rounded">
                  <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                </div>
                <span className="text-sm text-gray-600">Average Rating</span>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs ${getRatingColor(reviewsData.averageRating)}`}>
                {getRatingLabel(reviewsData.averageRating)}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-xl font-bold text-gray-800">{reviewsData.averageRating}</div>
              <div className="text-sm text-gray-500">/5</div>
              <div className="ml-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+0.2</span>
              </div>
            </div>
            <div className="mt-2">
              {renderStars(Math.round(reviewsData.averageRating))}
            </div>
          </div>

          {/* Total Reviews */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Total Reviews</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+12%</span>
              </div>
            </div>
            <div className="text-xl font-bold text-gray-800">{reviewsData.totalReviews}</div>
            <div className="text-sm text-gray-500 mt-2">Last 30 days: +8 reviews</div>
          </div>

          {/* Response Rate */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-50 rounded">
                  <CheckCircle className="w-5 h-5 text-green-700" />
                </div>
                <span className="text-sm text-gray-600">Response Rate</span>
              </div>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-xl font-bold text-gray-800">{reviewsData.responseRate}</div>
            <div className="text-sm text-gray-500 mt-2">You respond to most reviews</div>
          </div>

          {/* Recent Rating */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 rounded">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-600">Recent Rating</span>
              </div>
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-xl font-bold text-gray-800">{reviewsData.recentRating}</div>
              <div className="text-sm text-gray-500">/5</div>
            </div>
            <div className="text-sm text-gray-500 mt-2">Last 10 reviews average</div>
          </div>
        </div>

        {/* Rating Breakdown & Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Rating Breakdown */}
          <div className="lg:col-span-2 space-y-4">
            {/* Rating Breakdown Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-3 border-b border-gray-200">
                <h3 className="text-[15px] font-bold text-gray-800">Rating Breakdown</h3>
              </div>

              <div className="p-3">
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-800">{rating}</span>
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ width: `${ratingPercentages[rating] || 0}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700">
                          {reviewsData.ratingBreakdown[rating] || 0}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({Math.round(ratingPercentages[rating] || 0)}%)
                        </span>
                        <button
                          onClick={() => setFilter(`${rating}star`)}
                          className="text-xs text-orange-500 hover:text-orange-600"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Improvement Tips (Show only if low ratings exist) */}
            {lowRatingReviews.length > 0 && (
              <div className="bg-gradient-to-r from-orange-100/30 via-yellow-200/20 to-amber-300/40 rounded-lg border border-orange-200 p-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-1.5 bg-orange-50 rounded">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-gray-800">Improvement Tips</h3>
                    <p className="text-sm text-gray-600">Based on your {lowRatingReviews.length} lower-rated reviews</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(reviewsData.tips).map(([key, tip]) => (
                    <div key={key} className="bg-white/60 rounded-lg p-3 border border-orange-200">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-orange-500 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{tip}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <span className="font-medium">Most common feedback: </span>
                  {lowRatingReviews.some(r => r.comment.toLowerCase().includes('punctuality')) && 'Punctuality • '}
                  {lowRatingReviews.some(r => r.comment.toLowerCase().includes('communication')) && 'Communication • '}
                  {lowRatingReviews.some(r => r.comment.toLowerCase().includes('preparation')) && 'Preparation'}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Filter & Sort */}
          <div className="space-y-4">
            {/* Filter & Sort Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Filter & Sort</h3>

              {/* Rating Filter */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Rating</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'All', value: 'all' },
                    { label: '5 Stars', value: '5star' },
                    { label: '4 Stars', value: '4star' },
                    { label: '3 Stars', value: '3star' },
                    { label: '2 Stars', value: '2star' },
                    { label: '1 Star', value: '1star' }
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setFilter(item.value)}
                      className={`px-2.5 py-1 text-sm rounded-lg border ${filter === item.value
                          ? 'bg-orange-50 text-orange-600 border-orange-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Sort By</div>
                <div className="space-y-2">
                  {[
                    { label: 'Most Recent', value: 'recent' },
                    { label: 'Highest Rating', value: 'highest' },
                    { label: 'Lowest Rating', value: 'lowest' }
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setSortBy(item.value)}
                      className={`w-full px-3 py-1.5 text-sm rounded-lg border flex items-center justify-between ${sortBy === item.value
                          ? 'bg-blue-50 text-blue-600 border-blue-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <span>{item.label}</span>
                      {sortBy === item.value && <CheckCircle className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Showing {filteredReviews.length} of {reviewsData.totalReviews} reviews</div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{reviewsData.averageRating}</span>
                  </div>
                  <div className="text-gray-600">
                    {reviewsData.responseRate} response rate
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <h3 className="text-[15px] font-bold text-gray-800 mb-3">Quick Actions</h3>

              <div className="space-y-2">
                <button className="w-full px-3 py-2 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Reply to Pending Reviews
                  </span>
                  <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                    {reviewsData.reviews.filter(r => !r.replied).length}
                  </span>
                </button>

                <button className="w-full px-3 py-2 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Reviews Report
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button className="w-full px-3 py-2 text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Request Reviews
                  </span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-[15px] font-bold text-gray-800">
                Customer Reviews
                <span className="ml-2 text-sm font-normal text-gray-600">
                  ({filteredReviews.length} reviews)
                </span>
              </h3>

              <div className="flex items-center gap-2">
                <button className="px-2.5 py-1.5 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="px-2.5 py-1.5 text-sm bg-white text-gray-800 rounded border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div key={review.id} className="p-3 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-800">{review.customerName}</div>
                          <div className="text-xs text-gray-600">{review.pujaName}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded-full text-xs ${review.rating >= 4 ? 'bg-green-50 text-green-700' :
                          review.rating >= 3 ? 'bg-orange-50 text-orange-500' :
                            'bg-red-50 text-red-700'
                        }`}>
                        {review.rating}.0
                      </div>
                      <button
                        onClick={() => setActiveReview(activeReview === review.id ? null : review.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-2">
                    {renderStars(review.rating)}
                  </div>

                  <div className="text-sm text-gray-800 mb-3">
                    {review.comment}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {review.date}
                      </div>

                      <button className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        Helpful ({review.helpful})
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {!review.replied && (
                        <button className="px-2.5 py-1 text-xs bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Reply
                        </button>
                      )}

                      <button className="px-2.5 py-1 text-xs bg-red-50 text-red-700 rounded border border-red-200 hover:bg-red-100 flex items-center gap-1">
                        <Flag className="w-3 h-3" />
                        Report
                      </button>
                    </div>
                  </div>

                  {/* Reply Section */}
                  {review.reply && (
                    <div className="mt-3 ml-4 pl-4 border-l-2 border-orange-300">
                      <div className="bg-orange-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-orange-600" />
                          </div>
                          <div className="text-xs font-medium text-gray-800">Your Response</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Replied 1 day later
                          </div>
                        </div>
                        <div className="text-sm text-gray-700">
                          {review.reply}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Menu */}
                  {activeReview === review.id && (
                    <div className="mt-2 bg-gray-50 rounded-lg p-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-2 py-1 text-xs bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-100">
                          Edit Reply
                        </button>
                        <button className="px-2 py-1 text-xs bg-white text-red-600 rounded border border-red-300 hover:bg-red-50">
                          Delete Reply
                        </button>
                        <button className="px-2 py-1 text-xs bg-white text-blue-600 rounded border border-blue-300 hover:bg-blue-50 col-span-2">
                          Contact Customer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-800 mb-1">No reviews found</h3>
                <p className="text-sm text-gray-600">
                  {filter === 'all'
                    ? 'No reviews available'
                    : `No ${filter.replace('star', ' star')} reviews`
                  }
                </p>
                {filter !== 'all' && (
                  <button
                    onClick={() => setFilter('all')}
                    className="mt-3 px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200"
                  >
                    Show All Reviews
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Response Stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-2">
              <div className="text-xl font-bold text-gray-800">
                {reviewsData.reviews.filter(r => r.replied).length}
              </div>
              <div className="text-sm text-gray-600">Replied Reviews</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                Good engagement
              </div>
            </div>

            <div className="text-center p-2">
              <div className="text-xl font-bold text-gray-800">24h</div>
              <div className="text-sm text-gray-600">Avg. Response Time</div>
              <div className="text-xs text-orange-600 flex items-center justify-center gap-1 mt-1">
                <Target className="w-3 h-3" />
                Aim for 12h
              </div>
            </div>

            <div className="text-center p-2">
              <div className="text-xl font-bold text-gray-800">
                {Math.round((reviewsData.reviews.filter(r => r.rating >= 4).length / reviewsData.totalReviews) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Positive Reviews (4+ stars)</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                <Award className="w-3 h-3" />
                Excellent
              </div>
            </div>
          </div>
        </div>

        {/* Help & Guidelines */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-1 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-blue-500" /> Tips for Better Reviews</h4>
              <p className="text-sm text-gray-600">
                Always respond professionally to negative reviews. Thank customers for positive reviews.
                Use feedback to improve your service quality.
              </p>
            </div>

            <button className="px-3 py-1.5 text-sm bg-white text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-50">
              View Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsRating;
