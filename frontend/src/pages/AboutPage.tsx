import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Users, Target, Lock, Award, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#6556D9] uppercase tracking-wider">MISSION & VALUES</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] tracking-tight font-heading">
          About TRACEHER
        </h1>
        <p className="text-sm text-[#777A91] leading-relaxed">
          Developed for the InnovateHER Challenge to address the widespread crisis of fragmented, stressful digital harassment evidence.
        </p>
      </div>

      {/* The Problem */}
      <div className="card-soft p-8 space-y-4 bg-white border border-[#E8E9F1]">
        <h2 className="text-xl font-bold text-[#17172F] font-heading">The Problem We Are Solving</h2>
        <p className="text-sm text-[#20213A] leading-relaxed">
          When women or young girls experience online harassment, cyberstalking, or extortion, their evidence is often scattered across multiple platforms: chat screenshots, temporary story replies, anonymous burner accounts, and call records.
        </p>
        <p className="text-sm text-[#777A91] leading-relaxed">
          Victims are frequently asked by authorities or campus committees to "provide proof." Attempting to manually scroll through hundreds of traumatic messages while frightened leads to disorientation, critical evidence being accidentally deleted, or victims capitulating to blackmail.
        </p>
      </div>

      {/* Our Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-soft p-6 space-y-3 bg-white border border-[#E8E9F1]">
          <div className="w-10 h-10 rounded-xl bg-[#F0EDFF] text-[#6556D9] flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17172F]">Our Purpose</h3>
          <p className="text-xs text-[#777A91] leading-relaxed">
            TRACEHER converts chaotic, traumatic screenshots into structured, cryptographically validated incident intelligence dossiers. It gives users immediate clarity on what happened and where to seek verified institutional and legal support.
          </p>
        </div>

        <div className="card-soft p-6 space-y-3 bg-white border border-[#E8E9F1]">
          <div className="w-10 h-10 rounded-xl bg-[#E8F6F0] text-[#239B75] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#17172F]">Responsible AI Boundaries</h3>
          <p className="text-xs text-[#777A91] leading-relaxed">
            We do not make inflated claims about replacing police investigations or guaranteeing judicial convictions. AI models serve solely as assistive pattern-recognition and redaction utilities, always subject to human corroboration and user ownership.
          </p>
        </div>
      </div>

      {/* InnovateHER Submission context - Clean White & Purple */}
      <div className="p-8 rounded-3xl bg-white border-2 border-[#E8E9F1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#6556D9]">
            <Award className="w-4 h-4" />
            <span>InnovateHER Challenge</span>
          </div>
          <h4 className="text-base font-bold text-[#17172F]">Safety & Accessibility Primary Track</h4>
          <p className="text-xs text-[#777A91] max-w-lg leading-relaxed">
            Engineered with WCAG 2.2 AA accessibility principles, multilingual localization (English, Malayalam, Hindi), and calm, formal, non-triggering UI aesthetics.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('demo-workspace')}
          className="px-6 py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shrink-0 transition-colors cursor-pointer shadow-xs"
        >
          Explore Fictional Demo Cases
        </button>
      </div>
    </div>
  );
};
