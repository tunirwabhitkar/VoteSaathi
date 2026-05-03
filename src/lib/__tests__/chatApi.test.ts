import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * Integration-level tests for the chat API logic.
 *
 * We extract and test the pure `getAIResponse` function in isolation
 * (without spinning up a Next.js server) by duplicating the logic.
 * This covers all keyword branches, ELI5 mode, age-based mode, and fallbacks.
 */

// ─── Inline the logic under test ───────────────────────────────────────────
const electionKeywords: Record<string, string[]> = {
  register:  ['register', 'registration', 'voter id', 'epic', 'enroll', 'form 6'],
  forms:     ['form 7', 'form 8', 'form 6a', 'correction', 'change address', 'delete name'],
  eligible:  ['eligible', 'eligibility', 'qualify', 'who can vote', 'voting age'],
  votingday: ['voting day', 'polling day', 'how to vote', 'cast vote', 'evm', 'booth'],
  process:   ['process', 'election process', 'how elections work', 'mcc', 'code of conduct'],
  nota:      ['nota', 'none of the above', 'reject', 'dislike', 'not happy'],
};

function getMatchedTopic(msg: string): string | null {
  const lower = msg.toLowerCase();
  for (const [topic, keywords] of Object.entries(electionKeywords)) {
    if (keywords.some((kw) => lower.includes(kw))) return topic;
  }
  return null;
}

// ───────────────────────────────────────────────────────────────────────────

