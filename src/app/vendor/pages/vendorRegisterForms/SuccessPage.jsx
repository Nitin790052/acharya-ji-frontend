// SuccessPage Component - Professional & Attractive with Vedic Scholar Styling
import { CheckCircle, Home, Mail, Calendar, Users, LogIn, Sparkles } from "lucide-react";

const SuccessPage = () => {
  // Format current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-IN', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
  const formattedTime = currentDate.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Generate reference ID
  const generateReferenceId = () => {
    const prefix = 'ACH';
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}-${randomNum}`;
  };

  // Handle actions
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      {/* Main Card - Fully Responsive */}
      <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        {/* Glass Card Container - Vedic Scholar Form Styling */}
        <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-[12px] sm:backdrop-blur-[16px] md:backdrop-blur-[20px] 
                        border border-white/60 
                        shadow-[0_10px_30px_-5px_rgba(249,115,22,0.1),inset_0_0_20px_rgba(255,255,255,0.3)] 
                        sm:shadow-[0_15px_40px_-10px_rgba(249,115,22,0.15),inset_0_0_30px_rgba(255,255,255,0.4)]
                        overflow-hidden">
          
          {/* Decorative Elements - Vedic Scholar Styling */}
          <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-br from-orange-400/5 to-amber-400/3 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 bg-gradient-to-tr from-amber-400/5 to-orange-400/3 rounded-full blur-xl"></div>
          
          <div className="relative z-10 p-3 sm:p-4 md:py-6 md:px-4 lg:py-5 lg:px-7">
            
            {/* Success Header with Back Button Styling */}
            <div className="text-center mb-4 sm:mb-5 md:mb-6">
              {/* Success Icon - Improved Styling */}
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg sm:rounded-xl shadow-md sm:shadow-xl mb-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/40 to-amber-500/40 blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white z-20 relative drop-shadow-lg" />
                
                {/* Sparkle Effects */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute bottom-1 right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-60 animate-pulse delay-300"></div>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-2.5xl font-semibold text-gray-800 mb-1 sm:mb-1.5">
                Registration Successful!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-1.5">
                Welcome to Acharya Ji Community
              </p>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
                <Sparkles size={12} className="sm:w-4 sm:h-4 text-amber-600" />
                <p className="text-[10px] sm:text-xs font-medium text-amber-700 whitespace-nowrap">
                  Your spiritual journey begins now
                </p>
              </div>
            </div>

            {/* Success Message */}
            <div className="mb-4 sm:mb-5 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg sm:rounded-xl border border-amber-200">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                <span className="text-[10px] sm:text-xs font-medium text-amber-700">
                  Confirmation email sent to your registered email
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-700 max-w-2xl mx-auto mb-4 sm:mb-6">
                Thank you for completing your registration. Our verification team will review your details 
                and activate your vendor profile within <strong className="font-semibold">24-48 hours</strong>. You'll receive a 
                confirmation email once your account is activated.
              </p>
            </div>

            {/* Registration Details - Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Details Card */}
              <div className="relative p-3 sm:p-4 bg-gradient-to-br from-white/95 to-white/90 rounded-lg sm:rounded-xl border-2 border-gray-300/80">
                <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <Calendar size={10} className="sm:w-3 sm:h-3 text-white" />
                  </div>
                  Registration Details
                </h3>
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-lg border border-amber-100">
                    <span className="text-[10px] sm:text-xs text-gray-600">Reference ID</span>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-800 font-mono">{generateReferenceId()}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-lg border border-amber-100">
                    <span className="text-[10px] sm:text-xs text-gray-600">Date</span>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-800">{formattedDate}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-lg border border-amber-100">
                    <span className="text-[10px] sm:text-xs text-gray-600">Time</span>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-800">{formattedTime}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-2.5 bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-lg border border-emerald-100">
                    <span className="text-[10px] sm:text-xs text-gray-600">Status</span>
                    <span className="text-[10px] sm:text-xs font-medium text-emerald-600">Pending Verification</span>
                  </div>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="relative p-3 sm:p-4 bg-gradient-to-br from-white/95 to-white/90 rounded-lg sm:rounded-xl border-2 border-gray-300/80">
                <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <Users size={10} className="sm:w-3 sm:h-3 text-white" />
                  </div>
                  What Happens Next?
                </h3>
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-start gap-2 sm:gap-2.5 p-2 sm:p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-lg border border-amber-100">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[10px] sm:text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-medium text-gray-800 mb-0.5">Account Verification</p>
                      <p className="text-[9px] sm:text-[10px] text-gray-600">Our team will verify your details within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5 p-2 sm:p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-lg border border-amber-100">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[10px] sm:text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-medium text-gray-800 mb-0.5">Profile Activation</p>
                      <p className="text-[9px] sm:text-[10px] text-gray-600">Complete profile setup after verification approval</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5 p-2 sm:p-2.5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-lg border border-amber-100">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-[10px] sm:text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs font-medium text-gray-800 mb-0.5">Start Receiving Bookings</p>
                      <p className="text-[9px] sm:text-[10px] text-gray-600">Login to access dashboard and manage client requests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Information */}
            <div className="mb-4 sm:mb-6">
              <div className="relative p-3 sm:p-4 mb-3 sm:mb-4 bg-gradient-to-br from-white/95 to-white/90 rounded-lg sm:rounded-xl border-2 border-gray-300/80">
                <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2">Ready to Access Your Account?</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  Once your account is verified, you can login to access your vendor dashboard, manage bookings, 
                  update your profile, and start receiving client requests.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500"></div>
                      <p className="text-[10px] sm:text-xs text-gray-700">Use your registered email for login</p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500"></div>
                      <p className="text-[10px] sm:text-xs text-gray-700">Password setup instructions sent to your email</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-sm sm:shadow-md hover:shadow-lg text-xs sm:text-sm font-medium"
                    style={{
                      boxShadow: '0 4px 12px -3px rgba(249, 115, 22, 0.3)'
                    }}
                  >
                    <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                    Go to Login
                  </button>
                </div>
              </div>

              {/* Benefits - Grid Layout */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-amber-100 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 text-base sm:text-lg">📱</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-0.5">Mobile App</h4>
                  <p className="text-[9px] sm:text-xs text-gray-600">Manage everything on mobile</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-amber-100 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 text-base sm:text-lg">👥</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-0.5">Client Network</h4>
                  <p className="text-[9px] sm:text-xs text-gray-600">Access to spiritual seekers</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-amber-100 text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 text-base sm:text-lg">🛡️</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-0.5">Secure Platform</h4>
                  <p className="text-[9px] sm:text-xs text-gray-600">Safe and reliable service</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-3 sm:mb-4 relative group">
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative overflow-hidden group/home disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                  boxShadow: '0 6px 20px -4px rgba(249, 115, 22, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/home:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                  <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                  Back to Homepage
                </span>
                
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-amber-500/30 blur-md rounded-lg sm:rounded-xl -z-10 opacity-0 group-hover/home:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={handleLogin}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-300/80 font-semibold transition-all duration-300 hover:bg-gray-50/80 hover:border-gray-400 relative overflow-hidden group/login disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  color: '#4b5563'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/20 to-transparent translate-x-[-100%] group-hover/login:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
                  <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Login to Dashboard</span>
                </span>
              </button>
            </div>

            {/* Contact Support */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300/50">
              <p className="text-center text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3">
                Need help? Our support team is here for you
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
                <a 
                  href="mailto:support@acharyaji.online" 
                  className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-medium text-[10px] sm:text-xs"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                  support@acharyaji.online
                </a>
                <span className="hidden sm:block text-gray-300">•</span>
                <a 
                  href="tel:+911234567890" 
                  className="text-orange-600 hover:text-orange-700 font-medium text-[10px] sm:text-xs"
                >
                  📞 +91 12345 67890
                </a>
              </div>
            </div>

            {/* Footer Note - Vedic Scholar Styling */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-300/50">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
                  <CheckCircle size={10} className="sm:w-3 sm:h-3 text-orange-600" />
                </div>
                <p className="text-center text-[10px] sm:text-xs text-gray-600">
                  Thank you for joining our spiritual community
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
