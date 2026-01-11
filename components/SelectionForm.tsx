
import React from 'react';
import { DogProfile, DogSize, Generation } from '../types';
import { BREED_CATEGORIES } from '../constants';

interface SelectionFormProps {
  onGenerate: (profile: DogProfile) => void;
  isLoading: boolean;
}

const SelectionForm: React.FC<SelectionFormProps> = ({ onGenerate, isLoading }) => {
  const [profile, setProfile] = React.useState<DogProfile>({
    breed: '',
    size: DogSize.MEDIUM,
    generation: Generation.F1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.breed) {
      onGenerate(profile);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8 mb-24">
      <form 
        onSubmit={handleSubmit} 
        className="bg-indigo-950 rounded-[4rem] p-12 md:p-20 shadow-[0_40px_100px_rgba(30,27,75,0.2)] relative overflow-hidden"
      >
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="group">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300/60 mb-4 group-hover:text-indigo-200 transition-colors">
              Genetic Profile Analysis
            </label>
            <select 
              className="w-full bg-indigo-900/40 border border-indigo-700/50 text-white rounded-2xl p-5 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236366f1\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em' }}
              value={profile.breed}
              onChange={(e) => setProfile({ ...profile, breed: e.target.value })}
              required
            >
              <option value="" className="bg-indigo-950">Select Specimen Breed</option>
              {BREED_CATEGORIES.map(cat => (
                <optgroup key={cat.name} label={cat.name} className="bg-indigo-950 font-black py-4">
                  {cat.breeds.map(b => <option key={b} value={b} className="bg-indigo-900 font-medium">{b}</option>)}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300/60 mb-4">
              Physical Magnitude
            </label>
            <select 
              className="w-full bg-indigo-900/40 border border-indigo-700/50 text-white rounded-2xl p-5 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236366f1\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em' }}
              value={profile.size}
              onChange={(e) => setProfile({ ...profile, size: e.target.value as DogSize })}
            >
              {Object.values(DogSize).map(s => <option key={s} value={s} className="bg-indigo-900">{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300/60 mb-4">
              Pedigree & Lineage
            </label>
            <select 
              className="w-full bg-indigo-900/40 border border-indigo-700/50 text-white rounded-2xl p-5 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236366f1\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em' }}
              value={profile.generation}
              onChange={(e) => setProfile({ ...profile, generation: e.target.value as Generation })}
            >
              {Object.values(Generation).map(g => <option key={g} value={g} className="bg-indigo-900">{g}</option>)}
            </select>
          </div>
        </div>

        <div className="text-center relative z-10">
          <button 
            disabled={isLoading || !profile.breed}
            className={`
              min-w-[320px] px-16 py-6 rounded-3xl text-lg font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl
              ${isLoading 
                ? 'bg-indigo-800/50 text-indigo-400 cursor-not-allowed border border-indigo-700/30' 
                : 'bg-white text-indigo-950 hover:bg-indigo-50 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.2)] active:translate-y-0'}
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <i className="fa-solid fa-atom animate-spin"></i> Processing...
              </span>
            ) : 'Analyze Parameters'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SelectionForm;
