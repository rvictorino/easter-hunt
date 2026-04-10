import { HUNT_CONFIG } from './config';
import { loadFound, saveFound, toggleFound } from './storage';
import './style.css';

function updateProgress(found: Set<string>, total: number): void {
  document.getElementById('progress')!.textContent = `${found.size} / ${total} eggs found`;
  (document.getElementById('progress-bar') as HTMLElement).style.width =
    `${total > 0 ? (found.size / total) * 100 : 0}%`;
  document.getElementById('complete-msg')!.classList.toggle('visible', found.size === total && total > 0);
}

function buildEggItem(egg: (typeof HUNT_CONFIG.eggs)[number], found: Set<string>): HTMLLIElement {
  const item = document.createElement('li');
  item.className = 'egg-item' + (found.has(egg.id) ? ' found' : '');

  const label = document.createElement('label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = found.has(egg.id);
  checkbox.addEventListener('change', () => {
    found = toggleFound(found, egg.id);
    saveFound(found);
    item.classList.toggle('found', found.has(egg.id));
    updateProgress(found, HUNT_CONFIG.eggs.length);
  });

  const span = document.createElement('span');
  span.textContent = egg.label;

  label.append(checkbox, span);
  item.append(label);

  if (egg.hint) {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'Hint';
    const p = document.createElement('p');
    p.textContent = egg.hint;
    details.append(summary, p);
    item.append(details);
  }

  return item;
}

function init(): void {
  const found = loadFound();
  const { title, eggs } = HUNT_CONFIG;

  document.title = title;
  document.getElementById('hunt-title')!.textContent = title;

  const list = document.getElementById('egg-list')!;
  for (const egg of eggs) {
    list.append(buildEggItem(egg, found));
  }

  updateProgress(found, eggs.length);
}

init();
