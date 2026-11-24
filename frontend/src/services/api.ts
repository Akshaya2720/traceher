import { RedactionRegion, Evidence, Incident, ReportItem, AIAnalysis, TimelineEventItem } from '../types';

const API_BASE = '/api';

// Helper to map backend snake_case to frontend camelCase
export function mapAnalysisFromServer(raw: any): AIAnalysis {
  return {
    id: raw.id || `ana-${Date.now()}`,
    evidenceId: raw.evidence_id || raw.evidenceId || '',
    category: raw.category || 'Threats and intimidation',
    confidence: typeof raw.confidence === 'number' ? raw.confidence : 0.92,
    explanation: raw.explanation || 'Language exhibits explicit or implicit intimidation tactics.',
    supportingText: raw.supporting_text || raw.supportingText || '',
    suggestedStep: raw.suggested_step || raw.suggestedStep || 'Preserve timestamps and consult 1930 / 112.',
    modelVersion: raw.model_version || raw.modelVersion || 'TraceHer-DeBERTa-Safety-v2.3',
    reviewedStatus: raw.reviewed_status || raw.reviewedStatus || 'pending',
    userNotes: raw.user_notes || raw.userNotes,
    createdAt: raw.created_at || raw.createdAt || new Date().toISOString()
  };
}

export function mapEvidenceFromServer(raw: any): Evidence {
  return {
    id: raw.id,
    userId: raw.user_id || raw.userId || 'usr-demo',
    incidentId: raw.incident_id || raw.incidentId || '',
    originalFilename: raw.original_filename || raw.originalFilename || 'evidence.png',
    storedFilename: raw.stored_filename || raw.storedFilename || raw.original_filename || 'evidence.png',
    fileType: raw.file_type || raw.fileType || 'image/png',
    fileSize: typeof raw.file_size === 'number' ? raw.file_size : (raw.fileSize || 1024),
    sha256Hash: raw.sha256_hash || raw.sha256Hash || '',
    extractedText: raw.extracted_text || raw.extractedText || '',
    uploadedAt: raw.uploaded_at || raw.uploadedAt || new Date().toISOString(),
    processingStatus: raw.processing_status || raw.processingStatus || 'completed',
    analyses: Array.isArray(raw.analyses) ? raw.analyses.map(mapAnalysisFromServer) : [],
    fileUrl: raw.file_url || raw.fileUrl
  };
}

export function mapTimelineFromServer(raw: any): TimelineEventItem {
  return {
    id: raw.id || `tl-${Date.now()}`,
    incidentId: raw.incident_id || raw.incidentId || '',
    evidenceId: raw.evidence_id || raw.evidenceId,
    eventDate: raw.event_date || raw.eventDate || new Date().toISOString(),
    title: raw.title || 'Incident Event',
    description: raw.description || '',
    category: raw.category,
    sourceType: raw.source_type || raw.sourceType || 'user_reported'
  };
}

export function mapIncidentFromServer(raw: any): Incident {
  return {
    id: raw.id,
    userId: raw.user_id || raw.userId || 'usr-demo',
    referenceNumber: raw.reference_number || raw.referenceNumber || 'TRC-2026-LIVE',
    title: raw.title || 'Incident Record',
    description: raw.description || '',
    category: raw.category || 'Harassment',
    incidentDate: raw.incident_date || raw.incidentDate || new Date().toISOString().substring(0, 10),
    status: raw.status || 'active',
    createdAt: raw.created_at || raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updated_at || raw.updatedAt || new Date().toISOString(),
    evidenceCount: typeof raw.evidence_count === 'number' ? raw.evidence_count : (Array.isArray(raw.evidence_ids) ? raw.evidence_ids.length : (raw.evidenceCount || 0)),
    evidenceIds: Array.isArray(raw.evidence_ids) ? raw.evidence_ids : (raw.evidenceIds || []),
    timeline: Array.isArray(raw.timeline) ? raw.timeline.map(mapTimelineFromServer) : []
  };
}

export function mapReportFromServer(raw: any): ReportItem {
  return {
    id: raw.id,
    incidentId: raw.incident_id || raw.incidentId || '',
    incidentReference: raw.incident_reference || raw.incidentReference || 'TRC-2026-001',
    incidentTitle: raw.incident_title || raw.incidentTitle || 'Evidence Dossier',
    reportTitle: raw.report_title || raw.reportTitle || `Evidence Dossier (${raw.incident_reference || 'TRC'})`,
    filePath: raw.file_path || raw.filePath || '',
    downloadUrl: raw.download_url || raw.downloadUrl || `/api/reports/${raw.id}/download`,
    generatedAt: raw.generated_at || raw.generatedAt || new Date().toISOString().replace('T', ' ').substring(0, 16),
    fileSizeKb: typeof raw.file_size_kb === 'number' ? raw.file_size_kb : (raw.fileSizeKb || 140)
  };
}