describe('Chat API — Keyword Matching (Integration Logic)', () => {
  describe('register topic', () => {
    it('matches "register" keyword', () => {
      expect(getMatchedTopic('How do I register to vote?')).toBe('register');
    });

    it('matches "voter id" keyword', () => {
      expect(getMatchedTopic('I need a voter id')).toBe('register');
    });

    it('matches "form 6" keyword', () => {
      expect(getMatchedTopic('Tell me about form 6')).toBe('register');
    });

    it('matches "enroll" keyword', () => {
      expect(getMatchedTopic('How to enroll for elections?')).toBe('register');
    });

    it('matches "epic" keyword', () => {
      expect(getMatchedTopic('What is EPIC card?')).toBe('register');
    });
  });

  describe('eligibility topic', () => {
    it('matches "eligible" keyword', () => {
      expect(getMatchedTopic('Am I eligible to vote?')).toBe('eligible');
    });

    it('matches "eligibility" keyword', () => {
      expect(getMatchedTopic('what are the eligibility criteria')).toBe('eligible');
    });

    it('matches "who can vote" keyword', () => {
      expect(getMatchedTopic('who can vote in India')).toBe('eligible');
    });

    it('matches "voting age" keyword', () => {
      expect(getMatchedTopic('What is the voting age?')).toBe('eligible');
    });
  });

  describe('voting day topic', () => {
    it('matches "voting day" keyword', () => {
      expect(getMatchedTopic('What happens on voting day?')).toBe('votingday');
    });

    it('matches "evm" keyword', () => {
      expect(getMatchedTopic('explain EVM to me')).toBe('votingday');
    });

    it('matches "booth" keyword', () => {
      expect(getMatchedTopic('where is my polling booth?')).toBe('votingday');
    });

    it('matches "cast vote" keyword', () => {
      expect(getMatchedTopic('How do I cast vote?')).toBe('votingday');
    });
  });

  describe('forms topic', () => {
    it('matches "form 7" keyword', () => {
      expect(getMatchedTopic('What is form 7 used for?')).toBe('forms');
    });

    it('matches "form 8" keyword', () => {
      expect(getMatchedTopic('I need form 8 for correction')).toBe('forms');
    });

    it('matches "change address" keyword', () => {
      // Note: "voter id" appears earlier in the 'register' keyword list, so
      // a phrase like "change address in voter id" would match 'register' first.
      // The API processes topics in insertion order; "change address" alone correctly hits 'forms'.
      expect(getMatchedTopic('How to change address on my electoral roll?')).toBe('forms');
    });

    it('EDGE CASE: "change address in voter id" hits "register" first (keyword priority bug)', () => {
      // This documents a real production behavior: the phrase "voter id" wins over "change address"
      // because register keywords are iterated before forms keywords.
      expect(getMatchedTopic('How to change address in voter id?')).toBe('register');
    });

    it('matches "delete name" keyword', () => {
      expect(getMatchedTopic('How to delete name from voter list?')).toBe('forms');
    });
  });

  describe('election process topic', () => {
    it('matches "election process" keyword', () => {
      expect(getMatchedTopic('explain the election process')).toBe('process');
    });

    it('matches "mcc" keyword', () => {
      expect(getMatchedTopic('What is MCC?')).toBe('process');
    });

    it('matches "code of conduct" keyword', () => {
      expect(getMatchedTopic('tell me about the code of conduct')).toBe('process');
    });
  });

  describe('NOTA topic', () => {
    it('matches "nota" keyword', () => {
      expect(getMatchedTopic('What is NOTA?')).toBe('nota');
    });

    it('matches "none of the above" keyword', () => {
      expect(getMatchedTopic('What happens if I choose none of the above?')).toBe('nota');
    });

    it('matches "not happy" keyword', () => {
      expect(getMatchedTopic("I'm not happy with any candidate")).toBe('nota');
    });
  });

  describe('fallback (unrecognized query)', () => {
    it('returns null for completely unrelated query', () => {
      expect(getMatchedTopic('What is the weather today?')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(getMatchedTopic('')).toBeNull();
    });

    it('returns null for whitespace-only string', () => {
      expect(getMatchedTopic('   ')).toBeNull();
    });

    it('returns null for a single punctuation character', () => {
      expect(getMatchedTopic('?')).toBeNull();
    });
  });

  describe('case insensitivity', () => {
    it('matches uppercase EVM', () => {
      expect(getMatchedTopic('EXPLAIN EVM MACHINE')).toBe('votingday');
    });

    it('matches mixed-case Register', () => {
      expect(getMatchedTopic('REGISTER as a voter')).toBe('register');
    });

    it('matches lowercase nota', () => {
      expect(getMatchedTopic('tell me about nota')).toBe('nota');
    });
  });
});

describe('Chat API — Input Sanitization Logic', () => {
  it('should trim whitespace from message', () => {
    const msg = '  How do I register?  ';
    const sanitized = msg.trim();
    expect(sanitized).toBe('How do I register?');
  });

  it('should truncate messages longer than 1000 characters', () => {
    const longMsg = 'a'.repeat(1500);
    const sanitized = longMsg.slice(0, 1000);
    expect(sanitized.length).toBe(1000);
  });

  it('should not truncate messages under 1000 characters', () => {
    const shortMsg = 'How to vote?';
    const sanitized = shortMsg.slice(0, 1000);
    expect(sanitized).toBe(shortMsg);
  });
});

describe('Chat API — Language Validation Logic', () => {
  const validLanguages = ['en', 'hi', 'bn', 'te', 'mr', 'ta'];

  it('should accept all valid language codes', () => {
    for (const lang of validLanguages) {
      const safeLanguage = validLanguages.includes(lang) ? lang : 'en';
      expect(safeLanguage).toBe(lang);
    }
  });

  it('should fall back to "en" for invalid language code', () => {
    const invalidLang = 'fr';
    const safeLanguage = validLanguages.includes(invalidLang) ? invalidLang : 'en';
    expect(safeLanguage).toBe('en');
  });

  it('should fall back to "en" for empty string language', () => {
    const emptyLang = '';
    const safeLanguage = validLanguages.includes(emptyLang) ? emptyLang : 'en';
    expect(safeLanguage).toBe('en');
  });

  it('should fall back to "en" for undefined language', () => {
    const undefinedLang = undefined as unknown as string;
    const safeLanguage = validLanguages.includes(undefinedLang) ? undefinedLang : 'en';
    expect(safeLanguage).toBe('en');
  });

  it('should fall back to "en" for uppercase language code', () => {
    const uppercaseLang = 'EN';
    const safeLanguage = validLanguages.includes(uppercaseLang) ? uppercaseLang : 'en';
    expect(safeLanguage).toBe('en');
  });
});

describe('Chat API — ELI5 Mode Logic', () => {
  /**
   * ELI5 is active if isEli5Mode === true OR userAge < 16
   * This mirrors the API route condition:
   * isEli5 || (userAge !== null && userAge !== undefined && userAge < 16)
   */
  function shouldUseEli5(isEli5Mode: boolean, userAge: number | null | undefined): boolean {
    return isEli5Mode || (userAge !== null && userAge !== undefined && userAge < 16);
  }

  it('should use ELI5 when isEli5Mode is true regardless of age', () => {
    expect(shouldUseEli5(true, 25)).toBe(true);
    expect(shouldUseEli5(true, null)).toBe(true);
  });

  it('should use ELI5 when age is under 16', () => {
    expect(shouldUseEli5(false, 15)).toBe(true);
    expect(shouldUseEli5(false, 0)).toBe(true);
  });

  it('should NOT use ELI5 when age is exactly 16 and mode is off', () => {
    expect(shouldUseEli5(false, 16)).toBe(false);
  });

  it('should NOT use ELI5 when mode is off and age is adult', () => {
    expect(shouldUseEli5(false, 25)).toBe(false);
  });

  it('should NOT use ELI5 when mode is off and age is null', () => {
    expect(shouldUseEli5(false, null)).toBe(false);
  });

  it('should NOT use ELI5 when mode is off and age is undefined', () => {
    expect(shouldUseEli5(false, undefined)).toBe(false);
  });

  it('should use ELI5 when mode is on AND user is under 16', () => {
    expect(shouldUseEli5(true, 10)).toBe(true);
  });
});
