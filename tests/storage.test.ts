import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadFound, saveFound, toggleFound } from '../src/storage';

const store: Record<string, string> = {};

vi.stubGlobal('localStorage', {
  getItem:    (k: string) => store[k] ?? null,
  setItem:    (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
});

beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
});

describe('loadFound', () => {
  it('returns an empty set when nothing is stored', () => {
    expect(loadFound().size).toBe(0);
  });

  it('returns the persisted ids', () => {
    store['easter-hunt-found'] = JSON.stringify(['egg-01', 'egg-03']);
    const found = loadFound();
    expect(found.has('egg-01')).toBe(true);
    expect(found.has('egg-03')).toBe(true);
    expect(found.size).toBe(2);
  });

  it('returns an empty set when stored data is malformed', () => {
    store['easter-hunt-found'] = 'not-json{{';
    expect(loadFound().size).toBe(0);
  });
});

describe('saveFound', () => {
  it('persists the set so loadFound can read it back', () => {
    saveFound(new Set(['egg-01', 'egg-02']));
    const found = loadFound();
    expect(found.has('egg-01')).toBe(true);
    expect(found.has('egg-02')).toBe(true);
    expect(found.size).toBe(2);
  });
});

describe('toggleFound', () => {
  it('adds an id when it is not in the set', () => {
    const next = toggleFound(new Set(), 'egg-01');
    expect(next.has('egg-01')).toBe(true);
  });

  it('removes an id when it is already in the set', () => {
    const next = toggleFound(new Set(['egg-01']), 'egg-01');
    expect(next.has('egg-01')).toBe(false);
  });

  it('does not mutate the original set', () => {
    const original = new Set<string>();
    toggleFound(original, 'egg-01');
    expect(original.size).toBe(0);
  });
});
