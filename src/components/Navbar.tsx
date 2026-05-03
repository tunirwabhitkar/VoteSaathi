'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';

export default function Navbar() {
  const { language, setLanguage, activeTab, setActiveTab, showApp, setShowApp } = useAppStore();
  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'chat', label: t.navChat, icon: '🤖' },
    { id: 'flow', label: t.navFlow, icon: '🏛️' },
    { id: 'eligibility', label: t.navEligibility, icon: '✅' },
    { id: 'simulator', label: t.navSimulator, icon: '📝' },
    { id: 'quiz', label: t.navQuiz, icon: '🧠' },
    { id: 'map', label: t.navMap, icon: '📍' },
  ];

  return (
    <nav className="sticky top-0 z-40 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.02 }} onClick={() => setShowApp(false)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm shrink-0">
              <span className="text-white text-xl">🗳️</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-slate-900 font-bold text-lg leading-tight tracking-tight">{t.appName}</p>
              <p className="text-xs text-slate-500 font-medium">{t.appTagline}</p>
            </div>
          </motion.div>

          <div className="hidden md:flex lg:hidden items-center gap-2">
            {showApp && navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <span>{item.icon}</span> {item.label}
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                <span>🌐</span> <span className="uppercase">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden py-1">
                <button onClick={() => setLanguage('en')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'en' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'}`}>English</button>
                <button onClick={() => setLanguage('hi')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'hi' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'}`}>हिंदी (Hindi)</button>
                <button onClick={() => setLanguage('bn')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'bn' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'}`}>বাংলা (Bengali)</button>
                <button onClick={() => setLanguage('te')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'te' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'}`}>తెలుగు (Telugu)</button>
                <button onClick={() => setLanguage('mr')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'mr' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'}`}>मराठी (Marathi)</button>
                <button onClick={() => setLanguage('ta')} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${language === 'ta' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'}`}>தமிழ் (Tamil)</button>
              </div>
            </div>
            <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-slate-100 overflow-hidden">
              <div className="py-3 flex flex-col gap-2">
                {showApp && navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-50 text-slate-600 border border-transparent'}`}>
                      <span className="text-lg">{item.icon}</span> {item.label}
                    </button>
                  );
                })}
                {showApp && (
                  <button onClick={() => { setShowApp(false); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-600 mt-2">
                    ← Back to Dashboard
                  </button>
                )}
                {!showApp && (
                  <div className="px-4 py-2 text-sm text-slate-500 text-center">
                    Click "Start Chatting" or "Check My Eligibility" to begin.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
