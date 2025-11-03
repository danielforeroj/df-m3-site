

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

// New types for editable homepage content
export interface CompanyLogo {
  name: string;
  logo: string;
}

export interface AboutCardData {
  title: string;
  subtitle: string;
  text: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
}

export interface CtaButton {
  id: string;
  text: string;
  url: string;
  variant: 'filled' | 'tonal' | 'outlined' | 'ghost' | 'filled-to-ghost';
  icon?: string;
  enabled: boolean;
}

export interface Venture {
  id: string;
  title: string;
  description: string;
  cta: string;
  url: string;
}

export interface HomePageData {
    profileRoles: string[];
    logos: CompanyLogo[];
    aboutCard1: AboutCardData;
    aboutCard2: AboutCardData;
    socialLinks: SocialLink[];
    heroButton1: CtaButton;
    heroButton2: CtaButton;
    ventures: Venture[];
}