import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyVendors } from "../mock/Vendors";
import {
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  CheckCircle,
  Shield,
} from "lucide-react";
import image from "../../../assets/login/imageLo4.webp";
import { useAuth } from "../../../app/vendor/auth/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  // Yeh component sirf vendor ke liye hai, user option remove kiya
  const [loginType, setLoginType] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const navigate = useNavigate();

  const { login } = useAuth();

  useEffect(() => {
    if (otpTimer === 0) return;
    const interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const isMobileValid = mobile.length === 10;
  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordValid = password.length >= 6;
  const isOtpValid = otp.length === 6;

  // Sirf vendor validation logic
  const canLogin =
    (loginType === "mobile" && isMobileValid && otpVerified) ||
    (loginType === "email" && isEmailValid && isPasswordValid);

  const handleSendOtp = () => {
    if (!isMobileValid) return;
    setOtpSent(true);
    setOtpVerified(false);
    setOtp("");
    setOtpTimer(30);
  };

  const handleVerifyOtp = () => {
    if (isOtpValid) setOtpVerified(true);
  };

  const shouldShowLoginButton =
    loginType === "email" || (loginType === "mobile" && otpVerified);

  // ✅ VENDOR-SPECIFIC LOGIN LOGIC
const handleVendorLogin = () => {
  if (!canLogin) return;

  // ================= FIND VENDOR =================
  const vendor =
    loginType === "mobile"
      ? dummyVendors.find((v) => v.mobile === mobile)
      : dummyVendors.find(
          (v) => v.email?.toLowerCase() === email.toLowerCase()
        );

  if (!vendor) {
    toast.error("Vendor not found");
    return;
  }

  // ================= EMAIL PASSWORD CHECK =================
  if (loginType === "email" && password !== vendor.password) {
    toast.error("Invalid password");
    return;
  }

  // ================= SAVE AUTH =================
  login({
    ...vendor,                // ✅ always full vendor
    role: "vendor",
    token: "vendor-demo-token",
    loginMethod: loginType,
  });

  toast.success(`Welcome back, ${vendor.name}!`);

  navigate("/vendor/dashboard");
};



  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt="Peaceful Devotion"
          className="w-full h-full object-cover brightness-110 contrast-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-black/10 to-black/15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/15"></div>
      </div>

      {/* Centered Card - Smaller width and height */}
      <div className="relative z-10 w-full max-w-[400px]">
        {/* Main Card - Compact size */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-md  border border-white/80 p-5 hover:shadow-3xl transition-all duration-300">
          
          {/* Header - Compact */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-300 to-orange-300 rounded-xl shadow-xl mb-3 relative overflow-hidden group">
              <img
                src="/logo.png"
                alt="Acharya Ji Online"
                className="w-12 h-12 object-contain z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-orange-500/30 blur-lg group-hover:blur-xl transition-all duration-500"></div>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-0.5 uppercase">
              Vendor Login
            </h2>
            <p className="text-xs text-gray-600">
              Sign in to your vendor account
            </p>
          </div>

          {/* Role Selection REMOVED - Ab sirf vendor hai */}

          {/* Login Type Toggle - Compact */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-800 mb-1.5">
              Login Method
            </label>
            <div className="flex bg-gray-200 rounded-lg p-0.5">
              {["mobile", "email"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setLoginType(type);
                    setMobile("");
                    setEmail("");
                    setPassword("");
                    setOtp("");
                    setOtpSent(false);
                    setOtpVerified(false);
                  }}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-xs font-semibold transition-all ${
                    loginType === type
                      ? "bg-white shadow-sm text-orange-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {type === "mobile" ? (
                    <>
                      <Smartphone size={14} />
                      <span>Mobile + OTP</span>
                    </>
                  ) : (
                    <>
                      <Mail size={14} />
                      <span>Email</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile/Email Input - Compact */}
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              {loginType === "mobile" ? "Mobile Number" : "Email Address"}
            </label>
            <div className="relative">
              {loginType === "mobile" && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-600 pointer-events-none">
                  +91
                </div>
              )}
              <input
                type={loginType === "mobile" ? "tel" : "email"}
                value={loginType === "mobile" ? mobile : email}
                onChange={(e) =>
                  loginType === "mobile"
                    ? setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    : setEmail(e.target.value)
                }
                placeholder={
                  loginType === "mobile"
                    ? "Enter vendor mobile number"
                    : "Enter vendor email"
                }
                className={`w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-xs placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${
                  loginType === "mobile" ? "pl-10" : ""
                }`}
              />
            </div>
          </div>

          {/* EMAIL → PASSWORD - Compact */}
          {loginType === "email" && (
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-800 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your vendor password"
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-xs placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* MOBILE → OTP - Compact */}
          {loginType === "mobile" && (
            <div className="mb-3 space-y-3">
              {!otpSent && (
                <button
                  onClick={handleSendOtp}
                  disabled={!isMobileValid}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isMobileValid
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Send OTP
                </button>
              )}

              {otpSent && !otpVerified && (
                <div className="space-y-2">
                  <input
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-center text-sm tracking-widest font-semibold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                  />
                  <div className="flex justify-between items-center text-xs px-1">
                    {otpTimer > 0 ? (
                      <span className="text-gray-500">
                        Resend in <span className="text-orange-600 font-semibold">{otpTimer}s</span>
                      </span>
                    ) : (
                      <button
                        onClick={handleSendOtp}
                        className="text-orange-600 font-semibold hover:text-orange-800"
                      >
                        Resend OTP
                      </button>
                    )}
                    <span className="text-gray-500">
                      Sent to {mobile}
                    </span>
                  </div>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={!isOtpValid}
                    className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isOtpValid
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-md"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {otpVerified && (
                <div className="flex items-center justify-center gap-2 py-2 px-3 bg-green-50 border border-green-300 rounded-lg">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-700">OTP Verified</span>
                </div>
              )}
            </div>
          )}

          {/* LOGIN BUTTON - Compact */}
          {shouldShowLoginButton && (
            <button
              onClick={handleVendorLogin}
              disabled={!canLogin}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                canLogin
                  ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Login as Vendor
            </button>
          )}

          {/* Registration Link - Vendor-specific */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-center text-xs text-gray-600">
              Want to become a vendor?{" "}
              <button
                onClick={() => navigate("/vendorRegister")}
                className="text-orange-600 font-semibold hover:text-orange-800"
              >
                Apply Now
              </button>
            </p>
          </div>

          {/* Security Note - Compact */}
          <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-gray-200/50">
            <Shield size={12} className="text-orange-500" />
            <p className="text-xs text-gray-500">
              Securely encrypted & protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
