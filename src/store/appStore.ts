import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '@/lib/translations';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AppState {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Chat
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  isEli5Mode: boolean;
  toggleEli5Mode: () => void;
  isChatLoading: boolean;
  setChatLoading: (loading: boolean) => void;

  // User context
  userAge: number | null;
  setUserAge: (age: number | null) => void;
  isFirstTimeUser: boolean;
  setFirstTimeUser: (val: boolean) => void;

  // App visibility
  showApp: boolean;
  setShowApp: (val: boolean) => void;

  // Active tab
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Accessibility
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  isEli5Mode: false,
  toggleEli5Mode: () => set((state) => ({ isEli5Mode: !state.isEli5Mode })),
  isChatLoading: false,
  setChatLoading: (loading) => set({ isChatLoading: loading }),

  userAge: null,
  setUserAge: (age) => set({ userAge: age }),
  isFirstTimeUser: true,
  setFirstTimeUser: (val) => set({ isFirstTimeUser: val }),

  showApp: false,
  setShowApp: (val) => set({ showApp: val }),

  activeTab: 'chat',
  setActiveTab: (tab) => set({ activeTab: tab, showApp: true }),

  fontSize: 16,
  setFontSize: (size) => set({ fontSize: size }),
  highContrast: false,
  setHighContrast: (val) => set({ highContrast: val }),
    }),
    {
      name: 'app-storage',
    }
  )
);
