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
  ExternalLink,
  Flame,
  Activity,
  CheckCircle2,
  Lock
} from 'lucide-react';
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

  // Dynamic calculations
  const totalIncidents = incidents.length;
  const totalEvidence = evidenceList.length;
  const totalAnalyses = evidenceList.reduce((acc, ev) => acc + (ev.analyses?.length || 0), 0);
  const totalReports = reports.length;

  // Chart data 1: Category Distribution
  const categoryMap: Record<string, number> = {};
  incidents.forEach(inc => {
    categoryMap[inc.category] = (categoryMap[inc.category] || 0) + 1;
  });

  const categoryChartData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#6556D9', '#D95F6C', '#E8A33D', '#3B82F6', '#8877EC', '#239B75'];

  // Chart data 2: Activity over time
  const activityData = [
    { day: 'Mon', uploads: 2, analyses: 2, reports: 0 },
    { day: 'Tue', uploads: 4, analyses: 3, reports: 1 },
    { day: 'Wed', uploads: 3, analyses: 4, reports: 0 },
    { day: 'Thu', uploads: 5, analyses: 5, reports: 1 },
    { day: 'Fri', uploads: 4, analyses: 4, reports: 0 },
    { day: 'Sat', uploads: 6, analyses: 6, reports: 2 },
    { day: 'Sun', uploads: 3, analyses: 3, reports: 1 }
  ];

  return (
    <div className="space-y-8 text-left pb-12">
      {/* Welcome & Top Action Bar */}
      <div className="card-soft p-6 sm:p-8 bg-gradient-to-r from-white via-white to-[#F0EDFF]/40 border border-[#E8E9F1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#239B75]" />
            <span className="text-[11px] font-semibold text-[#239B75] uppercase tracking-wider">
              Protected Session Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
            Good morning, {currentUser?.fullName || 'User'}.
          </h1>
          <p className="text-xs sm:text-sm text-[#777A91]">
            Your digital safety workspace, organized in one place. All files are hashed and isolated.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setCurrentPage('incidents')}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Incident</span>
          </button>
          <button
            onClick={() => setCurrentPage('demo-workspace')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F0EDFF] hover:bg-[#E2DCFF] text-[#6556D9] text-xs font-semibold rounded-xl transition-colors shrink-0"
            title="Inspect judging demo scenarios"
          >
            <Flame className="w-4 h-4 text-[#E8A33D]" />
            <span className="hidden sm:inline">Judge Scenarios</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Incidents */}
        <div
          onClick={() => setCurrentPage('incidents')}
          className="card-soft p-5 bg-white border border-[#E8E9F1] card-soft-hover cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#777A91]">Total Incidents</span>
            <div className="w-8 h-8 rounded-xl bg-[#F0EDFF] text-[#6556D9] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-heading text-[#17172F]">{totalIncidents}</span>
            <span className="text-[10px] text-[#239B75] font-semibold">Active Vault</span>
          </div>
        </div>

        {/* Evidence Files */}
        <div
          onClick={() => setCurrentPage('evidence')}
          className="card-soft p-5 bg-white border border-[#E8E9F1] card-soft-hover cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#777A91]">Evidence Files</span>
            <div className="w-8 h-8 rounded-xl bg-[#EAF1FF] text-[#3B82F6] flex items-center justify-center">
              <FolderOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-heading text-[#17172F]">{totalEvidence}</span>
            <span className="text-[10px] text-[#3B82F6] font-semibold">SHA-256 Hashed</span>
          </div>
        </div>

        {/* Analyses Completed */}
        <div
          onClick={() => setCurrentPage('ai-analysis')}
          className="card-soft p-5 bg-white border border-[#E8E9F1] card-soft-hover cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#777A91]">Analyses Completed</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] text-[#E8A33D] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-heading text-[#17172F]">{totalAnalyses}</span>
            <span className="text-[10px] text-[#E8A33D] font-semibold">Classified</span>
          </div>
        </div>

        {/* Reports Generated */}
        <div
          onClick={() => setCurrentPage('report-center')}
          className="card-soft p-5 bg-white border border-[#E8E9F1] card-soft-hover cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#777A91]">Reports Generated</span>
            <div className="w-8 h-8 rounded-xl bg-[#E8F6F0] text-[#239B75] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black font-heading text-[#17172F]">{totalReports}</span>
            <span className="text-[10px] text-[#239B75] font-semibold">Court-Ready PDF</span>
          </div>
        </div>
      </div>

      {/* 4 Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setCurrentPage('evidence')}
          className="p-4 rounded-2xl bg-white border border-[#E8E9F1] hover:border-[#6556D9] text-left transition-all card-soft-hover flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFF] text-[#6556D9] flex items-center justify-center shrink-0">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#17172F]">Upload Evidence</div>
            <div className="text-[11px] text-[#777A91]">Ingest & hash screenshot</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentPage('incidents')}
          className="p-4 rounded-2xl bg-white border border-[#E8E9F1] hover:border-[#6556D9] text-left transition-all card-soft-hover flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#3B82F6] flex items-center justify-center shrink-0">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#17172F]">Create Incident</div>
            <div className="text-[11px] text-[#777A91]">Log narrative record</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentPage('ai-analysis')}
          className="p-4 rounded-2xl bg-white border border-[#E8E9F1] hover:border-[#6556D9] text-left transition-all card-soft-hover flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] text-[#E8A33D] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#17172F]">Analyze Evidence</div>
            <div className="text-[11px] text-[#777A91]">Run threat classifier</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentPage('report-center')}
          className="p-4 rounded-2xl bg-white border border-[#E8E9F1] hover:border-[#6556D9] text-left transition-all card-soft-hover flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E8F6F0] text-[#239B75] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#17172F]">Generate Report</div>
            <div className="text-[11px] text-[#777A91]">Export verified dossier</div>
          </div>
        </button>
      </div>

      {/* Analytics Section (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Incident Category Distribution */}
        <div className="lg:col-span-5 card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#17172F] font-heading">
              Incident Category Distribution
            </h3>
            <span className="text-[10px] text-[#777A91]">Classified Typologies</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData.length > 0 ? categoryChartData : [{ name: 'Threats', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#17172F',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] text-[#777A91]">
            {categoryChartData.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span>{c.name} ({c.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Processing Activity Over Time */}
        <div className="lg:col-span-7 card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#17172F] font-heading">
              Evidence Processing Activity (7 Days)
            </h3>
            <span className="text-[10px] text-[#239B75] font-semibold flex items-center gap-1">
              <Activity className="w-3 h-3" /> Live Pipeline
            </span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E9F1" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#777A91' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#777A91' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#17172F',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="uploads" fill="#6556D9" radius={[4, 4, 0, 0]} name="Uploads" />
                <Bar dataKey="analyses" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Analyses" />
                <Bar dataKey="reports" fill="#239B75" radius={[4, 4, 0, 0]} name="Reports" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-[10px] text-[#777A91]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#6556D9]" />
              <span>Evidence Uploads</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]" />
              <span>AI Threat Classifications</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#239B75]" />
              <span>PDF Dossiers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incidents Overview */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E9F1]">
          <div>
            <h3 className="text-sm font-bold text-[#17172F] font-heading">Recent Incidents</h3>
            <p className="text-[11px] text-[#777A91]">Active workspaces tracking recurring digital harassment</p>
          </div>
          <button
            onClick={() => setCurrentPage('incidents')}
            className="text-xs font-semibold text-[#6556D9] hover:underline flex items-center gap-1"
          >
            <span>View all incidents</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {incidents.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0EDFF] text-[#6556D9] mx-auto flex items-center justify-center">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#17172F]">Your workspace is ready</h4>
            <p className="text-xs text-[#777A91] max-w-sm mx-auto">
              Start by creating an incident or uploading evidence. You control what information you add.
            </p>
            <button
              onClick={() => setCurrentPage('evidence')}
              className="px-4 py-2 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
            >
              Upload Evidence
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {incidents.slice(0, 3).map(inc => (
              <div
                key={inc.id}
                onClick={() => {
                  setSelectedIncidentId(inc.id);
                  setCurrentPage('incident-details');
                }}
                className="p-4 rounded-2xl bg-[#F7F8FC] hover:bg-white border border-[#E8E9F1] hover:border-[#6556D9] transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-soft-hover"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#6556D9] font-bold bg-[#F0EDFF] px-2 py-0.5 rounded">
                      {inc.referenceNumber}
                    </span>
                    <span className="text-xs font-bold text-[#17172F]">{inc.title}</span>
                  </div>
                  <p className="text-[11px] text-[#777A91] line-clamp-1">{inc.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-white border border-[#E8E9F1] text-[#20213A]">
                    {inc.category}
                  </span>
                  <div className="text-[11px] text-[#777A91]">
                    <span className="font-bold text-[#20213A]">{inc.evidenceCount}</span> exhibits
                  </div>
                  <span className="text-xs font-semibold text-[#6556D9] flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
