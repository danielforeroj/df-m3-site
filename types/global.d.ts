// Defines the structure of the settings object loaded from the API.
// This provides type safety for any part of the app that might interact with these global settings.
interface SiteSettings {
  seo?: {
    site_title?: string;
    site_description?: string;
  };
  branding?: {
    theme_default?: 'light' | 'dark' | 'system';
    accent_default?: string;
    palette?: string[];
  };
  pixels?: {
    gtm_id?: string;
    ga4_id?: string;
    meta_pixel_id?: string;
    custom_head_html?: string;
  };
}


export {};
declare global {
  interface Window {
    // This object is bootstrapped in index.html to manage theme and accent colors.
    DFTheme?: {
      applyTheme: (mode: 'system'|'light'|'dark', persist?: boolean) => void;
      applyAccent: (hex: string, persist?: boolean) => void;
      resetToDefaults: () => void;
      palette?: string[];
    };
    // This object holds site settings fetched from the CMS, bootstrapped in index.html.
    __siteSettings?: SiteSettings;
  }
}
