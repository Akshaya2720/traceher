import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ThumbsUp,
  RotateCcw,
  XCircle,
  FileText,
  AlertTriangle,
  Info,
  ShieldCheck,
  ChevronRight,
  Zap,
  Brain,
  Eye,
  ScanText,
  Tags,
  BarChart3,
  PackageCheck
} from 'lucide-react';
import { AIAnalysis } from '../types';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1] as [number, number, number, number], duration: 0.4 } }
};

export const AIAnalysisPage: React.FC = () => {
  const {
    evidenceList,
    selectedEvidenceId,
    setSelectedEvidenceId,
    updateAnalysisReview,
    setCurrentPage
  } = useApp();

  const evidence = evidenceList.find(e => e.id === selectedEvidenceId) || evidenceList[0];
  const [activePipelineStep, setActivePipelineStep] = useState(6);
  const [pipelineRunning, setPipelineRunning] = useState(false);

  const pipelineStages = [
    { num: 1, name: 'Evidence Validation', icon: ShieldCheck, desc: 'File integrity check' },
    { num: 2, name: 'Text Extraction (OCR)', icon: ScanText, desc: 'Content extraction' },
    { num: 3, name: 'Language & Semantics', icon: Brain, desc: 'NLP processing' },
    { num: 4, name: 'Category Classification', icon: Tags, desc: 'Threat labeling' },
    { num: 5, name: 'Pattern Analysis', icon: BarChart3, desc: 'Behavioral signals' },
    { num: 6, name: 'Results Preparation', icon: PackageCheck, desc: 'Report assembly' },
  ];

  const handleRerun = () => {
    setPipelineRunning(true);
    setActivePipelineStep(1);
    const interval = setInterval(() => {
      setActivePipelineStep(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          setPipelineRunning(false);
          return 6;
        }
        return prev + 1;
      });
    }, 500);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-7 text-left pb-16"
    >
      {/* Page Header */}
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white via-white to-[#F0EDFF]/50 border border-[#E8E9F1] p-6 sm:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6556D9]/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6556D9] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#6556D9] uppercase tracking-widest">
                Safety Intelligence Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
              AI Evidence Analysis
            </h1>
            <p className="text-sm text-[#777A91] max-w-lg">
              Multi-label digital safety classification with transparent confidence and behavioral explainability.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={evidence?.id}
              onChange={e => setSelectedEvidenceId(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-[#E8E9F1] rounded-xl text-xs font-semibold text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
            >
              {evidenceList.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.originalFilename}</option>
              ))}
            </select>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRerun}
              disabled={pipelineRunning}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-60"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{pipelineRunning ? 'Analyzing…' : 'Re-run Analysis'}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Visual Pipeline */}
      <motion.div
        variants={item}
        className="p-6 bg-white border border-[#E8E9F1] rounded-2xl space-y-5"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E9F1]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#6556D9]" />
            <span className="text-sm font-bold text-[#17172F] font-heading">Execution Pipeline</span>
          </div>
          <span className="text-[10px] font-mono text-[#777A91] bg-[#F7F8FC] px-2.5 py-1 rounded-lg border border-[#E8E9F1]">
            Model: TraceHer-DeBERTa-Safety-v2.3
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#F7F8FC] h-1.5 rounded-full overflow-hidden border border-[#E8E9F1]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#6556D9] to-[#8877EC]"
            animate={{ width: `${(activePipelineStep / 6) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map(stage => {
            const isDone = stage.num <= activePipelineStep;
            const isCurrent = stage.num === activePipelineStep && pipelineRunning;
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.num}
                animate={{
                  borderColor: isCurrent ? '#6556D9' : isDone ? 'rgba(35,155,117,0.25)' : '#E8E9F1',
                  backgroundColor: isCurrent ? '#F0EDFF' : isDone ? 'rgba(232,246,240,0.4)' : '#F7F8FC',
                }}
                transition={{ duration: 0.3 }}
                className="p-3.5 rounded-xl border text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isCurrent ? 'bg-[#6556D9] text-white' :
                    isDone ? 'bg-[#E8F6F0] text-[#239B75]' :
                    'bg-[#E8E9F1] text-[#B6BACB]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {isDone && !isCurrent ? (
                    <CheckCircle2 className="w-4 h-4 text-[#239B75]" />
                  ) : isCurrent ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6556D9] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6556D9]" />
                    </span>
                  ) : null}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#777A91]">Stage {stage.num}</div>
                <div className={`text-xs font-semibold mt-0.5 leading-snug ${
                  isCurrent ? 'text-[#6556D9]' : isDone ? 'text-[#20213A]' : 'text-[#777A91]'
                }`}>{stage.name}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Legal Disclaimer */}
      <motion.div
        variants={item}
        className="p-4 bg-[#FFF8EB] border border-[#E8A33D]/25 rounded-2xl flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-[#E8A33D] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#20213A]">
          <span className="font-bold">Explainability & Legal Boundary Notice</span>
          <p className="text-[#777A91] leading-relaxed">
            Confidence scores measure algorithmic pattern alignment with our documented safety typologies. Model scores <strong>do not</strong> represent the judicial probability that a crime occurred. All results require human confirmation.
          </p>
        </div>
      </motion.div>

      {/* Classification Results */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#17172F] font-heading">
            Detected Harassment Categories ({evidence?.analyses?.length || 0})
          </h3>
          {evidence?.analyses?.length > 0 && (
            <span className="text-[11px] text-[#777A91]">Click to review each classification</span>
          )}
        </div>

        {(!evidence?.analyses || evidence.analyses.length === 0) ? (
          <div className="bg-white border border-[#E8E9F1] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F8FC] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#B6BACB]" />
            </div>
            <h3 className="text-sm font-bold text-[#17172F] mb-1">No analyses available yet</h3>
            <p className="text-xs text-[#777A91] max-w-xs mx-auto">
              Select an evidence file above and click "Re-run Analysis" to begin AI classification.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {evidence.analyses.map((ana, i) => (
              <motion.div
                key={ana.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 bg-white border border-[#E8E9F1] rounded-2xl space-y-5 hover:border-[#6556D9]/20 hover:shadow-sm transition-all"
              >
                {/* Top: Category + Confidence */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#F0EDFF] text-[#6556D9] border border-[#6556D9]/20">
                      {ana.category}
                    </span>
                    <span className="text-xs text-[#777A91]">
                      Status:{' '}
                      <strong className={`uppercase text-[10px] px-2 py-0.5 rounded-lg border ${
                        ana.reviewedStatus === 'confirmed' ? 'bg-[#E8F6F0] text-[#239B75] border-[#239B75]/20' :
                        ana.reviewedStatus === 'changed' ? 'bg-[#F0EDFF] text-[#6556D9] border-[#6556D9]/20' :
                        ana.reviewedStatus === 'irrelevant' ? 'bg-[#F7F8FC] text-[#777A91] border-[#E8E9F1]' :
                        'bg-[#FFF8EB] text-[#E8A33D] border-[#E8A33D]/20'
                      }`}>
                        {ana.reviewedStatus}
                      </strong>
                    </span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#777A91] font-medium">Confidence:</span>
                    <div className="w-32 bg-[#F7F8FC] h-2.5 rounded-full overflow-hidden border border-[#E8E9F1]">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${ana.confidence * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                          background: ana.confidence > 0.8 ? 'linear-gradient(to right, #6556D9, #8877EC)' :
                                     ana.confidence > 0.5 ? '#E8A33D' : '#D95F6C'
                        }}
                      />
                    </div>
                    <span className="text-sm font-black text-[#17172F] font-heading min-w-[40px] text-right">
                      {Math.round(ana.confidence * 100)}%
                    </span>
                  </div>
                </div>

                {/* Supporting Excerpt */}
                <div className="p-4 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#777A91]">
                    Supporting Excerpt from Evidence
                  </span>
                  <p className="font-mono text-xs text-[#17172F] italic leading-relaxed">"{ana.supportingText}"</p>
                </div>

                {/* Rationale + Recommended Step */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-white border border-[#E8E9F1] rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-[#6556D9]" />
                      <span className="font-bold text-[#17172F]">Algorithmic Rationale</span>
                    </div>
                    <p className="text-[#777A91] leading-relaxed">{ana.explanation}</p>
                  </div>
                  <div className="p-4 bg-[#E8F6F0]/40 border border-[#239B75]/20 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#239B75]" />
                      <span className="font-bold text-[#239B75]">Recommended Safety Step</span>
                    </div>
                    <p className="text-[#20213A] leading-relaxed">{ana.suggestedStep}</p>
                  </div>
                </div>

                {/* Human Review Actions */}
                <div className="pt-4 border-t border-[#E8E9F1] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#777A91]">Human Verification:</span>
                  <div className="flex items-center gap-2">
                    {[
                      { status: 'confirmed', icon: ThumbsUp, label: 'Confirm', activeBg: 'bg-[#239B75] text-white', idleBg: 'bg-[#E8F6F0] text-[#239B75] hover:bg-[#D4EFE4]' },
                      { status: 'changed', icon: RotateCcw, label: 'Change', activeBg: 'bg-[#6556D9] text-white', idleBg: 'bg-[#F0EDFF] text-[#6556D9] hover:bg-[#E2DCFF]' },
                      { status: 'irrelevant', icon: XCircle, label: 'Irrelevant', activeBg: 'bg-[#777A91] text-white', idleBg: 'bg-[#F7F8FC] text-[#777A91] hover:bg-[#E8E9F1]' },
                    ].map(btn => {
                      const BtnIcon = btn.icon;
                      const isActive = ana.reviewedStatus === btn.status;
                      return (
                        <motion.button
                          key={btn.status}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => updateAnalysisReview(ana.id, btn.status as any)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isActive ? btn.activeBg : btn.idleBg
                          }`}
                        >
                          <BtnIcon className="w-3.5 h-3.5" />
                          <span>{btn.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
