'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { translations } from '@/lib/translations';
import { quizQuestions } from '@/lib/data';

export default function QuizSection() {
  const { language } = useAppStore();
  const t = translations[language];
  const questions = quizQuestions[language];
  const [currentQ, setCurrentQ] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  if (!playing) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-slate-50">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-md w-full">
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.quizTitle}</h2>
          <p className="text-slate-500 mb-8">{t.quizSubtitle}</p>
          <button onClick={() => { setPlaying(true); setCurrentQ(0); setSelected(null); }} className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors">🚀 {t.quizStart}</button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="h-full p-6 bg-slate-50 overflow-y-auto flex flex-col items-center">
      <div className="w-full max-w-xl">
        <div className="mb-6 flex justify-between text-sm font-semibold text-slate-500">
          <span>Question {currentQ + 1} of {questions.length}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
          <h3 className="text-lg font-semibold text-slate-900">{q.question}</h3>
        </div>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button key={idx} onClick={() => setSelected(idx)} disabled={selected !== null} className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${selected === null ? 'bg-white border-slate-200 hover:border-blue-300 text-slate-700' : (idx === q.correct ? 'bg-green-50 border-green-500 text-green-700' : (selected === idx ? 'bg-red-50 border-red-500 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-400 opacity-50'))}`}>
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${selected === null ? 'bg-slate-100 text-slate-600' : (idx === q.correct ? 'bg-green-200 text-green-800' : (selected === idx ? 'bg-red-200 text-red-800' : 'bg-slate-200'))}`}>{['A','B','C','D'][idx]}</span>
              <span className="font-medium">{opt}</span>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="mt-8">
            <button onClick={() => { if(currentQ < questions.length - 1) { setCurrentQ(c=>c+1); setSelected(null); } else setPlaying(false); }} className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700">{currentQ < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}</button>
          </div>
        )}
      </div>
    </div>
  );
}
