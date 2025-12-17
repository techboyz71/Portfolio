// Centralized color palettes for the app.
// Export typed palettes you can add to and switch between.

export type Color = string; // hex or css color

export type ButtonColors = {
  primary: Color;
  primaryText: Color;
  secondary: Color;
  secondaryText: Color;
  tertiary?: Color;
  tertiaryText?: Color;
};

export type Palette = {
  name: string;
  // surface / container colors
  background: Color;
  surface: Color;
  container: Color;

  // text / fonts
  textPrimary: Color;
  textSecondary: Color;

  // accents
  accent: Color;
  muted: Color;

  // button group
  buttons: ButtonColors;
};

// Default palette derived from the attached color swatches
export const defaultPalette: Palette = {
  name: "default",
  // light background tone
  background: "#F9ECCC",
  // primary content surface
  surface: "#FFFFFF",
  // general container background (cards, panels)
  container: "#66999B",

  // text colors
  textPrimary: "#2B3A67",
  textSecondary: "#496A81",

  // accents
  accent: "#B38D97",
  muted: "#496A81",

  buttons: {
    primary: "#2B3A67",
    primaryText: "#FFFFFF",
    secondary: "#496A81",
    secondaryText: "#FFFFFF",
    tertiary: "#66999B",
    tertiaryText: "#FFFFFF",
  },
};

// You can add more palettes here and switch by key
export const palettes: Record<string, Palette> = {
  default: defaultPalette,
  // example additional palette (soft/dark swap)
  soft: {
    name: "soft",
    background: "#FFFFFF",
    surface: "#F9ECCC",
    container: "#B38D97",
    textPrimary: "#2B3A67",
    textSecondary: "#496A81",
    accent: "#66999B",
    muted: "#496A81",
    buttons: {
      primary: "#66999B",
      primaryText: "#FFFFFF",
      secondary: "#B38D97",
      secondaryText: "#FFFFFF",
      tertiary: "#2B3A67",
      tertiaryText: "#FFFFFF",
    },
  },
};

export const getPalette = (key = "default"): Palette => {
  return palettes[key] ?? defaultPalette;
};

// Optional helper to convert a palette into CSS variables for global injection
export const paletteToCssVars = (p: Palette): Record<string, string> => ({
  "--color-background": p.background,
  "--color-surface": p.surface,
  "--color-container": p.container,
  "--color-text-primary": p.textPrimary,
  "--color-text-secondary": p.textSecondary,
  "--color-accent": p.accent,
  "--color-muted": p.muted,
  "--btn-primary": p.buttons.primary,
  "--btn-primary-text": p.buttons.primaryText,
  "--btn-secondary": p.buttons.secondary,
  "--btn-secondary-text": p.buttons.secondaryText,
  "--btn-tertiary": p.buttons.tertiary ?? "",
  "--btn-tertiary-text": p.buttons.tertiaryText ?? "",
});

export default {
  palettes,
  default: defaultPalette,
  getPalette,
  paletteToCssVars,
};
