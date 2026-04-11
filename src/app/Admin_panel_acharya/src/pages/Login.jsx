import React, { useState } from "react";
import { FiMail, FiLock, FiCopy, FiCheck, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(null);

  const VALID_CREDENTIALS = {
    email: "nitin@gmail.com",
    password: "nitin@12345"
  };

  const handleUseDemoCredentials = () => {
    setCredentials({ email: VALID_CREDENTIALS.email, password: VALID_CREDENTIALS.password });
    setErrors({});
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(credentials.email)) newErrors.email = "Email is invalid";
    if (!credentials.password) newErrors.password = "Password is required";
    else if (credentials.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      if (credentials.email === VALID_CREDENTIALS.email && credentials.password === VALID_CREDENTIALS.password) {
        const userData = { email: credentials.email, name: "Admin User", role: "admin", loggedInAt: new Date().toISOString() };
        const dummyToken = "dummy-jwt-token-" + Math.random().toString(36).substring(2);
        login(userData, dummyToken, rememberMe);
        navigate("/admin-acharya/dashboard");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-[90%] xs:max-w-sm sm:max-w-md md:max-w-md space-y-3 py-9">

        {/* ── Main Login Card ── */}
        <div className="border border-slate-500/45 p-4 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl">

          {/* Logo */}
          <div className="flex justify-center mb-3 sm:mb-3">
            <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 bg-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-gray-200">
              <img src="/logo.png" alt="logo" className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 object-contain" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-3 sm:mb-3">
            <h2 className="text-xl xs:text-2xl sm:text-2xl font-semibold text-gray-900">Welcome Back</h2>
            <p className="text-xs xs:text-sm sm:text-sm text-gray-500 mt-1 sm:mt-2">Sign in to your account</p>
          </div>

          {/* General error */}
          {errors.general && (
            <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs sm:text-sm text-red-600 text-center">{errors.general}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4 sm:mb-5">
              <label className="block text-xs xs:text-sm sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:border-gray-600 transition-colors text-gray-900 placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-3 sm:mb-3">
              <label className="block text-xs xs:text-sm sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-9 sm:pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:border-gray-600 transition-colors text-gray-900 placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs sm:text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="mb-3 flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label htmlFor="remember" className="ml-2 text-xs sm:text-sm text-gray-600">Remember me</label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-600 text-white font-medium py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors shadow-md cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Forgot Password */}
          <p className="text-center mt-3 sm:mt-3">
            <button
              onClick={() => alert("Please contact admin to reset your password")}
              className="text-xs xs:text-sm sm:text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </p>

          {/* Footer */}
          <p className="text-center text-[10px] xs:text-xs sm:text-xs text-gray-400 mt-3 sm:mt-3">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
        {/* ── End Main Login Card ── */}

        {/* ── DEMO CREDENTIALS CARD (outside login card) ── */}
        <div className="relative overflow-hidden rounded-xl border border-dashed border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-3.5">
          <div className="absolute -top-3 -right-3 w-12 h-12 bg-orange-200/20 rounded-full blur-xl pointer-events-none" />

          {/* Header row */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-orange-500 rounded-md flex items-center justify-center">
                <FiZap className="text-white" size={10} />
              </div>
              <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest">Demo Credentials</p>
            </div>
            <button
              type="button"
              onClick={handleUseDemoCredentials}
              className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-all"
            >
              <FiZap size={9} /> Auto Fill
            </button>
          </div>

          {/* Credential rows */}
          <div className="space-y-1.5">
            {/* Email */}
            <div className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2 border border-orange-100">
              <div className="flex items-center gap-2 min-w-0">
                <FiMail className="text-orange-400 flex-shrink-0" size={11} />
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex-shrink-0">Email:</p>
                <p className="text-[11px] font-bold text-gray-700 truncate">{VALID_CREDENTIALS.email}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(VALID_CREDENTIALS.email, 'email')}
                className="ml-2 flex-shrink-0 text-orange-400 hover:text-orange-600 transition-colors"
              >
                {copied === 'email' ? <FiCheck size={12} className="text-green-500" /> : <FiCopy size={12} />}
              </button>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between bg-white/70 rounded-lg px-3 py-2 border border-orange-100">
              <div className="flex items-center gap-2 min-w-0">
                <FiLock className="text-orange-400 flex-shrink-0" size={11} />
                <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex-shrink-0">Pass:</p>
                <p className="text-[11px] font-bold text-gray-700 truncate">{VALID_CREDENTIALS.password}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(VALID_CREDENTIALS.password, 'password')}
                className="ml-2 flex-shrink-0 text-orange-400 hover:text-orange-600 transition-colors"
              >
                {copied === 'password' ? <FiCheck size={12} className="text-green-500" /> : <FiCopy size={12} />}
              </button>
            </div>
          </div>
        </div>
        {/* ── End Demo Credentials Card ── */}

      </div>
    </div>
  );
};

export default Login;