import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
  ChevronRight
} from 'lucide-react';
import { AIAnalysis } from '../types';

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
    { num: 1, name: 'Evidence validation', status: 'completed' },
    { num: 2, name: 'Text extraction (OCR)', status: 'completed' },
    { num: 3, name: 'Language & semantics', status: 'completed' },
    { num: 4, name: 'Category classification', status: 'completed' },
    { num: 5, name: 'Pattern analysis', status: 'completed' },
    { num: 6, name: 'Results preparation', status: 'completed' }
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
    }, 400);
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Page Header */}
      <div className="card-soft p-6 sm:p-8 bg-gradient-to-r from-white via-white to-[#F0EDFF]/30 border border-[#E8E9F1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6556D9] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#6556D9] uppercase tracking-wider">
              Safety Intelligence Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17172F] tracking-tight font-heading">
            AI Evidence Analysis
          </h1>
          <p className="text-xs sm:text-sm text-[#777A91]">
            Multi-label digital safety classification with transparent confidence and behavioral explainability.
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
            onClick={handleRerun}
            disabled={pipelineRunning}
            className="flex items-center gap-2 px-4 py-2 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{pipelineRunning ? 'Analyzing...' : 'Re-run Analysis'}</span>
          </button>
        </div>
      </div>

      {/* Visual Pipeline Progress */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E9F1]">
          <span className="text-xs font-bold text-[#17172F]">Execution Pipeline</span>
          <span className="text-[10px] font-mono text-[#777A91]">
            Model: TraceHer-DeBERTa-Safety-v2.3
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map(stage => {
            const isDone = stage.num <= activePipelineStep;
            const isCurrent = stage.num === activePipelineStep && pipelineRunning;
            return (
              <div
                key={stage.num}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'border-[#6556D9] bg-[#F0EDFF] text-[#6556D9]'
                    : isDone
                    ? 'border-[#239B75]/30 bg-[#E8F6F0]/50 text-[#20213A]'
                    : 'border-[#E8E9F1] bg-[#F7F8FC] text-[#777A91]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span>STAGE {stage.num}</span>
                  {isDone && !isCurrent ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#239B75]" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-[#6556D9] animate-ping" />
                  ) : null}
                </div>
                <div className="text-xs font-semibold mt-1 leading-snug">{stage.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calibrated Confidence Disclaimer Box */}
      <div className="p-4 bg-[#FFF8EB] border border-[#E8A33D]/30 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-[#E8A33D] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#20213A]">
          <span className="font-bold">Explainability & Legal Boundary Notice</span>
          <p className="text-[#777A91] leading-relaxed">
            Confidence scores measure algorithmic pattern alignment with our documented safety typologies. Model scores <strong>do not</strong> represent the judicial probability that a crime occurred. All results require human confirmation.
          </p>
        </div>
      </div>

      {/* Classification Results & Human Review Controls */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#17172F] font-heading">
          Detected Harassment Categories ({evidence?.analyses?.length || 0})
        </h3>

        {evidence?.analyses?.map(ana => (
          <div
            key={ana.id}
            className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4 card-soft-hover"
          >
            {/* Top row: Category & Confidence Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-[#F0EDFF] text-[#6556D9] border border-[#6556D9]/20">
                  {ana.category}
                </span>
                <span className="text-xs text-[#777A91]">
                  Verified Status:{' '}
                  <strong className="text-[#20213A] uppercase text-[10px] bg-[#F7F8FC] px-2 py-0.5 rounded border border-[#E8E9F1]">
                    {ana.reviewedStatus}
                  </strong>
                </span>
              </div>

              {/* Confidence Indicator */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#777A91]">Confidence:</span>
                <div className="w-28 bg-[#E8E9F1] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#6556D9] h-full rounded-full"
                    style={{ width: `${ana.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#17172F]">
                  {Math.round(ana.confidence * 100)}%
                </span>
              </div>
            </div>

            {/* Supporting Text Snippet */}
            <div className="p-3.5 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#777A91]">
                Extracted Supporting Excerpt
              </span>
              <p className="font-mono text-xs text-[#17172F] italic">"{ana.supportingText}"</p>
            </div>

            {/* Explanation & Suggested Step */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white border border-[#E8E9F1] rounded-xl space-y-1">
                <span className="font-bold text-[#17172F]">Algorithmic Rationale</span>
                <p className="text-[#777A91] leading-relaxed">{ana.explanation}</p>
              </div>
              <div className="p-3.5 bg-[#E8F6F0]/40 border border-[#239B75]/20 rounded-xl space-y-1">
                <span className="font-bold text-[#239B75]">Recommended Safety Next Step</span>
                <p className="text-[#20213A] leading-relaxed">{ana.suggestedStep}</p>
              </div>
            </div>

            {/* Human in the loop review actions */}
            <div className="pt-3 border-t border-[#E8E9F1] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#777A91]">Human Verification:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateAnalysisReview(ana.id, 'confirmed')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    ana.reviewedStatus === 'confirmed'
                      ? 'bg-[#239B75] text-white'
                      : 'bg-[#E8F6F0] text-[#239B75] hover:bg-[#D4EFE4]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Confirm Category</span>
                </button>

                <button
                  onClick={() => updateAnalysisReview(ana.id, 'changed')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    ana.reviewedStatus === 'changed'
                      ? 'bg-[#6556D9] text-white'
                      : 'bg-[#F0EDFF] text-[#6556D9] hover:bg-[#E2DCFF]'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Change Category</span>
                </button>

                <button
                  onClick={() => updateAnalysisReview(ana.id, 'irrelevant')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    ana.reviewedStatus === 'irrelevant'
                      ? 'bg-[#777A91] text-white'
                      : 'bg-[#F7F8FC] text-[#777A91] hover:bg-[#E8E9F1]'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Mark Irrelevant</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
