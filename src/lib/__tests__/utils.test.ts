import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('utils - cn', () => {
  it('should merge tailwind classes', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    expect(cn('bg-red-500', true && 'text-white', false && 'p-4')).toBe('bg-red-500 text-white');
  });

  it('should resolve tailwind class conflicts using tailwind-merge', () => {
    // text-red-500 should be overridden by text-blue-500
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    // p-4 should be overridden by p-2
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('should ignore null or undefined values', () => {
    expect(cn('bg-red-500', null, undefined, 'text-white')).toBe('bg-red-500 text-white');
  });
});
