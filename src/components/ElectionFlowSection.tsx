'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';

const steps = [
  { id: 1, icon: '📋', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  { id: 2, icon: '📢', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 3, icon: '📄', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  { id: 4, icon: '📣', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  { id: 5, icon: '🗳️', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  { id: 6, icon: '📊', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
];

export default function ElectionFlowSection() {
  const { language } = useAppStore();
  const t = translations[language];
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const getInfo = (id: number) => {
    const tKeys = [[t.flowStep1Title, t.flowStep1Desc, t.flowStep1Detail], [t.flowStep2Title, t.flowStep2Desc, t.flowStep2Detail], [t.flowStep3Title, t.flowStep3Desc, t.flowStep3Detail], [t.flowStep4Title, t.flowStep4Desc, t.flowStep4Detail], [t.flowStep5Title, t.flowStep5Desc, t.flowStep5Detail], [t.flowStep6Title, t.flowStep6Desc, t.flowStep6Detail]];
    return { title: tKeys[id-1][0], desc: tKeys[id-1][1], detail: tKeys[id-1][2] };
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-slate-50">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.flowTitle}</h2>
        <p className="text-sm text-slate-500">{t.flowSubtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {steps.map((step, idx) => {
          const info = getInfo(step.id);
          const isActive = activeStep === step.id;
          return (
            <motion.button key={step.id} onClick={() => setActiveStep(isActive ? null : step.id)} className={`w-full text-left p-5 rounded-2xl border transition-all ${isActive ? `${step.bg} ${step.border} shadow-md` : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <div className="flex gap-4 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${isActive ? 'bg-white shadow-sm' : 'bg-slate-50 border border-slate-100'}`}>{step.icon}</div>
                <div>
                  <h3 className={`font-bold text-sm mb-1 ${isActive ? step.color : 'text-slate-900'}`}>{info.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{info.desc}</p>
                </div>
              </div>
              <AnimatePresence>
                {isActive && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className={`mt-4 pt-4 border-t ${step.border}`}>
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">💡 {info.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
