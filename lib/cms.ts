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
