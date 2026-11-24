import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Search,
  PhoneCall,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  ShieldAlert
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What types of harassment evidence can I upload to TRACEHER?',
      a: 'TRACEHER accepts PNG, JPG, JPEG, and PDF documents. You can upload screenshots of direct messages, social media posts, comment sections, threatening emails, caller ID records, and call frequency logs.'
    },
    {
      q: 'Does TRACEHER automatically send my evidence to the police?',
      a: 'No. TRACEHER never sends your data anywhere without your explicit command. You retain 100% control over when, how, and with whom you share your organized reports or evidence files.'
    },
    {
      q: 'What should I do if I am in immediate physical danger?',
      a: 'If you believe someone is physically following you or threatening imminent violence, immediately dial 112 (National Emergency Number in India) or reach out to local emergency services. Do not prioritize logging into the app over your immediate physical safety.'
    },
    {
      q: 'What is a SHA-256 hash and why is it important for evidence?',
      a: 'A SHA-256 hash is a unique mathematical fingerprint of a digital file. If even a single pixel or comma is edited in a screenshot, the hash changes completely. By generating a hash as soon as you upload, TRACEHER proves that your evidence was not altered or fabricated.'
    },
    {
      q: 'How does the Privacy Guardian redaction feature work?',
      a: 'Privacy Guardian automatically detects personal phone numbers, email addresses, home addresses, names, and faces in your evidence. You can apply solid black redaction blocks before exporting, ensuring you can share evidence without revealing your personal private info.'
    },
    {
      q: 'How can I report online harassment to the Indian Government?',
      a: 'You can file a formal complaint online at https://cybercrime.gov.in under the "Women / Children" cybercrime reporting section. For financial extortion or urgent cyber assistance, you can also dial the toll-free helpline 1930.'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#6556D9] uppercase tracking-wider">GUIDANCE & FAQ</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17172F] tracking-tight font-heading">
          Help and Support Center
        </h1>
        <p className="text-sm text-[#777A91] leading-relaxed">
          Find answers regarding evidence collection, AI classifications, reporting options, and emergency resources.
        </p>

        {/* Search Input */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-[#777A91] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search help topics, FAQs, and resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E9F1] rounded-2xl text-xs text-[#20213A] placeholder-[#777A91] focus:outline-none focus:border-[#6556D9] shadow-xs transition-all"
            />
          </div>
        </div>
      </div>

      {/* Emergency Callout */}
      <div className="p-6 bg-[#FEF2F2] border border-[#D95F6C]/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D95F6C] text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#17172F]">Immediate Emergency Assistance</h4>
            <p className="text-xs text-[#777A91]">Dial 112 for Police/Medical or 1930 for Cybercrime Helpline (India)</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentPage('response-navigator')}
          className="px-4 py-2 bg-[#D95F6C] hover:bg-[#C24B58] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
        >
          View Full Response Navigator
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#17172F] font-heading">Frequently Asked Questions</h3>
        {filteredFaqs.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={i}
              className="card-soft transition-all duration-150 border border-[#E8E9F1] overflow-hidden"
            >
              <div
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-[#F7F8FC] transition-colors"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#17172F]">{faq.q}</span>
                <span className="text-[#777A91] ml-2 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </div>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-[#777A91] leading-relaxed border-t border-[#E8E9F1] bg-[#F7F8FC]/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
