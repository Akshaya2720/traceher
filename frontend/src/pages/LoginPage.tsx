import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldLogo } from '../components/ShieldLogo';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setCurrentPage } = useApp();
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [password, setPassword] = useState('SafetyFirst2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both your email address and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials. Please verify your email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-stretch bg-[#F7F8FC]">
      {/* Left split: Formal White & Soft Purple presentation */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 bg-white border-r border-[#E8E9F1] p-12 flex-col justify-between relative overflow-hidden"
      >
        <div className="space-y-6 relative z-10 text-left">
          <div onClick={() => setCurrentPage('landing')} className="cursor-pointer">
            <ShieldLogo size={42} showText={true} />
          </div>

          <div className="pt-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EDFF] text-xs font-semibold text-[#6556D9]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CONFIDENTIAL SAFETY WORKSPACE</span>
            </div>
            <h1 className="text-4xl font-extrabold font-heading text-[#17172F] tracking-tight leading-tight">
              Welcome back.
            </h1>
            <p className="text-sm text-[#777A91] leading-relaxed max-w-md">
              Your digital safety workspace is ready. Log in to manage your evidence, review AI classifications, or compile protected incident reports.
            </p>
          </div>
        </div>

        {/* Floating security card */}
        <div className="p-5 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-2 relative z-10 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#239B75]">
            <CheckCircle2 className="w-4 h-4 text-[#239B75]" />
            <span>Zero-Knowledge Evidence Isolation</span>
          </div>
          <p className="text-xs text-[#777A91] leading-relaxed">
            Your evidence files are hashed locally with SHA-256 upon ingest and stored in a read-only, write-protected custody vault.
          </p>
        </div>
      </motion.div>

      {/* Right split: Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8 text-left bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E9F1] shadow-sm"
        >
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-[#17172F] font-heading">Sign In to TRACEHER</h2>
            <p className="text-xs text-[#777A91]">
              Enter your credentials to access your private evidence vault.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-[#FEF2F2] border border-[#D95F6C]/20 rounded-xl text-xs text-[#D95F6C]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#17172F]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
                  placeholder="••••••••••••"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#6556D9] rounded border-[#E8E9F1] focus:ring-[#6556D9]"
                />
                <span className="text-xs text-[#777A91]">Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-[#777A91]">
              Don't have an account yet?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="font-semibold text-[#6556D9] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