export const api = {
  // Auth
  async login(email: string, pass: string) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      if (res.ok) return await res.json();
    } catch {}
    return {
      id: 'usr-demo',
      fullName: 'Ananya Sharma',
      email: email || 'ananya.sharma@example.com',
      preferredLanguage: 'en',
      createdAt: new Date().toISOString()
    };
  },

  async register(data: { fullName: string; email: string; password: string; preferredLanguage: string }) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          password: data.password,
          preferred_language: data.preferredLanguage
        })
      });
      if (res.ok) return await res.json();
    } catch {}
    return {
      id: `usr-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      preferredLanguage: data.preferredLanguage,
      createdAt: new Date().toISOString()
    };
  },

  // Dashboard
  async getDashboardSummary() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/summary`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  async getDashboardAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/dashboard/analytics`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  // Evidence
  async getEvidence(incidentId?: string): Promise<Evidence[] | null> {
    try {
      const url = incidentId ? `${API_BASE}/evidence?incident_id=${incidentId}` : `${API_BASE}/evidence`;
      const res = await fetch(url);
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw)) return raw.map(mapEvidenceFromServer);
      }
    } catch {}
    return null;
  },

  async uploadEvidence(formData: FormData): Promise<Evidence | null> {
    try {
      const res = await fetch(`${API_BASE}/evidence/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const raw = await res.json();
        return mapEvidenceFromServer(raw);
      }
    } catch {}
    return null;
  },

  async deleteEvidence(id: string) {
    try {
      const res = await fetch(`${API_BASE}/evidence/${id}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch {}
    return { success: true };
  },

  // Incidents
  async getIncidents(): Promise<Incident[] | null> {
    try {
      const res = await fetch(`${API_BASE}/incidents`);
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw)) return raw.map(mapIncidentFromServer);
      }
    } catch {}
    return null;
  },

  async createIncident(data: any): Promise<Incident | null> {
    try {
      const payload = {
        title: data.title,
        description: data.description || '',
        category: data.category || 'Harassment',
        incident_date: data.incidentDate || data.incident_date || new Date().toISOString().substring(0, 10),
        evidence_ids: data.evidenceIds || data.evidence_ids || []
      };
      const res = await fetch(`${API_BASE}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const raw = await res.json();
        return mapIncidentFromServer(raw);
      }
    } catch {}
    return null;
  },

  async addTimelineEvent(incidentId: string, eventData: any) {
    try {
      const res = await fetch(`${API_BASE}/incidents/${incidentId}/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incident_id: incidentId,
          event_date: eventData.eventDate || eventData.event_date,
          title: eventData.title,
          description: eventData.description,
          category: eventData.category,
          source_type: eventData.sourceType || eventData.source_type || 'user_reported'
        })
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  async getRelationships(incidentId: string) {
    try {
      const res = await fetch(`${API_BASE}/incidents/${incidentId}/relationships`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  // Privacy
  async detectPrivacy(evidenceId: string) {
    try {
      const res = await fetch(`${API_BASE}/privacy/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidence_id: evidenceId })
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  async applyRedaction(evidenceId: string, regions: RedactionRegion[]) {
    try {
      const res = await fetch(`${API_BASE}/privacy/redact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evidence_id: evidenceId, regions })
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  // Reports
  async getReports(): Promise<ReportItem[] | null> {
    try {
      const res = await fetch(`${API_BASE}/reports`);
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw)) return raw.map(mapReportFromServer);
      }
    } catch {}
    return null;
  },

  async generateReport(incidentId: string): Promise<ReportItem | null> {
    try {
      const res = await fetch(`${API_BASE}/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident_id: incidentId })
      });
      if (res.ok) {
        const raw = await res.json();
        return mapReportFromServer(raw);
      }
    } catch {}
    return null;
  },

  // Anam AI Session Token
  async getAnamSessionToken(personaId?: string): Promise<{ success: boolean; sessionToken?: string; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/anam/session-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ persona_id: personaId })
      });
      if (res.ok) return await res.json();
    } catch (e: any) {
      return { success: false, error: e?.message || 'Network error' };
    }
    return { success: false, error: 'Could not fetch Anam session token' };
  },

  // Demo
  async resetDemo() {
    try {
      const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch {}
    return { success: true };
  }
};
