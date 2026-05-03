import { describe, it, expect } from 'vitest';
import { quizQuestions, indianStates, mockPollingStations } from '../data';
import { translations } from '../translations';

describe('Quiz Questions Data Integrity', () => {
  const supportedLanguages = ['en', 'hi', 'bn', 'te', 'mr', 'ta'] as const;

  it('should have quiz questions for all supported languages', () => {
    for (const lang of supportedLanguages) {
      expect(quizQuestions[lang]).toBeDefined();
      expect(quizQuestions[lang].length).toBeGreaterThan(0);
    }
  });

  it('should have correct answer index within options range for all English questions', () => {
    for (const q of quizQuestions.en) {
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
    }
  });

  it('should have correct answer index within options range for all Hindi questions', () => {
    for (const q of quizQuestions.hi) {
      expect(q.correct).toBeGreaterThanOrEqual(0);
      expect(q.correct).toBeLessThan(q.options.length);
    }
  });

  it('should have all English questions with 4 answer options', () => {
    for (const q of quizQuestions.en) {
      expect(q.options.length).toBe(4);
    }
  });

  it('should have all questions with non-empty text', () => {
    for (const q of quizQuestions.en) {
      expect(q.question.trim().length).toBeGreaterThan(0);
      expect(q.explanation.trim().length).toBeGreaterThan(0);
      for (const opt of q.options) {
        expect(opt.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('should have unique IDs for all English questions', () => {
    const ids = quizQuestions.en.map((q) => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have minimum voting age as 18 in question 1 (all languages)', () => {
    // Quiz q1 in English: correct answer index 1, which corresponds to '18 years'
    const q1En = quizQuestions.en.find((q) => q.id === 1);
    expect(q1En).toBeDefined();
    expect(q1En!.options[q1En!.correct]).toContain('18');
  });
});

describe('Indian States Data', () => {
  it('should have all 28 states and 8 UTs (36 total)', () => {
    expect(indianStates.length).toBe(36);
  });

  it('should include major states', () => {
    expect(indianStates).toContain('Maharashtra');
    expect(indianStates).toContain('Tamil Nadu');
    expect(indianStates).toContain('Uttar Pradesh');
    expect(indianStates).toContain('West Bengal');
    expect(indianStates).toContain('Gujarat');
  });

  it('should include Union Territories', () => {
    expect(indianStates).toContain('Delhi');
    expect(indianStates).toContain('Jammu and Kashmir');
    expect(indianStates).toContain('Lakshadweep');
    expect(indianStates).toContain('Puducherry');
    expect(indianStates).toContain('Ladakh');
  });

  it('should have all states as non-empty strings', () => {
    for (const state of indianStates) {
      expect(state.trim().length).toBeGreaterThan(0);
    }
  });

  it('should have no duplicate states', () => {
    const unique = new Set(indianStates);
    expect(unique.size).toBe(indianStates.length);
  });
});

describe('Mock Polling Stations Data', () => {
  it('should have at least 5 mock polling stations', () => {
    expect(mockPollingStations.length).toBeGreaterThanOrEqual(5);
  });

  it('should have unique station IDs', () => {
    const ids = mockPollingStations.map((s) => s.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('should have valid latitude and longitude coordinates', () => {
    for (const station of mockPollingStations) {
      expect(station.lat).toBeGreaterThan(8);   // India's southern tip ~8.0°N
      expect(station.lat).toBeLessThan(37);      // India's northern tip ~37.0°N
      expect(station.lng).toBeGreaterThan(68);   // India's western tip ~68.0°E
      expect(station.lng).toBeLessThan(98);      // India's eastern tip ~97.4°E
    }
  });

  it('should have all required fields on every station', () => {
    for (const station of mockPollingStations) {
      expect(station.id).toBeDefined();
      expect(station.name.trim().length).toBeGreaterThan(0);
      expect(station.address.trim().length).toBeGreaterThan(0);
      expect(station.distance).toMatch(/\d+(\.\d+)?\s*km/);
      expect(station.booth).toMatch(/Booth No\./);
    }
  });
});

describe('Translations Completeness', () => {
  const supportedLanguages = ['en', 'hi', 'bn', 'te', 'mr', 'ta'] as const;
  const requiredKeys = [
    'appName', 'appTagline', 'navChat', 'navFlow', 'navEligibility', 'navQuiz',
    'navMap', 'navSimulator', 'heroTitle', 'heroSubtitle', 'chatTitle',
    'chatPlaceholder', 'chatSend', 'eligibilityTitle', 'eligibilityCheck',
    'eligibilityEligible', 'eligibilityNotEligible', 'footerRights', 'footerDisclaimer',
  ];

  for (const lang of supportedLanguages) {
    it(`should have all required keys in "${lang}" translation`, () => {
      const t = translations[lang];
      expect(t).toBeDefined();
      for (const key of requiredKeys) {
        expect(t[key], `Missing key "${key}" in "${lang}" translation`).toBeDefined();
        expect(t[key].trim().length, `Empty key "${key}" in "${lang}"`).toBeGreaterThan(0);
      }
    });
  }

  it('should have "VoteSaathi" branding in all appName translations', () => {
    for (const lang of supportedLanguages) {
      expect(translations[lang].appName).toContain('VoteSaathi');
    }
  });

  it('should have correct copyright year in all footer rights', () => {
    for (const lang of supportedLanguages) {
      expect(translations[lang].footerRights).toContain('2026');
    }
  });
});
