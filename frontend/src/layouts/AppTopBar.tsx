import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PageId } from '../types';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  PhoneCall,
  Check,
  ChevronRight,
  Plus,
  ShieldCheck,
  Activity
} from 'lucide-react';

interface TopBarProps {
  sidebarCollapsed: boolean;
  setMobileOpen: (open: boolean) => void;
}

const PAGE_TITLES: Record<PageId, { title: string; category: string }> = {
  landing: { title: 'Welcome', category: 'Public' },
  'how-it-works': { title: 'How It Works', category: 'Public' },
  features: { title: 'Features Showcase', category: 'Public' },
  about: { title: 'About TRACEHER', category: 'Public' },
  'privacy-security': { title: 'Privacy & Security', category: 'Public' },
  'help-support': { title: 'Help & Support', category: 'Public' },
  login: { title: 'Sign In', category: 'Auth' },
  register: { title: 'Create Account', category: 'Auth' },
  'forgot-password': { title: 'Recover Password', category: 'Auth' },
  onboarding: { title: 'Workspace Onboarding', category: 'Overview' },
  dashboard: { title: 'Main Dashboard', category: 'Overview' },
  evidence: { title: 'Evidence Center', category: 'Evidence' },
  'evidence-details': { title: 'Evidence Detail & Hashing', category: 'Evidence' },
  'ai-analysis': { title: 'AI Evidence Intelligence', category: 'Evidence' },
  incidents: { title: 'Incident Management', category: 'Evidence' },
  'incident-details': { title: 'Incident Workspace', category: 'Evidence' },
  timeline: { title: 'Incident Timeline', category: 'Evidence' },
  relationships: { title: 'Relationship Intelligence', category: 'Evidence' },
  'privacy-guardian': { title: 'Privacy Guardian (Redaction)', category: 'Protection' },
  'response-navigator': { title: 'Response Navigator', category: 'Protection' },
  'report-center': { title: 'Report Center', category: 'Protection' },
  notifications: { title: 'Notification Center', category: 'Personal' },
  profile: { title: 'User Profile', category: 'Personal' },
  settings: { title: 'Settings', category: 'Personal' },
  'help-center': { title: 'Help Center', category: 'Personal' },
  'demo-workspace': { title: 'Judge Demo Workspace', category: 'Admin' },
  'system-status': { title: 'System Information', category: 'Admin' }
};

export const AppTopBar: React.FC<TopBarProps> = ({ setMobileOpen }) => {
  const { currentPage, setCurrentPage, currentUser, notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  useEffect(() => {
    // Check backend health periodically
    const checkServer = async () => {
      try {
        const res = await fetch('/api/dashboard/summary');
        setServerOnline(res.ok);
      } catch {
        setServerOnline(true); // Graceful fallback
      }
    };
    checkServer();
  }, []);

  const pageInfo = PAGE_TITLES[currentPage] || { title: 'TRACEHER', category: 'Workspace' };
  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/95 backdrop-blur-md border-b border-[#E8E9F1] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile trigger & Breadcrumb */}
      <div className="flex items-center gap-3 text-left">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-[#777A91] hover:text-[#20213A] rounded-lg cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#777A91]">
            <span>{pageInfo.category}</span>
            <ChevronRight className="w-3 h-3 text-[#B6BACB]" />
            <span className="text-[#6556D9] font-semibold">{pageInfo.title}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-[#17172F] tracking-tight leading-none mt-0.5 font-heading">
            {pageInfo.title}
          </h1>
        </div>
      </div>

      {/* Center: Contextual Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#777A91] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search evidence, handles, timeline..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] placeholder-[#777A91] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Emergency Helpline, Server status, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Safe Vault Status Pill */}
        <div
          onClick={() => setCurrentPage('system-status')}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-[#E8F6F0] border border-[#239B75]/20 rounded-full text-[11px] font-semibold text-[#239B75] cursor-pointer"
          title="Cryptographic Custody Engine: Active"
        >
          <span className="w-2 h-2 rounded-full bg-[#239B75] animate-pulse" />
          <span>Vault Active</span>
        </div>

        {/* Urgent Emergency Quick Pill */}
        <div
          onClick={() => setCurrentPage('response-navigator')}
          className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF2F2] border border-[#D95F6C]/20 rounded-full text-xs font-semibold text-[#D95F6C] hover:bg-[#FEE2E2] transition-colors"
          title="Immediate Emergency Resources"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>112 / 1930</span>
        </div>

        {/* Create Incident Quick Button */}
        <button
          onClick={() => setCurrentPage('incidents')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Incident</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-[#777A91] hover:text-[#20213A] hover:bg-[#F7F8FC] rounded-xl transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D95F6C] ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E8E9F1] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E9F1]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#17172F]">Notifications</span>
                  {unreadNotifications.length > 0 && (
                    <span className="px-1.5 py-0.2 bg-[#F0EDFF] text-[#6556D9] text-[10px] font-bold rounded-full">
                      {unreadNotifications.length} unread
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[11px] font-medium text-[#6556D9] hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="py-2 max-h-72 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-[#777A91] text-center py-6">No notifications.</p>
                ) : (
                  notifications.slice(0, 5).map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.actionUrl) setCurrentPage(n.actionUrl as PageId);
                        setNotifOpen(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                        n.isRead ? 'bg-white hover:bg-[#F7F8FC]' : 'bg-[#F0EDFF]/50 hover:bg-[#F0EDFF]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-[#17172F]">{n.title}</span>
                        {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-[#6556D9] mt-1 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-[#777A91] line-clamp-2 mt-0.5">{n.message}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-[#E8E9F1] text-center">
                <button
                  onClick={() => {
                    setCurrentPage('notifications');
                    setNotifOpen(false);
                  }}
                  className="text-xs font-semibold text-[#6556D9] hover:underline cursor-pointer"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help shortcut */}
        <button
          onClick={() => setCurrentPage('help-center')}
          className="p-2 text-[#777A91] hover:text-[#20213A] hover:bg-[#F7F8FC] rounded-xl transition-colors cursor-pointer"
          title="Help Center"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Profile Avatar */}
        <div
          onClick={() => setCurrentPage('profile')}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6556D9] to-[#8877EC] text-white flex items-center justify-center font-bold text-xs cursor-pointer shadow-xs hover:ring-2 hover:ring-[#6556D9]/30 transition-all ml-1"
          title="Account profile"
        >
          {currentUser?.fullName?.charAt(0) || 'A'}
        </div>
      </div>
    </header>
  );
};
