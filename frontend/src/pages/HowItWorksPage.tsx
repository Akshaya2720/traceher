import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  Cpu,
  GitFork,
  EyeOff,
  FileCheck2,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  Hash,
  Lock
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const stages = [
    {
      step: 'Stage 1',
      title: 'Evidence Ingestion & Cryptographic Hashing',
      desc: 'Users upload screenshots, audio snippets, PDF chat exports, or call logs. Immediately upon receipt, TRACEHER calculates a SHA-256 cryptographic digest of the raw bytes. The original file is stored in a write-protected state to preserve legal admissibility under forensic evidence standards.',
      example: 'Example: Uploading a WhatsApp screenshot computes hash a4f89d31... locking its exact byte integrity at the time of ingest.',
      color: '#6556D9',
      bg: '#F0EDFF',
      icon: Upload,
      preview: 'SHA-256: a4f89d31c2e1b827e85c9a17382bc194df62881b490f23ce0824b238d9e115ca'
    },
    {
      step: 'Stage 2',
      title: 'OCR Extraction & NLP Harassment Classification',
      desc: 'Optical Character Recognition extracts text from screenshots with zero loss of emojis or punctuation. A specialized multi-label classifier analyzes the text across 8 harassment typologies (threats, blackmail, impersonation, stalking, cyberbullying, sexual harassment, hate speech, repeated contact).',
      example: 'Example: Detects phrase "I know where you work on MG Road" and flags high confidence for Stalking & Threat indicators with calibrated explainability.',
      color: '#3B82F6',
      bg: '#EAF1FF',
      icon: Cpu,
      preview: 'Detected: Threats & Intimidation (96%), Stalking Indicators (91%)'
    },
    {
      step: 'Stage 3',
      title: 'Cross-Incident Entity & Timeline Graphing',
      desc: 'Individual pieces of evidence rarely tell the full story alone. NetworkX constructs an entity-relationship graph connecting user handles, burner phone numbers, IP references, and timestamps across multiple occurrences to highlight escalation trajectories.',
      example: 'Example: Traces burner handles @anon_user01 and @shadow_backup to the same nocturnal messaging campaign.',
      color: '#8877EC',
      bg: '#F0EDFF',
      icon: GitFork,
      preview: 'Nodes: 4 Entities | Edges: 5 Correlated Interactions | Progression: Escalating'
    },
    {
      step: 'Stage 4',
      title: 'Privacy Guardian Non-Destructive Redaction',
      desc: 'Before sharing evidence with legal counsel, friends, or police officers, users can redact sensitive details like personal phone numbers, physical residential addresses, family names, and profile avatars. The redaction is non-destructive and generates a separate protected copy.',
      example: 'Example: Solid black privacy masks placed over phone numbers and home addresses while preserving threat message excerpts.',
      color: '#239B75',
      bg: '#E8F6F0',
      icon: EyeOff,
      preview: 'Protected: 1 Phone Number, 1 Email Address, 1 Profile Face Avatar'
    },
    {
      step: 'Stage 5',
      title: 'Official Dossier Compilation & Resource Navigation',
      desc: 'With one click, TRACEHER compiles a formal PDF evidence dossier featuring table of exhibits, hash verification tables, chronological event timelines, and extracted transcripts, paired with direct contact pathways to the National Cybercrime Portal (cybercrime.gov.in) and Helpline 1930.',
      example: 'Example: Court- and cyber-cell-ready PDF report with timestamped exhibits and official disclaimers.',
      color: '#E8A33D',
      bg: '#FFF8EB',
      icon: FileCheck2,
      preview: 'Generated: Official Evidence Dossier (TRC-2026-THREAT.pdf)'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#6556D9] uppercase tracking-wider">STEP-BY-STEP PROCESS</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] tracking-tight font-heading">
          How TRACEHER Works
        </h1>
        <p className="text-sm text-[#777A91] leading-relaxed">
          A clear, transparent breakdown of how our platform extracts, analyzes, secures, and formats your evidence without technical confusion or traumatic friction.
        </p>
      </div>

      {/* Vertical Timeline Stages */}
      <div className="space-y-12 relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:w-0.5 before:bg-[#E8E9F1]">
        {stages.map((st, idx) => {
          const Icon = st.icon;
          const isEven = idx % 2 === 0;
          return (
            <div key={st.step} className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Timeline Center Badge */}
              <div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md z-10"
                style={{ backgroundColor: st.color }}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Left / Right Card Container */}
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12 md:text-left'}`}>
                <div className="card-soft p-6 space-y-3 card-soft-hover">
                  <div className={`flex items-center gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                    <span
                      className="px-2.5 py-0.5 text-xs font-bold rounded-md"
                      style={{ backgroundColor: st.bg, color: st.color }}
                    >
                      {st.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#17172F] font-heading">{st.title}</h3>
                  <p className="text-xs text-[#777A91] leading-relaxed">{st.desc}</p>
                  
                  {/* Example Snippet */}
                  <div className="p-3 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-left space-y-1">
                    <span className="text-[10px] font-bold text-[#6556D9] uppercase tracking-wider">Realistic Workflow</span>
                    <p className="text-[11px] text-[#20213A]">{st.example}</p>
                    <div className="pt-1 font-mono text-[10px] text-[#777A91] truncate">
                      {st.preview}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to action */}
      <div className="card-soft p-8 text-center bg-gradient-to-tr from-white to-[#F0EDFF]/50 border border-[#6556D9]/20 space-y-4">
        <h3 className="text-xl font-bold text-[#17172F] font-heading">Ready to see it in action?</h3>
        <p className="text-xs text-[#777A91] max-w-md mx-auto">
          You can test the entire workflow right now in our Judge Demo Mode using preloaded fictional harassment scenarios.
        </p>
        <button
          onClick={() => setCurrentPage('demo-workspace')}
          className="px-6 py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          Open Judge Demo Mode
        </button>
      </div>
    </div>
  );
};
