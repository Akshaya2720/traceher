import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldLogo } from '../components/ShieldLogo';
import { PageId } from '../types';
import {
  LayoutDashboard,
  FolderOpen,
  Sparkles,
  AlertTriangle,
  Clock,
  GitGraph,
  EyeOff,
  Compass,
  FileText,
  Bell,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Globe,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (o: boolean) => void;
}

export const AppSidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const { currentPage, setCurrentPage, currentUser, logout, notifications, settings, updateSettings, t } = useApp();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navGroups: {
    title: string;
    items: { id: PageId; label: string; icon: any; badge?: number | string }[];
  }[] = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard }
      ]
    },
    {
      title: 'EVIDENCE',
      items: [
        { id: 'evidence', label: t('evidence_center'), icon: FolderOpen },
        { id: 'ai-analysis', label: t('ai_analysis'), icon: Sparkles },
        { id: 'incidents', label: 'My Incidents', icon: AlertTriangle },
        { id: 'timeline', label: t('timeline'), icon: Clock },
        { id: 'relationships', label: t('relationships'), icon: GitGraph }
      ]
    },
    {
      title: 'PROTECTION',
      items: [
        { id: 'privacy-guardian', label: t('privacy_guardian'), icon: EyeOff },
        { id: 'response-navigator', label: t('response_nav'), icon: Compass },
        { id: 'report-center', label: t('reports'), icon: FileText }
      ]
    },
    {
      title: 'PERSONAL',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
        { id: 'help-center', label: t('help_support'), icon: HelpCircle },
        { id: 'settings', label: t('settings'), icon: Settings }
      ]
    }
  ];

  const handleNav = (id: PageId) => {
    setCurrentPage(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-[#E8E9F1] transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Logo & Collapse Toggle */}
        <div className="h-18 flex items-center justify-between px-4 border-b border-[#E8E9F1]">
          <div onClick={() => handleNav('dashboard')} className="overflow-hidden">
            <ShieldLogo size={34} showText={!collapsed} />
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 text-[#777A91] hover:text-[#20213A] hover:bg-[#F7F8FC] rounded-lg transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Demo Mode Pill */}
        <div className="px-3 pt-3">
          <button
            onClick={() => handleNav('demo-workspace')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentPage === 'demo-workspace'
                ? 'bg-[#6556D9] text-white shadow-sm'
                : 'bg-[#F0EDFF] text-[#6556D9] hover:bg-[#E2DCFF]'
            } ${collapsed ? 'justify-center px-0' : ''}`}
            title="Judge Demo Mode (Fictional Scenarios)"
          >
            <Flame className="w-4 h-4 shrink-0 text-[#E8A33D]" />
            {!collapsed && (
              <div className="flex items-center justify-between w-full">
                <span>Judge Demo Mode</span>
                <span className="text-[10px] bg-white/30 px-1.5 py-0.5 rounded">3 Scenarios</span>
              </div>
            )}
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {navGroups.map(group => (
            <div key={group.title} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#777A91]">
                  {group.title}
                </div>
              )}
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#6556D9] text-white font-semibold shadow-sm shadow-[#6556D9]/20'
                        : 'text-[#777A91] hover:text-[#20213A] hover:bg-[#F7F8FC]'
                    } ${collapsed ? 'justify-center' : ''}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#777A91] group-hover:text-[#6556D9]'}`} />
                    {!collapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {item.badge && !collapsed && (
                      <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                        isActive ? 'bg-white text-[#6556D9]' : 'bg-[#D95F6C] text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {item.badge && collapsed && (
                      <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#D95F6C]" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Profile & Settings */}
        <div className="p-3 border-t border-[#E8E9F1] space-y-2">
          {/* Language Selector */}
          {!collapsed && (
            <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#F7F8FC] rounded-lg text-xs">
              <span className="flex items-center gap-1.5 text-[#777A91]">
                <Globe className="w-3.5 h-3.5" />
                Language
              </span>
              <select
                value={settings.preferredLanguage}
                onChange={e => updateSettings({ preferredLanguage: e.target.value as any })}
                className="bg-transparent font-medium text-[#20213A] focus:outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="ml">മലയാളം</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
          )}

          {/* User profile row */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F7F8FC] transition-colors">
            <div
              onClick={() => handleNav('profile')}
              className="flex items-center gap-2.5 cursor-pointer overflow-hidden"
            >
              <div className="w-8 h-8 rounded-full bg-[#6556D9] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser?.fullName?.charAt(0) || 'A'}
              </div>
              {!collapsed && (
                <div className="flex flex-col text-left truncate">
                  <span className="text-xs font-semibold text-[#20213A] truncate">
                    {currentUser?.fullName || 'Ananya Sharma'}
                  </span>
                  <span className="text-[10px] text-[#777A91] truncate">
                    {currentUser?.email || 'ananya.sharma@example.com'}
                  </span>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={logout}
                className="p-1.5 text-[#777A91] hover:text-[#D95F6C] rounded-lg transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
