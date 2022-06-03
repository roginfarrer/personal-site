import { createGlobalTheme, createTheme } from "@vanilla-extract/css";
import {
  gray,
  blue,
  red,
  green,
  sage,
  mauve,
  mauveDark,
  sageDark,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from "@radix-ui/colors";

const baseTheme = {
  space: {
    1: "2px",
    2: "4px",
    3: "8px",
    4: "12px",
    5: "16px",
    6: "20px",
    7: "24px",
    8: "28px",
    9: "32px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  lineHeights: {
    xs: "1rem",
    sm: "1.25rem",
    base: "1.5rem",
    lg: "1.75rem",
    xl: "1.75rem",
    "2xl": "2rem",
    "3xl": "2.25rem",
    "4xl": "2.5rem",
    "6xl": "1",
    "7xl": "1",
    "8xl": "1",
    "9xl": "1",
  },
  radii: {
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
} as const;

export const [lightTheme, vars] = createTheme({
  colors: {
    // ...gray,
    gray1: mauve.mauve1,
    gray2: mauve.mauve2,
    gray3: mauve.mauve3,
    gray4: mauve.mauve4,
    gray5: mauve.mauve5,
    gray6: mauve.mauve6,
    gray7: mauve.mauve7,
    gray8: mauve.mauve8,
    gray9: mauve.mauve9,
    gray10: mauve.mauve10,
    gray11: mauve.mauve11,
    gray12: mauve.mauve12,
    ...blue,
    ...red,
    ...green,
  },
  space: {
    1: "2px",
    2: "4px",
    3: "8px",
    4: "12px",
    5: "16px",
    6: "20px",
    7: "24px",
    8: "28px",
    9: "32px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  lineHeights: {
    xs: "1rem",
    sm: "1.25rem",
    base: "1.5rem",
    lg: "1.75rem",
    xl: "1.75rem",
    "2xl": "2rem",
    "3xl": "2.25rem",
    "4xl": "2.5rem",
    "6xl": "1",
    "7xl": "1",
    "8xl": "1",
    "9xl": "1",
  },
  radii: {
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
});

export const darkTheme = createTheme(vars, {
  ...baseTheme,
  colors: {
    // ...grayDark,
    gray1: mauveDark.mauve1,
    gray2: mauveDark.mauve2,
    gray3: mauveDark.mauve3,
    gray4: mauveDark.mauve4,
    gray5: mauveDark.mauve5,
    gray6: mauveDark.mauve6,
    gray7: mauveDark.mauve7,
    gray8: mauveDark.mauve8,
    gray9: mauveDark.mauve9,
    gray10: mauveDark.mauve10,
    gray11: mauveDark.mauve11,
    gray12: mauveDark.mauve12,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
});