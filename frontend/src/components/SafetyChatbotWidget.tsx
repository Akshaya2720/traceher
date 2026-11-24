import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  PhoneCall,
  Shield,
  Video,
  VideoOff,
  Key,
  ExternalLink,
  ChevronDown,
  Info,
  Check,
  Copy,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Smile,
  ShieldCheck
} from 'lucide-react';
import { createClient, unsafe_createClientWithApiKey, AnamClient } from '@anam-ai/js-sdk';
import { api } from '../services/api';

export const ANAM_PERSONA_ID = 'e0a16e95-2826-4e4c-9a9d-8a04ca1be74d';
export const ANAM_AVATAR_ID = '195d733e-58a9-40bb-a049-ac344fa70b7f';
export const DEFAULT_ANAM_API_KEY = 'NGVmZDVjMzctMGU1Ny00MmQxLWI4MjEtYjQ0YTQxYzc2M2EyOkc2Y2ZnbGxSd0dGbDNyb0hDelJHSGo3bmlERXNxcDBzejdLRHM1SDdhMFk9';

export const MAYA_PERSONA_SYSTEM_PROMPT = `You are Maya, the compassionate AI Digital Safety Companion on TRACEHER — an evidence intelligence and cybersecurity platform for women and girls.

Your Core Purpose:
Help individuals experiencing online harassment, cyberstalking, blackmail, impersonation, or threatening messages feel heard, supported, and guided through evidence preservation and safe reporting.

Tone & Personality:
- Empathetic, calm, gentle, patient, and reassuring.
- Trauma-informed: never judge, interrogate, or victim-blame.
- Clear and non-technical: explain steps in plain, accessible language.

WHAT YOU SHOULD SAY:
1. Reassurance & Validation:
   - "Take a deep breath. You are not alone, and what is happening is not your fault."
   - "I am here to guide you step by step in keeping yourself safe."
2. Evidence Preservation Instructions:
   - "Before blocking or deleting messages, capture clear screenshots that show the sender's username, profile handle, phone number, and exact date and time."
   - "Upload your screenshots to TRACEHER's Evidence Center where they are given a tamper-proof SHA-256 custody hash for legal readiness."
3. Official Reporting Channels (India):
   - "If you are in immediate danger, call 112 right away."
   - "For cyber harassment or financial blackmail, call 1930 (National Cyber Crime Helpline) or file a report at cybercrime.gov.in."
   - "National Commission for Women (NCW) Helpline: 7827170170."
4. Digital Privacy Advice:
   - "Use TRACEHER's Privacy Guardian to mask your personal phone number or address on screenshots before sharing them with third parties."
   - "Turn on Two-Factor Authentication (2FA) across your social media and email accounts."

WHAT YOU MUST NOT SAY (STRICT BOUNDARIES):
1. NO LEGAL COUNSEL: Never say "This is definitely illegal under Section X" or promise that police will arrest the suspect. Always clarify you provide safety guidance, not formal legal representation.
2. NO RETALIATION: Never tell the user to confront, threaten, provoke, or expose the harasser publicly.
3. NO VICTIM BLAMING: Never ask "Why did you send that photo?" or "Why were you talking to them?"
4. NO MEDICAL DIAGNOSIS: Never diagnose trauma or depression; offer crisis helpline contacts instead.
5. NO FALSE PROMISES: Never guarantee that content will be removed immediately from every platform.`;

interface ChatMessage {
  id: string;
  sender: 'maya' | 'user';
  text: string;
  timestamp: string;
  quickActions?: string[];
}

