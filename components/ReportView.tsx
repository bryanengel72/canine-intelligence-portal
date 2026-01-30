
import React, { useState } from 'react';
import { FinalIntelligenceReport, ReportSection, ReportEntry, SubGuide, DogProfile } from '../types';

interface ReportViewProps {
  report: FinalIntelligenceReport;
  profile: DogProfile;
}

const EntryRenderer: React.FC<{ entry: ReportEntry; isAlert?: boolean }> = ({ entry, isAlert }) => (
  <div className={`mb-12 last:mb-0 break-inside-avoid ${isAlert ? 'border-l-4 border-rose-500 pl-8 bg-rose-50/20 p-8 rounded-r-[3rem]' : 'border-l-2 border-slate-200 pl-8'}`}>
    <h5 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${isAlert ? 'text-rose-600' : 'text-indigo-500'}`}>
      {isAlert && <i className="fa-solid fa-circle-exclamation mr-2"></i>}
      {entry.label}
    </h5>
    {entry.value && <p className={`leading-relaxed font-bold text-lg md:text-xl mb-6 ${isAlert ? 'text-rose-950' : 'text-slate-900'}`} dangerouslySetInnerHTML={{ __html: entry.value }}></p>}
    {entry.items && entry.items.length > 0 && (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {entry.items.map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-slate-700 text-sm md:text-base leading-relaxed bg-white/50 p-4 rounded-2xl border border-slate-100">
            <i className={`fa-solid ${isAlert ? 'fa-shield-heart text-rose-300' : 'fa-circle-check text-indigo-200'} text-[11px] mt-1.5`}></i>
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
    )}
    {entry.pairs && entry.pairs.length > 0 && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
        {entry.pairs.map((pair, i) => (
          <div key={i} className={`p-6 rounded-3xl border transition-all ${isAlert ? 'bg-white border-rose-100 shadow-sm' : 'bg-indigo-50/30 border-indigo-100/50'}`}>
            <span className={`block text-[8px] font-black uppercase tracking-widest mb-2 ${isAlert ? 'text-rose-400' : 'text-indigo-400'}`}>{pair.k}</span>
            <span className={`text-[14px] font-black leading-tight ${isAlert ? 'text-rose-950' : 'text-indigo-950'}`}>{pair.v}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const SectionCard: React.FC<{ section: ReportSection; isSpecial?: boolean }> = ({ section, isSpecial }) => (
  <div className={`bg-white border rounded-[4rem] p-12 md:p-16 shadow-sm transition-all hover:shadow-2xl group ${isSpecial ? 'border-rose-100 shadow-rose-500/5 hover:shadow-rose-500/10' : 'border-indigo-50/50 hover:shadow-indigo-500/5'}`}>
    <div className="flex items-center gap-5 mb-12 border-b border-slate-50 pb-8">
      <div className={`w-14 h-14 rounded-3xl flex items-center justify-center ${isSpecial ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-600'}`}>
        <i className={`fa-solid ${isSpecial ? 'fa-calendar-check' : 'fa-list-check'} text-2xl`}></i>
      </div>
      <h4 className={`text-3xl font-[900] uppercase tracking-tighter ${isSpecial ? 'text-rose-950' : 'text-indigo-950'}`}>
        {section.title}
      </h4>
    </div>
    <div className="space-y-12">
      {section.entries.map((entry, i) => (
        <EntryRenderer key={i} entry={entry} isAlert={isSpecial} />
      ))}
    </div>
  </div>
);

const ReportView: React.FC<ReportViewProps> = ({ report, profile }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'behavior' | 'health' | 'nutrition' | 'preventative'>('preventative');
  const [copied, setCopied] = useState(false);

  const guides = {
    preventative: { data: report.preventativeCare, icon: 'fa-user-doctor', color: 'rose', label: 'Life-Stage Protocol' },
    health: { data: report.healthInfo, icon: 'fa-shield-heart', color: 'rose', label: 'Clinical Health' },
    profile: { data: report.basicInfo, icon: 'fa-dna', color: 'blue', label: 'Biological History' },
    behavior: { data: report.behaviorInfo, icon: 'fa-brain', color: 'indigo', label: 'Cognitive & Mind' },
    nutrition: { data: report.nutritionInfo, icon: 'fa-flask', color: 'amber', label: 'Nutrition & Portioning' }
  };

  const handleDownload = () => window.print();

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?breed=${encodeURIComponent(profile.breed)}&size=${profile.size}&gen=${profile.generation}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: report.title, url: shareUrl });
      } catch (err) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const activeGuide = guides[activeTab];

  return (
    <div className="max-w-7xl mx-auto animate-fadeIn mt-12 relative px-4">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { margin: 1.2cm; size: A4; }
          body { background: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #printable-report, #printable-report * { visibility: visible; }
          #printable-report { position: absolute; left: 0; top: 0; width: 100%; display: block !important; padding: 0 !important; }
          .no-print { display: none !important; }
        }
      `}} />

      {/* Hero Header */}
      <div className="bg-[#1e1b4b] text-white p-14 md:p-24 rounded-[4.5rem] mb-12 relative overflow-hidden shadow-2xl no-print border border-white/5">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none rotate-12">
          <i className="fa-solid fa-stethoscope text-[20rem]"></i>
        </div>

        <div className="relative z-10">
          <div className="max-w-6xl mb-16">
            <h2 className="text-5xl md:text-7xl font-[900] uppercase tracking-tighter mb-12 leading-[0.85]">
              {report.title}
            </h2>
            <p className="text-indigo-100/90 text-2xl md:text-4xl font-bold leading-[1.45] italic border-l-8 border-indigo-500/50 pl-10 tracking-tight" dangerouslySetInnerHTML={{ __html: report.introduction }}>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 justify-start mt-20">
            <button
              onClick={handleShare}
              className="bg-indigo-950 text-white border border-white/10 px-12 py-7 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-900 transition-all shadow-xl flex items-center gap-4 group"
            >
              <i className="fa-solid fa-share-nodes text-lg group-hover:scale-110 transition-transform"></i>
              {copied ? 'Link Copied' : 'Share Report'}
            </button>
            <button
              onClick={handleDownload}
              className="bg-white text-indigo-950 px-14 py-7 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-50 transition-all shadow-2xl flex items-center gap-4 border border-white group"
            >
              <i className="fa-solid fa-file-pdf text-lg text-indigo-600 group-hover:scale-110 transition-transform"></i>
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="no-print">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-20 bg-white/70 p-5 rounded-[5rem] border border-white shadow-2xl backdrop-blur-2xl">
          {(Object.keys(guides) as Array<keyof typeof guides>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                flex-1 min-w-[180px] flex flex-col items-center justify-center gap-3 py-8 px-6 rounded-[3.5rem] transition-all cursor-pointer
                ${activeTab === key
                  ? 'bg-indigo-950 text-white shadow-2xl scale-[1.03]'
                  : 'text-indigo-950/40 hover:text-indigo-950 hover:bg-white/90'}
              `}
            >
              <i className={`fa-solid ${guides[key].icon} text-2xl mb-1`}></i>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-center leading-tight">{guides[key].label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-20 min-h-[600px]">
          <div className="px-12 flex items-center gap-8">
            <div className={`w-4 h-4 rounded-full ${activeTab === 'preventative' || activeTab === 'nutrition' || activeTab === 'health' ? 'bg-rose-500 animate-pulse' : 'bg-indigo-500'}`}></div>
            <h3 className={`text-4xl md:text-5xl font-[900] uppercase tracking-tighter ${activeTab === 'preventative' || activeTab === 'nutrition' || activeTab === 'health' ? 'text-rose-600' : 'text-indigo-950'}`}>
              {activeGuide.data.title}
            </h3>
            <span className={`h-1 flex-1 rounded-full ${activeTab === 'preventative' || activeTab === 'nutrition' || activeTab === 'health' ? 'bg-rose-100' : 'bg-slate-100'}`}></span>
          </div>

          <div className="px-12 max-w-5xl">
            <p className="text-xl md:text-2xl text-slate-600 font-bold italic leading-relaxed mb-4 border-l-4 border-slate-200 pl-8" dangerouslySetInnerHTML={{ __html: activeGuide.data.description }}>
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            {activeGuide.data.sections.map((section, idx) => (
              <SectionCard
                key={idx}
                section={section}
                isSpecial={activeTab === 'preventative' || activeTab === 'health' || activeTab === 'nutrition'}
              />
            ))}
          </div>
        </div>
      </div>

      <div id="printable-report" className="hidden">
        <h1 className="text-4xl font-bold mb-8">{report.title}</h1>
        <p className="mb-12 italic leading-relaxed">{report.introduction}</p>
      </div>
    </div>
  );
};

export default ReportView;
