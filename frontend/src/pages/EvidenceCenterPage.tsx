import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  FolderOpen,
  Search,
  Filter,
  Eye,
  Sparkles,
  Download,
  Trash2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Lock,
  ArrowUpDown
} from 'lucide-react';
import { Evidence } from '../types';

export const EvidenceCenterPage: React.FC = () => {
  const {
    evidenceList,
    incidents,
    uploadEvidence,
    deleteEvidence,
    setCurrentPage,
    setSelectedEvidenceId
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedIncidentForUpload, setSelectedIncidentForUpload] = useState(incidents[0]?.id || '');
  const [notes, setNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = async (files: File[]) => {
    setUploading(true);
    setUploadProgress(20);
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      setUploadProgress(40 + (i / files.length) * 50);
      await uploadEvidence(f, selectedIncidentForUpload, notes);
    }
    setUploadProgress(100);
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 600);
  };

  // Filter & Search
  const filteredEvidence = evidenceList.filter(ev => {
    const matchesSearch =
      ev.originalFilename.toLowerCase().includes(search.toLowerCase()) ||
      ev.extractedText.toLowerCase().includes(search.toLowerCase()) ||
      ev.sha256Hash.toLowerCase().includes(search.toLowerCase());
    const matchesType =
      filterType === 'ALL' ||
      (filterType === 'IMAGE' && ev.fileType.includes('image')) ||
      (filterType === 'PDF' && ev.fileType.includes('pdf'));
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#17172F] font-heading">Evidence Center</h1>
          <p className="text-xs text-[#777A91]">
            Upload and organize the digital information you want to review. Every file is cryptographically hashed with SHA-256.
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Evidence</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`card-soft p-8 text-center cursor-pointer border-2 border-dashed transition-all relative overflow-hidden ${
          dragActive
            ? 'border-[#6556D9] bg-[#F0EDFF]/50 scale-[1.01]'
            : 'border-[#E8E9F1] hover:border-[#6556D9]/50 bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf,.txt"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#F0EDFF] text-[#6556D9] mx-auto flex items-center justify-center">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#17172F]">
              Drag and drop screenshots, PDFs, or message files here
            </h3>
            <p className="text-xs text-[#777A91] mt-0.5">
              Supports PNG, JPG, JPEG, PDF, and TXT • Multiple files allowed
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F6F0] text-[11px] font-semibold text-[#239B75]">
            <Lock className="w-3.5 h-3.5" />
            <span>Files are SHA-256 hashed and read-only preserved</span>
          </div>
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 space-y-3 z-20">
            <div className="w-8 h-8 border-3 border-[#6556D9] border-t-transparent rounded-full animate-spin" />
            <div className="text-xs font-bold text-[#17172F]">Hashing & Extracting Evidence...</div>
            <div className="w-48 bg-[#E8E9F1] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6556D9] h-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="card-soft p-4 bg-white border border-[#E8E9F1] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#777A91] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by filename, OCR text, or hash..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#777A91]">Filter:</span>
          {['ALL', 'IMAGE', 'PDF'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === t
                  ? 'bg-[#6556D9] text-white'
                  : 'bg-[#F7F8FC] text-[#777A91] hover:text-[#20213A]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Table */}
      <div className="card-soft bg-white border border-[#E8E9F1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FC] border-b border-[#E8E9F1] text-[11px] font-bold text-[#777A91] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Exhibit ID</th>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">SHA-256 Fingerprint</th>
                <th className="py-3 px-4">Associated Incident</th>
                <th className="py-3 px-4">Uploaded</th>
                <th className="py-3 px-4">AI Threat Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E9F1]">
              {filteredEvidence.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-[#777A91]">
                    No evidence files found. Drag files above to begin.
                  </td>
                </tr>
              ) : (
                filteredEvidence.map(ev => {
                  const associatedInc = incidents.find(i => i.id === ev.incidentId);
                  return (
                    <tr key={ev.id} className="hover:bg-[#F7F8FC]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-[#6556D9]">
                        {ev.id.substring(0, 10)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#17172F]">
                        {ev.originalFilename}
                        <div className="text-[10px] text-[#777A91] font-normal">
                          {roundKb(ev.fileSize)} KB • {ev.fileType}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[10px] text-[#777A91]" title={ev.sha256Hash}>
                        {ev.sha256Hash.substring(0, 16)}...
                      </td>
                      <td className="py-3 px-4">
                        {associatedInc ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F0EDFF] text-[#6556D9]">
                            {associatedInc.referenceNumber}
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#777A91]">Unlinked</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#777A91] whitespace-nowrap">
                        {ev.uploadedAt.substring(0, 10)}
                      </td>
                      <td className="py-3 px-4">
                        {ev.analyses && ev.analyses.length > 0 ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6F0] text-[#239B75]">
                            {ev.analyses[0].category} ({Math.round(ev.analyses[0].confidence * 100)}%)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FFF8EB] text-[#E8A33D]">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedEvidenceId(ev.id);
                              setCurrentPage('evidence-details');
                            }}
                            className="p-1.5 text-[#777A91] hover:text-[#6556D9] hover:bg-[#F0EDFF] rounded-lg transition-colors"
                            title="Inspect Details & OCR"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEvidenceId(ev.id);
                              setCurrentPage('ai-analysis');
                            }}
                            className="p-1.5 text-[#777A91] hover:text-[#3B82F6] hover:bg-[#EAF1FF] rounded-lg transition-colors"
                            title="Run AI Harassment Analysis"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteEvidence(ev.id)}
                            className="p-1.5 text-[#777A91] hover:text-[#D95F6C] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                            title="Delete file"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function roundKb(bytes: number): string {
  return (bytes / 1024).toFixed(1);
}
