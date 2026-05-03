import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../appStore';

describe('App Store', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useAppStore.setState({
      language: 'en',
      messages: [],
      isEli5Mode: false,
      isChatLoading: false,
      userAge: null,
      isFirstTimeUser: true,
      showApp: false,
      activeTab: 'chat',
      fontSize: 16,
      highContrast: false,
    });
  });

  it('should initialize with default values', () => {
    const state = useAppStore.getState();
    expect(state.language).toBe('en');
    expect(state.messages).toEqual([]);
    expect(state.isEli5Mode).toBe(false);
    expect(state.isChatLoading).toBe(false);
    expect(state.userAge).toBeNull();
    expect(state.isFirstTimeUser).toBe(true);
    expect(state.showApp).toBe(false);
    expect(state.activeTab).toBe('chat');
    expect(state.fontSize).toBe(16);
    expect(state.highContrast).toBe(false);
  });

  it('should add a message', () => {
    const message = { id: '1', role: 'user' as const, content: 'Hello', timestamp: new Date() };
    useAppStore.getState().addMessage(message);
    const state = useAppStore.getState();
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0]).toEqual(message);
  });

  it('should clear messages', () => {
    const message = { id: '1', role: 'user' as const, content: 'Hello', timestamp: new Date() };
    useAppStore.getState().addMessage(message);
    useAppStore.getState().clearMessages();
    const state = useAppStore.getState();
    expect(state.messages).toEqual([]);
  });

  it('should toggle ELI5 mode', () => {
    useAppStore.getState().toggleEli5Mode();
    expect(useAppStore.getState().isEli5Mode).toBe(true);
    useAppStore.getState().toggleEli5Mode();
    expect(useAppStore.getState().isEli5Mode).toBe(false);
  });

  it('should change language', () => {
    useAppStore.getState().setLanguage('hi');
    expect(useAppStore.getState().language).toBe('hi');
  });

  it('should set active tab and show app', () => {
    useAppStore.getState().setActiveTab('quiz');
    const state = useAppStore.getState();
    expect(state.activeTab).toBe('quiz');
    expect(state.showApp).toBe(true); // From setActiveTab implementation
  });

  it('should set accessibility settings', () => {
    useAppStore.getState().setFontSize(20);
    useAppStore.getState().setHighContrast(true);
    const state = useAppStore.getState();
    expect(state.fontSize).toBe(20);
    expect(state.highContrast).toBe(true);
  });
});
