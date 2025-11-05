export type HomeButton = { label: string; url: string };
export type Venture = { title: string; subtitle?: string; body?: string; ctaLabel?: string; ctaUrl?: string };
export type LogoItem = { name?: string; url?: string; logoUrl: string };

export type HomeContent = {
  hero_title: string;
  hero_tags: string[];
  about: { title: string; body: string };
  operator: { title: string; body: string };
  socials: { name: string; url: string }[];
  hero_buttons?: HomeButton[];
  ventures?: Venture[];
  logos?: LogoItem[];
};

function apiBase() {
  return location.hostname === 'danielforeroj.com' ? '' : 'https://danielforeroj.com';
}

export async function fetchHome(): Promise<HomeContent|null> {
  const isLive = location.hostname === 'danielforeroj.com';
  const r = await fetch(`${apiBase()}/api/content/get.php?key=home`, {
    mode: isLive ? 'same-origin' : 'cors',
    // Public content doesn't need credentials for cross-origin requests.
    // 'omit' avoids CORS errors if the server doesn't send
    // 'Access-Control-Allow-Credentials: true'.
    // Authenticated actions (save/upload) will still use 'include'.
    credentials: isLive ? 'include' : 'omit',
  });
  if (!r.ok) return null;
  const d = await r.json();
  return d?.data ?? null;
}

export async function saveHome(payload: HomeContent) {
  const r = await fetch(`/api/content/save.php`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    credentials: 'include',
    body: JSON.stringify({ key: 'home', data: payload })
  });
  if (!r.ok) throw new Error('save_failed');
  return r.json();
}

export async function uploadFile(file: File): Promise<{url:string}> {
  const fd = new FormData();
  fd.append('file', file);
  const r = await fetch(`/api/uploads/upload.php`, { method:'POST', body: fd, credentials:'include' });
  if (!r.ok) throw new Error('upload_failed');
  const d = await r.json();
  return { url: d.url };
}
