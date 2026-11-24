import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Lock,
  FileCheck2,
  CheckCircle2,
  Info,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const ResponseNavigatorPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [selectedIncidentType, setSelectedIncidentType] = useState<string>('threats');

  const decisionTreeOptions = [
    { id: 'threats', label: 'Threatening Messages & Intimidation', icon: AlertTriangle },
    { id: 'impersonation', label: 'Fake Account & Profile Impersonation', icon: ShieldCheck },
    { id: 'blackmail', label: 'Blackmail & Image-Based Abuse (Extortion)', icon: Lock },
    { id: 'stalking', label: 'Cyberstalking & Physical Surveillance', icon: Compass },
    { id: 'fraud', label: 'Financial Cyber Fraud & Solicitations', icon: PhoneCall },
    { id: 'repeated', label: 'Unwanted Communication & Spam Calls', icon: PhoneCall }
  ];

  const guidanceContent: Record<string, {
    title: string;
    urgency: string;
    urgencyColor: string;
    checklist: string[];
    officialPortal: string;
    portalName: string;
    helpline: string;
    helplineName: string;
  }> = {
    threats: {
      title: 'Action Protocol: Direct Threats & Intimidation',
      urgency: 'High Priority',
      urgencyColor: 'bg-[#FEF2F2] text-[#D95F6C] border-[#D95F6C]/20',
      checklist: [
        'If the sender explicitly mentions your physical location or indicates proximity, immediately dial 112 (National Emergency).',
        'Do NOT delete threatening messages or reactive text responses. Ensure full screenshots display exact timestamps and visible sender phone/handle.',
        'Upload your screenshots into TRACEHER to calculate immutable SHA-256 integrity hashes before blocking the sender.',
        'File an official complaint on the National Cyber Crime Portal (cybercrime.gov.in) under "Crime Against Women".',
        'Generate an organized TRACEHER Evidence Dossier PDF to submit to the investigating officer or campus safety cell.'
      ],
      officialPortal: 'https://cybercrime.gov.in',
      portalName: 'National Cyber Crime Reporting Portal (cybercrime.gov.in)',
      helpline: '112',
      helplineName: 'Emergency Police Dispatch (Dial 112)'
    },
    impersonation: {
      title: 'Action Protocol: Unauthorized Profile & Identity Theft',
      urgency: 'Medium Priority',
      urgencyColor: 'bg-[#FFF8EB] text-[#E8A33D] border-[#E8A33D]/20',
      checklist: [
        'Copy the exact profile URL and account UID. Capture screenshots showing profile picture, follower count, and bio description.',
        'Submit an in-app Impersonation Report directly to the platform (Instagram, X, Facebook, LinkedIn).',
        'Post a verified advisory story or status on your legitimate account informing mutual contacts of the imposter.',
        'If the account solicits money or distributes defamatory content, lodge a formal cybercrime report on cybercrime.gov.in.',
        'Use Privacy Guardian in TRACEHER to mask innocent mutual friends\' names before circulating warnings.'
      ],
      officialPortal: 'https://cybercrime.gov.in',
      portalName: 'National Cyber Crime Portal — Identity Fraud',
      helpline: '1930',
      helplineName: 'Cybercrime Helpline (1930)'
    },
    blackmail: {
      title: 'Action Protocol: Extortion & Non-Consensual Image Distribution',
      urgency: 'Critical Emergency',
      urgencyColor: 'bg-[#FEF2F2] text-[#D95F6C] border-[#D95F6C]/20',
      checklist: [
        'Do NOT comply with extortion demands or transfer money. Extortion demands universally escalate after initial compliance.',
        'Submit digital image hashes to StopNCII.org (global non-profit preventing intimate image circulation).',
        'Preserve all communication logs and banking UPI handles provided by the blackmailer.',
        'Dial the National Cybercrime Helpline at 1930 immediately for priority assistance in financial extortion cases.',
        'Lodge an urgent complaint under "Non-Consensual Distribution of Intimate Material" at cybercrime.gov.in.'
      ],
      officialPortal: 'https://stopncii.org',
      portalName: 'StopNCII.org — Cryptographic Image Hash Shield',
      helpline: '1930',
      helplineName: 'National Cyber Helpline (1930)'
    },
    stalking: {
      title: 'Action Protocol: Cyberstalking & Routine Surveillance',
      urgency: 'High Priority',
      urgencyColor: 'bg-[#F0EDFF] text-[#6556D9] border-[#6556D9]/20',
      checklist: [
        'Maintain an active Chronological Timeline in TRACEHER recording every date, time, and method of contact.',
        'Review connected devices and app permissions (Location, Microphone, Camera) on all personal phones and laptops.',
        'Avoid public location check-ins or real-time itinerary sharing on social networks.',
        'Share your generated TRACEHER Incident Dossier with trusted campus internal grievance committees or local police.',
        'Dial 112 if you observe physical following.'
      ],
      officialPortal: 'https://cybercrime.gov.in',
      portalName: 'Cybercrime Portal — Stalking Division',
      helpline: '112',
      helplineName: 'Emergency Police Response (112)'
    },
    fraud: {
      title: 'Action Protocol: Financial Cyber Fraud & UPI Scams',
      urgency: 'Immediate Action (Golden Hour)',
      urgencyColor: 'bg-[#FEF2F2] text-[#D95F6C] border-[#D95F6C]/20',
      checklist: [
        'Dial 1930 within 2 hours of the fraudulent transaction to trigger the banking "Golden Hour" fund freeze protocol.',
        'Immediately notify your bank to block compromised credit/debit cards and netbanking credentials.',
        'Capture transaction IDs, UTR numbers, and payment app confirmation screenshots.',
        'File an incident dossier on cybercrime.gov.in referencing your 1930 complaint ticket number.'
      ],
      officialPortal: 'https://cybercrime.gov.in',
      portalName: 'Citizen Financial Cyber Fraud Reporting System',
      helpline: '1930',
      helplineName: 'Dedicated Financial Cyber Fraud Helpline (1930)'
    },
    repeated: {
      title: 'Action Protocol: Repeated Unwanted Contact & Harassment',
      urgency: 'Moderate Priority',
      urgencyColor: 'bg-[#E8F6F0] text-[#239B75] border-[#239B75]/20',
      checklist: [
        'Document communication frequency without responding; responding often resets the harassment cycle.',
        'Export call logs and carrier statements showing repeated nocturnal calls or multiple burner origin numbers.',
        'Map multi-account patterns using TRACEHER Relationship Intelligence to show coordinated harassment.',
        'Utilize Do-Not-Disturb (TRAI DND) and carrier-level number blocking filters.'
      ],
      officialPortal: 'https://cybercrime.gov.in',
      portalName: 'National Cyber Crime Reporting Portal',
      helpline: '1930',
      helplineName: 'Cyber Helpline 1930'
    }
  };

  const activeGuidance = guidanceContent[selectedIncidentType] || guidanceContent['threats'];

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header */}
      <div className="card-soft p-6 sm:p-8 bg-gradient-to-r from-white via-white to-[#F0EDFF]/30 border border-[#E8E9F1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6556D9]" />
            <span className="text-[11px] font-semibold text-[#6556D9] uppercase tracking-wider">
              Verified Legal & Support Navigation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
            Know your next step.
          </h1>
          <p className="text-xs sm:text-sm text-[#777A91]">
            Find verified official reporting resources and clear step-by-step guidance tailored to your situation.
          </p>
        </div>

        {/* Emergency Call Box */}
        <div className="flex items-center gap-3 bg-[#FEF2F2] p-3 rounded-2xl border border-[#D95F6C]/20 text-xs">
          <PhoneCall className="w-5 h-5 text-[#D95F6C] shrink-0" />
          <div>
            <div className="font-bold text-[#D95F6C]">Emergency Helpline: 112</div>
            <div className="text-[11px] text-[#777A91]">National Cyber Helpline: 1930</div>
          </div>
        </div>
      </div>

      {/* Guided Assistance Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#17172F]">What happened? Select your situation:</h3>
          <span className="text-xs text-[#777A91]">Step-by-step custom safety roadmap</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {decisionTreeOptions.map(opt => {
            const isSelected = selectedIncidentType === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedIncidentType(opt.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-[#6556D9] bg-[#F0EDFF] text-[#6556D9] shadow-sm'
                    : 'border-[#E8E9F1] bg-white text-[#20213A] hover:bg-[#F7F8FC]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#6556D9]' : 'text-[#777A91]'}`} />
                <span className="text-xs font-bold leading-snug">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guidance Content Panel */}
      <div className="card-soft p-6 sm:p-8 bg-white border border-[#E8E9F1] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8E9F1]">
          <div>
            <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${activeGuidance.urgencyColor}`}>
              {activeGuidance.urgency}
            </span>
            <h2 className="text-lg font-bold text-[#17172F] font-heading mt-1.5">
              {activeGuidance.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={activeGuidance.officialPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Step-by-Step Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#777A91]">
            Evidence Preservation & Response Checklist
          </h4>
          <div className="space-y-2.5">
            {activeGuidance.checklist.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] flex items-start gap-3 text-xs text-[#20213A]">
                <span className="w-5 h-5 rounded-full bg-[#E8F6F0] text-[#239B75] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Direct Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E9F1]">
          <div className="p-4 bg-[#F0EDFF]/50 border border-[#6556D9]/20 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#6556D9]">Verified Authority</span>
            <div className="text-sm font-bold text-[#17172F]">{activeGuidance.portalName}</div>
            <p className="text-xs text-[#777A91]">
              Submit formal complaints directly to the Ministry of Home Affairs cyber division.
            </p>
            <a
              href={activeGuidance.officialPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#6556D9] hover:underline flex items-center gap-1 pt-1"
            >
              <span>Open Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 bg-[#FEF2F2]/60 border border-[#D95F6C]/20 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#D95F6C]">Emergency Helpline</span>
            <div className="text-sm font-bold text-[#17172F]">{activeGuidance.helplineName}</div>
            <p className="text-xs text-[#777A91]">
              Dedicated, toll-free 24/7 assistance across all Indian states and Union Territories.
            </p>
            <div className="text-xs font-bold text-[#D95F6C] pt-1">
              Direct Contact: {activeGuidance.helpline}
            </div>
          </div>
        </div>
      </div>

      {/* Non-Legal Advice Disclaimer */}
      <div className="p-4 bg-[#F7F8FC] border border-[#E8E9F1] rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-[#777A91] shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs text-[#777A91]">
          <span className="font-bold text-[#20213A]">Notice Regarding Legal Guidance</span>
          <p className="leading-relaxed">
            TRACEHER is an evidence organization workspace and does not provide legal representation. Generating an incident dossier or filing an official report does not guarantee immediate arrest or specific judicial outcomes. For formal legal representation, consult a licensed advocate or Legal Aid Counsel.
          </p>
        </div>
      </div>
    </div>
  );
};
