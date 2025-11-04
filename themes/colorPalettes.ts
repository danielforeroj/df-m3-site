// --- Color Conversion & Palette Generation Utilities ---

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) { 
        r = parseInt("0x" + hex[1] + hex[1]); 
        g = parseInt("0x" + hex[2] + hex[2]); 
        b = parseInt("0x" + hex[3] + hex[3]); 
    } else if (hex.length === 7) { 
        r = parseInt("0x" + hex[1] + hex[2]); 
        g = parseInt("0x" + hex[3] + hex[4]); 
        b = parseInt("0x" + hex[5] + hex[6]); 
    }
    return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string { 
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase(); 
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
    if (max === min) { 
        h = s = 0; 
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    s /= 100; l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s, 
        x = c * (1 - Math.abs((h / 60) % 2 - 1)), 
        m = l - c / 2, 
        r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { [r, g, b] = [c, x, 0]; } 
    else if (60 <= h && h < 120) { [r, g, b] = [x, c, 0]; } 
    else if (120 <= h && h < 180) { [r, g, b] = [0, c, x]; } 
    else if (180 <= h && h < 240) { [r, g, b] = [0, x, c]; } 
    else if (240 <= h && h < 300) { [r, g, b] = [x, 0, c]; } 
    else if (300 <= h && h < 360) { [r, g, b] = [c, 0, x]; }
    return { 
        r: Math.round((r + m) * 255), 
        g: Math.round((g + m) * 255), 
        b: Math.round((b + m) * 255) 
    };
}

export function generatePalette(sourceHex: string): Record<string, string> {
    const { r, g, b } = hexToRgb(sourceHex);
    const { h, s } = rgbToHsl(r, g, b);
    const p: Record<string, string> = {};
    const tones: Record<string, number> = {
        primary_light: 40, on_primary_light: 100, primary_container_light: 90, on_primary_container_light: 10,
        secondary_light: 40, on_secondary_light: 100, secondary_container_light: 90, on_secondary_container_light: 10,
        tertiary_light: 40, on_tertiary_light: 100, tertiary_container_light: 90, on_tertiary_container_light: 10,
        primary_dark: 80, on_primary_dark: 20, primary_container_dark: 30, on_primary_container_dark: 90,
        secondary_dark: 80, on_secondary_dark: 20, secondary_container_dark: 30, on_secondary_container_dark: 90,
        tertiary_dark: 80, on_tertiary_dark: 20, tertiary_container_dark: 30, on_tertiary_container_dark: 90,
    };

    for (const [key, tone] of Object.entries(tones)) {
        let hue = h;
        if (key.startsWith('secondary')) hue = (h + 60) % 360;
        if (key.startsWith('tertiary')) hue = (h - 60 + 360) % 360;
        const sat = key.includes('container') ? Math.min(s, 48) : s;
        const rgb = hslToRgb(hue, sat, tone);
        p[key] = rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    return p;
}
