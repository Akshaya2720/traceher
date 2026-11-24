import React, { useState } from 'react';
import { ShieldLogo } from '../components/ShieldLogo';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import { PageId } from '../types';

export const PublicNavbar: React.FC = () => {
  const { currentPage, setCurrentPage, isAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'landing' },
    { label: 'How It Works', page: 'how-it-works' },
    { label: 'Features', page: 'features' },
    { label: 'Privacy & Trust', page: 'privacy-security' },
    { label: 'About', page: 'about' },
    { label: 'Help', page: 'help-support' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E8E9F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Logo */}
        <div onClick={() => setCurrentPage('landing')}>
          <ShieldLogo size={36} />
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map(link => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? 'text-[#6556D9] bg-[#F0EDFF]'
                    : 'text-[#777A91] hover:text-[#20213A] hover:bg-[#F7F8FC]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF2F2] border border-[#D95F6C]/20 rounded-full text-xs font-semibold text-[#D95F6C]">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency: 112 / 1930</span>
          </div>

          {isAuthenticated ? (
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#6556D9] hover:bg-[#5244C4] rounded-xl shadow-sm transition-all"
            >
              <span>Go to Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 text-sm font-medium text-[#20213A] hover:text-[#6556D9] rounded-xl transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#6556D9] hover:bg-[#5244C4] rounded-xl shadow-sm transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#777A91] hover:text-[#20213A] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#E8E9F1] bg-white px-4 pt-2 pb-6 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => {
                setCurrentPage(link.page);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg text-[#20213A] hover:bg-[#F0EDFF] hover:text-[#6556D9]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-[#E8E9F1] flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentPage('login');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-medium text-[#20213A] border border-[#E8E9F1] rounded-xl"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setCurrentPage('register');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#6556D9] rounded-xl shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
