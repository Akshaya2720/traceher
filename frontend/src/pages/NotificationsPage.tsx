import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle2,
  Trash2,
  Check,
  FolderOpen,
  Sparkles,
  FileText,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    setCurrentPage
  } = useApp();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'analysis': return <Sparkles className="w-4 h-4 text-[#6556D9]" />;
      case 'upload': return <FolderOpen className="w-4 h-4 text-[#3B82F6]" />;
      case 'report': return <FileText className="w-4 h-4 text-[#239B75]" />;
      default: return <AlertTriangle className="w-4 h-4 text-[#E8A33D]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E9F1]">
        <div>
          <h1 className="text-2xl font-bold text-[#17172F] font-heading">Notifications</h1>
          <p className="text-xs text-[#777A91]">
            Processing updates, integrity checkpoints, and safety alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E8E9F1] hover:bg-[#F7F8FC] text-xs font-semibold text-[#20213A] rounded-xl transition-colors"
          >
            <Check className="w-3.5 h-3.5 text-[#6556D9]" />
            <span>Mark all as read</span>
          </button>
          <button
            onClick={clearNotifications}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E8E9F1] hover:bg-[#FEF2F2] text-xs font-semibold text-[#D95F6C] rounded-xl transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear all</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="card-soft p-12 text-center bg-white border border-[#E8E9F1] space-y-3">
            <Bell className="w-8 h-8 text-[#777A91] mx-auto" />
            <h3 className="text-sm font-bold text-[#17172F]">No notifications</h3>
            <p className="text-xs text-[#777A91]">All your evidence processing and safety updates are up to date.</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.actionUrl) setCurrentPage(n.actionUrl as PageId);
              }}
              className={`card-soft p-4 sm:p-5 border transition-all cursor-pointer flex items-start gap-4 ${
                n.isRead
                  ? 'bg-white border-[#E8E9F1] hover:bg-[#F7F8FC]'
                  : 'bg-[#F0EDFF]/30 border-[#6556D9]/30 hover:bg-[#F0EDFF]/50 shadow-xs'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E9F1] shadow-2xs shrink-0 mt-0.5">
                {getCategoryIcon(n.category)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold ${n.isRead ? 'text-[#17172F]' : 'text-[#6556D9]'}`}>
                    {n.title}
                  </span>
                  <span className="text-[10px] text-[#777A91] whitespace-nowrap">
                    {n.createdAt.substring(0, 10)}
                  </span>
                </div>
                <p className="text-xs text-[#777A91] leading-relaxed">{n.message}</p>
              </div>

              <ChevronRight className="w-4 h-4 text-[#B6BACB] self-center shrink-0" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