export const SafetyChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'avatar' | 'prompt'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [avatarInputMessage, setAvatarInputMessage] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Preload Anam AI API key from localStorage or use the provided valid key
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('traceher_anam_api_key') || DEFAULT_ANAM_API_KEY);
  const [isApiKeySaved, setIsApiKeySaved] = useState(() => !!localStorage.getItem('traceher_anam_api_key') || !!DEFAULT_ANAM_API_KEY);
  const [isStreamingAvatar, setIsStreamingAvatar] = useState(false);
  const [avatarConnecting, setAvatarConnecting] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);
  const anamClientRef = useRef<AnamClient | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Chat message history
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'maya',
      text: "Hello! I'm Maya, your digital safety assistant. Take a slow breath — you are in a safe, confidential space. How can I help you today?",
      timestamp: 'Just now',
      quickActions: [
        'How do I save screenshot evidence?',
        'I am being threatened or blackmailed',
        'What emergency numbers should I call?',
        'How does TRACEHER protect my privacy?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Clean up Anam AI on unmount or stream stop
  useEffect(() => {
    return () => {
      if (anamClientRef.current) {
        try {
          anamClientRef.current.stopStreaming();
        } catch {}
      }
    };
  }, []);

  const saveApiKey = () => {
    const key = apiKey.trim() || DEFAULT_ANAM_API_KEY;
    localStorage.setItem('traceher_anam_api_key', key);
    setIsApiKeySaved(true);
    setAvatarError('');
  };

  const startAvatarStream = async () => {
    const effectiveKey = apiKey.trim() || DEFAULT_ANAM_API_KEY;
    if (!effectiveKey) {
      setAvatarError('Please enter your Anam AI API key first.');
      return;
    }

    setAvatarConnecting(true);
    setAvatarError('');

    try {
      // 1. First attempt: fetch official WebRTC session token from backend proxy
      let client: AnamClient | null = null;
      try {
        const tokenRes = await api.getAnamSessionToken(ANAM_PERSONA_ID);
        if (tokenRes && tokenRes.success && tokenRes.sessionToken) {
          client = createClient(tokenRes.sessionToken);
        }
      } catch (e) {
        console.warn('Backend session token fetch failed, falling back to direct key', e);
      }

      // 2. Fallback: initialize via client-side API key
      if (!client) {
        client = unsafe_createClientWithApiKey(effectiveKey, {
          personaId: ANAM_PERSONA_ID,
          avatarId: ANAM_AVATAR_ID,
          name: 'Maya',
          voiceId: 'en_female_1',
          systemPrompt: MAYA_PERSONA_SYSTEM_PROMPT
        });
      }

      anamClientRef.current = client;

      // Stream to video element
      await client.streamToVideoElement('anam-avatar-video');
      setIsStreamingAvatar(true);
      setAvatarConnecting(false);

      // Greet user via avatar talk
      try {
        setAvatarSpeaking(true);
        await client.talk("Hello, I am Maya. You are safe here. How can I help you today?");
        setAvatarSpeaking(false);
      } catch {
        setAvatarSpeaking(false);
      }
    } catch (err: any) {
      setAvatarError(err?.message || 'Failed to connect to Anam AI stream. Please check your network or key.');
      setAvatarConnecting(false);
      setIsStreamingAvatar(false);
    }
  };

  const stopAvatarStream = () => {
    if (anamClientRef.current) {
      try {
        anamClientRef.current.stopStreaming();
      } catch {}
      anamClientRef.current = null;
    }
    setIsStreamingAvatar(false);
    setAvatarConnecting(false);
    setAvatarSpeaking(false);
  };

  const handleSendAvatarMessage = async () => {
    const text = avatarInputMessage.trim();
    if (!text) return;
    setAvatarInputMessage('');

    if (isStreamingAvatar && anamClientRef.current) {
      try {
        setAvatarSpeaking(true);
        anamClientRef.current.sendUserMessage(text);
        setTimeout(() => setAvatarSpeaking(false), 3000);
      } catch {
        setAvatarSpeaking(false);
      }
    }

    // Also mirror to text chat
    handleSendMessage(text);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // If avatar is actively streaming, inform the avatar
    if (isStreamingAvatar && anamClientRef.current) {
      try {
        anamClientRef.current.sendUserMessage(text);
      } catch {}
    }

    // Generate responsive safe AI answer
    setTimeout(() => {
      const reply = generateSafetyResponse(text);
      const botMsg: ChatMessage = {
        id: `maya-${Date.now()}`,
        sender: 'maya',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: reply.suggestions
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(MAYA_PERSONA_SYSTEM_PROMPT);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <>
      {/* ─── FLOATING LAUNCHER BUTTON (Bottom-Right) ─── */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white rounded-2xl border border-[#E8E9F1] shadow-lg text-xs font-semibold text-[#17172F] cursor-pointer hover:border-[#6556D9]/40 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-[#239B75] animate-pulse" />
            <span>Need Help? Talk to Maya</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#6556D9] to-[#8877EC] text-white shadow-xl shadow-[#6556D9]/30 flex items-center justify-center cursor-pointer border-2 border-white focus:outline-none"
          title="Digital Safety Companion (Anam AI)"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#239B75] rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                ✓
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* ─── CHAT & AVATAR MODAL (Bottom-Right Drawer) ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[640px] bg-white rounded-3xl border border-[#E8E9F1] shadow-2xl flex flex-col overflow-hidden text-left"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-white via-white to-[#F0EDFF]/50 border-b border-[#E8E9F1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6556D9] to-[#8877EC] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    M
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#239B75] ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#17172F]">Maya</h3>
                    <span className="text-[10px] bg-[#F0EDFF] text-[#6556D9] font-bold px-2 py-0.5 rounded-full border border-[#6556D9]/15">
                      Safety Companion
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777A91]">Anam AI Persona • Ready & Confidential</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#777A91] hover:text-[#20213A] hover:bg-[#F7F8FC] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center border-b border-[#E8E9F1] px-4 bg-[#F7F8FC]/60 text-xs">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2.5 px-3 font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'border-[#6556D9] text-[#6556D9]'
                    : 'border-transparent text-[#777A91] hover:text-[#20213A]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Text Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('avatar')}
                className={`py-2.5 px-3 font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'avatar'
                    ? 'border-[#6556D9] text-[#6556D9]'
                    : 'border-transparent text-[#777A91] hover:text-[#20213A]'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Live Avatar (Anam)</span>
                {isStreamingAvatar && (
                  <span className="w-2 h-2 rounded-full bg-[#239B75] animate-pulse" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('prompt')}
                className={`py-2.5 px-3 font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ml-auto ${
                  activeTab === 'prompt'
                    ? 'border-[#6556D9] text-[#6556D9]'
                    : 'border-transparent text-[#777A91] hover:text-[#20213A]'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Prompt Guide</span>
              </button>
            </div>

            {/* TAB 1: TEXT CHAT */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#6556D9] text-white rounded-br-xs'
                            : 'bg-[#F7F8FC] border border-[#E8E9F1] text-[#20213A] rounded-bl-xs'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-[#777A91] mt-1 px-1">
                        {msg.timestamp}
                      </span>

                      {/* Quick action buttons attached to bot reply */}
                      {msg.quickActions && msg.quickActions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                          {msg.quickActions.map(action => (
                            <button
                              key={action}
                              onClick={() => handleSendMessage(action)}
                              className="text-[11px] font-medium bg-[#F0EDFF] hover:bg-[#E2DCFF] text-[#6556D9] px-2.5 py-1 rounded-xl transition-all border border-[#6556D9]/15 text-left cursor-pointer"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Field */}
                <div className="p-3 bg-white border-t border-[#E8E9F1]">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Ask Maya anything about evidence or safety..."
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9] focus:bg-white transition-all"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="p-2.5 bg-[#6556D9] hover:bg-[#5244C4] text-white rounded-xl shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE AVATAR STREAM (ANAM AI) */}
            {activeTab === 'avatar' && (
              <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-3">
                {/* Video container */}
                <div className="relative rounded-2xl bg-black overflow-hidden aspect-video flex items-center justify-center shadow-md border border-[#E8E9F1]">
                  <video
                    id="anam-avatar-video"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover ${isStreamingAvatar ? 'block' : 'hidden'}`}
                  />

                  {!isStreamingAvatar && (
                    <div className="text-center p-6 space-y-2 text-white">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-[#6556D9]">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-bold text-white">Anam AI Virtual Human</p>
                      <p className="text-[11px] text-gray-300 max-w-xs">
                        Interactive video avatar with live speech, expressions, and real-time WebRTC audio.
                      </p>
                    </div>
                  )}

                  {avatarConnecting && (
                    <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center space-y-2 text-white z-10">
                      <div className="w-8 h-8 border-3 border-[#6556D9] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-semibold">Connecting to Anam AI stream...</span>
                    </div>
                  )}

                  {isStreamingAvatar && avatarSpeaking && (
                    <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-full flex items-center gap-1.5 text-[10px] text-white font-semibold">
                      <Volume2 className="w-3 h-3 text-[#239B75] animate-pulse" />
                      <span>Maya is speaking...</span>
                    </div>
                  )}
                </div>

                {/* Stream Controls */}
                <div className="space-y-2">
                  {!isStreamingAvatar ? (
                    <button
                      onClick={startAvatarStream}
                      disabled={avatarConnecting}
                      className="w-full py-3 bg-[#6556D9] hover:bg-[#5244C4] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Video className="w-4 h-4" />
                      <span>Start Live Avatar Video Session</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={stopAvatarStream}
                        className="w-full py-2 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#D95F6C] border border-[#D95F6C]/20 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <VideoOff className="w-3.5 h-3.5" />
                        <span>Stop Avatar Stream</span>
                      </button>

                      {/* Live typing to avatar */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Type to talk directly to Maya..."
                          value={avatarInputMessage}
                          onChange={e => setAvatarInputMessage(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleSendAvatarMessage()}
                          className="flex-1 px-3.5 py-2 bg-[#F7F8FC] border border-[#E8E9F1] rounded-xl text-xs text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                        />
                        <button
                          onClick={handleSendAvatarMessage}
                          className="p-2 bg-[#6556D9] text-white rounded-xl cursor-pointer hover:bg-[#5244C4]"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {avatarError && (
                  <div className="p-3 bg-[#FEF2F2] border border-[#D95F6C]/25 rounded-xl text-xs text-[#D95F6C]">
                    {avatarError}
                  </div>
                )}

                {/* Configuration / API Key Box (Pre-loaded with user's key) */}
                <div className="p-3 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#17172F] flex items-center gap-1.5 text-[11px]">
                      <Key className="w-3.5 h-3.5 text-[#6556D9]" />
                      <span>Anam AI Key Config</span>
                    </span>
                    <span className="text-[10px] text-[#239B75] font-bold flex items-center gap-1 bg-[#E8F6F0] px-2 py-0.5 rounded-full border border-[#239B75]/20">
                      <Check className="w-3 h-3" /> Pre-Configured
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="password"
                      placeholder="Anam AI API Key"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-[#E8E9F1] rounded-xl text-[11px] text-[#20213A] focus:outline-none focus:border-[#6556D9]"
                    />
                    <button
                      onClick={saveApiKey}
                      className="px-3 py-1.5 bg-white border border-[#E8E9F1] hover:border-[#6556D9] text-[#6556D9] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      Update
                    </button>
                  </div>

                  <div className="text-[10px] text-[#777A91] space-y-0.5">
                    <p>Persona ID: <span className="font-mono text-[#20213A]">{ANAM_PERSONA_ID.substring(0, 16)}...</span></p>
                    <p>Avatar ID: <span className="font-mono text-[#20213A]">{ANAM_AVATAR_ID.substring(0, 16)}...</span></p>
                  </div>
                </div>

                <div className="p-2.5 bg-[#E8F6F0] rounded-xl border border-[#239B75]/20 text-[10px] text-[#239B75] leading-relaxed">
                  <strong>Live WebRTC Stream:</strong> Maya will speak with real voice and lip-sync directly into your browser.
                </div>
              </div>
            )}

            {/* TAB 3: PROMPT SPECIFICATION */}
            {activeTab === 'prompt' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#17172F]">Anam AI Persona Prompt</span>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#F0EDFF] hover:bg-[#E2DCFF] text-[#6556D9] text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5 text-[#239B75]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                  </button>
                </div>

                <div className="p-3 bg-[#F7F8FC] rounded-2xl border border-[#E8E9F1] font-mono text-[11px] text-[#20213A] whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto">
                  {MAYA_PERSONA_SYSTEM_PROMPT}
                </div>

                <div className="p-3 bg-[#FFF8EB] border border-[#E8A33D]/25 rounded-xl text-[11px] text-[#20213A] space-y-1">
                  <span className="font-bold text-[#E8A33D]">How to configure in Anam AI:</span>
                  <p className="text-[#777A91] leading-relaxed">
                    Open your Anam dashboard at <a href="https://lab.anam.ai" target="_blank" rel="noreferrer" className="text-[#6556D9] underline">lab.anam.ai</a>, select Persona <span className="font-mono text-black">{ANAM_PERSONA_ID}</span>, and paste the instructions above into the System Prompt.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Intelligent contextual responses for safety questions
function generateSafetyResponse(input: string): { text: string; suggestions: string[] } {
  const query = input.toLowerCase();

  if (query.includes('threat') || query.includes('blackmail') || query.includes('photo') || query.includes('extort')) {
    return {
      text: "Please take a deep breath. You are not alone, and what is happening is extortion, which is a severe cybercrime under Indian law.\n\n1. Do NOT pay or send additional photos: paying does not stop blackmailers and often invites more demands.\n2. Do NOT delete the messages yet: take full screenshots showing the sender's handle, phone number, and exact date and time.\n3. Upload your screenshots into TRACEHER's Evidence Center to lock the SHA-256 custody hash.\n4. Call 1930 (National Cyber Crime Helpline) or file confidentially at cybercrime.gov.in.\n5. If someone threatens to show up at your home or workplace, call 112 immediately.",
      suggestions: [
        'How do I save screenshot evidence?',
        'Can I redact my face or address?',
        'What should I tell police?'
      ]
    };
  }

  if (query.includes('screenshot') || query.includes('evidence') || query.includes('save') || query.includes('hash')) {
    return {
      text: "To preserve court-ready digital evidence:\n\n• Include the full screen: keep the top status bar (showing time, network, battery) visible.\n• Capture the sender's handle or phone number, not just their display name.\n• When you drag and drop your files into TRACEHER's Evidence Center, our engine generates an immutable SHA-256 cryptographic hash so no one can accuse you of editing the screenshot later.\n• Use Privacy Guardian to mask your own private details before sharing copies.",
      suggestions: [
        'Go to Evidence Center',
        'How do I redact sensitive info?',
        'I am being blackmailed'
      ]
    };
  }

  if (query.includes('emergency') || query.includes('number') || query.includes('police') || query.includes('call')) {
    return {
      text: "Here are verified emergency numbers and official contacts in India:\n\n🚨 Immediate Physical Emergency / Police: 112 (Toll Free, 24x7)\n💻 National Cyber Crime Helpline: 1930 (24x7)\n👩 National Commission for Women (NCW): 7827170170\n🌐 National Cyber Crime Portal: https://cybercrime.gov.in\n\nAll calls are confidential and routed directly to official safety responders.",
      suggestions: [
        'How do I file on cybercrime.gov.in?',
        'I am being threatened or blackmailed'
      ]
    };
  }

  if (query.includes('privacy') || query.includes('traceher') || query.includes('safe')) {
    return {
      text: "TRACEHER was built from the ground up to protect your dignity and privacy:\n\n• Zero Public Training: Your evidence is never used to train public AI models.\n• Immutable Vault: Original files are write-protected and hashed.\n• Privacy Guardian: You can non-destructively black out your phone number, address, or face before downloading your report.\n• Instant Wipe: You can delete your account and all files at any second.",
      suggestions: [
        'How do I save screenshot evidence?',
        'What emergency numbers should I call?'
      ]
    };
  }

  return {
    text: "I hear you, and I am right here with you. Whether you need help saving screenshot evidence, reporting anonymous accounts, or protecting your personal contact details, I can guide you through every step.",
    suggestions: [
      'How do I save screenshot evidence?',
      'I am being threatened or blackmailed',
      'What emergency numbers should I call?'
    ]
  };
}
