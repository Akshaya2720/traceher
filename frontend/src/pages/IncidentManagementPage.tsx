import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  FolderOpen,
  ChevronRight,
  Trash2,
  Edit3,
  X,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Incident } from '../types';

export const IncidentManagementPage: React.FC = () => {
  const {
    incidents,
    evidenceList,
    createIncident,
    deleteIncident,
    setSelectedIncidentId,
    setCurrentPage
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  // Form state for creating incident
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Threats and intimidation');
  const [newDate, setNewDate] = useState(new Date().toISOString().substring(0, 10));
  const [selectedEvidenceForInc, setSelectedEvidenceForInc] = useState<string[]>([]);

  const categories = [
    'All',
    'Threats and intimidation',
    'Impersonation indicators',
    'Cyberbullying',
    'Stalking indicators',
    'Blackmail and extortion',
    'Repeated unwanted contact'
  ];

  const filteredIncidents = incidents.filter(inc => {
    const matchesFilter = selectedFilter === 'All' || inc.category === selectedFilter;
    const matchesSearch =
      inc.title.toLowerCase().includes(search.toLowerCase()) ||
      inc.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inc.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const id = await createIncident({
      title: newTitle,
      description: newDesc,
      category: newCategory,
      incidentDate: newDate,
      status: 'active',
      evidenceIds: selectedEvidenceForInc
    });
    setModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setSelectedIncidentId(id);
    setCurrentPage('incident-details');
  };

  const toggleEvidenceSelection = (evId: string) => {
    setSelectedEvidenceForInc(prev =>
      prev.includes(evId) ? prev.filter(id => id !== evId) : [...prev, evId]
    );
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#17172F] font-heading">My Incidents</h1>
          <p className="text-xs text-[#777A91]">
            Structured workspaces organizing related evidence, chronological timelines, and report generation.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Incident</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-soft p-4 bg-white border border-[#E8E9F1] space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#777A91] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, reference, or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
            />
          </div>

          <div className="text-xs text-[#777A91]">
            Showing <strong>{filteredIncidents.length}</strong> of {incidents.length} incidents
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedFilter === cat
                  ? 'bg-[#6556D9] text-white shadow-xs'
                  : 'bg-[#F7F8FC] text-[#777A91] hover:text-[#20213A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Incident Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIncidents.length === 0 ? (
          <div className="col-span-full card-soft p-12 text-center bg-white space-y-3">
            <AlertTriangle className="w-8 h-8 text-[#E8A33D] mx-auto" />
            <h3 className="text-sm font-bold text-[#17172F]">No matching incidents found</h3>
            <p className="text-xs text-[#777A91]">Try adjusting your search query or create a new incident record.</p>
          </div>
        ) : (
          filteredIncidents.map(inc => (
            <div
              key={inc.id}
              className="card-soft p-5 bg-white border border-[#E8E9F1] card-soft-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#6556D9] font-bold bg-[#F0EDFF] px-2 py-0.5 rounded">
                    {inc.referenceNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6F0] text-[#239B75] uppercase">
                    {inc.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17172F] line-clamp-1">{inc.title}</h3>
                  <p className="text-xs text-[#777A91] line-clamp-2 mt-1 leading-relaxed">
                    {inc.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#E8E9F1] text-[11px] text-[#777A91]">
                  <div className="flex items-center justify-between">
                    <span>Category:</span>
                    <span className="font-semibold text-[#20213A]">{inc.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Incident Date:</span>
                    <span className="text-[#20213A]">{inc.incidentDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Evidence Files:</span>
                    <span className="font-bold text-[#6556D9]">{inc.evidenceCount} attached</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E9F1] flex items-center justify-between">
                <button
                  onClick={() => deleteIncident(inc.id)}
                  className="p-1.5 text-[#777A91] hover:text-[#D95F6C] rounded-lg transition-colors"
                  title="Delete incident"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedIncidentId(inc.id);
                    setCurrentPage('incident-details');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0EDFF] hover:bg-[#6556D9] text-[#6556D9] hover:text-white rounded-xl text-xs font-semibold transition-all"
                >
                  <span>Open Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Incident Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-[#E8E9F1] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E9F1]">
              <h2 className="text-lg font-bold text-[#17172F] font-heading">Log New Incident</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-[#777A91] hover:text-[#20213A] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17172F]">Incident Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Threatening DMs referencing workplace location"
                  className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#17172F]">Primary Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#17172F]">Incident Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17172F]">Description & Narrative</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Summarize the nature of communication, handles involved, and context..."
                  className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                />
              </div>

              {/* Attach Existing Evidence */}
              {evidenceList.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#17172F]">Attach Initial Evidence Exhibits</label>
                  <div className="max-h-32 overflow-y-auto space-y-1.5 border border-[#E8E9F1] rounded-xl p-2 bg-[#F7F8FC]">
                    {evidenceList.map(ev => {
                      const isChecked = selectedEvidenceForInc.includes(ev.id);
                      return (
                        <div
                          key={ev.id}
                          onClick={() => toggleEvidenceSelection(ev.id)}
                          className={`p-2 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors ${
                            isChecked ? 'bg-[#F0EDFF] text-[#6556D9] font-semibold' : 'bg-white text-[#20213A]'
                          }`}
                        >
                          <span className="truncate">{ev.originalFilename}</span>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#6556D9]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E9F1]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#777A91] hover:text-[#20213A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                >
                  Save Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
