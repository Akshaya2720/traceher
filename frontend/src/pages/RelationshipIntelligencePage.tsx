import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GitGraph,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  ShieldAlert,
  User,
  FolderOpen,
  AlertTriangle,
  MessageSquare,
  ChevronRight,
  Filter,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

interface NodeItem {
  id: string;
  label: string;
  type: 'incident' | 'evidence' | 'account' | 'message';
  x: number; // percentage
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

export const RelationshipIntelligencePage: React.FC = () => {
  const { incidents, evidenceList, selectedIncidentId, setSelectedIncidentId } = useApp();
  const incident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  const linkedEvidence = evidenceList.filter(e => incident?.evidenceIds?.includes(e.id) || e.incidentId === incident?.id);

  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-inc');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [filterRelation, setFilterRelation] = useState<string>('ALL');

  // Build dynamic nodes based on the currently selected incident
  const nodes: NodeItem[] = [
    {
      id: 'node-inc',
      label: incident?.referenceNumber || 'TRC-2026-INCIDENT',
      type: 'incident',
      x: 50,
      y: 45,
      details: {
        title: incident?.title || 'Active Incident Case',
        category: incident?.category || 'Harassment Case',
        date: incident?.incidentDate || '2026-11-20',
        role: 'Central Incident Entity'
      }
    }
  ];

  const edges: EdgeItem[] = [];

  // Add linked evidence nodes
  if (linkedEvidence.length > 0) {
    linkedEvidence.forEach((ev, idx) => {
      const evNodeId = `node-ev-${ev.id}`;
      const angle = (idx / Math.max(1, linkedEvidence.length)) * Math.PI;
      const xPos = 25;
      const yPos = 30 + idx * 30;

      nodes.push({
        id: evNodeId,
        label: ev.originalFilename.length > 18 ? ev.originalFilename.substring(0, 16) + '...' : ev.originalFilename,
        type: 'evidence',
        x: xPos,
        y: Math.min(80, yPos),
        details: {
          filename: ev.originalFilename,
          sha256: ev.sha256Hash,
          fileType: ev.fileType,
          status: 'SHA-256 Locked & Read-Only'
        }
      });

      edges.push({
        id: `edge-ev-${ev.id}`,
        from: evNodeId,
        to: 'node-inc',
        label: 'Associated With',
        relationType: 'associated_with',
        confidence: 1.0
      });
    });
  } else {
    // Default fallback evidence node
    nodes.push({
      id: 'node-ev-default',
      label: 'threat_dm_screenshot.png',
      type: 'evidence',
      x: 25,
      y: 35,
      details: {
        filename: 'threat_dm_screenshot.png',
        sha256: 'a4f89d31c2e1b827e85c9a17382bc194df62881b490f23ce0824b238d9e115ca',
        status: 'SHA-256 Locked'
      }
    });
    edges.push({
      id: 'edge-ev-def',
      from: 'node-ev-default',
      to: 'node-inc',
      label: 'Associated With',
      relationType: 'associated_with',
      confidence: 1.0
    });
  }

  // Account & Contact nodes
  nodes.push(
    {
      id: 'node-acc1',
      label: '@shadow_stalker99',
      type: 'account',
      x: 75,
      y: 30,
      details: {
        platform: 'Direct Messaging Platform',
        role: 'Suspected Sender Handle',
        hypothesis: 'AI-suggested correlation (Unverified hypothesis - human review required)'
      }
    },
    {
      id: 'node-acc2',
      label: '+91 98765 43210',
      type: 'account',
      x: 78,
      y: 65,
      details: {
        platform: 'Cellular / Burner Line',
        role: 'Associated Contact Reference',
        hypothesis: 'Appears in DM text log as callback demand'
      }
    }
  );

  edges.push(
    { id: 'e-acc1', from: 'node-acc1', to: nodes[1]?.id || 'node-inc', label: 'Appears In', relationType: 'appears_in', confidence: 0.96 },
    { id: 'e-acc2', from: 'node-acc1', to: 'node-acc2', label: 'Repeated Contact', relationType: 'repeated_contact', confidence: 0.88 }
  );

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'incident': return { bg: 'bg-[#6556D9]', text: 'text-white' };
      case 'evidence': return { bg: 'bg-[#3B82F6]', text: 'text-white' };
      case 'account': return { bg: 'bg-[#E8A33D]', text: 'text-white' };
      default: return { bg: 'bg-[#239B75]', text: 'text-white' };
    }
  };

  return (
    <div className="space-y-6 text-left pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#17172F] font-heading">Relationship Intelligence (ER Graph)</h1>
          <p className="text-xs text-[#777A91]">
            Interactive entity network mapping handles, phone references, and message exhibits across incidents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={incident?.id}
            onChange={e => setSelectedIncidentId(e.target.value)}
            className="px-3.5 py-2 bg-white border border-[#E8E9F1] rounded-xl text-xs font-semibold text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
          >
            {incidents.map(inc => (
              <option key={inc.id} value={inc.id}>
                {inc.referenceNumber} - {inc.title.substring(0, 24)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Critical Legal Disclaimer */}
      <div className="p-4 bg-white border border-[#E8E9F1] rounded-2xl flex items-start gap-3 shadow-xs">
        <Info className="w-5 h-5 text-[#6556D9] shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs text-[#20213A]">
          <span className="font-bold">Investigative Hypothesis Disclaimer</span>
          <p className="text-[#777A91] leading-relaxed">
            All AI-suggested linkages and relationship edges represent unverified investigative hypotheses. <strong>Never infer a person's legal identity or guilt</strong> from this relationship graph without official forensic law enforcement verification.
          </p>
        </div>
      </div>

      {/* Interactive Graph Canvas & Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Canvas Area (8 cols) */}
        <div className="lg:col-span-8 card-soft bg-white border border-[#E8E9F1] p-6 flex flex-col justify-between min-h-[440px] relative overflow-hidden">
          {/* Controls Bar */}
          <div className="flex items-center justify-between z-20">
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#777A91] text-[11px]">Filter:</span>
              {['ALL', 'associated_with', 'appears_in', 'repeated_contact'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterRelation(f)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                    filterRelation === f
                      ? 'bg-[#6556D9] text-white'
                      : 'bg-[#F7F8FC] text-[#777A91] hover:text-[#20213A]'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-[#F7F8FC] p-1 rounded-xl border border-[#E8E9F1]">
              <button
                onClick={() => setZoomLevel(Math.max(60, zoomLevel - 15))}
                className="p-1 text-[#777A91] hover:text-[#20213A] cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono px-1 font-bold text-[#20213A]">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                className="p-1 text-[#777A91] hover:text-[#20213A] cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="p-1 text-[#777A91] hover:text-[#20213A] cursor-pointer"
                title="Reset Layout"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive SVG / Nodes Surface */}
          <div
            className="flex-1 w-full relative my-4 rounded-2xl bg-[#F7F8FC] border border-[#E8E9F1] overflow-hidden min-h-[300px]"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
          >
            {/* SVG Lines for Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {edges
                .filter(e => filterRelation === 'ALL' || e.relationType === filterRelation)
                .map(e => {
                  const fromNode = nodes.find(n => n.id === e.from);
                  const toNode = nodes.find(n => n.id === e.to);
                  if (!fromNode || !toNode) return null;
                  return (
                    <g key={e.id}>
                      <line
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        stroke={e.relationType === 'repeated_contact' ? '#D95F6C' : '#6556D9'}
                        strokeWidth={e.relationType === 'repeated_contact' ? '2.5' : '1.5'}
                        strokeDasharray={e.relationType === 'repeated_contact' ? '4 4' : 'none'}
                        opacity="0.6"
                      />
                    </g>
                  );
                })}
            </svg>

            {/* Render Nodes */}
            {nodes.map(n => {
              const colors = getNodeColor(n.type);
              const isSelected = selectedNodeId === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNodeId(n.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl cursor-pointer transition-all shadow-md select-none ${colors.bg} ${colors.text} ${
                    isSelected ? 'ring-4 ring-[#6556D9]/40 scale-105 z-30' : 'hover:scale-105 z-10'
                  }`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="flex items-center gap-2">
                    {n.type === 'incident' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {n.type === 'evidence' && <FolderOpen className="w-3.5 h-3.5" />}
                    {n.type === 'account' && <User className="w-3.5 h-3.5" />}
                    <span className="text-xs font-bold whitespace-nowrap">{n.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[11px] text-[#777A91] z-20">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6556D9]" />
              <span>Incident Case</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span>Evidence Exhibit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8A33D]" />
              <span>Suspected Handle / Contact</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#D95F6C] border-dashed" />
              <span>Repeated Contact Edge</span>
            </div>
          </div>
        </div>

        {/* Side Details Drawer (4 cols) */}
        <div className="lg:col-span-4 card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
          <div className="pb-3 border-b border-[#E8E9F1]">
            <span className="text-[10px] font-bold text-[#6556D9] uppercase tracking-wider">
              Selected Entity Inspector
            </span>
            <h3 className="text-base font-bold text-[#17172F] mt-1 break-all">
              {selectedNode?.label || 'Entity Details'}
            </h3>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F7F8FC] text-[#777A91] border border-[#E8E9F1]">
              Type: {selectedNode?.type || 'entity'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {selectedNode && Object.entries(selectedNode.details).map(([key, val]) => (
              <div key={key} className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] space-y-0.5">
                <span className="text-[10px] font-bold uppercase text-[#777A91]">{key}</span>
                <p className="text-xs text-[#20213A] font-medium leading-relaxed">{String(val)}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="p-3 bg-[#F0EDFF]/50 border border-[#6556D9]/20 rounded-xl text-[11px] text-[#6556D9] space-y-1">
              <span className="font-bold">Investigative Note</span>
              <p className="text-[#777A91] leading-relaxed">
                Clicking other nodes or edges re-focuses relationship pathways. Correlations can be added directly to your official PDF evidence dossier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
