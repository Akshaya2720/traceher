import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldLogo } from '../components/ShieldLogo';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setCurrentPage } = useApp();
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [password, setPassword] = useState('SafetyFirst2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch {
      setError('Incorrect email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Instant Demo Login for judges & quick trial
  const handleInstantDemoLogin = async () => {
    setEmail('ananya.sharma@example.com');
    setPassword('SafetyFirst2026!');
    setError('');
    setLoading(true);
    try {
      await login('ananya.sharma@example.com', 'SafetyFirst2026!');
    } catch {
      setError('Unable to sign in automatically.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#F7F8FC] to-[#F0EDFF]/30">
      
      {/* Emergency helpline strip for stressed users */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mb-4 px-4 py-2 bg-white/90 border border-[#D95F6C]/20 rounded-2xl flex items-center justify-between text-xs shadow-xs"
      >
        <span className="flex items-center gap-1.5 text-[#D95F6C] font-semibold">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Need immediate help?</span>
        </span>
        <div className="flex items-center gap-2 font-bold text-[#D95F6C]">
          <a href="tel:112" className="hover:underline">112 Police</a>
          <span>•</span>
          <a href="tel:1930" className="hover:underline">1930 Cybercrime</a>
        </div>
      </motion.div>

      {/* Main Friendly Login Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-3xl border border-[#E8E9F1] shadow-xl p-6 sm:p-8 space-y-6 text-left"
      >
        {/* Brand & Greeting */}
        <div className="text-center space-y-2">
          <div className="inline-block cursor-pointer" onClick={() => setCurrentPage('landing')}>
            <ShieldLogo size={40} showText={true} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#17172F] font-heading mt-2">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#777A91]">
            Your safe space to organize and protect digital evidence.
          </p>
        </div>

        {/* 1-Click Fast Trial Button */}
        <div className="p-3.5 bg-[#F0EDFF]/70 border border-[#6556D9]/20 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6556D9] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quick Demo Access</span>
            </span>
            <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-[#6556D9] font-semibold border border-[#6556D9]/20">
              No typing needed
            </span>
          </div>
          <button
            type="button"
            onClick={handleInstantDemoLogin}
            disabled={loading}
            className="w-full py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Entering Safe Space...' : '1-Click Instant Sign In as Ananya'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#E8E9F1] w-full" />
          <span className="bg-white px-3 text-[11px] font-medium text-[#777A91] uppercase absolute">
            or sign in with email
          </span>
        </div>

        {error && (
          <div className="p-3 bg-[#FEF2F2] border border-[#D95F6C]/25 rounded-xl text-xs text-[#D95F6C]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#17172F]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#17172F]">Password</label>
              <button
                type="button"
                onClick={() => setCurrentPage('forgot-password')}
                className="text-[11px] font-medium text-[#6556D9] hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777A91] hover:text-[#20213A] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-2 border-t border-[#E8E9F1] text-center space-y-2">
          <p className="text-xs text-[#777A91]">
            New to TRACEHER?{' '}
            <button
              onClick={() => setCurrentPage('register')}
              className="font-bold text-[#6556D9] hover:underline cursor-pointer ml-1"
            >
              Create a free account in 30 seconds
            </button>
          </p>
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#239B75] pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Private • Encrypted • You own your evidence</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
