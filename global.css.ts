import { globalStyle } from "@vanilla-extract/css";
import { vars, darkTheme } from "./vars.css";

/*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
 */
globalStyle(
  `*:where(:not(html, iframe, canvas, img, svg, video):not(svg *, symbol *))`,
  {
    all: "unset",
    display: "revert",
  }
);

/* Preferred box-sizing value */
globalStyle(
  `*,
*::before,
*::after`,
  {
    boxSizing: "border-box",
  }
);

/* Reapply the pointer cursor for anchor tags */
globalStyle("a, button", {
  cursor: "revert",
}),
  /* Remove list styles (bullets/numbers) */
  globalStyle("ol, ul, menu", {
    listStyle: "none",
  });

/* For images to not be able to exceed their container */
globalStyle("img", {
  maxWidth: "100%",
});

/* removes spacing between cells in tables */
globalStyle("table", {
  borderCollapse: "collapse",
});

/* revert the 'white-space' property for textarea elements on Safari */
globalStyle("textarea", {
  whiteSpace: "revert",
});

/* reset default text opacity of input placeholder */
globalStyle("::placeholder", {
  color: "unset",
});

/* fix the feature of 'hidden' attribute.
   display:revert, revert to element instead of attribute */
globalStyle(":where([hidden])", {
  display: "none",
});

/* revert for bug in Chromium browsers
   - fix for the content editable attribute will work properly. */
globalStyle(":where([contenteditable])", {
  MozUserModify: "read-write",
  WebkitUserModify: "read-write",
  overflowWrap: "break-word",
  // @ts-ignore
  WebkitLineBreak: "after-white-space",
});

/* apply back the draggable feature - exist only in Chromium and Safari */
globalStyle(':where([draggable="true"])', {
  // @ts-ignore
  WebkitUserDrag: "element",
});

globalStyle("html, body", {
  lineHeight: "1.5",
  color: vars.colors.gray12,
  fontFamily: "'IBM Plex Sans', sans-serif",
  WebkitFontSmoothing: "antialiased",
  fontSize: vars.fontSize.base,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: 0,
});

globalStyle(`${darkTheme} body`, {
  backgroundColor: vars.colors.gray1,
});

const tabbableElements = [
  "button",
  "a",
  "input",
  "[contenteditable]",
  '[tabindex="0"]',
];

globalStyle(tabbableElements.map((e) => `${e}:focus-visible`).join(", "), {
  outline: `2px solid ${vars.colors.blue9}`,
});
