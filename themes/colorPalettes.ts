export interface ColorTheme {
  [key: string]: string;
}

export interface Palette {
  light: ColorTheme;
  dark: ColorTheme;
}

export const palettes: { [key: string]: Palette } = {
  grayscale: {
    light: {
        '--md-sys-color-primary': '#5F6368',
        '--md-sys-color-on-primary': '#FFFFFF',
        '--md-sys-color-primary-container': '#E8EAED',
        '--md-sys-color-on-primary-container': '#202124',
        '--md-sys-color-secondary': '#5F6368',
        '--md-sys-color-on-secondary': '#FFFFFF',
        '--md-sys-color-secondary-container': '#E8EAED',
        '--md-sys-color-on-secondary-container': '#202124',
        '--md-sys-color-tertiary': '#5F6368',
        '--md-sys-color-on-tertiary': '#FFFFFF',
        '--md-sys-color-tertiary-container': '#E8EAED',
        '--md-sys-color-on-tertiary-container': '#202124',
    },
    dark: {
        '--md-sys-color-primary': '#BDC1C6',
        '--md-sys-color-on-primary': '#202124',
        '--md-sys-color-primary-container': '#3C4043',
        '--md-sys-color-on-primary-container': '#E8EAED',
        '--md-sys-color-secondary': '#BDC1C6',
        '--md-sys-color-on-secondary': '#202124',
        '--md-sys-color-secondary-container': '#3C4043',
        '--md-sys-color-on-secondary-container': '#E8EAED',
        '--md-sys-color-tertiary': '#BDC1C6',
        '--md-sys-color-on-tertiary': '#202124',
        '--md-sys-color-tertiary-container': '#3C4043',
        '--md-sys-color-on-tertiary-container': '#E8EAED',
    }
  },
  default: {
    light: {
        '--md-sys-color-primary': '#005FAF',
        '--md-sys-color-on-primary': '#FFFFFF',
        '--md-sys-color-primary-container': '#D5E3FF',
        '--md-sys-color-on-primary-container': '#001C3B',
        '--md-sys-color-secondary': '#B90035',
        '--md-sys-color-on-secondary': '#FFFFFF',
        '--md-sys-color-secondary-container': '#FFD9DD',
        '--md-sys-color-on-secondary-container': '#3F000B',
        '--md-sys-color-tertiary': '#6E5676',
        '--md-sys-color-on-tertiary': '#FFFFFF',
        '--md-sys-color-tertiary-container': '#F8D8FE',
        '--md-sys-color-on-tertiary-container': '#27142F',
    },
    dark: {
        '--md-sys-color-primary': '#A7C8FF',
        '--md-sys-color-on-primary': '#003060',
        '--md-sys-color-primary-container': '#004787',
        '--md-sys-color-on-primary-container': '#D5E3FF',
        '--md-sys-color-secondary': '#FFB2BA',
        '--md-sys-color-on-secondary': '#650019',
        '--md-sys-color-secondary-container': '#8E0027',
        '--md-sys-color-on-secondary-container': '#FFD9DD',
        '--md-sys-color-tertiary': '#DBBDE2',
        '--md-sys-color-on-tertiary': '#3E2845',
        '--md-sys-color-tertiary-container': '#553F5D',
        '--md-sys-color-on-tertiary-container': '#F8D8FE',
    }
  },
  forest: {
    light: {
        '--md-sys-color-primary': '#006D39',
        '--md-sys-color-on-primary': '#FFFFFF',
        '--md-sys-color-primary-container': '#94F7B3',
        '--md-sys-color-on-primary-container': '#00210D',
        '--md-sys-color-secondary': '#4F6353',
        '--md-sys-color-on-secondary': '#FFFFFF',
        '--md-sys-color-secondary-container': '#D1E8D3',
        '--md-sys-color-on-secondary-container': '#0C1F13',
        '--md-sys-color-tertiary': '#3D6473',
        '--md-sys-color-on-tertiary': '#FFFFFF',
        '--md-sys-color-tertiary-container': '#C0E9FB',
        '--md-sys-color-on-tertiary-container': '#001F28',
    },
    dark: {
        '--md-sys-color-primary': '#78DA99',
        '--md-sys-color-on-primary': '#00391A',
        '--md-sys-color-primary-container': '#005229',
        '--md-sys-color-on-primary-container': '#94F7B3',
        '--md-sys-color-secondary': '#B5CCB8',
        '--md-sys-color-on-secondary': '#213527',
        '--md-sys-color-secondary-container': '#384B3C',
        '--md-sys-color-on-secondary-container': '#D1E8D3',
        '--md-sys-color-tertiary': '#A5CDDE',
        '--md-sys-color-on-tertiary': '#063542',
        '--md-sys-color-tertiary-container': '#234C5A',
        '--md-sys-color-on-tertiary-container': '#C0E9FB',
    }
  },
  coral: {
    light: {
        '--md-sys-color-primary': '#BC443A',
        '--md-sys-color-on-primary': '#FFFFFF',
        '--md-sys-color-primary-container': '#FFDAD5',
        '--md-sys-color-on-primary-container': '#410002',
        '--md-sys-color-secondary': '#775651',
        '--md-sys-color-on-secondary': '#FFFFFF',
        '--md-sys-color-secondary-container': '#FFDAD5',
        '--md-sys-color-on-secondary-container': '#2C1512',
        '--md-sys-color-tertiary': '#705C2E',
        '--md-sys-color-on-tertiary': '#FFFFFF',
        '--md-sys-color-tertiary-container': '#FBDFA6',
        '--md-sys-color-on-tertiary-container': '#251A00',
    },
    dark: {
        '--md-sys-color-primary': '#FFB4A9',
        '--md-sys-color-on-primary': '#690005',
        '--md-sys-color-primary-container': '#93000A',
        '--md-sys-color-on-primary-container': '#FFDAD5',
        '--md-sys-color-secondary': '#E7BDB6',
        '--md-sys-color-on-secondary': '#442925',
        '--md-sys-color-secondary-container': '#5D3F3B',
        '--md-sys-color-on-secondary-container': '#FFDAD5',
        '--md-sys-color-tertiary': '#DECAA0',
        '--md-sys-color-on-tertiary': '#3F2E04',
        '--md-sys-color-tertiary-container': '#574419',
        '--md-sys-color-on-tertiary-container': '#FBDFA6',
    }
  }
};
