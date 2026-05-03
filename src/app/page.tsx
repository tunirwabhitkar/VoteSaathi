'use client';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ChatSection from '@/components/ChatSection';
import ElectionFlowSection from '@/components/ElectionFlowSection';
import EligibilitySection from '@/components/EligibilitySection';
import QuizSection from '@/components/QuizSection';
import MapSection from '@/components/MapSection';
import RegistrationSimulator from '@/components/RegistrationSimulator';
import TopBar from '@/components/TopBar';
import { useEffect } from 'react';

const tabConfig = [
  { id: 'chat', icon: '🤖', component: ChatSection },
  { id: 'flow', icon: '🏛️', component: ElectionFlowSection },
  { id: 'eligibility', icon: '✅', component: EligibilitySection },
  { id: 'simulator', icon: '📝', component: RegistrationSimulator },
  { id: 'quiz', icon: '🧠', component: QuizSection },
  { id: 'map', icon: '📍', component: MapSection },
];

export default function Home() {
  const { activeTab, setActiveTab, language, showApp, setShowApp, fontSize, highContrast } = useAppStore();
  const t = translations[language];
  const appRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = (tab: string = 'chat') => {
    setShowApp(true);
    setActiveTab(tab);
    setTimeout(() => {
      appRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const currentTab = tabConfig.find((tab) => tab.id === activeTab);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply font size globally
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    // Apply high contrast theme
    if (highContrast) {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [fontSize, highContrast]);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" id="main-content">
      <TopBar />
      <Navbar />

      <main className="flex-1">
        {!showApp && <HeroSection onGetStarted={handleGetStarted} />}

        {showApp && (
          <div ref={appRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6" style={{ minHeight: 'calc(100dvh - 64px)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 sm:gap-6">
              {/* Left Sidebar Layout */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-3">
                  {/* Brand Card */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">🗳️</div>
                      <div>
                        <p className="text-slate-900 font-bold text-sm leading-tight">{t.appName}</p>
                        <p className="text-xs text-slate-500 font-medium">{t.appTagline}</p>
                      </div>
                    </div>
                    {/* Subtle Indian Tricolor divider */}
                    <div className="flex h-1 rounded-full overflow-hidden opacity-80">
                      <div className="flex-1 bg-orange-500" />
                      <div className="flex-1 bg-slate-200" />
                      <div className="flex-1 bg-green-600" />
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {tabConfig.map((tab) => {
                      const navLabels: Record<string, string> = { chat: t.navChat, flow: t.navFlow, eligibility: t.navEligibility, quiz: t.navQuiz, map: t.navMap, simulator: t.navSimulator };
                      const isActive = activeTab === tab.id;
                      return (
                        <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-transparent text-slate-600 hover:bg-white hover:border-slate-200 border border-transparent'}`} whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
                          <span className="text-lg">{tab.icon}</span>
                          <span className="text-sm font-semibold">{navLabels[tab.id]}</span>
                          {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button onClick={() => setShowApp(false)} className="w-full mt-6 text-xs font-semibold py-2.5 rounded-xl text-slate-500 bg-transparent border border-slate-200 hover:bg-slate-100 transition-colors">
                    ← Back to Dashboard
                  </motion.button>
                </div>
              </div>

              {/* Mobile Tab Navigation */}
              <div className="lg:hidden flex overflow-x-auto pb-3 mb-2 -mx-4 px-4 hide-scrollbar snap-x snap-mandatory">
                <div className="flex gap-2 min-w-max">
                  {tabConfig.map((tab) => {
                    const navLabels: Record<string, string> = { chat: t.navChat, flow: t.navFlow, eligibility: t.navEligibility, quiz: t.navQuiz, map: t.navMap, simulator: t.navSimulator };
                    const isActive = activeTab === tab.id;
                    return (
                      <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)} 
                        className={`snap-start flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                          isActive 
                            ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-600/20' 
                            : 'bg-white text-slate-600 border border-slate-200 shadow-sm hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-base">{tab.icon}</span>
                        <span>{navLabels[tab.id]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm h-[calc(100dvh-180px)] sm:h-[calc(100dvh-150px)] lg:h-[calc(100dvh-120px)]">
                <AnimatePresence mode="wait">
                  {currentTab && (
                    <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} style={{ height: '100%' }}>
                      <currentTab.component />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="py-8 px-4 text-center border-t border-slate-200 bg-white mt-auto">
        <p className="text-xs font-medium text-slate-600 mb-1">{t.footerRights}</p>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">{t.footerDisclaimer}</p>
      </footer>
    </div>
  );
}
