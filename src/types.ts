
export enum PostType {
  BLOG = 'blog',
  RESEARCH = 'research',
  LEAD_MAGNET = 'lead_magnet'
}

export interface LeadMagnet {
  file: string;
  cta: string;
  requires_email: boolean;
}

export interface Post {
  type: PostType;
  title: string;
  slug: string;
  date: string; // ISO 8601 format
  excerpt: string;
  content_md: string;
  tags?: string[];
  lead_magnet?: LeadMagnet;
}

// Unified types for homepage content, replacing the old CMS-related types.
export type HomeButton = { label: string; url: string };
export type Venture = { title: string; body?: string; ctaLabel?: string; ctaUrl?: string };
export type LogoItem = { name?: string; logoUrl: string };

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