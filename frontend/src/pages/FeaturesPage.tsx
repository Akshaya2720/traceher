import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Clock,
  GitGraph,
  EyeOff,
  FileText,
  Compass,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  Layers,
  Fingerprint
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [openCard, setOpenCard] = useState<number | null>(0);

  const features = [
    {
      icon: Sparkles,
      title: 'Explainable AI Harassment Classification',
      tagline: 'Multi-label NLP detection calibrated against statutory digital safety guidelines',
      color: '#6556D9',
      bg: '#F0EDFF',
      details: [
        'Multi-label analysis identifying threats, blackmail, impersonation, stalking, cyberbullying, hate speech, and sexual harassment.',
        'Calibrated confidence scores that reflect pattern certainty without falsely claiming legal guilt.',
        'Transparent explainability panels linking exact extracted message snippets to corresponding behavioral typologies.',
        'Human-in-the-loop review giving users the power to confirm, modify, or dismiss automated predictions.'
      ]
    },
    {
      icon: Fingerprint,
      title: 'Cryptographic SHA-256 Custody Verification',
      tagline: 'Immutable byte fingerprinting generated locally upon evidence ingestion',
      color: '#239B75',
      bg: '#E8F6F0',
      details: [
        'Calculates a 256-bit cryptographic digest as soon as any file enters the workspace.',
        'Prevents disputes regarding screenshot modification or tampering during judicial submission.',
        'Original uploaded media is preserved in isolated read-only storage and never modified by subsequent edits.'
      ]
    },
    {
      icon: Clock,
      title: 'Smart Chronological Timeline Synthesis',
      tagline: 'Translates disjointed chat screenshots into an orderly chronological narrative',
      color: '#3B82F6',
      bg: '#EAF1FF',
      details: [
        'Organizes events sequentially to visually demonstrate escalation over days or weeks.',
        'Never fabricates timestamps; missing evidence times gracefully fall back to user-confirmed incident dates.',
        'Supports manual addition of unrecorded occurrences such as in-person intimidation or unrecorded phone calls.'
      ]
    },
    {
      icon: GitGraph,
      title: 'NetworkX Relationship Intelligence',
      tagline: 'Interactive graph visualization of interconnected handles and communication nodes',
      color: '#8877EC',
      bg: '#F0EDFF',
      details: [
        'Maps complex cyberstalking schemes where perpetrators deploy multiple burner accounts or spoofed numbers.',
        'Clearly tags AI-suggested linkages as unverified investigative hypotheses, upholding legal standards.',
        'Provides zoom, pan, node dragging, and an interactive entity inspection side drawer.'
      ]
    },
    {
      icon: EyeOff,
      title: 'Privacy Guardian Non-Destructive Redaction',
      tagline: 'Side-by-side sensitive entity detection and solid masking for shareable copies',
      color: '#E8A33D',
      bg: '#FFF8EB',
      details: [
        'Automated detection of phone numbers, email addresses, physical streets, names, and profile avatars.',
        'Allows selective click-to-redact or manual box placement over any portion of the document.',
        'Maintains complete separation between the pristine original exhibit and the redacted public export.'
      ]
    },
    {
      icon: Compass,
      title: 'Contextual Response Navigator & Official Channels',
      tagline: 'Actionable guidance and verified links to Indian cyber safety authorities',
      color: '#D95F6C',
      bg: '#FEF2F2',
      details: [
        'Direct connection to the National Cyber Crime Reporting Portal (cybercrime.gov.in).',
        'One-touch emergency information for 112 (National Emergency) and 1930 (Cybercrime Helpline).',
        'Preservation checklists instructing victims on how to retain message metadata before blocking abusers.'
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#6556D9] uppercase tracking-wider">FEATURES & ARCHITECTURE</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] tracking-tight font-heading">
          Comprehensive Evidence Intelligence
        </h1>
        <p className="text-sm text-[#777A91] leading-relaxed">
          Explore the individual systems that power TRACEHER — each built around safety, user agency, and evidentiary integrity.
        </p>
      </div>

      <div className="space-y-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          const isOpen = openCard === i;
          return (
            <div
              key={i}
              className="card-soft transition-all duration-200 border border-[#E8E9F1] overflow-hidden"
            >
              <div
                onClick={() => setOpenCard(isOpen ? null : i)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-[#F7F8FC] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: f.bg, color: f.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#17172F]">{f.title}</h3>
                    <p className="text-xs text-[#777A91]">{f.tagline}</p>
                  </div>
                </div>
                <div className="text-[#777A91]">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-[#E8E9F1] bg-[#F7F8FC]/50 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6556D9]">Feature Highlights</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {f.details.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#20213A] bg-white p-3 rounded-xl border border-[#E8E9F1]">
                        <Check className="w-4 h-4 text-[#239B75] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
