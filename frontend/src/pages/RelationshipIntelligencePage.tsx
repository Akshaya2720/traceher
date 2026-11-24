import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import {
  GitGraph,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  User,
  FolderOpen,
  AlertTriangle,
  Layers,
  ChevronRight,
  Search,
  Eye
} from 'lucide-react';

interface NodeItem {
  id: string;
  label: string;
  type: 'incident' | 'evidence' | 'account' | 'message';
  x: number;
  y: number;
  details: Record<string, any>;
}

interface EdgeItem {
  id: string;
  from: string;
  to: string;
  label: string;
  relationType: 'associated_with' | 'appears_in' | 'repeated_contact' | 'user_confirmed';
  confidence: number;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1] as [number, number, number, number], duration: 0.4 } }
};

export const RelationshipIntelligencePage: React.FC = () => {
  const { incidents, evidenceList, selectedIncidentId, setSelectedIncidentId } = useApp();
  const incident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  const linkedEvidence = evidenceList.filter(e => incident?.evidenceIds?.includes(e.id) || e.incidentId === incident?.id);

  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-inc');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [filterRelation, setFilterRelation] = useState<string>('ALL');

  // Build dynamic nodes
  const nodes: NodeItem[] = [
    {
      id: 'node-inc',
      label: incident?.referenceNumber || 'TRC-2026-INCIDENT',
      type: 'incident',
      x: 50, y: 45,
      details: {
        Title: incident?.title || 'Active Incident Case',
        Category: incident?.category || 'Harassment Case',
        Date: incident?.incidentDate || '2026-11-20',
        Role: 'Central Incident Entity'
      }
    }
  ];
  const edges: EdgeItem[] = [];

  if (linkedEvidence.length > 0) {
    linkedEvidence.forEach((ev, idx) => {
      const evNodeId = `node-ev-${ev.id}`;
      const yPos = 20 + (idx / Math.max(1, linkedEvidence.length - 1)) * 60;
      nodes.push({
        id: evNodeId,
        label: ev.originalFilename.length > 18 ? ev.originalFilename.substring(0, 16) + '…' : ev.originalFilename,
        type: 'evidence',
        x: 22, y: Math.min(80, yPos),
        details: {
          Filename: ev.originalFilename,
          'SHA-256': ev.sha256Hash,
          Type: ev.fileType,
          Status: 'SHA-256 Locked & Read-Only'
        }
      });
      edges.push({
        id: `edge-ev-${ev.id}`, from: evNodeId, to: 'node-inc',
        label: 'Associated With', relationType: 'associated_with', confidence: 1.0
      });
    });
  } else {
    nodes.push({
      id: 'node-ev-default',
      label: 'threat_dm_screenshot.png',
      type: 'evidence',
      x: 22, y: 35,
      details: { Filename: 'threat_dm_screenshot.png', 'SHA-256': 'a4f89d31c2e1…', Status: 'SHA-256 Locked' }
    });
    edges.push({ id: 'edge-ev-def', from: 'node-ev-default', to: 'node-inc', label: 'Associated With', relationType: 'associated_with', confidence: 1.0 });
  }

  nodes.push(
    {
      id: 'node-acc1', label: '@shadow_stalker99', type: 'account', x: 78, y: 28,
      details: { Platform: 'Direct Messaging Platform', Role: 'Suspected Sender Handle', Hypothesis: 'AI-suggested correlation (Unverified — human review required)' }
    },
    {
      id: 'node-acc2', label: '+91 98765 43210', type: 'account', x: 78, y: 65,
      details: { Platform: 'Cellular / Burner Line', Role: 'Associated Contact Reference', Hypothesis: 'Appears in DM text log as callback demand' }
    }
  );
  edges.push(
    { id: 'e-acc1', from: 'node-acc1', to: nodes[1]?.id || 'node-inc', label: 'Appears In', relationType: 'appears_in', confidence: 0.96 },
    { id: 'e-acc2', from: 'node-acc1', to: 'node-acc2', label: 'Repeated Contact', relationType: 'repeated_contact', confidence: 0.88 }
  );

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const nodeStyles: Record<string, { bg: string; border: string; text: string; icon: any }> = {
    incident: { bg: 'bg-[#6556D9]', border: 'border-[#6556D9]', text: 'text-white', icon: AlertTriangle },
    evidence: { bg: 'bg-[#3B82F6]', border: 'border-[#3B82F6]', text: 'text-white', icon: FolderOpen },
    account:  { bg: 'bg-[#E8A33D]', border: 'border-[#E8A33D]', text: 'text-white', icon: User },
    message:  { bg: 'bg-[#239B75]', border: 'border-[#239B75]', text: 'text-white', icon: Layers },
  };

  const filteredEdges = edges.filter(e => filterRelation === 'ALL' || e.relationType === filterRelation);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 text-left pb-16">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitGraph className="w-5 h-5 text-[#6556D9]" />
            <h1 className="text-2xl font-extrabold text-[#17172F] font-heading">Relationship Intelligence</h1>
          </div>
          <p className="text-sm text-[#777A91]">
            Interactive entity network mapping handles, contacts, and evidence across incidents.
          </p>
        </div>
        <select
          value={incident?.id}
          onChange={e => setSelectedIncidentId(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-[#E8E9F1] rounded-xl text-xs font-semibold text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
        >
          {incidents.map(inc => (
            <option key={inc.id} value={inc.id}>
              {inc.referenceNumber} — {inc.title.substring(0, 24)}…
            </option>
          ))}
        </select>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={item} className="p-4 bg-white border border-[#E8E9F1] rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-[#6556D9] shrink-0 mt-0.5" />
        <div className="text-xs text-[#20213A] space-y-0.5">
          <span className="font-bold">Investigative Hypothesis Disclaimer</span>
          <p className="text-[#777A91] leading-relaxed">
            All AI-suggested linkages represent unverified hypotheses. <strong>Never infer a person's identity or guilt</strong> without official forensic law enforcement verification.
          </p>
        </div>
      </motion.div>

      {/* Graph Canvas + Detail Drawer */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Canvas */}
        <div className="lg:col-span-8 bg-white border border-[#E8E9F1] rounded-2xl p-5 flex flex-col min-h-[460px] relative overflow-hidden">
          {/* Controls */}
          <div className="flex items-center justify-between z-20 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#777A91] font-medium mr-1">Filter:</span>
              {['ALL', 'associated_with', 'appears_in', 'repeated_contact'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterRelation(f)}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                    filterRelation === f
                      ? 'bg-[#6556D9] text-white shadow-sm'
                      : 'bg-[#F7F8FC] text-[#777A91] hover:text-[#20213A] hover:bg-[#F0EDFF]'
                  }`}
                >
                  {f === 'ALL' ? 'All' : f.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-[#F7F8FC] p-1 rounded-xl border border-[#E8E9F1]">
              <button onClick={() => setZoomLevel(Math.max(60, zoomLevel - 15))} className="p-1.5 text-[#777A91] hover:text-[#20213A] cursor-pointer rounded-lg hover:bg-white transition-colors" title="Zoom Out">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1.5 font-bold text-[#20213A] min-w-[36px] text-center">{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))} className="p-1.5 text-[#777A91] hover:text-[#20213A] cursor-pointer rounded-lg hover:bg-white transition-colors" title="Zoom In">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setZoomLevel(100)} className="p-1.5 text-[#777A91] hover:text-[#20213A] cursor-pointer rounded-lg hover:bg-white transition-colors" title="Reset">
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Graph Surface */}
          <div
            className="flex-1 w-full relative rounded-2xl bg-gradient-to-br from-[#F7F8FC] to-[#F0EDFF]/20 border border-[#E8E9F1] overflow-hidden min-h-[340px]"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
          >
            {/* Edges SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {filteredEdges.map(e => {
                const fromNode = nodes.find(n => n.id === e.from);
                const toNode = nodes.find(n => n.id === e.to);
                if (!fromNode || !toNode) return null;
                const isRepeated = e.relationType === 'repeated_contact';
                return (
                  <g key={e.id}>
                    <motion.line
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      x1={`${fromNode.x}%`} y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`} y2={`${toNode.y}%`}
                      stroke={isRepeated ? '#D95F6C' : '#6556D9'}
                      strokeWidth={isRepeated ? '2.5' : '1.5'}
                      strokeDasharray={isRepeated ? '6 4' : 'none'}
                    />
                    {/* Edge label */}
                    <text
                      x={`${(fromNode.x + toNode.x) / 2}%`}
                      y={`${(fromNode.y + toNode.y) / 2 - 2}%`}
                      textAnchor="middle"
                      className="text-[8px] font-semibold"
                      fill={isRepeated ? '#D95F6C' : '#8877EC'}
                    >
                      {e.label} ({Math.round(e.confidence * 100)}%)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((n, i) => {
              const style = nodeStyles[n.type] || nodeStyles.message;
              const NodeIcon = style.icon;
              const isSelected = selectedNodeId === n.id;
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ scale: 1.08 }}
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl cursor-pointer shadow-lg select-none transition-shadow ${style.bg} ${style.text} ${
                    isSelected ? 'ring-4 ring-[#6556D9]/30 scale-105 z-30 shadow-xl' : 'z-10 hover:shadow-xl'
                  }`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="flex items-center gap-2">
                    <NodeIcon className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold whitespace-nowrap">{n.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-3 text-[11px] text-[#777A91]">
            {[
              { color: '#6556D9', label: 'Incident Case' },
              { color: '#3B82F6', label: 'Evidence Exhibit' },
              { color: '#E8A33D', label: 'Handle / Contact' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                <span>{l.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-0 border-t-2 border-dashed border-[#D95F6C]" />
              <span>Repeated Contact</span>
            </div>
          </div>
        </div>

        {/* Detail Drawer */}
        <div className="lg:col-span-4 bg-white border border-[#E8E9F1] rounded-2xl p-6 space-y-4">
          <div className="pb-3 border-b border-[#E8E9F1]">
            <div className="flex items-center gap-1.5 mb-1">
              <Eye className="w-3.5 h-3.5 text-[#6556D9]" />
              <span className="text-[10px] font-bold text-[#6556D9] uppercase tracking-widest">Entity Inspector</span>
            </div>
            <h3 className="text-base font-bold text-[#17172F] break-all">{selectedNode?.label}</h3>
            <span className={`inline-block mt-1 text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg ${
              nodeStyles[selectedNode?.type || 'message'].bg
            } ${nodeStyles[selectedNode?.type || 'message'].text}`}>
              {selectedNode?.type}
            </span>
          </div>

          <div className="space-y-3">
            {selectedNode && Object.entries(selectedNode.details).map(([key, val]) => (
              <div key={key} className="p-3.5 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#777A91]">{key}</span>
                <p className="text-xs text-[#20213A] font-medium leading-relaxed break-all">{String(val)}</p>
              </div>
            ))}
          </div>

          {/* Connected Edges */}
          <div className="pt-3 border-t border-[#E8E9F1]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#777A91]">Connections</span>
            <div className="mt-2 space-y-1.5">
              {edges.filter(e => e.from === selectedNodeId || e.to === selectedNodeId).map(e => {
                const other = nodes.find(n => n.id === (e.from === selectedNodeId ? e.to : e.from));
                return (
                  <div
                    key={e.id}
                    onClick={() => other && setSelectedNodeId(other.id)}
                    className="flex items-center justify-between p-2.5 bg-white border border-[#E8E9F1] rounded-xl text-xs cursor-pointer hover:bg-[#F7F8FC] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: e.relationType === 'repeated_contact' ? '#D95F6C' : '#6556D9' }} />
                      <span className="font-medium text-[#20213A]">{other?.label}</span>
                    </div>
                    <span className="text-[10px] text-[#777A91]">{e.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 bg-[#F0EDFF]/50 border border-[#6556D9]/15 rounded-xl text-[11px] text-[#6556D9] space-y-1">
            <span className="font-bold">Investigative Note</span>
            <p className="text-[#777A91] leading-relaxed">
              Click nodes to explore relationship pathways. Correlations can be included in your official PDF evidence dossier.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
