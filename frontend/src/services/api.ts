import { RedactionRegion } from '../types';

const API_BASE = '/api';

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
    } catch {
      // Graceful offline fallback
    }
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
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {
      // Graceful offline fallback
    }
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
  async getEvidence(incidentId?: string) {
    try {
      const url = incidentId ? `${API_BASE}/evidence?incident_id=${incidentId}` : `${API_BASE}/evidence`;
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  async uploadEvidence(formData: FormData) {
    try {
      const res = await fetch(`${API_BASE}/evidence/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) return await res.json();
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
  async getIncidents() {
    try {
      const res = await fetch(`${API_BASE}/incidents`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  async createIncident(data: any) {
    try {
      const res = await fetch(`${API_BASE}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  async addTimelineEvent(incidentId: string, eventData: any) {
    try {
      const res = await fetch(`${API_BASE}/incidents/${incidentId}/timeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
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
  async getReports() {
    try {
      const res = await fetch(`${API_BASE}/reports`);
      if (res.ok) return await res.json();
    } catch {}
    return null;
  },

  async generateReport(incidentId: string) {
    try {
      const res = await fetch(`${API_BASE}/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident_id: incidentId })
      });
      if (res.ok) return await res.json();
    } catch {}
    return null;
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
