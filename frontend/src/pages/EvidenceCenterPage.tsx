import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Upload,
  FolderOpen,
  Search,
  Eye,
  Sparkles,
  Trash2,
  FileText,
  CheckCircle2,
  Plus,
  Lock,
  ArrowUpDown,
  CloudUpload,
  ShieldCheck,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [uploadStage, setUploadStage] = useState('');
  const [selectedIncidentForUpload, setSelectedIncidentForUpload] = useState(incidents[0]?.id || '');
  const [notes, setNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) await processFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) await processFiles(Array.from(e.target.files));
  };

  const processFiles = async (files: File[]) => {
    setUploading(true);
    setUploadProgress(10);
    setUploadStage('Reading evidence files...');
    await delay(300);
    setUploadProgress(35);
    setUploadStage('Computing SHA-256 fingerprints...');
    for (let i = 0; i < files.length; i++) {
      setUploadProgress(40 + (i / files.length) * 40);
      setUploadStage(`Hashing ${files[i].name}...`);
      await uploadEvidence(files[i], selectedIncidentForUpload, notes);
    }
    setUploadProgress(90);
    setUploadStage('Extracting text from evidence...');
    await delay(400);
    setUploadProgress(100);
    setUploadStage('Evidence secured in vault ✓');
    await delay(700);
    setUploading(false);
    setUploadProgress(0);
    setUploadStage('');
  };

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

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

  function roundKb(bytes: number) { return (bytes / 1024).toFixed(1); }

  return (
    <div className="space-y-7 text-left pb-16">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-extrabold text-[#17172F] font-heading">Evidence Center</h1>
          <p className="text-sm text-[#777A91] mt-1">
            Upload and organize your evidence. Every file receives a SHA-256 cryptographic fingerprint for chain-of-custody integrity.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Evidence</span>
        </motion.button>
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.07 }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
          dragActive ? 'border-[#6556D9] bg-[#F0EDFF]/60 scale-[1.01]' : 'border-[#E8E9F1] bg-white hover:border-[#6556D9]/40'
        }`}
      >
        <input ref={fileInputRef} type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.txt" onChange={handleFileInput} className="hidden" />

        <div className="max-w-sm mx-auto space-y-4">
          <motion.div
            animate={dragActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            className="w-16 h-16 rounded-2xl bg-[#F0EDFF] text-[#6556D9] mx-auto flex items-center justify-center"
          >
            <CloudUpload className="w-8 h-8" />
          </motion.div>
          <div>
            <h3 className="text-sm font-bold text-[#17172F]">
              {dragActive ? 'Drop files here to secure them' : 'Drag & drop evidence files here'}
            </h3>
            <p className="text-xs text-[#777A91] mt-1">
              Supports PNG, JPG, JPEG, PDF, TXT • Multiple files at once
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-[#777A91]">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#239B75]" /> SHA-256 protected</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#6556D9]" /> Read-only preserved</span>
          </div>

          {/* Incident selector */}
          {incidents.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center" onClick={e => e.stopPropagation()}>
              <label className="text-xs text-[#777A91] font-medium shrink-0">Link to incident:</label>
              <select
                value={selectedIncidentForUpload}
                onChange={e => setSelectedIncidentForUpload(e.target.value)}
                className="px-3 py-1.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
              >
                {incidents.map(inc => (
                  <option key={inc.id} value={inc.id}>{inc.referenceNumber} — {inc.title.substring(0, 30)}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Upload Progress Overlay */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20"
            >
              <div className="w-10 h-10 border-[3px] border-[#6556D9] border-t-transparent rounded-full animate-spin" />
              <div className="space-y-2 text-center">
                <div className="text-sm font-bold text-[#17172F]">Securing Evidence…</div>
                <div className="text-xs text-[#777A91]">{uploadStage}</div>
              </div>
              <div className="w-56 bg-[#F7F8FC] h-2 rounded-full overflow-hidden border border-[#E8E9F1]">
                <motion.div
                  className="bg-gradient-to-r from-[#6556D9] to-[#8877EC] h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-xs font-mono font-bold text-[#6556D9]">{uploadProgress}%</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12 }}
        className="bg-white border border-[#E8E9F1] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#777A91] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by filename, text content, or hash..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] placeholder-[#B6BACB] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#777A91] font-medium">Type:</span>
          {['ALL', 'IMAGE', 'PDF'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterType === t ? 'bg-[#6556D9] text-white shadow-sm' : 'bg-[#F7F8FC] text-[#777A91] hover:text-[#20213A] hover:bg-[#F0EDFF]'
              }`}
            >
              {t}
            </button>
          ))}
          <span className="ml-3 text-xs text-[#777A91] font-medium border-l border-[#E8E9F1] pl-3">
            {filteredEvidence.length} file{filteredEvidence.length !== 1 ? 's' : ''}
          </span>
        </div>
      </motion.div>

      {/* Evidence Table / Cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.16 }}
        className="bg-white border border-[#E8E9F1] rounded-2xl overflow-hidden"
      >
        {filteredEvidence.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F8FC] flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-[#B6BACB]" />
            </div>
            <h3 className="text-sm font-bold text-[#17172F] mb-1">No evidence files found</h3>
            <p className="text-xs text-[#777A91] max-w-xs leading-relaxed">
              {search ? 'Try adjusting your search terms.' : 'Drag and drop evidence files above to begin building your case.'}
            </p>
            {!search && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer hover:bg-[#5244C4]"
              >
                <Upload className="w-4 h-4" />
                Upload First Evidence
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FC] border-b border-[#E8E9F1]">
                <tr>
                  {['Exhibit ID', 'File Name', 'SHA-256 Fingerprint', 'Linked Incident', 'Uploaded', 'AI Status', 'Actions'].map(h => (
                    <th key={h} className="py-3 px-4 text-[11px] font-bold text-[#777A91] uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E9F1]">
                <AnimatePresence>
                  {filteredEvidence.map((ev, i) => {
                    const associatedInc = incidents.find(inc => inc.id === ev.incidentId);
                    return (
                      <motion.tr
                        key={ev.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-[#F7F8FC]/60 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono font-bold text-[#6556D9]">
                          {ev.id.substring(0, 10)}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#17172F] flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#B6BACB] shrink-0" />
                            <span className="truncate max-w-[180px]">{ev.originalFilename}</span>
                          </div>
                          <div className="text-[10px] text-[#777A91] mt-0.5 pl-5">{roundKb(ev.fileSize)} KB • {ev.fileType}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-mono text-[10px] text-[#777A91] bg-[#F7F8FC] px-2 py-1 rounded-lg border border-[#E8E9F1]" title={ev.sha256Hash}>
                            {ev.sha256Hash.substring(0, 14)}…
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          {associatedInc ? (
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#F0EDFF] text-[#6556D9] border border-[#6556D9]/15">
                              {associatedInc.referenceNumber}
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#B6BACB]">Unlinked</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-[#777A91] whitespace-nowrap">
                          {ev.uploadedAt.substring(0, 10)}
                        </td>
                        <td className="py-3.5 px-4">
                          {ev.analyses?.length > 0 ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F6F0] text-[#239B75] border border-[#239B75]/20 whitespace-nowrap">
                              {ev.analyses[0].category} · {Math.round(ev.analyses[0].confidence * 100)}%
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FFF8EB] text-[#E8A33D] border border-[#E8A33D]/20">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => { setSelectedEvidenceId(ev.id); setCurrentPage('evidence-details'); }}
                              className="p-2 text-[#777A91] hover:text-[#6556D9] hover:bg-[#F0EDFF] rounded-xl transition-colors cursor-pointer"
                              title="View Details & OCR"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => { setSelectedEvidenceId(ev.id); setCurrentPage('ai-analysis'); }}
                              className="p-2 text-[#777A91] hover:text-[#3B82F6] hover:bg-[#EAF1FF] rounded-xl transition-colors cursor-pointer"
                              title="Run AI Analysis"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteEvidence(ev.id)}
                              className="p-2 text-[#777A91] hover:text-[#D95F6C] hover:bg-[#FEF2F2] rounded-xl transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Info footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-3 p-4 bg-[#F0EDFF]/50 border border-[#6556D9]/15 rounded-2xl text-xs text-[#6556D9]"
      >
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <span>
          <strong>Chain of Custody:</strong> Every uploaded file is immediately assigned a unique SHA-256 fingerprint computed from its binary content. This hash proves the file has not been altered since upload. Original files are stored read-only and are never overwritten by redaction or analysis.
        </span>
      </motion.div>
    </div>
  );
};
