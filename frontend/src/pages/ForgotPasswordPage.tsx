import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-6 bg-[#F7F8FC]">
      <div className="card-soft w-full max-w-md p-8 text-left space-y-6 bg-white border border-[#E8E9F1]">
        <button
          onClick={() => setCurrentPage('login')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#777A91] hover:text-[#20213A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </button>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#17172F] font-heading">Reset Password</h2>
          <p className="text-xs text-[#777A91]">
            Enter your registered email address and we'll send you a secure recovery link.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 bg-[#E8F6F0] border border-[#239B75]/20 rounded-2xl text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#239B75]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Recovery Link Sent</span>
            </div>
            <p className="text-xs text-[#20213A] leading-relaxed">
              If an account is associated with <strong>{email}</strong>, a recovery instruction email has been dispatched.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('login')}
                className="w-full py-2.5 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
              >
                Return to Login
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#17172F]">Registered Email</label>
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

            <button
              type="submit"
              className="w-full py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
