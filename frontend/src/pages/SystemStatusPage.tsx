import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Server,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Activity,
  Layers,
  Database
} from 'lucide-react';

export const SystemStatusPage: React.FC = () => {
  const { incidents, evidenceList, reports } = useApp();

  const services = [
    { name: 'FastAPI REST Core Engine', version: 'v2.1.0', status: 'Operational', latency: '4ms' },
    { name: 'DeBERTa Safety NLP Pipeline', version: 'v2.3 (Multi-Label)', status: 'Operational', latency: '32ms' },
    { name: 'OCR & Regex Ingestion Engine', version: 'v1.4.2', status: 'Operational', latency: '18ms' },
    { name: 'Privacy Guardian Non-Destructive Redaction', version: 'v2.0 (Dual-Pane)', status: 'Operational', latency: '12ms' },
    { name: 'NetworkX Relationship Intelligence', version: 'v3.7', status: 'Operational', latency: '8ms' },
    { name: 'ReportLab PDF Dossier Compiler', version: 'v5.1.0', status: 'Operational', latency: '45ms' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-16">
      <div className="pb-2 border-b border-[#E8E9F1]">
        <h1 className="text-2xl font-bold text-[#17172F] font-heading">System Information & AI Architecture</h1>
        <p className="text-xs text-[#777A91]">
          Operational health, model versions, and cryptographic custody subsystem metrics.
        </p>
      </div>

      {/* Global Health Overview */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F6F0] text-[#239B75] flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#17172F]">All Intelligence Subsystems Operational</div>
            <div className="text-xs text-[#777A91]">No degradations reported across analysis or report compilation pipelines</div>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F6F0] text-[#239B75]">
          100% HEALTH
        </span>
      </div>

      {/* Services Table */}
      <div className="card-soft bg-white border border-[#E8E9F1] overflow-hidden">
        <div className="p-4 border-b border-[#E8E9F1] text-xs font-bold text-[#17172F]">
          Engine Architecture & Processing Pipelines
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F7F8FC] border-b border-[#E8E9F1] text-[11px] font-bold text-[#777A91] uppercase">
            <tr>
              <th className="py-3 px-4">Component</th>
              <th className="py-3 px-4">Version</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Avg Response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E9F1]">
            {services.map((s, i) => (
              <tr key={i} className="hover:bg-[#F7F8FC]">
                <td className="py-3 px-4 font-semibold text-[#17172F]">{s.name}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-[#777A91]">{s.version}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6F0] text-[#239B75] flex items-center gap-1 w-fit">
                    <CheckCircle2 className="w-3 h-3" /> {s.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-mono text-[#777A91]">{s.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Storage & Custody Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-soft p-4 bg-white border border-[#E8E9F1] space-y-1">
          <div className="text-xs text-[#777A91]">Active Incidents</div>
          <div className="text-xl font-bold text-[#17172F]">{incidents.length} Records</div>
        </div>
        <div className="card-soft p-4 bg-white border border-[#E8E9F1] space-y-1">
          <div className="text-xs text-[#777A91]">Cryptographic Digests</div>
          <div className="text-xl font-bold text-[#6556D9]">{evidenceList.length} SHA-256 Hashes</div>
        </div>
        <div className="card-soft p-4 bg-white border border-[#E8E9F1] space-y-1">
          <div className="text-xs text-[#777A91]">Generated PDF Dossiers</div>
          <div className="text-xl font-bold text-[#239B75]">{reports.length} Artifacts</div>
        </div>
      </div>
    </div>
  );
};
