import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  EyeOff,
  Eye,
  Lock,
  Download,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';
import { RedactionRegion } from '../types';

export const PrivacyGuardianPage: React.FC = () => {
  const { evidenceList, selectedEvidenceId, setSelectedEvidenceId } = useApp();

  const evidence = evidenceList.find(e => e.id === selectedEvidenceId) || evidenceList[0];

  // Initial detected sensitive regions
  const [regions, setRegions] = useState<RedactionRegion[]>([
    {
      id: 'reg-phone',
      type: 'phone',
      text: '+91 98765 43210',
      x: 18,
      y: 35,
      width: 42,
      height: 7,
      selected: true
    },
    {
      id: 'reg-email',
      type: 'email',
      text: 'ananya.sharma@example.com',
      x: 18,
      y: 46,
      width: 50,
      height: 7,
      selected: true
    },
    {
      id: 'reg-addr',
      type: 'address',
      text: 'MG Road Office, Bangalore',
      x: 18,
      y: 57,
      width: 48,
      height: 7,
      selected: true
    },
    {
      id: 'reg-face',
      type: 'face',
      text: 'Sender Profile Picture / Avatar',
      x: 6,
      y: 8,
      width: 14,
      height: 14,
      selected: true
    }
  ]);

  const [previewMode, setPreviewMode] = useState<'side-by-side' | 'redacted-only'>('side-by-side');
  const [isExporting, setIsExporting] = useState(false);

  const toggleRegion = (id: string) => {
    setRegions(prev => prev.map(r => r.id === id ? { ...r, selected: !r.selected } : r));
  };

  const handleSelectAll = (select: boolean) => {
    setRegions(prev => prev.map(r => ({ ...r, selected: select })));
  };

  const handleDownloadRedacted = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Trigger a browser download of the redacted mock text/image
      const blob = new Blob([
        `TRACEHER Non-Destructive Redacted Exhibit\nOriginal Evidence ID: ${evidence?.id}\nSHA-256 Protected Original Digest: ${evidence?.sha256Hash}\nRedacted Fields: ${regions.filter(r => r.selected).map(r => r.type).join(', ')}\n\nExtracted Content:\n"[REDACTED_AVATAR] @shadow_stalker99: You think you can ignore me? I know where you work on [REDACTED_ADDRESS]. Watch your back tomorrow.\nCall me on [REDACTED_PHONE] or email [REDACTED_EMAIL] immediately."`
      ], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `redacted_exhibit_${evidence?.id || 'doc'}.txt`;
      a.click();
    }, 600);
  };

  const getRegionIcon = (type: string) => {
    switch (type) {
      case 'phone': return <Phone className="w-3.5 h-3.5 text-[#3B82F6]" />;
      case 'email': return <Mail className="w-3.5 h-3.5 text-[#E8A33D]" />;
      case 'address': return <MapPin className="w-3.5 h-3.5 text-[#D95F6C]" />;
      case 'face': return <User className="w-3.5 h-3.5 text-[#8877EC]" />;
      default: return <EyeOff className="w-3.5 h-3.5 text-[#6556D9]" />;
    }
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header */}
      <div className="card-soft p-6 sm:p-8 bg-gradient-to-r from-white via-white to-[#E8F6F0]/30 border border-[#E8E9F1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#239B75]" />
            <span className="text-[11px] font-semibold text-[#239B75] uppercase tracking-wider">
              Privacy Guardian Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
            Your information. Your control.
          </h1>
          <p className="text-xs sm:text-sm text-[#777A91]">
            Review sensitive personal information and generate a shareable copy without modifying original evidence files.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={evidence?.id}
            onChange={e => setSelectedEvidenceId(e.target.value)}
            className="px-3.5 py-2 bg-white border border-[#E8E9F1] rounded-xl text-xs font-semibold text-[#20213A] focus:outline-none focus:border-[#6556D9]"
          >
            {evidenceList.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.originalFilename}
              </option>
            ))}
          </select>
          <button
            onClick={handleDownloadRedacted}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2 bg-[#239B75] hover:bg-[#1D8262] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Exporting...' : 'Export Redacted Copy'}</span>
          </button>
        </div>
      </div>

      {/* Sensitive Items Detection Panel & Checklist */}
      <div className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E9F1]">
          <div>
            <h3 className="text-sm font-bold text-[#17172F]">Detected Sensitive Information</h3>
            <p className="text-[11px] text-[#777A91]">Toggle which detected items should be masked in the redacted copy</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectAll(true)}
              className="text-xs font-semibold text-[#6556D9] hover:underline"
            >
              Select All
            </button>
            <span className="text-[#E8E9F1]">|</span>
            <button
              onClick={() => handleSelectAll(false)}
              className="text-xs font-semibold text-[#777A91] hover:underline"
            >
              Deselect All
            </button>
          </div>
        </div>

        {/* Region toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {regions.map(r => (
            <div
              key={r.id}
              onClick={() => toggleRegion(r.id)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                r.selected
                  ? 'border-[#239B75] bg-[#E8F6F0]/50'
                  : 'border-[#E8E9F1] bg-[#F7F8FC] opacity-60'
              }`}
            >
              <div className="mt-0.5">{getRegionIcon(r.type)}</div>
              <div className="space-y-0.5 overflow-hidden flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#777A91]">{r.type}</span>
                  {r.selected ? (
                    <span className="text-[10px] font-bold text-[#239B75]">Redacted</span>
                  ) : (
                    <span className="text-[10px] text-[#777A91]">Kept</span>
                  )}
                </div>
                <div className="text-xs font-semibold text-[#20213A] truncate font-mono">
                  {r.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-Column Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Original (Preserved) */}
        <div className="card-soft p-5 bg-white border border-[#E8E9F1] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#17172F] flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#777A91]" />
              Original Evidence (Untouched)
            </span>
            <span className="text-[10px] font-mono text-[#6556D9] bg-[#F0EDFF] px-2 py-0.5 rounded font-bold">
              SHA-256 PROTECTED
            </span>
          </div>

          <div className="aspect-[4/3] rounded-2xl bg-[#F7F8FC] border border-[#E8E9F1] p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8877EC] text-white flex items-center justify-center font-bold text-xs">
                S
              </div>
              <div>
                <div className="text-xs font-bold text-[#17172F]">@shadow_stalker99</div>
                <div className="text-[10px] text-[#777A91]">Direct Message</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8E9F1] text-xs space-y-2 text-[#20213A]">
              <p>You think you can ignore me? I know where you work on <span className="bg-[#FEF2F2] px-1 text-[#D95F6C] font-semibold">MG Road</span>. Watch your back tomorrow.</p>
              <p>Call me on <span className="bg-[#EAF1FF] px-1 text-[#3B82F6] font-semibold">+91 98765 43210</span> or email <span className="bg-[#FFF8EB] px-1 text-[#E8A33D] font-semibold">ananya.sharma@example.com</span> immediately.</p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#777A91] pt-2 border-t border-[#E8E9F1]">
              <span>Original Filename: {evidence?.originalFilename}</span>
              <span>100% Intact</span>
            </div>
          </div>
        </div>

        {/* Right Column: Redacted Copy (Shareable) */}
        <div className="card-soft p-5 bg-white border border-[#239B75]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#239B75] flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5 text-[#239B75]" />
              Shareable Redacted Copy
            </span>
            <span className="text-[10px] font-bold text-[#239B75] bg-[#E8F6F0] px-2 py-0.5 rounded">
              Ready for Export
            </span>
          </div>

          <div className="aspect-[4/3] rounded-2xl bg-[#F7F8FC] border border-[#239B75]/20 p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center gap-3">
              {regions.find(r => r.type === 'face')?.selected ? (
                <div className="w-8 h-8 rounded-full bg-[#17172F] flex items-center justify-center text-[10px] text-white font-mono">
                  [MASK]
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#8877EC] text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
              )}
              <div>
                <div className="text-xs font-bold text-[#17172F]">@shadow_stalker99</div>
                <div className="text-[10px] text-[#777A91]">Direct Message (Sanitized)</div>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#E8E9F1] text-xs space-y-2 text-[#20213A]">
              <p>
                You think you can ignore me? I know where you work on{' '}
                {regions.find(r => r.type === 'address')?.selected ? (
                  <span className="bg-[#17172F] text-white px-2 py-0.5 rounded text-[10px] font-mono select-none">
                    [REDACTED_LOCATION]
                  </span>
                ) : (
                  <span>MG Road</span>
                )}
                . Watch your back tomorrow.
              </p>
              <p>
                Call me on{' '}
                {regions.find(r => r.type === 'phone')?.selected ? (
                  <span className="bg-[#17172F] text-white px-2 py-0.5 rounded text-[10px] font-mono select-none">
                    [REDACTED_PHONE]
                  </span>
                ) : (
                  <span>+91 98765 43210</span>
                )}{' '}
                or email{' '}
                {regions.find(r => r.type === 'email')?.selected ? (
                  <span className="bg-[#17172F] text-white px-2 py-0.5 rounded text-[10px] font-mono select-none">
                    [REDACTED_EMAIL]
                  </span>
                ) : (
                  <span>ananya.sharma@example.com</span>
                )}{' '}
                immediately.
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#239B75] font-semibold pt-2 border-t border-[#E8E9F1]">
              <span>Safe for external distribution</span>
              <span>4 Identifiers Hidden</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice Box */}
      <div className="p-4 bg-[#F7F8FC] border border-[#E8E9F1] rounded-2xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#239B75] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#20213A]">
          <span className="font-bold">Automated Redaction Human Oversight</span>
          <p className="text-[#777A91] leading-relaxed">
            While Privacy Guardian flags common phone number, email, and address formats, you should always visually confirm the preview copy before distributing it to third parties or social platforms.
          </p>
        </div>
      </div>
    </div>
  );
};
