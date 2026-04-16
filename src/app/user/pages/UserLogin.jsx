import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  CheckCircle,
  Shield,
  ArrowLeft,
} from "lucide-react";

import { useUserAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";
import {
  useLoginUserMutation,
  useSendOtpMutation,
  useVerifyOtpMutation
} from "../../../services/userApi";

const UserLogin = () => {
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
  const location = useLocation();

  const { login } = useUserAuth();
  const [loginUser, { isLoading: isLoginLoading }] = useLoginUserMutation();
  const [sendOtp, { isLoading: isOtpSending }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isOtpVerifying }] = useVerifyOtpMutation();

  useEffect(() => {
    if (otpTimer === 0) return;
    const interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const isMobileValid = mobile.length === 10;
  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordValid = password.length >= 6;
  const isOtpValid = otp.length === 6;

  const canLogin =
    (loginType === "mobile" && isMobileValid && otpVerified) ||
    (loginType === "email" && isEmailValid && isPasswordValid);

  // OTP send logic
  const handleSendOtp = async () => {
    if (!isMobileValid) return;

    try {
      const response = await sendOtp({ identifier: mobile, type: 'mobile' }).unwrap();
      setOtpSent(true);
      setOtpVerified(false);
      setOtp("");
      setOtpTimer(30);

      if (response.debugOtp) {
        console.log(`%c🔐 OTP for ${mobile}: ${response.debugOtp}`, 'color: #f97316; font-size: 18px; font-weight: bold; background: #fff7ed; padding: 4px 12px; border-radius: 6px;');

      }
      toast.success(response.message || "OTP sent successfully!");
    } catch (err) {
      toast.error(err.data?.message || "Failed to send OTP");
    }
  };

  // OTP verify logic
  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp({ identifier: mobile, otp }).unwrap();
      setOtpVerified(true);
      toast.success(response.message || "OTP verified successfully!");

      // Auto-login after OTP verification for mobile
      const loginResponse = await loginUser({ phone: mobile, loginType: 'mobile' }).unwrap();
      handleLoginSuccess(loginResponse);
    } catch (err) {
      console.error("Login verification error:", err);
      // Differentiate between OTP failure and Login failure
      if (otpVerified) {
        toast.error("OTP Verified but auto-login failed. Please try logging in with Email.");
      } else {
        toast.error(err.data?.message || "Invalid OTP or selection");
      }
    }
  };

  const handleLoginSuccess = (response) => {
    const { token, data } = response;
    localStorage.setItem("token", token);
    login(data);
    toast.success(`Welcome back, ${data.name}!`);

    if (location.state?.returnTo) {
      navigate(location.state.returnTo, { state: location.state });
    } else {
      navigate("/user/dashboard");
    }
  };


  const shouldShowLoginButton =
    loginType === "email";

  // USER LOGIN HANDLER
  const handleUserLogin = async () => {
    if (loginType !== "email") return;

    try {
      const response = await loginUser({ email, password, loginType: 'email' }).unwrap();
      handleLoginSuccess(response);
    } catch (err) {
      toast.error(err.data?.message || "Invalid email or password.");
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Back to Website Arrow Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-50 flex items-center justify-center w-10 h-10 bg-white border border-orange-100 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        title="Back to Website"
      >
        <ArrowLeft size={18} className="text-orange-600 group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-[#FBF6F6]"></div>

      {/* Centered Card */}
      <div className="relative z-10 w-full max-w-[400px]">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 p-5 hover:shadow-3xl transition-all duration-300">

          {/* Header - WITH LOGO */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-300 to-orange-300 rounded-xl shadow-xl mb-3 relative overflow-hidden group">
              <img
                src="/logo.png"
                alt="Acharya Ji Online"
                className="w-12 h-12 object-contain z-10 relative"
              />
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-0.5 uppercase">
              User Login
            </h2>
            <p className="text-xs text-gray-600">
              Sign in to your account
            </p>
          </div>

          {/* Login Type Toggle */}
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
                  className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-xs font-semibold transition-all ${loginType === type
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

          {/* Mobile/Email Input */}
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
                    ? "Enter your mobile number"
                    : "Enter your email"
                }
                className={`w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-xs placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200 ${loginType === "mobile" ? "pl-10" : ""
                  }`}
              />
            </div>
          </div>

          {/* EMAIL → PASSWORD */}
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
                  placeholder="Enter your password"
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

          {/* MOBILE → OTP */}
          {loginType === "mobile" && (
            <div className="mb-3 space-y-3">
              {!otpSent && (
                <button
                  onClick={handleSendOtp}
                  disabled={!isMobileValid}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all ${isMobileValid
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-md"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {isOtpSending ? "Sending..." : "Send OTP"}
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
                    disabled={!isOtpValid || isOtpVerifying}
                    className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all ${isOtpValid
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-md"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    {isOtpVerifying ? "Verifying..." : "Verify OTP"}
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

          {/* LOGIN BUTTON */}
          {shouldShowLoginButton && (
            <button
              onClick={handleUserLogin}
              disabled={!canLogin}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${canLogin
                ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {isLoginLoading ? "Logging in..." : "Login as User"}
            </button>
          )}

          {/* Registration Link */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-center text-xs text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/user_login/registeration", { state: location.state })}
                className="text-orange-600 font-semibold hover:text-orange-800"
              >
                Register Now
              </button>
            </p>
          </div>

          {/* Forgot Password */}
          <div className="mt-2 text-center">
            <button
              onClick={() => navigate("/forgotPassword")}
              className="text-xs text-gray-500 hover:text-orange-600"
            >
              Forgot Password?
            </button>
          </div>

          {/* Security Note */}
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

export default UserLogin;