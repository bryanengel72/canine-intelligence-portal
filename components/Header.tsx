
import React from 'react';
import { FEATURES } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="pt-24 pb-12 px-4 max-w-6xl mx-auto text-center relative">
      {/* Decorative Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-500/5 blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="mb-10 relative">
        <h1 className="text-6xl md:text-8xl font-[900] tracking-tighter uppercase pb-2 text-gradient">
          Canine Intelligence Portal
        </h1>
        <div className="h-2 w-48 bg-gradient-to-r from-indigo-600 via-violet-500 to-rose-400 mx-auto rounded-full mt-6 shadow-lg shadow-indigo-500/10"></div>
      </div>
      
      <h2 className="text-xl md:text-2xl font-bold text-slate-400 tracking-[0.4em] uppercase mb-16 opacity-80">
        Clinical & Genetic Safeguard Protocol
      </h2>
      
      <div className="max-w-4xl mx-auto glass-card rounded-[3.5rem] p-12 shadow-2xl shadow-indigo-500/5 mb-24 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-rose-400 opacity-20"></div>
        <p className="text-2xl text-slate-700 leading-relaxed font-semibold italic relative z-10">
          "Empowering <span className="text-indigo-600">Breeders</span>, <span className="text-indigo-600">Veterinarians</span>, and <span className="text-indigo-600">Dedicated Owners</span> with the clinical intelligence required to optimize health across every bloodline."
        </p>
        <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 transition-transform group-hover:rotate-45 duration-1000">
          <i className="fa-solid fa-microscope text-[12rem]"></i>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        {FEATURES.map((feature, idx) => (
          <div 
            key={idx} 
            className="group bg-white hover:bg-indigo-950 transition-all duration-500 px-8 py-5 rounded-[2rem] flex items-center gap-4 border border-indigo-50 shadow-sm cursor-default hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-900 flex items-center justify-center transition-colors">
              <span className="text-indigo-600 group-hover:text-white text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]">
                {feature.icon}
              </span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
