import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldLogo } from '../components/ShieldLogo';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Globe, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, setCurrentPage } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState<'en' | 'ml' | 'hi'>('en');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strengthScore = getPasswordStrength();
  const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  const strengthColors = ['bg-[#D95F6C]', 'bg-[#E8A33D]', 'bg-[#8877EC]', 'bg-[#239B75]', 'bg-[#239B75]'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setError('You must agree to the privacy policy to protect your evidence.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(fullName, email, password, language);
    } catch (err) {
      setError('Unable to register. Please try another email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-stretch bg-[#F7F8FC]">
      {/* Left split: Formal White & Lavender presentation */}
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
              <span>YOUR RECOVERY & SAFETY SUITE</span>
            </div>
            <h1 className="text-4xl font-extrabold font-heading text-[#17172F] tracking-tight leading-tight">
              Create your private workspace.
            </h1>
            <p className="text-sm text-[#777A91] leading-relaxed max-w-md">
              TRACEHER gives you full control. Your uploads remain encrypted and private. Set up your account in seconds and choose your preferred language.
            </p>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="space-y-2.5 relative z-10 text-xs text-[#20213A] text-left p-5 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1]">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#239B75]" />
            <span>Zero public model indexing or external training</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#239B75]" />
            <span>Multilingual: English, Malayalam, Hindi</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#239B75]" />
            <span>Complete account and evidence wipe available at any time</span>
          </div>
        </div>
      </motion.div>

      {/* Right split: Registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-6 text-left py-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E9F1] shadow-sm"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#17172F] font-heading">Get Started with TRACEHER</h2>
            <p className="text-xs text-[#777A91]">
              Set up your safe digital evidence workspace in less than a minute.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-[#FEF2F2] border border-[#D95F6C]/20 rounded-xl text-xs text-[#D95F6C]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#17172F]">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
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

            {/* Preferred Language */}
            <div className="space-y-1">
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
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#17172F]">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

              {/* Password strength bar */}
              {password && (
                <div className="pt-1.5 space-y-1">
                  <div className="flex gap-1 h-1">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full ${
                          i < strengthScore ? strengthColors[strengthScore] : 'bg-[#E8E9F1]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#777A91]">
                    Strength: <strong className="text-[#20213A]">{strengthLabels[strengthScore]}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#17172F]">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Agree to Privacy Policy */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="w-4 h-4 text-[#6556D9] rounded border-[#E8E9F1] focus:ring-[#6556D9] mt-0.5"
                />
                <span className="text-xs text-[#777A91] leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentPage('privacy-security')}
                    className="font-medium text-[#6556D9] hover:underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  . I understand that my original evidence files remain private and will never be shared without my consent.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {loading ? (
                <span>Setting up workspace...</span>
              ) : (
                <>
                  <span>Create Safe Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-[#777A91]">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="font-semibold text-[#6556D9] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
