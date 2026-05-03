'use client';
import { useState, useRef, useCallback } from 'react';
import { useAppStore } from '@/store/appStore';

// Map app language codes to BCP 47 speech synthesis language tags
const LANG_MAP: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
};

// Maximum characters per speech chunk (avoids the Chrome 15-second cutoff bug)
const CHUNK_SIZE = 800;

export default function TopBar() {
  const { fontSize, setFontSize, highContrast, setHighContrast, language } = useAppStore();
  const [readerState, setReaderState] = useState<'idle' | 'reading' | 'paused'>('idle');
  const [speed, setSpeed] = useState(1.0);
  const [statusMsg, setStatusMsg] = useState('');
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef(0);

  const handleDecreaseFont = () => setFontSize(Math.max(12, fontSize - 2));
  const handleResetFont = () => setFontSize(16);
  const handleIncreaseFont = () => setFontSize(Math.min(24, fontSize + 2));

  // Extract meaningful text from the page, skipping navigation, buttons, and hidden elements
  const extractPageText = useCallback((): string => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return document.body.innerText;

    const walker = document.createTreeWalker(
      mainContent,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          // Skip hidden, aria-hidden, buttons, navs, and script/style
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'svg'].includes(tag)) return NodeFilter.FILTER_REJECT;
          if (parent.closest('[aria-hidden="true"]')) return NodeFilter.FILTER_REJECT;
          if (parent.closest('nav')) return NodeFilter.FILTER_REJECT;
          const style = window.getComputedStyle(parent);
          if (style.display === 'none' || style.visibility === 'hidden') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const textParts: string[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = (node.textContent || '').trim();
      if (text.length > 1) textParts.push(text);
    }
    return textParts.join('. ').replace(/\.{2,}/g, '.').replace(/\s{2,}/g, ' ');
  }, []);

  // Split text into sentence-aware chunks
  const splitIntoChunks = (text: string): string[] => {
    const chunks: string[] = [];
    let remaining = text;
    while (remaining.length > 0) {
      if (remaining.length <= CHUNK_SIZE) {
        chunks.push(remaining);
        break;
      }
      // Find the last sentence boundary within CHUNK_SIZE
      let breakPoint = remaining.lastIndexOf('. ', CHUNK_SIZE);
      if (breakPoint < CHUNK_SIZE * 0.3) breakPoint = remaining.lastIndexOf(' ', CHUNK_SIZE);
      if (breakPoint <= 0) breakPoint = CHUNK_SIZE;
      chunks.push(remaining.slice(0, breakPoint + 1));
      remaining = remaining.slice(breakPoint + 1).trimStart();
    }
    return chunks;
  };

  // Check if speech synthesis is available
  const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Speak the next chunk in the queue
  const speakNextChunk = useCallback(() => {
    if (!hasSpeech) return;
    if (chunkIndexRef.current >= chunksRef.current.length) {
      setReaderState('idle');
      setStatusMsg('Reading complete');
      setTimeout(() => setStatusMsg(''), 3000);
      return;
    }

    const text = chunksRef.current[chunkIndexRef.current];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_MAP[language] || 'en-IN';
    utterance.rate = speed;
    utterance.pitch = 1.0;

    // Try to find a matching voice for the language
    try {
      const voices = window.speechSynthesis.getVoices();
      const langTag = LANG_MAP[language] || 'en-IN';
      const matchedVoice = voices.find(v => v.lang === langTag) || voices.find(v => v.lang.startsWith(langTag.split('-')[0]));
      if (matchedVoice) utterance.voice = matchedVoice;
    } catch { /* voices may not be available yet */ }

    utterance.onend = () => {
      chunkIndexRef.current += 1;
      speakNextChunk();
    };
    utterance.onerror = () => {
      setReaderState('idle');
      setStatusMsg('Error reading');
      setTimeout(() => setStatusMsg(''), 3000);
    };

    window.speechSynthesis.speak(utterance);
    setStatusMsg(`Reading ${chunkIndexRef.current + 1}/${chunksRef.current.length}`);
  }, [language, speed, hasSpeech]);

  const startReading = useCallback(() => {
    if (!hasSpeech) {
      setStatusMsg('Speech not supported on this device');
      setTimeout(() => setStatusMsg(''), 3000);
      return;
    }
    window.speechSynthesis.cancel();
    const text = extractPageText();
    if (!text.trim()) {
      setStatusMsg('No content to read');
      setTimeout(() => setStatusMsg(''), 3000);
      return;
    }
    chunksRef.current = splitIntoChunks(text);
    chunkIndexRef.current = 0;
    setReaderState('reading');
    speakNextChunk();
  }, [extractPageText, speakNextChunk, hasSpeech]);

  const stopReading = () => {
    if (hasSpeech) window.speechSynthesis.cancel();
    setReaderState('idle');
    setStatusMsg('');
    chunksRef.current = [];
    chunkIndexRef.current = 0;
  };

  const pauseReading = () => {
    if (hasSpeech) window.speechSynthesis.pause();
    setReaderState('paused');
    setStatusMsg('Paused');
  };

  const resumeReading = () => {
    if (hasSpeech) window.speechSynthesis.resume();
    setReaderState('reading');
  };

  const cycleSpeed = () => {
    const speeds = [0.7, 0.85, 1.0, 1.2, 1.5];
    const currentIdx = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIdx + 1) % speeds.length];
    setSpeed(nextSpeed);
    setStatusMsg(`Speed: ${nextSpeed}x`);
    setTimeout(() => {
      if (readerState !== 'idle') setStatusMsg(`Reading ${chunkIndexRef.current + 1}/${chunksRef.current.length}`);
      else setStatusMsg('');
    }, 1500);
  };

  const handleMainAction = () => {
    if (readerState === 'idle') startReading();
    else if (readerState === 'reading') pauseReading();
    else if (readerState === 'paused') resumeReading();
  };

  return (
    <div className="w-full bg-slate-900 text-slate-200 py-1.5 px-4 sm:px-8 text-xs font-medium flex flex-wrap items-center justify-between z-50 relative" role="navigation" aria-label="Accessibility Options">
      {/* ARIA live region for screen reader status */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{statusMsg}</div>

      <div className="flex items-center gap-2">
        {/* Play / Pause */}
        <button
          onClick={handleMainAction}
          className={`transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-2.5 py-1 flex items-center gap-1.5 ${
            readerState === 'reading' ? 'bg-blue-600 text-white animate-pulse' :
            readerState === 'paused' ? 'bg-amber-600 text-white' :
            'hover:text-white hover:bg-slate-700'
          }`}
          aria-label={readerState === 'idle' ? 'Start Screen Reader' : readerState === 'reading' ? 'Pause Screen Reader' : 'Resume Screen Reader'}
        >
          {readerState === 'idle' && (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M8 10v4m-4-2h8" /></svg>
          )}
          {readerState === 'reading' && (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          )}
          {readerState === 'paused' && (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
          )}
          <span className="hidden sm:inline">
            {readerState === 'idle' ? '🔊 Read Aloud' : readerState === 'reading' ? 'Pause' : '▶ Resume'}
          </span>
        </button>

        {/* Stop (only when active) */}
        {readerState !== 'idle' && (
          <button
            onClick={stopReading}
            className="hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-2 py-1 flex items-center gap-1"
            aria-label="Stop reading"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
            <span className="hidden sm:inline">Stop</span>
          </button>
        )}

        {/* Speed control */}
        <button
          onClick={cycleSpeed}
          className="hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md px-2 py-1 text-[10px] font-bold tabular-nums"
          aria-label={`Reading speed ${speed}x. Click to change.`}
        >
          {speed}x
        </button>

        {/* Status indicator */}
        {statusMsg && (
          <span className="text-[10px] text-slate-400 hidden sm:inline ml-1">{statusMsg}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-800 rounded px-1" role="group" aria-label="Font size controls">
          <button onClick={handleDecreaseFont} className="w-6 h-6 flex items-center justify-center hover:bg-slate-700 hover:text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Decrease font size">A-</button>
          <button onClick={handleResetFont} className="w-6 h-6 flex items-center justify-center hover:bg-slate-700 hover:text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Reset font size">A</button>
          <button onClick={handleIncreaseFont} className="w-6 h-6 flex items-center justify-center hover:bg-slate-700 hover:text-white rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Increase font size">A+</button>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center gap-1" role="group" aria-label="Contrast controls">
          <button onClick={() => setHighContrast(false)} className={`w-5 h-5 rounded-full border-2 ${!highContrast ? 'border-blue-400' : 'border-slate-600'} bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`} aria-label="Standard contrast"></button>
          <button onClick={() => setHighContrast(true)} className={`w-5 h-5 rounded-full border-2 ${highContrast ? 'border-yellow-400' : 'border-slate-600'} bg-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`} aria-label="High contrast"></button>
        </div>
      </div>
    </div>
  );
}
