import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  GitGraph,
  Clock,
  EyeOff,
  FileCheck2,
  ExternalLink,
  Award
} from 'lucide-react';

export const DemoWorkspacePage: React.FC = () => {
  const { loadScenario, resetDemoData, setCurrentPage } = useApp();
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  const scenarios = [
    {
      key: 'threats' as const,
      num: 'Scenario A',
      title: 'Online Threats & Direct Extortion',
      badge: 'High Urgency',
      badgeColor: 'bg-[#FEF2F2] text-[#D95F6C] border-[#D95F6C]/20',
      description: 'A fictional user receives escalating aggressive direct messages referencing her physical office location on MG Road and threatening non-consensual image distribution.',
      workflow: [
        'Upload: Evidence ingested & SHA-256 integrity hash calculated',
        'OCR: Text extracted accurately without loss of emojis or timestamps',
        'AI Threat Classification: Flags "Threats and intimidation" (96%) & "Stalking indicators" (91%)',
        'Timeline: Chronological progression of escalations across 3 consecutive days',
        'PDF Generation: Official incident dossier compiled ready for cybercrime cells'
      ],
      quickAction: 'Load Online Threats Scenario'
    },
    {
      key: 'impersonation' as const,
      num: 'Scenario B',
      title: 'Identity Theft & Profile Impersonation',
      badge: 'Identity Misuse',
      badgeColor: 'bg-[#FFF8EB] text-[#E8A33D] border-[#E8A33D]/20',
      description: 'A fictional cloned Instagram account uses stolen portrait photos, copies the victim bio, and sends unauthorized UPI money requests to mutual contacts.',
      workflow: [
        'Evidence Organization: Profile link, UID, follower count, and bio captured',
        'AI Impersonation Classifier: Identifies likeness misappropriation and fraudulent solicitation',
        'Privacy Guardian: Automatic non-destructive masking of mutual friends\' personal details',
        'Response Navigator: Direct protocol for platform takedown and cybercrime.gov.in reporting'
      ],
      quickAction: 'Load Impersonation Scenario'
    },
    {
      key: 'repeated' as const,
      num: 'Scenario C',
      title: 'Repeated Multi-Account Harassment',
      badge: 'Pattern Intelligence',
      badgeColor: 'bg-[#F0EDFF] text-[#6556D9] border-[#6556D9]/20',
      description: 'Multiple fictional accounts send continuous unwanted messages and nocturnal spam call barrages (45 missed calls in 2 hours) across burner VoIP lines.',
      workflow: [
        'Pattern Classification: 99% confidence for "Repeated unwanted contact"',
        'Relationship Graph: Connects multiple burner handles to one coordinated source',
        'Timeline Narrative: Visualizes nocturnal timing spikes without fabricating timestamps',
        'Dossier Export: Verifiable multi-account exhibit table for telecommunications cells'
      ],
      quickAction: 'Load Repeated Contact Scenario'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left pb-16">
      {/* Header */}
      <div className="card-soft p-6 sm:p-8 bg-gradient-to-r from-white via-white to-[#FFF8EB]/40 border border-[#E8A33D]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#E8A33D]" />
            <span className="text-[11px] font-bold text-[#E8A33D] uppercase tracking-wider">
              Judges & Evaluators Evaluation Suite
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
            Demonstration Workspace
          </h1>
          <p className="text-xs sm:text-sm text-[#777A91]">
            Preloaded with three fictional harassment scenarios designed for rapid end-to-end evaluation. <strong>Zero real victim data is utilized.</strong>
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F7F8FC] border border-[#E8E9F1] text-xs font-semibold text-[#17172F] rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#6556D9]" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {resetSuccess && (
        <div className="p-3 bg-[#E8F6F0] border border-[#239B75]/20 rounded-xl text-xs text-[#239B75] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Demo database restored to default benchmark demonstration state.</span>
        </div>
      )}

      {/* Scenarios Grid */}
      <div className="space-y-6">
        {scenarios.map(sc => (
          <div
            key={sc.key}
            className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4 card-soft-hover"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E8E9F1]">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-[#6556D9] uppercase font-mono">{sc.num}</span>
                <span className="text-[#B6BACB]">|</span>
                <h3 className="text-base font-bold text-[#17172F]">{sc.title}</h3>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${sc.badgeColor}`}>
                {sc.badge}
              </span>
            </div>

            <p className="text-xs text-[#20213A] leading-relaxed">
              {sc.description}
            </p>

            <div className="space-y-1.5 p-3.5 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
              <span className="text-[10px] font-bold text-[#777A91] uppercase tracking-wider">
                Key Demonstrated Capabilities:
              </span>
              <ul className="space-y-1 text-xs text-[#20213A]">
                {sc.workflow.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#239B75] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => loadScenario(sc.key)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <span>{sc.quickAction}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Evaluation Quick Matrix - Formal White & Purple */}
      <div className="card-soft p-6 sm:p-8 bg-white border-2 border-[#E8E9F1] rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6556D9]">
          <Award className="w-4 h-4" />
          <span>InnovateHER Scoring Criteria Alignment</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#20213A]">
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-1.5">
            <span className="font-bold text-[#6556D9]">Safety & Accessibility</span>
            <p className="text-[11px] text-[#777A91] leading-relaxed">
              Stress-reducing color system, non-triggering microcopy, keyboard navigation, and full tri-lingual localization (English, Malayalam, Hindi).
            </p>
          </div>
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-1.5">
            <span className="font-bold text-[#239B75]">Best AI Project</span>
            <p className="text-[11px] text-[#777A91] leading-relaxed">
              Multi-label classification, transparent confidence scores, supporting text citations, and NetworkX relational hypothesis intelligence.
            </p>
          </div>
          <div className="p-4 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-1.5">
            <span className="font-bold text-[#E8A33D]">Forensic Integrity</span>
            <p className="text-[11px] text-[#777A91] leading-relaxed">
              Local SHA-256 byte hashing, read-only original file custody, non-destructive redaction, and official ReportLab PDF dossiers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
