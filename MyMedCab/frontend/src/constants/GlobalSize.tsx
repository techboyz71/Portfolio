// Centralized size tokens for fonts and icons.
// Export typed size sets you can add to and switch between.

export type SizeValue = string; // e.g. '16px', '1rem', etc.

export type FontSizes = {
  xs: SizeValue;
  sm: SizeValue;
  base: SizeValue;
  lg: SizeValue;
  xl: SizeValue;
  "2xl"?: SizeValue;
};

export type IconSizes = {
  tiny: SizeValue;
  small: SizeValue;
  medium: SizeValue;
  large: SizeValue;
  xlarge?: SizeValue;
};

export type SizeSet = {
  name: string;
  fonts: FontSizes;
  icons: IconSizes;
};

// Default size set derived to pair with the default palette
export const defaultSizes: SizeSet = {
  name: "default",
  fonts: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
  },
  icons: {
    tiny: "12px",
    small: "16px",
    medium: "20px",
    large: "28px",
    xlarge: "36px",
  },
};

// Additional size profiles (example)
export const sizes: Record<string, SizeSet> = {
  default: defaultSizes,
  compact: {
    name: "compact",
    fonts: {
      xs: "10px",
      sm: "12px",
      base: "14px",
      lg: "16px",
      xl: "18px",
      "2xl": "20px",
    },
    icons: {
      tiny: "10px",
      small: "14px",
      medium: "18px",
      large: "22px",
      xlarge: "28px",
    },
  },
  spacious: {
    name: "spacious",
    fonts: {
      xs: "13px",
      sm: "15px",
      base: "18px",
      lg: "20px",
      xl: "24px",
      "2xl": "28px",
    },
    icons: {
      tiny: "14px",
      small: "18px",
      medium: "24px",
      large: "32px",
      xlarge: "40px",
    },
  },
};

export const getSizes = (key = "default"): SizeSet => {
  return sizes[key] ?? defaultSizes;
};

// Helper to convert a SizeSet into CSS variables for global injection
export const sizesToCssVars = (s: SizeSet): Record<string, string> => ({
  "--font-xs": s.fonts.xs,
  "--font-sm": s.fonts.sm,
  "--font-base": s.fonts.base,
  "--font-lg": s.fonts.lg,
  "--font-xl": s.fonts.xl,
  "--font-2xl": s.fonts["2xl"] ?? "",
  "--icon-tiny": s.icons.tiny,
  "--icon-small": s.icons.small,
  "--icon-medium": s.icons.medium,
  "--icon-large": s.icons.large,
  "--icon-xlarge": s.icons.xlarge ?? "",
});

export default {
  sizes,
  default: defaultSizes,
  getSizes,
  sizesToCssVars,
};
