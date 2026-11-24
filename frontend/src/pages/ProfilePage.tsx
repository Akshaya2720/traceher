import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Mail,
  Globe,
  Calendar,
  ShieldCheck,
  Check,
  Save,
  Lock,
  FolderOpen,
  AlertTriangle
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, incidents, evidenceList, settings, updateSettings } = useApp();
  const [fullName, setFullName] = useState(currentUser?.fullName || 'Ananya Sharma');
  const [language, setLanguage] = useState<'en' | 'ml' | 'hi'>(settings.preferredLanguage || 'en');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ preferredLanguage: language });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left pb-16">
      <div className="pb-2 border-b border-[#E8E9F1]">
        <h1 className="text-2xl font-bold text-[#17172F] font-heading">User Profile</h1>
        <p className="text-xs text-[#777A91]">
          Manage your identity details, localization preferences, and security status.
        </p>
      </div>

      {/* Profile Card Header */}
      <div className="card-soft p-6 bg-white border border-[#E8E9F1] flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#6556D9] to-[#8877EC] text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
          {fullName.charAt(0) || 'A'}
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#17172F]">{fullName}</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6F0] text-[#239B75] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified Vault
            </span>
          </div>
          <p className="text-xs text-[#777A91]">{currentUser?.email || 'ananya.sharma@example.com'}</p>
          <div className="flex items-center gap-4 text-[11px] text-[#777A91] pt-1">
            <span>Member since: <strong>November 2026</strong></span>
            <span>•</span>
            <span>Language: <strong>{language.toUpperCase()}</strong></span>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="card-soft p-6 sm:p-8 bg-white border border-[#E8E9F1] space-y-5">
        <h3 className="text-sm font-bold text-[#17172F]">Personal Details</h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#17172F]">Full Legal Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#17172F]">Registered Email (Read Only)</label>
            <input
              type="email"
              value={currentUser?.email || 'ananya.sharma@example.com'}
              disabled
              className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#777A91] cursor-not-allowed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#17172F]">Preferred System Language</label>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] cursor-pointer"
            >
              <option value="en">English (Default)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E8E9F1]">
            {saved ? (
              <span className="text-xs text-[#239B75] font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Profile changes saved!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-soft p-4 bg-white border border-[#E8E9F1] text-center space-y-1">
          <div className="text-2xl font-black font-heading text-[#6556D9]">{incidents.length}</div>
          <div className="text-xs text-[#777A91]">Active Incidents Logged</div>
        </div>
        <div className="card-soft p-4 bg-white border border-[#E8E9F1] text-center space-y-1">
          <div className="text-2xl font-black font-heading text-[#239B75]">{evidenceList.length}</div>
          <div className="text-xs text-[#777A91]">Hashed Exhibits Preserved</div>
        </div>
      </div>
    </div>
  );
};
