'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, Message } from '@/store/appStore';
import { translations } from '@/lib/translations';
import toast from 'react-hot-toast';

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-lg font-bold mt-4 mb-2 text-slate-900">{line.replace('## ', '')}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-base font-semibold mt-3 mb-1 text-slate-800">{line.replace('### ', '')}</h3>);
    } else if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(<p key={i} className="font-semibold mt-2 text-slate-800">{line.replace(/\*\*/g, '')}</p>);
    } else if (line.startsWith('- ') || line.startsWith('• ')) {
      elements.push(<li key={i} className="ml-5 text-sm text-slate-700 list-disc">{formatInline(line.replace(/^[-•] /, ''))}</li>);
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(<li key={i} className="ml-5 text-sm text-slate-700 list-decimal">{formatInline(line.replace(/^\d+\.\s/, ''))}</li>);
    } else if (line.startsWith('| ')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        if (!lines[i].includes('---')) rows.push(lines[i].split('|').filter(c => c.trim()));
        i++;
      }
      elements.push(
        <div key={`table-`+i} className="overflow-x-auto my-3 rounded-lg border border-slate-200 shadow-sm">
          <table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-700"><tr>{rows[0]?.map((cell, ci) => <th key={ci} className="px-4 py-2 font-semibold border-b border-slate-200">{cell.trim()}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, ri) => (<tr key={ri} className="border-b border-slate-100 last:border-0 bg-white">{row.map((cell, ci) => <td key={ci} className="px-4 py-2 text-slate-600">{formatInline(cell.trim())}</td>)}</tr>))}</tbody></table>
        </div>
      );
      continue;
    } else if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      elements.push(<p key={i} className="text-sm text-slate-700 my-1 leading-relaxed">{formatInline(line)}</p>);
    }
    i++;
  }
  return <div className="space-y-1">{elements}</div>;
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i} className="italic text-slate-800">{part.slice(1, -1)}</em>;
    return part;
  });
}

export default function ChatSection() {
  const { language, messages, addMessage, clearMessages, isEli5Mode, toggleEli5Mode, isChatLoading, setChatLoading, userAge } = useAppStore();
  const t = translations[language];
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isChatLoading]);

  useEffect(() => {
    // Inject the welcome message on load, or update it if the language changes
    const state = useAppStore.getState();
    const currentMessages = state.messages;
    
    // We only update the welcome message if the chat is completely empty or ONLY has the welcome message
    if (currentMessages.length === 0 || (currentMessages.length === 1 && currentMessages[0].role === 'assistant')) {
      state.clearMessages();
      state.addMessage({ id: `welcome-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, role: 'assistant', content: t.chatWelcome, timestamp: new Date() });
    }
  }, [language, t.chatWelcome]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isChatLoading) return;
    addMessage({ id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, role: 'user', content: trimmed, timestamp: new Date() });
    setInputValue('');
    setChatLoading(true);
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: trimmed, isEli5Mode, userAge, language }) });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      addMessage({ id: `assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, role: 'assistant', content: data.response, timestamp: new Date() });
    } catch {
      toast.error('Failed to get response.');
      addMessage({ id: `err-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, role: 'assistant', content: 'Error occurred. Please try again.', timestamp: new Date() });
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <div className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bg-white border-b border-slate-200 z-10">
        <div>
          <h2 className="font-bold text-slate-900 text-sm sm:text-base">{t.chatTitle}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500">{t.chatSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button onClick={toggleEli5Mode} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isEli5Mode ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-slate-100 text-slate-600 border border-transparent'}`} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            🧒 {t.chatEli5Mode}
          </motion.button>
          <motion.button onClick={() => { 
            const state = useAppStore.getState();
            state.clearMessages(); 
            state.addMessage({ id: `welcome-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, role: 'assistant', content: t.chatWelcome, timestamp: new Date() }); 
          }} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" whileHover={{ scale: 1.05 }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </motion.button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mr-3 mt-1 shadow-sm">
                  <span className="text-white text-xs">🤖</span>
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'}`}>
                {msg.role === 'user' ? <p className="text-sm">{msg.content}</p> : <MarkdownContent content={msg.content} />}
                <p className={`text-[10px] mt-2 text-right ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isChatLoading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm"><span className="text-white text-xs">🤖</span></div>
            <div className="px-5 py-4 bg-white border border-slate-200 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1.5 items-center">
                {[0, 1, 2].map((i) => <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-400" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }} />)}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {messages.length <= 1 && (
        <div className="px-4 sm:px-6 pb-2 pt-2 flex overflow-x-auto gap-2 hide-scrollbar snap-x">
          {[t.chatSuggestion1, t.chatSuggestion2, t.chatSuggestion3, t.chatSuggestion4].map((s, i) => (
            <motion.button key={i} onClick={() => sendMessage(s)} className="text-xs px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm whitespace-nowrap snap-start flex-shrink-0" whileHover={{ scale: 1.02 }}>{s}</motion.button>
          ))}
        </div>
      )}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 bg-slate-50">
        <div className="flex gap-2 items-end p-1.5 sm:p-2 rounded-xl bg-white border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); } }} placeholder={t.chatPlaceholder} rows={1} className="flex-1 bg-transparent resize-none outline-none text-sm py-2 px-2 sm:px-3 text-slate-800" style={{ minHeight: '40px', maxHeight: '100px' }} disabled={isChatLoading} />
          <motion.button onClick={() => sendMessage(inputValue)} disabled={!inputValue.trim() || isChatLoading} className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${inputValue.trim() ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' : 'bg-slate-100 text-slate-400'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
