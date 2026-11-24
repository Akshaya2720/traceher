export type PageId =
  // Public
  | 'landing'
  | 'how-it-works'
  | 'features'
  | 'about'
  | 'privacy-security'
  | 'help-support'
  | 'login'
  | 'register'
  | 'forgot-password'
  // Authenticated
  | 'onboarding'
  | 'dashboard'
  | 'evidence'
  | 'evidence-details'
  | 'ai-analysis'
  | 'incidents'
  | 'incident-details'
  | 'timeline'
  | 'relationships'
  | 'privacy-guardian'
  | 'response-navigator'
  | 'report-center'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'help-center'
  // Demo / Admin
  | 'demo-workspace'
  | 'system-status';

export interface User {
  id: string;
  fullName: string;
  email: string;
  preferredLanguage: 'en' | 'ml' | 'hi';
  createdAt: string;
}

export interface AIAnalysis {
  id: string;
  evidenceId: string;
  category: string;
  confidence: number;
  explanation: string;
  supportingText: string;
  suggestedStep: string;
  modelVersion: string;
  reviewedStatus: 'pending' | 'confirmed' | 'changed' | 'irrelevant';
  userNotes?: string;
  createdAt: string;
}

export interface Evidence {
  id: string;
  userId: string;
  incidentId?: string;
  originalFilename: string;
  storedFilename: string;
  fileType: string;
  fileSize: number;
  sha256Hash: string;
  extractedText: string;
  uploadedAt: string;
  processingStatus: 'processing' | 'completed' | 'failed';
  analyses: AIAnalysis[];
  fileUrl?: string;
}

export interface TimelineEventItem {
  id: string;
  incidentId: string;
  evidenceId?: string;
  eventDate: string;
  title: string;
  description: string;
  category?: string;
  sourceType: 'message' | 'call' | 'post' | 'direct_message' | 'user_reported';
}

export interface Incident {
  id: string;
  userId: string;
  referenceNumber: string;
  title: string;
  description: string;
  category: string;
  incidentDate: string;
  status: 'active' | 'under_review' | 'resolved' | 'archived';
  createdAt: string;
  updatedAt: string;
  evidenceCount: number;
  evidenceIds: string[];
  timeline: TimelineEventItem[];
}

export interface RedactionRegion {
  id: string;
  type: 'phone' | 'email' | 'address' | 'name' | 'face' | 'custom';
  text?: string;
  x: number; // percentage 0-100
  y: number;
  width: number;
  height: number;
  selected: boolean;
}

export interface ReportItem {
  id: string;
  incidentId: string;
  incidentReference: string;
  incidentTitle: string;
  reportTitle: string;
  filePath: string;
  downloadUrl: string;
  generatedAt: string;
  fileSizeKb: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: 'upload' | 'analysis' | 'report' | 'system' | 'incident';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface UserSettings {
  preferredLanguage: 'en' | 'ml' | 'hi';
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  emailNotifications: boolean;
  retentionDays: number;
}
