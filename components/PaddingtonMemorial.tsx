
import React from 'react';

const PaddingtonMemorial: React.FC = () => {
  return (
    <footer className="mt-40 pb-32 px-4 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-rose-50/50 rounded-full blur-[120px] pointer-events-none -mb-32"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block p-12 rounded-full bg-white shadow-[0_30px_70px_rgba(244,63,94,0.2)] mb-14 border border-white/50 relative group transition-all hover:scale-110">
          <i className="fa-solid fa-heart text-6xl text-rose-500 animate-pulse"></i>

          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-950 text-white text-[11px] font-[900] px-8 py-3 rounded-full uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(30,27,75,0.4)] z-30 whitespace-nowrap ring-8 ring-white overflow-hidden group">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 shimmer-effect opacity-20"></div>
            <span className="relative z-10">Paddington</span>
          </div>
        </div>

        <h3 className="text-4xl font-[900] uppercase tracking-[0.5em] text-gradient mb-12">
          The Paddington Initiative
        </h3>

        <div className="glass-card rounded-[4rem] p-14 md:p-20 relative shadow-2xl border border-white/90">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>

          <p className="text-3xl text-slate-700 leading-tight font-[800] italic mb-14 relative z-10 max-w-3xl mx-auto tracking-tight">
            "Dedicated to <span className="text-rose-500 underline decoration-rose-100 decoration-8 underline-offset-4">Paddington (2018–2025)</span>, whose legacy inspires our clinical protocol for <span className="text-indigo-600">vets</span>, <span className="text-indigo-600">breeders</span>, and <span className="text-indigo-600">families</span> everywhere."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative z-10">
            <a
              href="https://wearethecure.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-indigo-950 text-white px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-900 transition-all shadow-2xl hover:-translate-y-2 flex items-center gap-3"
            >
              <i className="fa-solid fa-hand-holding-heart text-rose-400"></i>
              Cancer Research Fund
            </a>
            <div className="hidden md:block w-3 h-3 rounded-full bg-rose-100"></div>
            <span className="text-[12px] font-black text-indigo-950/50 uppercase tracking-[0.4em]">
              Precision Longevity
            </span>
          </div>

          <div className="absolute -bottom-20 -right-20 opacity-[0.03] rotate-45 pointer-events-none">
            <i className="fa-solid fa-paw text-[25rem] text-indigo-950"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PaddingtonMemorial;
