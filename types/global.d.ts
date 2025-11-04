export {};
declare global {
  interface Window {
    DFTheme?: {
      applyTheme: (mode: 'system'|'light'|'dark', persist?: boolean) => void;
      applyAccent: (hex: string, persist?: boolean) => void;
      resetToDefaults: () => void;
      palette?: string[];
    };
  }
}
