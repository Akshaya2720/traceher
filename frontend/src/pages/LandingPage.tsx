import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { motion, useInView, useAnimation } from 'framer-motion';
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
  ShieldCheck,
  PhoneCall,
  Check,
  Upload,
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';

// Reusable animated section component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children, className = '', delay = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const LandingPage: React.FC = () => {
  const { setCurrentPage, loadScenario } = useApp();

  const steps = [
    { num: '01', icon: Upload, title: 'Upload Evidence', desc: 'Securely upload screenshots, call logs, DMs, and chat threads. PNG, JPG, or PDF.' },
    { num: '02', icon: Sparkles, title: 'AI Analysis', desc: 'Pretrained AI classifies threats, blackmail, and stalking signals with full explainability.' },
    { num: '03', icon: GitGraph, title: 'Discover Patterns', desc: 'Correlate handles, timestamps, and cross-platform communication into an interactive graph.' },
    { num: '04', icon: EyeOff, title: 'Protect Privacy', desc: 'One-click automated redaction hides phone numbers, addresses, and profile details.' },
    { num: '05', icon: FileText, title: 'Generate Report', desc: 'Download a police-ready incident dossier with SHA-256 cryptographic custody hashes.' },
  ];

  const features = [
    { icon: Sparkles, color: '#6556D9', bg: '#F0EDFF', title: 'AI Harassment Intelligence', desc: 'Transparent multi-label NLP across 8 harassment typologies with confidence metrics and supporting text snippets.' },
    { icon: Clock, color: '#3B82F6', bg: '#EAF1FF', title: 'Smart Incident Timeline', desc: 'Chronological timeline synthesis that visualizes escalation patterns without ever fabricating missing timestamps.' },
    { icon: GitGraph, color: '#8877EC', bg: '#F0EDFF', title: 'Relationship Intelligence', desc: 'Interactive network graph tracing anonymous accounts, phone handles, and message patterns.' },
    { icon: EyeOff, color: '#239B75', bg: '#E8F6F0', title: 'Privacy Guardian', desc: 'Dual-pane visual redaction. Non-destructive masks keep original evidence cryptographically preserved.' },
    { icon: FileText, color: '#E8A33D', bg: '#FFF8EB', title: 'Evidence Report Generator', desc: 'Structured PDF dossiers with chain-of-custody for cyber cells, legal advisors, and campus authorities.' },
    { icon: Compass, color: '#D95F6C', bg: '#FEF2F2', title: 'Response Navigator', desc: 'Contextual decision trees and verified links to the National Cyber Crime Portal (cybercrime.gov.in) and 1930 / 112 helplines.' },
  ];

  const privacyPoints = [
    { icon: Check, bg: '#E8F6F0', color: '#239B75', title: 'Zero Overwrite', desc: 'Original files are write-protected and never altered' },
    { icon: ShieldCheck, bg: '#F0EDFF', color: '#6556D9', title: 'User Tenancy', desc: 'Strict isolation, no cross-user data leakage ever' },
    { icon: Sparkles, bg: '#EAF1FF', color: '#3B82F6', title: 'Explainable AI', desc: 'Clear algorithmic rationales, no black-box mysteries' },
    { icon: Lock, bg: '#FFF8EB', color: '#E8A33D', title: 'Instant Wipe', desc: 'Complete deletion of all data available with one click' },
  ];

  return (
    <div className="space-y-24 pb-24">

      {/* ─── HERO ─── */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0EDFF]/60 rounded-full blur-3xl -z-10 translate-x-32 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#EAF1FF]/40 rounded-full blur-3xl -z-10 -translate-x-16" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Text + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-7 text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#E8E9F1] shadow-sm text-xs font-semibold text-[#6556D9]"
              >
                <span className="w-2 h-2 rounded-full bg-[#6556D9] animate-pulse" />
                <span>AI-POWERED DIGITAL SAFETY &amp; EVIDENCE INTELLIGENCE</span>
              </motion.div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17172F] tracking-tight font-heading leading-[1.1]">
                  Your Digital Safety.{' '}
                  <span className="relative inline-block text-[#6556D9]">
                    Your Evidence.
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="absolute bottom-1 left-0 w-full h-3 bg-[#F0EDFF] -z-10 rounded origin-left"
                    />
                  </span>{' '}
                  Your Control.
                </h1>
                <p className="text-base sm:text-lg text-[#777A91] leading-relaxed max-w-xl">
                  Online harassment shouldn't leave you confused about what to do next. TRACEHER helps women and girls organize digital evidence, identify potential harassment patterns, and find verified reporting support.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentPage('register')}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-[#6556D9] hover:bg-[#5244C4] rounded-xl shadow-lg shadow-[#6556D9]/20 transition-colors cursor-pointer"
                >
                  <Shield className="w-4 h-4" />
                  <span>Start Protecting Yourself</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentPage('how-it-works')}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-[#20213A] bg-white hover:bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <span>Explore How It Works</span>
                  <ChevronRight className="w-4 h-4 text-[#777A91]" />
                </motion.button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-[#777A91]">
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

              {/* Emergency quick bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#FEF2F2] border border-[#D95F6C]/20 rounded-xl text-xs"
              >
                <PhoneCall className="w-4 h-4 text-[#D95F6C]" />
                <span className="font-semibold text-[#D95F6C]">Emergency?</span>
                <span className="text-[#777A91]">Call</span>
                <strong className="text-[#D95F6C]">112 (Police)</strong>
                <span className="text-[#777A91]">or</span>
                <strong className="text-[#D95F6C]">1930 (Cyber Crime)</strong>
              </motion.div>
            </motion.div>

            {/* Right: Animated App Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Floating badge - top right */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-3 py-2 bg-white border border-[#E8E9F1] rounded-xl shadow-lg text-xs font-semibold text-[#239B75]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#239B75] animate-pulse" />
                  SHA-256 Custody Active
                </motion.div>

                {/* Floating badge - bottom left */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="absolute -bottom-4 -left-4 z-20 flex items-center gap-2 px-3 py-2 bg-white border border-[#E8E9F1] rounded-xl shadow-lg text-xs font-semibold text-[#6556D9]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6556D9]" />
                  AI Analysis Complete
                </motion.div>

                {/* Main card */}
                <div className="card-soft p-6 bg-white border border-[#E8E9F1] shadow-2xl shadow-[#6556D9]/10 space-y-5 rounded-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8E9F1]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#239B75] animate-pulse" />
                      <span className="text-xs font-bold text-[#17172F]">TRACEHER Safe Workspace</span>
                    </div>
                    <span className="text-[10px] font-mono bg-[#F7F8FC] px-2 py-1 rounded-lg text-[#777A91] border border-[#E8E9F1]">TRC-2026-LIVE</span>
                  </div>

                  {/* Evidence snippet */}
                  <div className="p-4 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17172F] truncate">threat_dm_screenshot.png</span>
                      <span className="text-[10px] font-mono text-[#239B75] bg-[#E8F6F0] px-2 py-0.5 rounded-full font-bold border border-[#239B75]/20">SHA-256 ✓</span>
                    </div>
                    <p className="text-[11px] text-[#777A91] italic font-mono bg-white p-2.5 rounded-lg border border-[#E8E9F1] leading-relaxed">
                      "@shadow_stalker99: 'I know where you work on MG Road. Watch your back tomorrow.'"
                    </p>
                  </div>

                  {/* AI analysis badges */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#17172F]">AI-Detected Threat Patterns</span>
                      <span className="text-[#6556D9] font-bold">96% Confidence</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Threats & Intimidation', 'Stalking Indicator', 'Extortion Signal'].map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${
                            i === 0 ? 'bg-[#F0EDFF] text-[#6556D9] border-[#6556D9]/20' :
                            i === 1 ? 'bg-[#EAF1FF] text-[#3B82F6] border-[#3B82F6]/20' :
                            'bg-[#FFF8EB] text-[#E8A33D] border-[#E8A33D]/20'
                          }`}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline mini */}
                  <div className="pt-3 border-t border-[#E8E9F1] space-y-2">
                    <span className="text-[11px] font-semibold text-[#777A91]">Chronological Progression</span>
                    <div className="space-y-1.5">
                      {[
                        { time: '22:15', text: 'Initial unsolicited outreach via DM', color: '#6556D9', urgent: false },
                        { time: '22:17', text: 'Physical workplace geolocation threat', color: '#D95F6C', urgent: true },
                      ].map((e, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px]">
                          <span className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: e.color }} />
                          <span className="font-mono text-[10px] text-[#777A91]">{e.time}</span>
                          <span className={`truncate ${e.urgent ? 'font-semibold text-[#D95F6C]' : 'text-[#20213A]'}`}>{e.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => loadScenario('threats')}
                    className="w-full py-2.5 bg-gradient-to-r from-[#6556D9] to-[#8877EC] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 text-[#FFD580]" />
                    <span>Launch This Fictional Case Demo</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 5-STEP PROCESS ─── */}
      <section className="bg-white border-y border-[#E8E9F1] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <AnimatedSection className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#6556D9] uppercase tracking-widest">STRUCTURED WORKFLOW</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] tracking-tight font-heading">
              How TRACEHER Transforms Evidence
            </h2>
            <p className="text-sm text-[#777A91] leading-relaxed">
              A continuous, stress-free path from raw screenshots to verified, actionable intelligence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative">
            {/* Connecting line on desktop */}
            <div className="absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#E8E9F1] to-transparent hidden md:block" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimatedSection key={step.num} delay={i * 0.08}>
                  <div className="p-5 bg-white border border-[#E8E9F1] rounded-2xl text-left space-y-4 hover:border-[#6556D9]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default group relative">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#F0EDFF] text-[#6556D9] flex items-center justify-center group-hover:bg-[#6556D9] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-black font-heading text-[#6556D9]/20 group-hover:text-[#6556D9]/40 transition-colors">{step.num}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#17172F]">{step.title}</h3>
                      <p className="text-xs text-[#777A91] leading-relaxed mt-1">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 6 FEATURES ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <AnimatedSection className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#6556D9] uppercase tracking-widest">CORE CAPABILITIES</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] tracking-tight font-heading">
            Purpose-Built for Evidence Intelligence
          </h2>
          <p className="text-sm text-[#777A91] leading-relaxed">
            Not a generic dashboard or chatbot. An engineered digital safety workspace built for dignity, clarity, and legal readiness.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="p-6 bg-white border border-[#E8E9F1] rounded-2xl space-y-4 hover:border-[#6556D9]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group text-left h-full">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: f.bg, color: f.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#17172F] font-heading">{f.title}</h3>
                    <p className="text-xs text-[#777A91] leading-relaxed mt-1.5">{f.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* ─── PRIVACY GUARANTEE ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="rounded-3xl bg-gradient-to-br from-white via-[#F7F8FC] to-[#F0EDFF]/40 border border-[#E8E9F1] p-8 sm:p-12 lg:p-14 text-left space-y-8 shadow-sm">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0EDFF] border border-[#6556D9]/20 text-xs font-bold text-[#6556D9]">
              <Lock className="w-3.5 h-3.5" />
              <span>STRICT DATA SOVEREIGNTY &amp; PRIVACY</span>
            </div>
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#17172F] tracking-tight leading-tight">
                Your evidence belongs to you. <span className="text-[#6556D9]">Always.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#777A91] leading-relaxed">
                We never share, sell, or index your uploaded evidence. Files are hashed locally with SHA-256 before any review. Redaction is non-destructive, and you retain the absolute right to purge all files and account data instantly.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {privacyPoints.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="p-4 rounded-2xl bg-white border border-[#E8E9F1] space-y-3 hover:shadow-sm transition-shadow h-full">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: pt.bg, color: pt.color }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#17172F]">{pt.title}</h4>
                        <p className="text-[11px] text-[#777A91] mt-0.5 leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage('privacy-security')}
              className="px-6 py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Read Our Privacy Architecture →
            </button>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── TRUST INDICATORS ─── */}
      <section className="bg-white border-y border-[#E8E9F1] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <p className="text-xs font-bold text-[#777A91] uppercase tracking-widest">Trusted & Transparent</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '8', label: 'Harassment Categories Detected' },
              { value: 'SHA-256', label: 'Cryptographic Evidence Hashing' },
              { value: '3', label: 'Languages Supported' },
              { value: 'WCAG 2.2', label: 'Accessibility Standard' },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="space-y-1">
                  <div className="text-2xl font-black font-heading text-[#6556D9]">{stat.value}</div>
                  <div className="text-[11px] text-[#777A91] font-medium leading-tight">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <AnimatedSection className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF8EB] border border-[#E8A33D]/20 rounded-full text-[11px] font-bold text-[#E8A33D]">
            <Star className="w-3.5 h-3.5" />
            <span>Built for InnovateHER — Safety &amp; Accessibility Track</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] font-heading tracking-tight">
            Take control of your digital safety.
          </h2>
          <p className="text-base text-[#777A91] max-w-xl mx-auto leading-relaxed">
            Start organizing your evidence today in a secure, supportive workspace designed specifically for you.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentPage('register')}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white bg-gradient-to-r from-[#6556D9] to-[#8877EC] rounded-xl shadow-lg shadow-[#6556D9]/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Get Started Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentPage('demo-workspace')}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-[#6556D9] bg-[#F0EDFF] hover:bg-[#E2DCFF] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-[#E8A33D]" />
            Open Judge Demo Mode
          </motion.button>
        </AnimatedSection>
      </section>
    </div>
  );
};
