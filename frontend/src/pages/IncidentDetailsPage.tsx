import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  FolderOpen,
  Clock,
  Sparkles,
  GitGraph,
  FileText,
  Calendar,
  AlertTriangle,
  Plus,
  Eye,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const IncidentDetailsPage: React.FC = () => {
  const {
    selectedIncidentId,
    incidents,
    evidenceList,
    reports,
    generateReport,
    setCurrentPage,
    setSelectedEvidenceId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'evidence' | 'timeline' | 'ai-analysis' | 'relationships' | 'reports'>('overview');
  const [generating, setGenerating] = useState(false);

  const incident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  const linkedEvidence = evidenceList.filter(e => incident?.evidenceIds?.includes(e.id) || e.incidentId === incident?.id);
  const incidentReports = reports.filter(r => r.incidentId === incident?.id);

  if (!incident) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-sm text-[#777A91]">No incident selected.</p>
        <button
          onClick={() => setCurrentPage('incidents')}
          className="px-4 py-2 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
        >
          Return to Incidents
        </button>
      </div>
    );
  }

  const handleGenerate = async () => {
    setGenerating(true);
    await generateReport(incident.id);
    setTimeout(() => {
      setGenerating(false);
      setActiveTab('reports');
    }, 600);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FolderOpen },
    { id: 'evidence', label: `Evidence (${linkedEvidence.length})`, icon: FolderOpen },
    { id: 'timeline', label: `Timeline (${incident.timeline?.length || 0})`, icon: Clock },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Sparkles },
    { id: 'relationships', label: 'Relationships', icon: GitGraph },
    { id: 'reports', label: `Reports (${incidentReports.length})`, icon: FileText }
  ];

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top back navigation & Header */}
      <div className="space-y-4 pb-2 border-b border-[#E8E9F1]">
        <button
          onClick={() => setCurrentPage('incidents')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#777A91] hover:text-[#20213A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Incidents</span>
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#6556D9] bg-[#F0EDFF] px-2.5 py-0.5 rounded-lg">
                {incident.referenceNumber}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6F0] text-[#239B75] uppercase">
                {incident.status}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#17172F] font-heading">{incident.title}</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>{generating ? 'Compiling Dossier...' : 'Generate Official Report'}</span>
            </button>
          </div>
        </div>

        {/* Tab navigation bar */}
        <div className="flex items-center gap-1 overflow-x-auto pt-2 border-t border-[#E8E9F1]">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#6556D9] text-white shadow-xs'
                    : 'text-[#777A91] hover:text-[#20213A] hover:bg-[#F7F8FC]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-3">
              <h3 className="text-sm font-bold text-[#17172F]">Incident Narrative</h3>
              <p className="text-xs text-[#20213A] leading-relaxed whitespace-pre-wrap">
                {incident.description || 'No detailed narrative provided.'}
              </p>
            </div>

            <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
              <h3 className="text-sm font-bold text-[#17172F]">Incident Metadata</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
                  <span className="text-[#777A91]">Primary Category</span>
                  <div className="font-bold text-[#17172F] mt-0.5">{incident.category}</div>
                </div>
                <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
                  <span className="text-[#777A91]">Incident Occurrence</span>
                  <div className="font-bold text-[#17172F] mt-0.5">{incident.incidentDate}</div>
                </div>
                <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
                  <span className="text-[#777A91]">Total Exhibits</span>
                  <div className="font-bold text-[#6556D9] mt-0.5">{linkedEvidence.length} files</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-3">
              <h4 className="text-xs font-bold text-[#17172F]">Quick Shortcuts</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentPage('timeline')}
                  className="w-full p-2.5 bg-[#F7F8FC] hover:bg-[#F0EDFF] text-[#20213A] hover:text-[#6556D9] rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Open Full Timeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentPage('relationships')}
                  className="w-full p-2.5 bg-[#F7F8FC] hover:bg-[#F0EDFF] text-[#20213A] hover:text-[#6556D9] rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2"><GitGraph className="w-3.5 h-3.5" /> View Network Graph</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentPage('privacy-guardian')}
                  className="w-full p-2.5 bg-[#F7F8FC] hover:bg-[#F0EDFF] text-[#20213A] hover:text-[#6556D9] rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> Redact Sensitive Info</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. EVIDENCE TAB */}
      {activeTab === 'evidence' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#17172F]">Attached Evidence Files ({linkedEvidence.length})</h3>
            <button
              onClick={() => setCurrentPage('evidence')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload / Attach More</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkedEvidence.map(ev => (
              <div key={ev.id} className="card-soft p-4 bg-white border border-[#E8E9F1] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[#17172F] truncate">{ev.originalFilename}</span>
                  <span className="text-[10px] font-mono text-[#239B75] bg-[#E8F6F0] px-2 py-0.5 rounded">
                    SHA-256 LOCKED
                  </span>
                </div>
                <p className="text-[11px] text-[#777A91] line-clamp-2 italic font-mono bg-[#F7F8FC] p-2 rounded-lg">
                  "{ev.extractedText?.substring(0, 100)}..."
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#E8E9F1]">
                  <span className="text-[10px] text-[#777A91]">{(ev.fileSize/1024).toFixed(1)} KB</span>
                  <button
                    onClick={() => {
                      setSelectedEvidenceId(ev.id);
                      setCurrentPage('evidence-details');
                    }}
                    className="text-xs font-semibold text-[#6556D9] hover:underline flex items-center gap-1"
                  >
                    <span>View Exhibit</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. TIMELINE TAB */}
      {activeTab === 'timeline' && (
        <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#17172F]">Chronological Event Timeline</h3>
            <button
              onClick={() => setCurrentPage('timeline')}
              className="text-xs font-semibold text-[#6556D9] hover:underline"
            >
              Open Interactive Timeline Workspace →
            </button>
          </div>
          <div className="space-y-4 pt-2">
            {incident.timeline?.map((item, idx) => (
              <div key={item.id} className="flex items-start gap-4 text-xs">
                <span className="font-mono text-[#777A91] text-[11px] shrink-0 w-28">{item.eventDate}</span>
                <div className="flex-1 p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-1">
                  <div className="font-bold text-[#17172F]">{item.title}</div>
                  <p className="text-[#777A91]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. AI ANALYSIS TAB */}
      {activeTab === 'ai-analysis' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#17172F]">Extracted AI Analysis across exhibits</h3>
          {linkedEvidence.map(ev => (
            <div key={ev.id} className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-3">
              <span className="text-xs font-bold text-[#6556D9]">{ev.originalFilename}</span>
              {ev.analyses?.map(ana => (
                <div key={ana.id} className="p-3 bg-[#F0EDFF]/50 border border-[#6556D9]/20 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#6556D9]">{ana.category}</span>
                    <span className="text-[10px] font-bold bg-[#6556D9] text-white px-2 py-0.5 rounded">
                      {Math.round(ana.confidence * 100)}%
                    </span>
                  </div>
                  <p className="text-[#20213A]">{ana.explanation}</p>
                  <p className="text-[#777A91] italic">"{ana.supportingText}"</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* 5. RELATIONSHIPS TAB */}
      {activeTab === 'relationships' && (
        <div className="card-soft p-6 bg-white border border-[#E8E9F1] text-center space-y-4">
          <GitGraph className="w-10 h-10 text-[#6556D9] mx-auto" />
          <h3 className="text-base font-bold text-[#17172F]">Interactive Relationship Intelligence</h3>
          <p className="text-xs text-[#777A91] max-w-md mx-auto">
            View how handles, evidence files, and message records correlate across this incident.
          </p>
          <button
            onClick={() => setCurrentPage('relationships')}
            className="px-5 py-2.5 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
          >
            Launch Relationship Graph
          </button>
        </div>
      )}

      {/* 6. REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#17172F]">Generated Incident Reports ({incidentReports.length})</h3>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-4 py-2 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
            >
              Generate New PDF Dossier
            </button>
          </div>

          {incidentReports.length === 0 ? (
            <div className="card-soft p-8 text-center bg-white border border-[#E8E9F1] space-y-2">
              <FileText className="w-8 h-8 text-[#777A91] mx-auto" />
              <p className="text-xs text-[#777A91]">No reports generated yet for this incident.</p>
            </div>
          ) : (
            incidentReports.map(rep => (
              <div key={rep.id} className="card-soft p-4 bg-white border border-[#E8E9F1] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-[#17172F]">{rep.reportTitle}</span>
                  <div className="text-[10px] text-[#777A91]">Generated {rep.generatedAt} • {rep.fileSizeKb} KB</div>
                </div>
                <a
                  href={rep.downloadUrl}
                  download
                  className="px-3 py-1.5 bg-[#239B75] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
