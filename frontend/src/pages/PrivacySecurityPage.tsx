import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  Shield,
  FileCheck,
  EyeOff,
  Trash2,
  Server,
  Database,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const PrivacySecurityPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#239B75] uppercase tracking-wider">TRUST & DATA SOVEREIGNTY</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] tracking-tight font-heading">
          Privacy and Security Architecture
        </h1>
        <p className="text-sm text-[#777A91] leading-relaxed">
          How your evidence is stored, hashed, analyzed, redacted, and permanently deleted. Complete transparency with no hidden telemetry.
        </p>
      </div>

      {/* Privacy Architecture Diagram */}
      <div className="card-soft p-6 sm:p-8 space-y-6 bg-white border border-[#E8E9F1]">
        <h2 className="text-lg font-bold text-[#17172F] font-heading">Evidence Ingestion & Privacy Pipeline</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F0EDFF] text-[#6556D9] mx-auto flex items-center justify-center font-bold text-xs">1</div>
            <h4 className="text-xs font-bold text-[#17172F]">User Upload</h4>
            <p className="text-[11px] text-[#777A91]">Encrypted transfer over TLS 1.3 with client validation</p>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8F6F0] text-[#239B75] mx-auto flex items-center justify-center font-bold text-xs">2</div>
            <h4 className="text-xs font-bold text-[#17172F]">SHA-256 Hashing</h4>
            <p className="text-[11px] text-[#777A91]">Immediate raw byte digest locked in read-only custody</p>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#EAF1FF] text-[#3B82F6] mx-auto flex items-center justify-center font-bold text-xs">3</div>
            <h4 className="text-xs font-bold text-[#17172F]">Local AI Analysis</h4>
            <p className="text-[11px] text-[#777A91]">Private offline inference; no public LLM training</p>
          </div>

          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] text-[#E8A33D] mx-auto flex items-center justify-center font-bold text-xs">4</div>
            <h4 className="text-xs font-bold text-[#17172F]">Non-Destructive Mask</h4>
            <p className="text-[11px] text-[#777A91]">Redacted copies stored in separate designated directory</p>
          </div>
        </div>
      </div>

      {/* Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-soft p-6 space-y-3 bg-white border border-[#E8E9F1]">
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFF] text-[#6556D9] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17172F]">Zero Overwrite Policy</h3>
          <p className="text-xs text-[#777A91] leading-relaxed">
            When you redact sensitive data (such as phone numbers or home addresses), TRACEHER never alters your original evidence file. A new, redacted copy is created with its own identifier. This ensures the original exhibits remain valid for forensic review.
          </p>
        </div>

        <div className="card-soft p-6 space-y-3 bg-white border border-[#E8E9F1]">
          <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] text-[#D95F6C] flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17172F]">Permanent Data Erasure</h3>
          <p className="text-xs text-[#777A91] leading-relaxed">
            You retain absolute sovereignty over your account. When you select "Delete Account & Wipe Evidence" in Settings, our database deletes all incident records, evidence files, hashes, and reports from the disk immediately.
          </p>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 bg-[#FFF8EB] border border-[#E8A33D]/30 rounded-2xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#E8A33D] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#20213A]">
          <span className="font-bold">Honest Security Note</span>
          <p className="text-[#777A91] leading-relaxed">
            TRACEHER does not claim SOC-2 or military-grade certifications that are not actually in place. We rely on standard local encryption, SHA-256 cryptographic digests, strict user isolation, and non-destructive file segregation.
          </p>
        </div>
      </div>
    </div>
  );
};
