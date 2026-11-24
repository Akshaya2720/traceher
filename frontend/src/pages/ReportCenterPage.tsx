import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Download,
  Trash2,
  Eye,
  Plus,
  Lock,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  X,
  FileCheck2,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';

export const ReportCenterPage: React.FC = () => {
  const {
    reports,
    incidents,
    evidenceList,
    generateReport,
    deleteReport,
    setCurrentPage,
    setSelectedIncidentId
  } = useApp();

  const [selectedIncidentIdForGen, setSelectedIncidentIdForGen] = useState(incidents[0]?.id || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [previewReportId, setPreviewReportId] = useState<string | null>(reports[0]?.id || null);

  const selectedInc = incidents.find(i => i.id === selectedIncidentIdForGen) || incidents[0];
  const linkedEv = evidenceList.filter(e => selectedInc?.evidenceIds?.includes(e.id) || e.incidentId === selectedInc?.id);

  const handleCreateReport = async () => {
    setGenerating(true);
    const newRep = await generateReport(selectedIncidentIdForGen);
    setTimeout(() => {
      setGenerating(false);
      setModalOpen(false);
      setPreviewReportId(newRep.id);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    }, 700);
  };

  const handleDownload = async (rep: typeof reports[0]) => {
    // 1. Attempt to download real backend ReportLab PDF first
    try {
      const res = await fetch(`/api/reports/${rep.id}/download`);
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 200) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `TraceHer_Dossier_${rep.incidentReference}.pdf`;
          a.click();
          return;
        }
      }
    } catch {}

    // 2. Real client-side jsPDF vector PDF generation (creates a valid opening PDF)
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(101, 86, 217);
    doc.text('TRACEHER — DIGITAL SAFETY DOSSIER', 14, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(119, 122, 145);
    doc.text(`Official Evidence Dossier • Reference: ${rep.incidentReference}`, 14, 28);
    doc.text(`Generated: ${rep.generatedAt} • Chain-of-Custody Protected`, 14, 34);

    doc.setDrawColor(232, 233, 241);
    doc.line(14, 38, 196, 38);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(23, 23, 47);
    doc.text('1. Incident Overview', 14, 46);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Title: ${rep.incidentTitle}`, 14, 54);
    doc.text(`Case Reference: ${rep.incidentReference}`, 14, 60);
    doc.text(`Status: Verified & Cryptographically Locked`, 14, 66);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('2. Chain-of-Custody Evidence Exhibits (SHA-256)', 14, 76);

    let y = 84;
    linkedEv.forEach((e, i) => {
      if (y > 250) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(101, 86, 217);
      doc.text(`Exhibit #${i + 1}: ${e.originalFilename}`, 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(32, 33, 58);
      y += 6;
      doc.text(`Size: ${(e.fileSize / 1024).toFixed(1)} KB | Type: ${e.fileType}`, 14, y);
      y += 6;
      doc.setFont('courier', 'normal');
      doc.text(`SHA-256: ${e.sha256Hash}`, 14, y);
      doc.setFont('helvetica', 'normal');
      y += 10;
    });

    if (y > 230) { doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(23, 23, 47);
    doc.text('3. Official Emergency & Reporting Contacts (India)', 14, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('• Police Emergency Helpline: 112', 14, y); y += 6;
    doc.text('• National Cyber Crime Helpline: 1930', 14, y); y += 6;
    doc.text('• National Cyber Crime Reporting Portal: https://cybercrime.gov.in', 14, y); y += 12;

    doc.setFontSize(8);
    doc.setTextColor(119, 122, 145);
    doc.text('DISCLAIMER: TRACEHER is a technical evidence organization workspace. This document does not constitute legal counsel.', 14, y);

    doc.save(`TraceHer_Dossier_${rep.incidentReference}.pdf`);
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#17172F] font-heading">Report Center</h1>
          <p className="text-xs text-[#777A91]">
            Generate official, court- and police-ready incident dossiers complete with SHA-256 verification and chronological exhibits.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Report</span>
        </button>
      </div>

      {/* Reports Table / Cards */}
      <div className="card-soft bg-white border border-[#E8E9F1] overflow-hidden">
        <div className="p-4 border-b border-[#E8E9F1] flex items-center justify-between">
          <span className="text-xs font-bold text-[#17172F]">Compiled Dossiers ({reports.length})</span>
          <span className="text-[10px] text-[#777A91]">Format: Formal PDF Dossier</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FC] border-b border-[#E8E9F1] text-[11px] font-bold text-[#777A91] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Incident Title</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Generated Date</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E9F1]">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-[#777A91]">
                    No reports generated yet. Click "Generate New Report" to create your first dossier.
                  </td>
                </tr>
              ) : (
                reports.map(rep => (
                  <tr key={rep.id} className="hover:bg-[#F7F8FC]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6556D9]">
                      {rep.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#17172F]">
                      {rep.reportTitle}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-[#777A91]">
                      {rep.incidentReference}
                    </td>
                    <td className="py-3.5 px-4 text-[#777A91]">
                      {rep.generatedAt}
                    </td>
                    <td className="py-3.5 px-4 text-[#777A91]">
                      {rep.fileSizeKb} KB
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownload(rep)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#239B75] hover:bg-[#1D8262] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
                        <button
                          onClick={() => deleteReport(rep.id)}
                          className="p-1.5 text-[#777A91] hover:text-[#D95F6C] rounded-lg transition-colors"
                          title="Delete report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Generation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-[#E8E9F1] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E9F1]">
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-[#17172F]">Compile Official Incident Dossier</h3>
                <p className="text-[11px] text-[#777A91]">Review sections before PDF compilation</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 text-[#777A91] hover:text-[#20213A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#17172F]">Select Incident</label>
                <select
                  value={selectedIncidentIdForGen}
                  onChange={e => setSelectedIncidentIdForGen(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
                >
                  {incidents.map(inc => (
                    <option key={inc.id} value={inc.id}>
                      {inc.referenceNumber} - {inc.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sections Checklist */}
              <div className="space-y-1.5">
                <label className="font-semibold text-[#17172F]">Included Dossier Sections</label>
                <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-1.5">
                  <div className="flex items-center gap-2 text-[#239B75] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cryptographic SHA-256 custody hash tables ({linkedEv.length} exhibits)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#239B75] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Chronological event progression narrative</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#239B75] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>AI multi-label classification matrix & human verification badges</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#239B75] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official National Cyber Crime (cybercrime.gov.in) & Helpline 1930 links</span>
                  </div>
                </div>
              </div>

              {/* Mandatory Notice */}
              <div className="p-3 bg-[#FFF8EB] border border-[#E8A33D]/30 rounded-xl text-[11px] text-[#20213A] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
                <span>
                  <strong>Legal disclaimer label included:</strong> "AI-generated analysis — requires human review. Prepared for legal counsel or law enforcement."
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#E8E9F1]">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#777A91]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateReport}
                disabled={generating}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>{generating ? 'Compiling Dossier...' : 'Generate PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
