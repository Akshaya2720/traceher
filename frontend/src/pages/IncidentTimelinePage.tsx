import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Plus,
  Filter,
  Calendar,
  MessageSquare,
  Phone,
  Share2,
  FileText,
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  X
} from 'lucide-react';
import { TimelineEventItem } from '../types';

export const IncidentTimelinePage: React.FC = () => {
  const { incidents, selectedIncidentId, setSelectedIncidentId, addTimelineEvent } = useApp();

  const incident = incidents.find(i => i.id === selectedIncidentId) || incidents[0];
  const [modalOpen, setModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('ALL');
  const [sortAsc, setSortAsc] = useState(true);

  // New event form state
  const [eventDate, setEventDate] = useState(new Date().toISOString().substring(0, 16).replace('T', ' '));
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventSource, setEventSource] = useState<'message' | 'call' | 'post' | 'direct_message' | 'user_reported'>('direct_message');

  const events = incident?.timeline || [];

  const filteredEvents = events
    .filter(e => filterType === 'ALL' || e.sourceType === filterType)
    .sort((a, b) => sortAsc ? a.eventDate.localeCompare(b.eventDate) : b.eventDate.localeCompare(a.eventDate));

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;
    addTimelineEvent(incident.id, {
      eventDate,
      title: eventTitle,
      description: eventDesc,
      category: incident.category,
      sourceType: eventSource
    });
    setModalOpen(false);
    setEventTitle('');
    setEventDesc('');
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'direct_message': return <MessageSquare className="w-3.5 h-3.5 text-[#6556D9]" />;
      case 'call': return <Phone className="w-3.5 h-3.5 text-[#D95F6C]" />;
      case 'post': return <Share2 className="w-3.5 h-3.5 text-[#3B82F6]" />;
      default: return <FileText className="w-3.5 h-3.5 text-[#E8A33D]" />;
    }
  };

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#17172F] font-heading">Incident Timeline</h1>
          <p className="text-xs text-[#777A91]">
            Chronological progression of harassment events. Missing timestamps fall back to verified incident dates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={incident?.id}
            onChange={e => setSelectedIncidentId(e.target.value)}
            className="px-3.5 py-2 bg-white border border-[#E8E9F1] rounded-xl text-xs font-semibold text-[#20213A] focus:outline-none focus:border-[#6556D9]"
          >
            {incidents.map(inc => (
              <option key={inc.id} value={inc.id}>
                {inc.referenceNumber} - {inc.title.substring(0, 24)}...
              </option>
            ))}
          </select>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Control bar: Filter & Sort */}
      <div className="card-soft p-4 bg-white border border-[#E8E9F1] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-[#777A91]">Filter Source:</span>
          {['ALL', 'direct_message', 'call', 'post', 'user_reported'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterType === t
                  ? 'bg-[#6556D9] text-white'
                  : 'bg-[#F7F8FC] text-[#777A91] hover:text-[#20213A]'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F8FC] hover:bg-[#E8E9F1] text-xs font-semibold text-[#20213A] rounded-xl transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>{sortAsc ? 'Chronological (Oldest First)' : 'Reverse (Newest First)'}</span>
        </button>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:inset-0 before:left-3 sm:before:left-4 before:w-0.5 before:bg-[#E8E9F1]">
        {filteredEvents.length === 0 ? (
          <div className="card-soft p-8 text-center bg-white border border-[#E8E9F1]">
            <p className="text-xs text-[#777A91]">No timeline events logged for this filter.</p>
          </div>
        ) : (
          filteredEvents.map(ev => (
            <div key={ev.id} className="relative flex items-start gap-4">
              {/* Node Icon on vertical line */}
              <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-white border-2 border-[#6556D9] flex items-center justify-center shadow-xs">
                {getSourceIcon(ev.sourceType)}
              </div>

              {/* Event Card */}
              <div className="card-soft p-5 bg-white border border-[#E8E9F1] flex-1 space-y-2 card-soft-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#17172F]">{ev.title}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#F0EDFF] text-[#6556D9]">
                      {ev.sourceType.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#777A91]">{ev.eventDate}</span>
                </div>
                <p className="text-xs text-[#20213A] leading-relaxed">{ev.description}</p>
                {ev.category && (
                  <div className="pt-2 border-t border-[#E8E9F1] flex items-center justify-between text-[10px] text-[#777A91]">
                    <span>Category: <strong>{ev.category}</strong></span>
                    <span>Verified User Log</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Timeline Event Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#E8E9F1] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E9F1]">
              <h3 className="text-base font-bold text-[#17172F]">Add Timeline Event</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-[#777A91] hover:text-[#20213A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17172F]">Event Title</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={e => setEventTitle(e.target.value)}
                  placeholder="e.g. Threatening call received"
                  className="w-full px-3 py-2 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#17172F]">Date & Time</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    placeholder="YYYY-MM-DD HH:MM"
                    className="w-full px-3 py-2 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#17172F]">Source Type</label>
                  <select
                    value={eventSource}
                    onChange={e => setEventSource(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
                  >
                    <option value="direct_message">Direct Message</option>
                    <option value="call">Phone Call</option>
                    <option value="post">Social Post</option>
                    <option value="user_reported">In-Person / User Log</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#17172F]">Event Description</label>
                <textarea
                  rows={3}
                  value={eventDesc}
                  onChange={e => setEventDesc(e.target.value)}
                  placeholder="Details of what occurred or was said..."
                  className="w-full px-3 py-2 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E9F1]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#777A91]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6556D9] text-white text-xs font-semibold rounded-xl"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
