import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  Shield,
  Sparkles,
  ArrowRight,
  Lock,
  FileText,
  Clock,
  GitGraph,
  EyeOff,
  Compass,
  CheckCircle2,
  FileCheck,
  AlertTriangle,
  Flame,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, loadScenario } = useApp();

  const steps = [
    { num: '01', title: 'Upload your evidence', desc: 'Securely upload screenshots, call logs, direct messages, and chat threads in PNG, JPG, or PDF.' },
    { num: '02', title: 'Analyze potential harassment', desc: 'Pretrained AI classifies threats, blackmail, stalking signals, and derogatory language with full explainability.' },
    { num: '03', title: 'Discover incident patterns', desc: 'Correlate burner handles, timestamps, and cross-platform communication into an interactive relationship graph.' },
    { num: '04', title: 'Protect sensitive information', desc: 'One-click automated redaction hides personal phone numbers, physical addresses, names, and profile avatars.' },
    { num: '05', title: 'Generate an organized report', desc: 'Download a police- and court-ready incident dossier complete with SHA-256 cryptographic custody hashes.' }
  ];

  const features = [
    {
      icon: Sparkles,
      color: '#6556D9',
      bg: '#F0EDFF',
      title: 'AI Harassment Intelligence',
      desc: 'Transparent multi-label NLP categorization across 8 harassment typologies with confidence metrics and supporting text snippets.'
    },
    {
      icon: Clock,
      color: '#3B82F6',
      bg: '#EAF1FF',
      title: 'Smart Incident Timeline',
      desc: 'Chronological timeline synthesis that visualizes escalation patterns without ever fabricating missing timestamps.'
    },
    {
      icon: GitGraph,
      color: '#8877EC',
      bg: '#F0EDFF',
      title: 'Relationship Intelligence',
      desc: 'Interactive network graph tracing connections between anonymous accounts, phone handles, and message patterns.'
    },
    {
      icon: EyeOff,
      color: '#239B75',
      bg: '#E8F6F0',
      title: 'Privacy Guardian',
      desc: 'Dual-pane visual redaction tool. Solid non-destructive masks ensure original evidence files remain cryptographically preserved.'
    },
    {
      icon: FileText,
      color: '#E8A33D',
      bg: '#FFF8EB',
      title: 'Evidence Report Generator',
      desc: 'Generates structured PDF dossiers with chain-of-custody verification tailored for cyber cells, legal advisors, and campus authorities.'
    },
    {
      icon: Compass,
      color: '#D95F6C',
      bg: '#FEF2F2',
      title: 'Response Navigator',
      desc: 'Contextual decision trees and verified links to the National Cyber Crime Portal (cybercrime.gov.in) and 1930 / 112 emergency lines.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 lg:pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8E9F1] shadow-xs text-xs font-semibold text-[#6556D9]">
                <Sparkles className="w-3.5 h-3.5 text-[#6556D9]" />
                <span>AI-POWERED DIGITAL SAFETY & EVIDENCE INTELLIGENCE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17172F] tracking-tight font-heading leading-[1.12]">
                Your Digital Safety.<br />
                <span className="text-[#6556D9] relative inline-block">
                  Your Evidence.
                  <span className="absolute bottom-1 left-0 w-full h-2.5 bg-[#F0EDFF] -z-10 rounded-sm" />
                </span><br />
                Your Control.
              </h1>

              <p className="text-base sm:text-lg text-[#777A91] leading-relaxed max-w-xl">
                Online harassment shouldn't leave you confused about what to do next. TRACEHER helps women and girls organize digital evidence, identify potential harassment patterns, and find verified reporting support.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setCurrentPage('register')}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-[#6556D9] hover:bg-[#5244C4] rounded-xl shadow-md shadow-[#6556D9]/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Start Protecting Yourself</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage('how-it-works')}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-[#20213A] bg-white hover:bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <span>Explore How It Works</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-[#777A91]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#239B75]" />
                  <span>Private by design</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6556D9]" />
                  <span>SHA-256 Hashed Evidence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#8877EC]" />
                  <span>Built for informed action</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Miniature Dashboard Preview */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Dashboard Card Shell */}
                <div className="card-soft p-6 bg-white border border-[#E8E9F1] shadow-xl space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E9F1]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#239B75] animate-pulse" />
                      <span className="text-xs font-bold text-[#17172F]">TRACEHER Safe Workspace</span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#F7F8FC] px-2 py-0.5 rounded text-[#777A91] border border-[#E8E9F1]">
                      TRC-2026-LIVE
                    </span>
                  </div>

                  {/* Evidence Card Snippet */}
                  <div className="p-3.5 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17172F] truncate">threat_dm_screenshot.png</span>
                      <span className="text-[10px] font-mono text-[#239B75] bg-[#E8F6F0] px-2 py-0.5 rounded font-bold">
                        SHA-256 LOCKED
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777A91] italic font-mono bg-white p-2 rounded-lg border border-[#E8E9F1]">
                      "@shadow_stalker99: 'I know where you work on MG Road. Watch your back tomorrow.'"
                    </p>
                  </div>

                  {/* AI Analysis Badges */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#17172F]">Detected Threat Patterns</span>
                      <span className="text-[#6556D9] font-bold">96% Calibrated</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#F0EDFF] text-[#6556D9] border border-[#6556D9]/20">
                        Threats & Intimidation
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#EAF1FF] text-[#3B82F6] border border-[#3B82F6]/20">
                        Stalking Indicator (MG Road)
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#FFF8EB] text-[#E8A33D] border border-[#E8A33D]/20">
                        Extortion Signal
                      </span>
                    </div>
                  </div>

                  {/* Quick Timeline Mini */}
                  <div className="pt-2 border-t border-[#E8E9F1] space-y-2">
                    <span className="text-[11px] font-semibold text-[#777A91]">Chronological Progression</span>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-[#20213A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6556D9]" />
                        <span className="font-mono text-[10px] text-[#777A91]">22:15</span>
                        <span className="truncate">Initial unsolicited outreach via DM</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#20213A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D95F6C]" />
                        <span className="font-mono text-[10px] text-[#777A91]">22:17</span>
                        <span className="truncate font-medium text-[#D95F6C]">Physical workplace geolocation threat</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button in preview */}
                  <div className="pt-2">
                    <button
                      onClick={() => loadScenario('threats')}
                      className="w-full py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Flame className="w-3.5 h-3.5 text-[#E8A33D]" />
                      <span>Launch This Fictional Case Demo</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="py-14 bg-white border-y border-[#E8E9F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#6556D9] uppercase tracking-wider">STRUCTURED WORKFLOW</span>
            <h2 className="text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
              How TRACEHER Transforms Evidence
            </h2>
            <p className="text-sm text-[#777A91]">
              A continuous, stress-free path from raw chaotic screenshots to verified, actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map(step => (
              <div key={step.num} className="card-soft p-5 text-left space-y-3 relative group card-soft-hover bg-white border border-[#E8E9F1]">
                <span className="text-2xl font-black font-heading text-[#6556D9]/40 group-hover:text-[#6556D9] transition-colors">
                  {step.num}
                </span>
                <h3 className="text-sm font-bold text-[#17172F] leading-snug">{step.title}</h3>
                <p className="text-xs text-[#777A91] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Features Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#6556D9] uppercase tracking-wider">CORE CAPABILITIES</span>
          <h2 className="text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
            Purpose-Built for Evidence Intelligence
          </h2>
          <p className="text-sm text-[#777A91]">
            Not a generic dashboard or chatbot. An engineered digital safety workspace built for dignity, clarity, and legal readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card-soft p-6 space-y-4 card-soft-hover text-left bg-white border border-[#E8E9F1]">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: f.bg, color: f.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#17172F] font-heading">{f.title}</h3>
                <p className="text-xs text-[#777A91] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Privacy Guarantee Section - Clean Formal White & Lavender */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border-2 border-[#E8E9F1] p-8 sm:p-12 lg:p-14 text-left space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0EDFF] text-xs font-semibold text-[#6556D9]">
            <Lock className="w-3.5 h-3.5" />
            <span>STRICT DATA SOVEREIGNTY & PRIVACY</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#17172F] tracking-tight leading-tight">
              Your evidence belongs to you. Always.
            </h2>
            <p className="text-sm sm:text-base text-[#777A91] leading-relaxed">
              We never share, sell, or index your uploaded evidence. Files are hashed locally with SHA-256 before any review. Redaction is non-destructive, and you retain the absolute right to purge all files and account data at any second.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8E9F1] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E8F6F0] text-[#239B75] flex items-center justify-center font-bold">
                <Check className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#17172F]">Zero Overwrite</h4>
              <p className="text-[11px] text-[#777A91]">Original files are write-protected and never overwritten</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8E9F1] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#F0EDFF] text-[#6556D9] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#17172F]">User Tenancy</h4>
              <p className="text-[11px] text-[#777A91]">Strict isolation ensuring no cross-user data leakage</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8E9F1] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#EAF1FF] text-[#3B82F6] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#17172F]">Explainable AI</h4>
              <p className="text-[11px] text-[#777A91]">Clear algorithmic rationales without black-box mysteries</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-[#E8E9F1] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] text-[#E8A33D] flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#17172F]">Instant Wipe</h4>
              <p className="text-[11px] text-[#777A91]">Complete account and file deletion available with one click</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('privacy-security')}
              className="px-6 py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Read our Privacy Architecture
            </button>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] font-heading tracking-tight">
          Take control of your digital safety.
        </h2>
        <p className="text-base text-[#777A91] max-w-xl mx-auto">
          Start organizing your evidence today in a secure, supportive workspace designed specifically for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage('register')}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-[#6556D9] hover:bg-[#5244C4] rounded-xl shadow-md shadow-[#6556D9]/25 transition-all cursor-pointer"
          >
            Get Started Free
          </button>
          <button
            onClick={() => setCurrentPage('demo-workspace')}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-[#6556D9] bg-[#F0EDFF] hover:bg-[#E2DCFF] rounded-xl transition-all cursor-pointer"
          >
            Open Judge Demo Mode
          </button>
        </div>
      </section>
    </div>
  );
};
