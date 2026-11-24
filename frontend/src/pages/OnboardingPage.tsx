import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Globe,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { setCurrentPage, currentUser, settings, updateSettings } = useApp();
  const [step, setStep] = useState(1);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['Online harassment']);
  const [language, setLanguage] = useState<'en' | 'ml' | 'hi'>(settings.preferredLanguage || 'en');

  const needsOptions = [
    'Online harassment',
    'Threatening messages',
    'Impersonation & fake profile',
    'Cyberbullying',
    'Repeated unwanted contact',
    'I am exploring the platform'
  ];

  const toggleNeed = (option: string) => {
    setSelectedNeeds(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleFinish = () => {
    updateSettings({ preferredLanguage: language });
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-6 bg-[#F7F8FC]">
      <div className="card-soft w-full max-w-xl p-8 sm:p-10 bg-white border border-[#E8E9F1] shadow-xl text-left space-y-8">
        {/* Step progress dots */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E9F1]">
          <span className="text-[11px] font-bold text-[#6556D9] uppercase tracking-wider">
            Step {step} of 5
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === step ? 'w-6 bg-[#6556D9]' : i < step ? 'bg-[#239B75]' : 'bg-[#E8E9F1]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* SCREEN 1: Welcome */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0EDFF] text-[#6556D9] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#17172F] font-heading">
              Welcome to TRACEHER, {currentUser?.fullName || 'friend'}.
            </h2>
            <p className="text-sm text-[#777A91] leading-relaxed">
              We understand that digital harassment can be overwhelming and exhausting. TRACEHER was built to help you systematically organize evidence, protect your personal privacy, and find verified support at your own pace.
            </p>
            <div className="p-4 bg-[#F0EDFF]/50 border border-[#6556D9]/20 rounded-2xl text-xs text-[#6556D9] space-y-1">
              <span className="font-bold">You are in complete control</span>
              <p className="text-[#777A91]">
                You decide what evidence to upload, what to keep, and if or when to share it. We will never share anything without your explicit action.
              </p>
            </div>
          </div>
        )}

        {/* SCREEN 2: What would you like help with? */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#17172F] font-heading">
              What would you like help with?
            </h2>
            <p className="text-xs text-[#777A91]">
              Select any categories that feel relevant. You can change this anytime and do not have to disclose details you are not comfortable sharing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {needsOptions.map(opt => {
                const isSelected = selectedNeeds.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleNeed(opt)}
                    className={`p-3 text-xs font-semibold rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#6556D9] bg-[#F0EDFF] text-[#6556D9]'
                        : 'border-[#E8E9F1] bg-[#F7F8FC] text-[#20213A] hover:bg-white'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* SCREEN 3: Language Choice */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF1FF] text-[#3B82F6] flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#17172F] font-heading">Choose your language</h2>
            <p className="text-xs text-[#777A91]">
              Select the primary language you prefer for navigating your evidence workspace and reports.
            </p>
            <div className="space-y-2.5 pt-2">
              {[
                { code: 'en', label: 'English', sub: 'Standard interface' },
                { code: 'ml', label: 'മലയാളം (Malayalam)', sub: 'കേരളത്തിനായുള്ള പ്രാദേശിക പിന്തുണ' },
                { code: 'hi', label: 'हिन्दी (Hindi)', sub: 'राष्ट्रीय प्राथमिक भाषा समर्थन' }
              ].map(item => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code as any)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    language === item.code
                      ? 'border-[#6556D9] bg-[#F0EDFF] text-[#6556D9]'
                      : 'border-[#E8E9F1] bg-[#F7F8FC] text-[#20213A] hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">{item.label}</div>
                    <div className="text-[11px] text-[#777A91]">{item.sub}</div>
                  </div>
                  {language === item.code && <CheckCircle2 className="w-5 h-5 text-[#6556D9]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 4: Understand your privacy */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F6F0] text-[#239B75] flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#17172F] font-heading">Understand your privacy</h2>
            <p className="text-xs text-[#777A91]">
              Four non-negotiable promises that govern the TRACEHER platform:
            </p>
            <div className="space-y-2.5 text-xs text-[#20213A]">
              <div className="p-3 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#239B75] shrink-0" />
                <span>Original files are never overwritten and stay hashed with SHA-256.</span>
              </div>
              <div className="p-3 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#239B75] shrink-0" />
                <span>Personal phone numbers & addresses can be masked before creating exports.</span>
              </div>
              <div className="p-3 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#239B75] shrink-0" />
                <span>AI analysis is assistive and explainable — not legal judgment.</span>
              </div>
              <div className="p-3 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#239B75] shrink-0" />
                <span>You can delete your account and all stored evidence with one click anytime.</span>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 5: Workspace Ready */}
        {step === 5 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#E8F6F0] text-[#239B75] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#17172F] font-heading">Your workspace is ready.</h2>
            <p className="text-xs text-[#777A91] leading-relaxed max-w-md mx-auto">
              You can now upload your first screenshot, link evidence into an incident, or explore the preloaded fictional demo cases to see how everything works.
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E8E9F1]">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#777A91] hover:text-[#20213A] rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="text-xs text-[#777A91] hover:underline"
            >
              Skip onboarding
            </button>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
