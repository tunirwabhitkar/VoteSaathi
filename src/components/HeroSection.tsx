'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';

export default function HeroSection({ onGetStarted }: { onGetStarted: (tab?: string) => void }) {
  const { language } = useAppStore();
  const t = translations[language];
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 py-12 text-center bg-gradient-to-b from-slate-50 to-blue-50/50">
      <motion.div initial={mounted ? { opacity: 0, y: 20 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          {t.appName}
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
          {t.heroTitle}
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          {t.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <motion.button onClick={() => onGetStarted('chat')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-sm transition-all" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <span>💬</span> {t.heroStartChat}
          </motion.button>
          <motion.button onClick={() => onGetStarted('eligibility')} className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl text-lg font-semibold shadow-sm transition-all" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <span>✅</span> {t.heroCheckEligibility}
          </motion.button>
        </div>
      </motion.div>

      <motion.div initial={mounted ? { opacity: 0, y: 30 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { title: t.navChat, icon: '🤖', desc: 'AI Assistant', color: 'bg-blue-50', iconColor: 'text-blue-600' },
          { title: t.navFlow, icon: '🏛️', desc: 'Step-by-step', color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
          { title: t.navEligibility, icon: '✅', desc: 'Voter criteria', color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
          { title: t.navQuiz, icon: '🧠', desc: 'Test knowledge', color: 'bg-purple-50', iconColor: 'text-purple-600' }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
              <span className="text-2xl">{feature.icon}</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
            <p className="text-xs text-slate-500">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
