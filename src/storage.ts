const STORAGE_KEY = 'easter-hunt-found';

export function loadFound(): Set<string> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return new Set();
  try {
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function saveFound(found: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...found]));
}

export function toggleFound(found: Set<string>, id: string): Set<string> {
  const next = new Set(found);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}
