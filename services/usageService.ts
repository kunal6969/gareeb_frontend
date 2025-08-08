// Frontend-only global usage counter via CountAPI (no backend needed)
// Docs: https://countapi.xyz

const NAMESPACE = 'mnitlive_app';
const KEY = 'cgpa_sgpa_usage_total';
const BASE = 'https://api.countapi.xyz';

export const USAGE_KEY = `${NAMESPACE}:${KEY}`;

type CountApiResponse = { value: number };

export async function getUsageCount(): Promise<number | null> {
  try {
    const res = await fetch(`${BASE}/get/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`);
    if (!res.ok) return null;
    const data: CountApiResponse = await res.json();
    return typeof data.value === 'number' ? data.value : null;
  } catch {
    return null;
  }
}

export async function hitUsage(): Promise<number | null> {
  try {
    const res = await fetch(`${BASE}/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`);
    if (!res.ok) return null;
    const data: CountApiResponse = await res.json();
    // notify listeners so UI can refresh
    window.dispatchEvent(new CustomEvent('mnitlive:usage-incremented', { detail: { value: data.value } }));
    return typeof data.value === 'number' ? data.value : null;
  } catch {
    return null;
  }
}

// Increment only once per browser session (tabs share sessionStorage per tab)
export async function incrementOncePerSession(): Promise<number | null> {
  const flag = `usage:incremented`;
  if (sessionStorage.getItem(flag)) return null;
  const val = await hitUsage();
  if (val !== null) sessionStorage.setItem(flag, '1');
  return val;
}
