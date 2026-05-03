import { describe, it, expect } from 'vitest';

/**
 * Pure eligibility logic extracted from EligibilitySection.tsx
 * Tests cover the exact formula: parsedAge >= 18 && parsedAge <= 120 && isCitizen === 'yes'
 */
function isEligible(age: string, isCitizen: string): boolean {
  const parsedAge = Number(age);
  return !isNaN(parsedAge) && parsedAge >= 18 && parsedAge <= 120 && isCitizen === 'yes';
}

describe('Voter Eligibility Logic', () => {
  // ---- Boundary age tests (critical edge cases) ----
  describe('age boundary conditions', () => {
    it('should be eligible at exactly 18 years old (lower boundary)', () => {
      expect(isEligible('18', 'yes')).toBe(true);
    });

    it('should NOT be eligible at 17 (one below minimum)', () => {
      expect(isEligible('17', 'yes')).toBe(false);
    });

    it('should NOT be eligible at 17.9 (just below boundary)', () => {
      expect(isEligible('17.9', 'yes')).toBe(false);
    });

    it('should be eligible at 18.1 (just above minimum)', () => {
      expect(isEligible('18.1', 'yes')).toBe(true);
    });

    it('should be eligible at exactly 120 years old (upper boundary)', () => {
      expect(isEligible('120', 'yes')).toBe(true);
    });

    it('should NOT be eligible at 121 (one above maximum)', () => {
      expect(isEligible('121', 'yes')).toBe(false);
    });

    it('should NOT be eligible at 0 years old', () => {
      expect(isEligible('0', 'yes')).toBe(false);
    });

    it('should NOT be eligible at negative age', () => {
      expect(isEligible('-1', 'yes')).toBe(false);
    });

    it('should be eligible at a typical adult age (25)', () => {
      expect(isEligible('25', 'yes')).toBe(true);
    });

    it('should be eligible at a senior age (75)', () => {
      expect(isEligible('75', 'yes')).toBe(true);
    });
  });

  // ---- Citizenship tests ----
  describe('citizenship conditions', () => {
    it('should NOT be eligible if citizen is "no"', () => {
      expect(isEligible('25', 'no')).toBe(false);
    });

    it('should NOT be eligible if citizen is empty string', () => {
      expect(isEligible('25', '')).toBe(false);
    });

    it('should NOT be eligible if citizen is undefined string', () => {
      expect(isEligible('25', 'undefined')).toBe(false);
    });

    it('should NOT be eligible if citizen is "Yes" (case sensitive)', () => {
      // The check is strictly === 'yes'
      expect(isEligible('25', 'Yes')).toBe(false);
    });

    it('should NOT be eligible if citizen is "YES" (uppercase)', () => {
      expect(isEligible('25', 'YES')).toBe(false);
    });
  });

  // ---- Invalid / malformed age input tests ----
  describe('invalid age inputs', () => {
    it('should NOT be eligible if age is empty string', () => {
      expect(isEligible('', 'yes')).toBe(false);
    });

    it('should NOT be eligible if age is a non-numeric string', () => {
      expect(isEligible('abc', 'yes')).toBe(false);
    });

    it('should NOT be eligible if age is null-like string', () => {
      expect(isEligible('null', 'yes')).toBe(false);
    });

    it('should NOT be eligible if age is whitespace only', () => {
      expect(isEligible('   ', 'yes')).toBe(false);
    });

    it('should NOT be eligible if both age is invalid AND not a citizen', () => {
      expect(isEligible('abc', 'no')).toBe(false);
    });
  });

  // ---- Combined ineligible conditions ----
  describe('combined ineligibility conditions', () => {
    it('should NOT be eligible if underage AND not a citizen', () => {
      expect(isEligible('15', 'no')).toBe(false);
    });

    it('should NOT be eligible if age is valid but is not a citizen', () => {
      expect(isEligible('30', 'no')).toBe(false);
    });
  });
});
