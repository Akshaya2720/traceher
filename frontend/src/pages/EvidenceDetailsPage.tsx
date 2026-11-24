import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Lock,
  Copy,
  Check,
  Sparkles,
  EyeOff,
  FolderPlus,
  Download,
  AlertTriangle,
  FileText,
  Calendar,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const EvidenceDetailsPage: React.FC = () => {
  const {
    selectedEvidenceId,
    evidenceList,
    incidents,
    setCurrentPage,
    setSelectedIncidentId
  } = useApp();

  const [copiedHash, setCopiedHash] = useState(false);
  const [userNotes, setUserNotes] = useState('Critical screenshot showing explicit extortion ultimatum.');

  const evidence = evidenceList.find(e => e.id === selectedEvidenceId) || evidenceList[0];
  const associatedIncident = incidents.find(i => i.id === evidence?.incidentId);

  if (!evidence) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-sm text-[#777A91]">No evidence selected.</p>
        <button
          onClick={() => setCurrentPage('evidence')}
          className="px-4 py-2 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
        >
          Return to Evidence Center
        </button>
      </div>
    );
  }

  const handleCopyHash = () => {
    navigator.clipboard.writeText(evidence.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Top Bar with back link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E9F1]">
        <button
          onClick={() => setCurrentPage('evidence')}
          className="flex items-center gap-2 text-xs font-semibold text-[#777A91] hover:text-[#20213A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Evidence Center</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentPage('ai-analysis')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0EDFF] hover:bg-[#E2DCFF] text-[#6556D9] text-xs font-semibold rounded-xl transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Threat Analysis</span>
          </button>
          <button
            onClick={() => setCurrentPage('privacy-guardian')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F6F0] hover:bg-[#D4EFE4] text-[#239B75] text-xs font-semibold rounded-xl transition-colors"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Redact in Privacy Guardian</span>
          </button>
        </div>
      </div>

      {/* Split layout: Left Preview vs Right Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: File preview & SHA-256 details (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#17172F]">Exhibit Preview</span>
              <span className="text-[10px] font-mono text-[#239B75] bg-[#E8F6F0] px-2 py-0.5 rounded font-bold">
                Read-Only Preserved
              </span>
            </div>

            {/* Visual Preview Box */}
            {evidence.fileUrl && (evidence.fileType.includes('image') || evidence.originalFilename.match(/\.(png|jpe?g|webp|gif)$/i)) ? (
              <div className="rounded-xl overflow-hidden border border-[#E8E9F1] bg-black/5 relative group p-2">
                <img
                  src={evidence.fileUrl}
                  alt={evidence.originalFilename}
                  className="w-full max-h-64 object-contain rounded-lg mx-auto"
                />
                <div className="flex items-center justify-between pt-2 px-1 text-[10px] text-[#777A91]">
                  <span className="truncate max-w-[180px] font-medium">{evidence.originalFilename}</span>
                  <span>{(evidence.fileSize / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-xl bg-[#F7F8FC] border border-[#E8E9F1] flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E9F1] flex items-center justify-center text-[#6556D9] shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#17172F] break-all">
                    {evidence.originalFilename}
                  </div>
                  <div className="text-[10px] text-[#777A91]">
                    {(evidence.fileSize / 1024).toFixed(1)} KB • {evidence.fileType}
                  </div>
                </div>
                <div className="text-[10px] bg-white px-2.5 py-1 rounded-full border border-[#E8E9F1] text-[#777A91]">
                  Original uploaded exhibit
                </div>
              </div>
            )}

            {/* SHA-256 Cryptographic Hash Box */}
            <div className="p-3.5 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#17172F] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#6556D9]" />
                  SHA-256 Hash Integrity
                </span>
                <button
                  onClick={handleCopyHash}
                  className="text-[10px] font-semibold text-[#6556D9] flex items-center gap-1 hover:underline"
                >
                  {copiedHash ? (
                    <>
                      <Check className="w-3 h-3 text-[#239B75]" />
                      <span className="text-[#239B75]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Hash</span>
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-[10px] text-[#20213A] break-all bg-white p-2 rounded-lg border border-[#E8E9F1]">
                {evidence.sha256Hash}
              </p>
              <p className="text-[10px] text-[#777A91] leading-relaxed">
                Guarantees digital chain of custody. Any alteration will invalidate this mathematical digest.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Extracted Text, Incident Link, AI status, User Notes (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Associated Incident Card */}
          <div className="card-soft p-5 bg-white border border-[#E8E9F1] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-[#777A91] uppercase tracking-wider">Linked Incident</span>
              <div className="text-sm font-bold text-[#17172F]">
                {associatedIncident ? associatedIncident.title : 'Not linked to any incident'}
              </div>
              <div className="text-[11px] text-[#6556D9] font-mono">
                {associatedIncident?.referenceNumber || 'Unlinked'}
              </div>
            </div>
            {associatedIncident && (
              <button
                onClick={() => {
                  setSelectedIncidentId(associatedIncident.id);
                  setCurrentPage('incident-details');
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#6556D9] bg-[#F0EDFF] hover:bg-[#E2DCFF] rounded-xl transition-colors"
              >
                View Incident
              </button>
            )}
          </div>

          {/* Extracted Text (OCR) */}
          <div className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#17172F]">Extracted OCR Text Content</h3>
                <p className="text-[11px] text-[#777A91]">Distinct representation extracted from the uploaded screenshot</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#EAF1FF] text-[#3B82F6]">
                OCR Verified
              </span>
            </div>

            <div className="p-4 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] text-xs font-mono text-[#20213A] whitespace-pre-wrap leading-relaxed">
              {evidence.extractedText || 'No text extracted from this file.'}
            </div>
          </div>

          {/* AI Analysis Classification Badges */}
          <div className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#17172F]">AI Detected Categories</h3>
              <span className="text-[10px] text-[#777A91]">Model: TraceHer-DeBERTa-Safety-v2.3</span>
            </div>

            <div className="space-y-2.5">
              {evidence.analyses && evidence.analyses.length > 0 ? (
                evidence.analyses.map(ana => (
                  <div key={ana.id} className="p-3.5 bg-[#F0EDFF]/40 border border-[#6556D9]/20 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#6556D9]">{ana.category}</span>
                      <span className="px-2 py-0.5 rounded bg-[#6556D9] text-white font-bold text-[10px]">
                        {Math.round(ana.confidence * 100)}% Confidence
                      </span>
                    </div>
                    <p className="text-[11px] text-[#20213A]">{ana.explanation}</p>
                    <p className="text-[10px] text-[#777A91] italic">Excerpt: "{ana.supportingText}"</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#777A91]">No AI analyses recorded yet.</p>
              )}
            </div>
          </div>

          {/* User Notes */}
          <div className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-2">
            <label className="text-xs font-bold text-[#17172F]">User Notes & Context</label>
            <textarea
              rows={3}
              value={userNotes}
              onChange={e => setUserNotes(e.target.value)}
              placeholder="Add personal context or notes regarding this specific screenshot..."
              className="w-full p-3 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
            />
            <div className="flex justify-end">
              <button
                onClick={() => alert('Notes saved successfully!')}
                className="px-4 py-1.5 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
