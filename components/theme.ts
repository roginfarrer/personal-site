// import { css } from "styled-components";

export interface Theme {
  colors: {
    grays: [string, string, string];
    accent: string;
    github: string;
    twitter: string;
    linkedin: string;
    white: string;
  };
  fonts: {
    sansSerif: string;
    serif: string;
  };
  fontSizes: [string, string, string, string, string, string];
  // breakpoints: [string, string, string, string, string, string];
  breakpoints: string[];
  useAntiAliasing: boolean;
  space: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
}

const sansSerifFallback = `"BlinkMacSystemFont", -apple-system, "Helvetica Neue",
Helvetica, sans-serif`;

const serifFallback = `"Merriweather, Georgia, serif"`;

const breakpoints = ["23em", "30em", "38em", "52em", "64em", "80em"];

// export const breakpoints = {
//   xs: 450,
//   sm: 640,
//   md: 1024,
//   lg: 1141,
//   xl: 1400,
// };

export const theme: Theme = {
  colors: {
    grays: ["#999", "#666", "#221924"],
    accent: "#007acc",
    github: "#0366d6",
    twitter: "#1da1f2",
    linkedin: "#0074b6",
    white: "#fff",
  },
  fonts: {
    sansSerif: `"Lato", ${sansSerifFallback}`,
    serif: `"Vollkorn", ${serifFallback}`,
  },
  fontSizes: [
    "0.8125rem", // 13px
    "1rem", // 16px
    "1.25rem", // 20px
    "1.5rem", // 24px
    "2rem", // 32px
    "3rem", // 48
  ],
  space: [
    "0px",
    "4px",
    "8px",
    "16px",
    "32px",
    "64px",
    "128px",
    "256px",
    "512px",
  ],
  // media: {
  //   ...Object.keys(breakpoints).reduce((acc, label) => {
  //     // `any` type below to allow whatever values that styled-components accepts in the css function
  //     acc[label] = (...args) => css`
  //       @media screen and (min-width: ${breakpoints[label]}px) {
  //         ${css(...args)};
  //       }
  //     `;
  //     return acc;
  //   }, {}),
  // },
  breakpoints,
  useAntiAliasing: false,
};

// export const theme = {
//   color: {
//     background: '#fff',
//     base: '#221924',
//     lightBase: '#666',
//     lighterBase: '#999',
//     primary: '#007acc',
//     red: '#d14054',
//     brands: {
//       github: '#0366d6',
//       twitter: '#1da1f2',
//       linkedin: '#0074b6',
//     },
//   },
//   serifFallback,
//   fontFamily: {
//     sansSerif: `"Lato", ${sansSerifFallback}`,
//     serif: `"Vollkorn", ${serifFallback}`,
//   },
//   fontSize: {
//     small: '0.8125rem', // 13px
//     body: '1rem', // 16px
//     medium: '1.25rem', // 20px
//     large: '1.5rem', // 24px
//     xl: '2rem', // 32px
//     roadsign: '3rem', // 48
//   },
//   media: {
//     ...Object.keys(breakpoints).reduce((acc, label) => {
//       // `any` type below to allow whatever values that styled-components accepts in the css function
//       acc[label] = (...args) => css`
//         @media screen and (min-width: ${breakpoints[label]}px) {
//           ${css(...args)};
//         }
//       `;
//       return acc;
//     }, {}),
//   },
//   pageWidth: '38rem',
//   useAntiAliasing: false,
// };

export const darkTheme = {
  ...theme,
  color: {
    background: "#222527",
    base: "#fff",
    lightBase: "#666",
    lighterBase: "#999",
    primary: "#36aeff",
    red: "#d14054",
    brands: {
      github: "#0366d6",
      twitter: "#1da1f2",
      linkedin: "#0074b6",
    },
  },
  useAntiAliasing: true,
};
