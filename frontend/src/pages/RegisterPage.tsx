import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldLogo } from '../components/ShieldLogo';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Globe, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, setCurrentPage } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState<'en' | 'ml' | 'hi'>('en');
  const [agreed, setAgreed] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please provide your name, email, and a password.');
      return;
    }
    if (password.length < 6) {
      setError('Please choose a password with at least 6 characters.');
      return;
    }
    if (!agreed) {
      setError('Please check the box to confirm your privacy agreement.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(fullName, email, password, language);
    } catch {
      setError('Could not create account. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#F7F8FC] to-[#F0EDFF]/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-3xl border border-[#E8E9F1] shadow-xl p-6 sm:p-8 space-y-6 text-left"
      >
        {/* Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-block cursor-pointer" onClick={() => setCurrentPage('landing')}>
            <ShieldLogo size={38} showText={true} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#17172F] font-heading mt-2">
            Create Your Safe Space
          </h1>
          <p className="text-xs sm:text-sm text-[#777A91]">
            Simple, private evidence protection. Ready in under 1 minute.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-[#FEF2F2] border border-[#D95F6C]/25 rounded-xl text-xs text-[#D95F6C]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name or Alias */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#17172F]">Your Name or Alias</label>
              <span className="text-[10px] text-[#777A91]">Nicknames are welcome</span>
            </div>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Priya or Maya"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Preferred Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#17172F]">Preferred Language</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as any)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all cursor-pointer"
              >
                <option value="en">English</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#17172F]">Choose Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
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

          {/* Simple agreement */}
          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="w-4 h-4 text-[#6556D9] rounded border-[#E8E9F1] focus:ring-[#6556D9] mt-0.5"
            />
            <span className="text-[11px] text-[#777A91] leading-relaxed">
              I agree to keep my evidence private and understand my files are strictly confidential and never shared.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? 'Setting up your space...' : 'Create Account & Enter'}
          </button>
        </form>

        <div className="pt-2 border-t border-[#E8E9F1] text-center space-y-2">
          <p className="text-xs text-[#777A91]">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="font-bold text-[#6556D9] hover:underline cursor-pointer ml-1"
            >
              Sign In
            </button>
          </p>
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#239B75] pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero public tracking • Encrypted storage</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
