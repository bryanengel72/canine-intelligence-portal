
import React, { useEffect } from 'react';
import Header from './components/Header';
import SelectionForm from './components/SelectionForm';
import ReportView from './components/ReportView';
import PaddingtonMemorial from './components/PaddingtonMemorial';
import { FinalIntelligenceReport, DogProfile, DogSize, Generation } from './types';
import { generateCarePlan } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [report, setReport] = React.useState<FinalIntelligenceReport | null>(null);
  const [profile, setProfile] = React.useState<DogProfile | null>(null);

  const handleGenerate = async (selectedProfile: DogProfile) => {
    setLoading(true);
    setProfile(selectedProfile);
    try {
      const result = await generateCarePlan(selectedProfile);
      setReport(result);
      setTimeout(() => {
        const element = document.getElementById('report-start');
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err) {
      console.error(err);
      alert("Our intelligence systems are experiencing high demand. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  // Handle URL parameters for shared links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const breed = params.get('breed');
    const size = params.get('size');
    const gen = params.get('gen');

    if (breed && size && gen) {
      const sharedProfile: DogProfile = {
        breed: decodeURIComponent(breed),
        size: size as DogSize,
        generation: gen as Generation
      };
      handleGenerate(sharedProfile);
    }
  }, []);

  return (
    <div className="min-h-screen text-slate-900 selection:bg-indigo-950 selection:text-white pb-10">
      {/* "Outside the Box" Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-indigo-950 flex flex-col items-center justify-center animate-fadeIn">
          <div className="absolute inset-0 opacity-10 intelligence-grid"></div>
          
          <div className="relative w-64 h-64 mb-12">
            {/* Pulsating Ring */}
            <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping"></div>
            <div className="absolute inset-4 border-2 border-indigo-400/20 rounded-full animate-pulse"></div>
            
            {/* Central Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-dna text-6xl text-indigo-400 animate-float"></i>
            </div>

            {/* Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="text-center space-y-4 relative z-10">
            <h3 className="text-2xl font-black text-white uppercase tracking-[0.4em]">Initializing Protocol</h3>
            <p className="text-indigo-300 font-bold tracking-widest text-xs uppercase opacity-60">Synchronizing Genetic Intelligence...</p>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes scan {
              0% { top: 0; opacity: 0; }
              50% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
          `}} />
        </div>
      )}

      <Header />

      <main className="relative z-10">
        <SelectionForm onGenerate={handleGenerate} isLoading={loading} />

        {report && profile && (
          <div id="report-start" className="container mx-auto px-4 pb-20 scroll-mt-20">
            <ReportView report={report} profile={profile} />
          </div>
        )}
      </main>

      <PaddingtonMemorial />
    </div>
  );
};

export default App;
