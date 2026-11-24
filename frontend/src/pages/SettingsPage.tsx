import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Shield,
  Lock,
  Globe,
  Sliders,
  Bell,
  Trash2,
  Download,
  Check,
  CheckCircle2,
  AlertTriangle,
  Eye
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetDemoData, setCurrentPage } = useApp();
  const [successMsg, setSuccessMsg] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const triggerNotice = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) return;
    setCurrentPass('');
    setNewPass('');
    triggerNotice('Password updated successfully.');
  };

  const handleAccountWipe = () => {
    if (window.confirm('Are you absolutely sure you want to permanently delete your account and all associated evidence? This cannot be undone.')) {
      resetDemoData();
      triggerNotice('Account data permanently erased and reset to clean initial state.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-left pb-16">
      <div className="pb-2 border-b border-[#E8E9F1]">
        <h1 className="text-2xl font-bold text-[#17172F] font-heading">Settings</h1>
        <p className="text-xs text-[#777A91]">
          Manage account security, accessibility controls, privacy retention, and notification preferences.
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-[#E8F6F0] border border-[#239B75]/20 rounded-xl text-xs text-[#239B75] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1. LANGUAGE SETTINGS */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6556D9]">
          <Globe className="w-4 h-4" />
          <span>Language Preferences</span>
        </div>
        <p className="text-xs text-[#777A91]">
          Choose the default language across your workspace, incident forms, and report templates.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'en', label: 'English', desc: 'Default Interface' },
            { id: 'ml', label: 'മലയാളം (Malayalam)', desc: 'കേരള പ്രാദേശിക പിന്തുണ' },
            { id: 'hi', label: 'हिन्दी (Hindi)', desc: 'राष्ट्रीय प्राथमिक समर्थन' }
          ].map(lang => (
            <button
              key={lang.id}
              onClick={() => {
                updateSettings({ preferredLanguage: lang.id as any });
                triggerNotice(`Language switched to ${lang.label}`);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                settings.preferredLanguage === lang.id
                  ? 'border-[#6556D9] bg-[#F0EDFF] text-[#6556D9] font-bold shadow-xs'
                  : 'border-[#E8E9F1] bg-[#F7F8FC] text-[#20213A] hover:bg-white'
              }`}
            >
              <div className="text-xs font-bold">{lang.label}</div>
              <div className="text-[10px] text-[#777A91] mt-0.5">{lang.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. ACCESSIBILITY SETTINGS */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6556D9]">
          <Sliders className="w-4 h-4" />
          <span>Accessibility (WCAG 2.2 AA)</span>
        </div>

        <div className="space-y-3 text-xs">
          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
            <div>
              <div className="font-semibold text-[#17172F]">Reduced Motion</div>
              <div className="text-[11px] text-[#777A91]">Disables slide transitions and ambient pulsing animations</div>
            </div>
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={e => {
                updateSettings({ reducedMotion: e.target.checked });
                triggerNotice(`Reduced motion ${e.target.checked ? 'enabled' : 'disabled'}`);
              }}
              className="w-4 h-4 text-[#6556D9] rounded border-[#E8E9F1]"
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
            <div>
              <div className="font-semibold text-[#17172F]">High Contrast Borders</div>
              <div className="text-[11px] text-[#777A91]">Strengthens card borders and color contrast for readability</div>
            </div>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={e => {
                updateSettings({ highContrast: e.target.checked });
                triggerNotice(`High contrast ${e.target.checked ? 'enabled' : 'disabled'}`);
              }}
              className="w-4 h-4 text-[#6556D9] rounded border-[#E8E9F1]"
            />
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
            <div>
              <div className="font-semibold text-[#17172F]">Interface Font Size</div>
              <div className="text-[11px] text-[#777A91]">Adjust global readability scaling</div>
            </div>
            <select
              value={settings.fontSize}
              onChange={e => {
                updateSettings({ fontSize: e.target.value as any });
                triggerNotice(`Font scale adjusted to ${e.target.value}`);
              }}
              className="px-3 py-1 bg-white border border-[#E8E9F1] rounded-lg text-xs font-semibold cursor-pointer"
            >
              <option value="small">Small (Compact)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="large">Large (Accessible)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. NOTIFICATION PREFERENCES */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6556D9]">
          <Bell className="w-4 h-4" />
          <span>Notification Preferences</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
            <div>
              <div className="font-semibold text-[#17172F]">AI Processing Alerts</div>
              <div className="text-[11px] text-[#777A91]">Alert me when threat patterns or OCR extraction finishes</div>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={e => {
                updateSettings({ emailNotifications: e.target.checked });
                triggerNotice('Notification preferences saved.');
              }}
              className="w-4 h-4 text-[#6556D9] rounded border-[#E8E9F1]"
            />
          </div>
        </div>
      </div>

      {/* 4. PRIVACY & DATA SOVEREIGNTY */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#239B75]">
          <Shield className="w-4 h-4" />
          <span>Privacy & Data Sovereignty</span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1]">
            <div>
              <div className="font-semibold text-[#17172F]">Evidence Vault Retention Period</div>
              <div className="text-[11px] text-[#777A91]">Automatic local cleanup threshold</div>
            </div>
            <select
              value={settings.retentionDays}
              onChange={e => {
                updateSettings({ retentionDays: Number(e.target.value) });
                triggerNotice(`Retention set to ${e.target.value} days.`);
              }}
              className="px-3 py-1 bg-white border border-[#E8E9F1] rounded-lg text-xs font-semibold cursor-pointer"
            >
              <option value={90}>90 Days</option>
              <option value={180}>180 Days</option>
              <option value={365}>1 Year (Default)</option>
              <option value={730}>2 Years</option>
            </select>
          </div>

          {/* Account Data Export */}
          <div className="p-3 bg-[#F7F8FC] rounded-xl border border-[#E8E9F1] flex items-center justify-between">
            <div>
              <div className="font-semibold text-[#17172F]">Export All Account Data</div>
              <div className="text-[11px] text-[#777A91]">Download full archive of your hashed evidence & reports</div>
            </div>
            <button
              onClick={() => setCurrentPage('report-center')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E8E9F1] hover:bg-[#F0EDFF] text-xs font-semibold text-[#6556D9] rounded-xl transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

          {/* Danger Zone: Account Deletion */}
          <div className="p-4 bg-[#FEF2F2] border border-[#D95F6C]/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-[#D95F6C]">Permanently Delete Account & Wipe Evidence</div>
                <div className="text-[11px] text-[#777A91]">
                  Irreversibly deletes all stored screenshots, hashes, incidents, and reports.
                </div>
              </div>
              <button
                onClick={handleAccountWipe}
                className="px-3.5 py-1.5 bg-[#D95F6C] hover:bg-[#C24B58] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
