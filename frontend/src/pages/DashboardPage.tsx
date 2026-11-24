import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  FolderOpen,
  Sparkles,
  FileText,
  Plus,
  Upload,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronRight,
  Flame,
  Activity,
  CheckCircle2,
  Lock,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1] as [number, number, number, number], duration: 0.45 } }
};

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    incidents,
    evidenceList,
    reports,
    setCurrentPage,
    setSelectedIncidentId,
    loadScenario,
    t
  } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const totalIncidents = incidents.length;
  const totalEvidence = evidenceList.length;
  const totalAnalyses = evidenceList.reduce((acc, ev) => acc + (ev.analyses?.length || 0), 0);
  const totalReports = reports.length;
  const activeIncidents = incidents.filter(i => i.status === 'active' || i.status === 'under_review').length;

  const categoryMap: Record<string, number> = {};
  incidents.forEach(inc => {
    categoryMap[inc.category] = (categoryMap[inc.category] || 0) + 1;
  });
  const categoryChartData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  const COLORS = ['#6556D9', '#D95F6C', '#E8A33D', '#3B82F6', '#8877EC', '#239B75'];

  const activityData = [
    { day: 'Mon', uploads: 2, analyses: 2, reports: 0 },
    { day: 'Tue', uploads: 4, analyses: 3, reports: 1 },
    { day: 'Wed', uploads: 3, analyses: 4, reports: 0 },
    { day: 'Thu', uploads: 5, analyses: 5, reports: 1 },
    { day: 'Fri', uploads: 4, analyses: 4, reports: 0 },
    { day: 'Sat', uploads: 6, analyses: 6, reports: 2 },
    { day: 'Sun', uploads: 3, analyses: 3, reports: 1 },
  ];

  const statCards = [
    {
      icon: AlertTriangle,
      label: 'Active Incidents',
      value: activeIncidents,
      total: totalIncidents,
      color: '#D95F6C',
      bg: '#FEF2F2',
      action: () => setCurrentPage('incidents'),
      actionLabel: 'View all',
    },
    {
      icon: FolderOpen,
      label: 'Evidence Files',
      value: totalEvidence,
      total: null,
      color: '#6556D9',
      bg: '#F0EDFF',
      action: () => setCurrentPage('evidence'),
      actionLabel: 'Manage',
    },
    {
      icon: Sparkles,
      label: 'AI Analyses Run',
      value: totalAnalyses,
      total: null,
      color: '#3B82F6',
      bg: '#EAF1FF',
      action: () => setCurrentPage('ai-analysis'),
      actionLabel: 'Review',
    },
    {
      icon: FileText,
      label: 'Reports Generated',
      value: totalReports,
      total: null,
      color: '#239B75',
      bg: '#E8F6F0',
      action: () => setCurrentPage('report-center'),
      actionLabel: 'Download',
    },
  ];

  const quickActions = [
    { icon: Upload, label: 'Upload New Evidence', desc: 'Add screenshots, PDFs, or message logs', page: 'evidence' as const, color: '#6556D9', bg: '#F0EDFF' },
    { icon: Sparkles, label: 'Run AI Analysis', desc: 'Classify uploaded evidence for threats', page: 'ai-analysis' as const, color: '#3B82F6', bg: '#EAF1FF' },
    { icon: ShieldCheck, label: 'Privacy Redaction', desc: 'Mask personal info before sharing', page: 'privacy-guardian' as const, color: '#239B75', bg: '#E8F6F0' },
    { icon: FileText, label: 'Generate Report', desc: 'Create court-ready PDF dossier', page: 'report-center' as const, color: '#E8A33D', bg: '#FFF8EB' },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 text-left pb-12"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white via-white to-[#F0EDFF]/50 border border-[#E8E9F1] p-6 sm:p-8"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6556D9]/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6556D9]">
              <span className="w-2 h-2 rounded-full bg-[#239B75] animate-pulse" />
              <span>Secure Workspace Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17172F] font-heading tracking-tight">
              Welcome back, {currentUser?.fullName?.split(' ')[0] || 'Ananya'} 👋
            </h1>
            <p className="text-sm text-[#777A91] max-w-xl">
              Your evidence vault is secured. {totalIncidents > 0 ? `You have ${activeIncidents} active incident${activeIncidents !== 1 ? 's' : ''} under management.` : 'Start by uploading your first piece of evidence.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('demo-workspace')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F0EDFF] hover:bg-[#E2DCFF] text-[#6556D9] text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 text-[#E8A33D]" />
              <span>Judge Demo Mode</span>
            </button>
            <button
              onClick={() => setCurrentPage('evidence')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Incident</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              whileHover={{ y: -3 }}
              className="p-5 bg-white border border-[#E8E9F1] rounded-2xl cursor-pointer transition-all hover:border-[#6556D9]/20 hover:shadow-md group"
              onClick={card.action}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: card.bg, color: card.color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-[#B6BACB] group-hover:text-[#6556D9] transition-colors" />
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black font-heading" style={{ color: card.color }}>{card.value}</div>
                {card.total !== null && <div className="text-[10px] text-[#777A91]">of {card.total} total</div>}
                <div className="text-xs font-semibold text-[#20213A]">{card.label}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F7F8FC]">
                <span className="text-[11px] font-medium text-[#6556D9]">{card.actionLabel} →</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-6 bg-white border border-[#E8E9F1] rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#17172F] font-heading">Weekly Activity</h3>
              <p className="text-xs text-[#777A91]">Uploads, analyses, and reports</p>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#239B75]" />
              <span className="text-xs font-semibold text-[#239B75]">+12% this week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activityData} barSize={8} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F7F8FC" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#777A91' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#777A91' }} axisLine={false} tickLine={false} width={24} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #E8E9F1', borderRadius: 12, fontSize: 11 }}
                cursor={{ fill: '#F7F8FC' }}
              />
              <Bar dataKey="uploads" fill="#6556D9" radius={[4, 4, 0, 0]} name="Uploads" />
              <Bar dataKey="analyses" fill="#8877EC" radius={[4, 4, 0, 0]} name="Analyses" />
              <Bar dataKey="reports" fill="#239B75" radius={[4, 4, 0, 0]} name="Reports" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 text-[11px] text-[#777A91]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#6556D9]" />Uploads</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#8877EC]" />Analyses</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#239B75]" />Reports</span>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-white border border-[#E8E9F1] rounded-2xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#17172F] font-heading">Incident Categories</h3>
            <p className="text-xs text-[#777A91]">Distribution by harassment type</p>
          </div>
          {categoryChartData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={categoryChartData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none">
                    {categoryChartData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E8E9F1', borderRadius: 12, fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-1.5">
                {categoryChartData.map((d, idx) => (
                  <div key={d.name} className="flex items-center gap-2 text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-[#20213A] font-medium truncate">{d.name}</span>
                    <span className="text-[#777A91] ml-auto font-mono">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F7F8FC] flex items-center justify-center mb-3">
                <Activity className="w-7 h-7 text-[#B6BACB]" />
              </div>
              <p className="text-xs text-[#777A91]">No incidents yet. Create your first incident to see distribution.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#17172F] font-heading">Quick Actions</h2>
          <span className="text-xs text-[#777A91]">Most common workflows</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileHover={{ y: -3 }}
                onClick={() => setCurrentPage(action.page)}
                className="p-5 bg-white border border-[#E8E9F1] rounded-2xl cursor-pointer hover:border-[#6556D9]/20 hover:shadow-md transition-all group text-left"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform" style={{ backgroundColor: action.bg, color: action.color }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-[#17172F] mb-1">{action.label}</h3>
                <p className="text-[11px] text-[#777A91] leading-relaxed">{action.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold" style={{ color: action.color }}>
                  <span>Go</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Incidents */}
      {incidents.length > 0 && (
        <motion.div variants={item} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#17172F] font-heading">Recent Incidents</h2>
            <button
              onClick={() => setCurrentPage('incidents')}
              className="text-xs font-semibold text-[#6556D9] hover:underline cursor-pointer"
            >
              View all →
            </button>
          </div>
          <div className="bg-white border border-[#E8E9F1] rounded-2xl overflow-hidden">
            {incidents.slice(0, 4).map((inc, i) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => { setSelectedIncidentId(inc.id); setCurrentPage('incident-details'); }}
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#F7F8FC] transition-colors ${i < incidents.slice(0, 4).length - 1 ? 'border-b border-[#E8E9F1]' : ''}`}
              >
                <div className={`w-2 h-10 rounded-full shrink-0 ${inc.status === 'active' ? 'bg-[#D95F6C]' : inc.status === 'under_review' ? 'bg-[#E8A33D]' : 'bg-[#239B75]'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#777A91]">{inc.referenceNumber}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      inc.status === 'active' ? 'bg-[#FEF2F2] text-[#D95F6C]' :
                      inc.status === 'under_review' ? 'bg-[#FFF8EB] text-[#E8A33D]' :
                      'bg-[#E8F6F0] text-[#239B75]'
                    }`}>{inc.status}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#17172F] truncate">{inc.title}</p>
                  <p className="text-[11px] text-[#777A91]">{inc.category} • {inc.incidentDate}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#777A91] shrink-0">
                  <span>{inc.evidenceIds?.length || 0} files</span>
                  <ChevronRight className="w-4 h-4 text-[#B6BACB]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Emergency Footer Bar */}
      <motion.div
        variants={item}
        className="p-4 bg-white border border-[#D95F6C]/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 text-sm">
          <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-[#D95F6C]" />
          </div>
          <div>
            <span className="font-bold text-[#17172F]">In immediate danger?</span>
            <span className="text-[#777A91] ml-1 text-xs">Contact emergency services immediately.</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="px-4 py-2 bg-[#D95F6C] text-white rounded-xl cursor-pointer hover:bg-[#C04E5A] transition-colors">
            📞 112 Police
          </span>
          <span className="px-4 py-2 bg-[#FEF2F2] text-[#D95F6C] border border-[#D95F6C]/20 rounded-xl cursor-pointer hover:bg-[#FEE2E2] transition-colors">
            💻 1930 Cyber Crime
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
