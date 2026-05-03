'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';
import { indianStates } from '@/lib/data';

export default function EligibilitySection() {
  const { language } = useAppStore();
  const t = translations[language];
  const [age, setAge] = useState('');
  const [isCitizen, setIsCitizen] = useState('');
  const [state, setState] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const parsedAge = Number(age);
  const isEligible = !isNaN(parsedAge) && parsedAge >= 18 && parsedAge <= 120 && isCitizen === 'yes';

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.eligibilityTitle}</h2>
        <p className="text-sm text-slate-500">{t.eligibilitySubtitle}</p>
      </div>
      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-semibold text-slate-800 mb-2">{t.eligibilityAge} *</label>
                <input type="number" required value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" placeholder={t.eligibilityAgePlaceholder} min="1" max="120" />
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-semibold text-slate-800 mb-3">{t.eligibilityCitizenship} *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['yes', 'no'].map(val => (
                    <button key={val} type="button" onClick={() => setIsCitizen(val)} className={`p-3 rounded-xl font-semibold text-sm border transition-colors ${isCitizen === val ? (val === 'yes' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700') : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                      {val === 'yes' ? '🇮🇳 ' + t.eligibilityYes : '🌍 ' + t.eligibilityNo}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-semibold text-slate-800 mb-2">{t.eligibilityLocation}</label>
                <select value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900">
                  <option value="">Select State</option>
                  {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button type="submit" disabled={!age || !isCitizen} className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50 transition-colors">🔍 {t.eligibilityCheck}</button>
            </motion.form>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className={`p-8 rounded-2xl text-center border ${isEligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="text-6xl mb-4">{isEligible ? '🎉' : '❌'}</div>
                <h3 className={`text-xl font-bold mb-2 ${isEligible ? 'text-green-700' : 'text-red-700'}`}>{isEligible ? t.eligibilityEligible : t.eligibilityNotEligible}</h3>
                <p className="text-sm text-slate-600">{isEligible ? 'You are fully eligible to vote!' : 'You do not meet the criteria to vote yet.'}</p>
              </div>
              <button onClick={() => setSubmitted(false)} className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl shadow-sm hover:bg-slate-50 transition-colors">← Check Again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
