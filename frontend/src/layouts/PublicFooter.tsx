import React from 'react';
import { ShieldLogo } from '../components/ShieldLogo';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, ExternalLink, Heart } from 'lucide-react';
import { PageId } from '../types';

export const PublicFooter: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-white border-t border-[#E8E9F1] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E8E9F1]">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <ShieldLogo size={36} />
            <p className="text-sm text-[#777A91] leading-relaxed max-w-sm">
              Your Digital Safety. Your Evidence. Your Control. An AI-powered platform transforming fragmented digital harassment evidence into organized, cryptographically verifiable incident intelligence.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#239B75] bg-[#E8F6F0] px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>InnovateHER Track: Safety & Accessibility</span>
            </div>
          </div>

          {/* Links 1: Platform */}
          <div>
            <h4 className="text-xs font-bold text-[#17172F] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-[#777A91]">
              <li>
                <button onClick={() => setCurrentPage('how-it-works')} className="hover:text-[#6556D9] transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('features')} className="hover:text-[#6556D9] transition-colors">
                  Features & AI Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('privacy-security')} className="hover:text-[#6556D9] transition-colors">
                  Privacy Architecture
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('demo-workspace')} className="hover:text-[#6556D9] font-medium text-[#6556D9] transition-colors">
                  Interactive Demo Mode
                </button>
              </li>
            </ul>
          </div>

          {/* Links 2: Organization */}
          <div>
            <h4 className="text-xs font-bold text-[#17172F] uppercase tracking-wider mb-4">About & Trust</h4>
            <ul className="space-y-2.5 text-sm text-[#777A91]">
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-[#6556D9] transition-colors">
                  About TRACEHER
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('privacy-security')} className="hover:text-[#6556D9] transition-colors">
                  Zero Overwrite Policy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('help-support')} className="hover:text-[#6556D9] transition-colors">
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('response-navigator')} className="hover:text-[#6556D9] transition-colors">
                  Reporting Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Links 3: Official Resources */}
          <div>
            <h4 className="text-xs font-bold text-[#17172F] uppercase tracking-wider mb-4">Official Resources</h4>
            <ul className="space-y-2.5 text-sm text-[#777A91]">
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#20213A] hover:text-[#6556D9] font-medium"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#777A91]" />
                </a>
              </li>
              <li className="text-xs text-[#777A91]">cybercrime.gov.in</li>
              <li className="pt-2">
                <span className="text-xs font-bold text-[#D95F6C]">Emergency Helpline: 112</span>
              </li>
              <li>
                <span className="text-xs font-bold text-[#6556D9]">Cyber Helpline: 1930</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777A91]">
          <p>© 2026 TRACEHER. Built for the InnovateHER Challenge. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Inter Interlocked Safety Core</span>
            <span>•</span>
            <span>SHA-256 Custody Verification</span>
            <span>•</span>
            <span>Non-Destructive Redaction</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
