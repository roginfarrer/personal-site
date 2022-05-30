import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../vars.css";

const breakWord = style({
  wordBreak: "break-word",
  hyphens: "auto",
});
const baseMargin = style({
  marginBottom: "1.25em",
});
const listStyles = style({
  paddingInlineStart: "3em",
  counterReset: "listCounter",
});
const mediaBottom = style({
  marginBottom: "1.25em",
});

export const p = style([breakWord, baseMargin]);
export const h1 = style([breakWord]);
export const h2 = style([
  breakWord,
  {
    fontSize: vars.fontSize["2xl"],
    lineHeight: vars.lineHeights["2xl"],
    margin: "1em 0 0.5em",
    fontWeight: "bold",
  },
]);
export const h3 = style([
  breakWord,
  {
    fontSize: vars.fontSize["2xl"],
    lineHeight: vars.lineHeights["2xl"],
    fontWeight: "bold",
    margin: "1em 0 0.5em",
  },
]);
export const h4 = style([
  breakWord,
  {
    fontSize: vars.fontSize.xl,
    lineHeight: vars.lineHeights.xl,
    margin: "1em 0 0.5em",
    fontWeight: "bold",
  },
]);
export const h5 = style([breakWord]);
export const blockquote = style([
  breakWord,
  {
    color: vars.colors.gray11,
    fontSize: vars.fontSize["2xl"],
    position: "relative",
    margin: "2em 0",
    "::before": {
      content: "",
      height: "120%",
      width: "2em",
      backgroundColor: "#017acc40",
      position: "absolute",
      left: "-0.75em",
      transform: "matrix(1, 1, 0, 1, -8, -17)",
    },
  },
]);
export const ul = style([baseMargin, listStyles]);
export const ol = style([baseMargin, listStyles]);
export const li = style([
  breakWord,
  {
    listStyle: "none",
    marginBottom: "0.5em",
    counterIncrement: "listCounter",
    position: "relative",
    "::before": {
      position: "absolute",
      color: vars.colors.blue10,
    },
    selectors: {
      [`${ul} &::before`]: {
        content: "counter(listCounter, disc)",
        left: "-1.25em",
        fontWeight: "bold",
      },
      [`${ol} &::before`]: {
        content: "counter(listCounter, decimal-leading-zero)",
        left: "-1.5em",
        top: "0.25em",
        fontSize: "0.8em",
        fontWeight: "bold",
        position: "absolute",
      },
    },
  },
]);
export const figure = style([mediaBottom, { textAlign: "center" }]);
export const hr = style({
  margin: "3em 0",
  borderTop: `1px solid ${vars.colors.gray7}`,
});
export const table = style([mediaBottom]);
export const pre = style([
  mediaBottom,
  {
    fontSize: vars.fontSize.sm,
    marginLeft: "-1em",
    marginRight: "-1em",
  },
]);
export const iframe = style([mediaBottom, { width: "100%" }]);
export const img = style([
  mediaBottom,
  {
    boxShadow: `0px 2px 10px 2px ${vars.colors.gray3}`,
  },
]);
export const figcaption = style({
  // marginTop: "1.25rem",
  color: vars.colors.gray11,
  fontSize: vars.fontSize.sm,
});
export const tr = style({
  border: `1px solid ${vars.colors.gray7}`,
});
export const th = style({
  fontWeight: "bold",
  padding: "0.25em",
});
export const td = style({
  padding: "0.25em",
});
export const a = style({
  cursor: "pointer",
  color: vars.colors.blue9,
  textDecoration: "underline",
  ":hover": {
    textDecoration: "none",
  },
});

globalStyle(":is(p, li) > code.languageText", {
  // backgroundColor: ${({ theme }) =>
  //   `rgba(${hexToRgb(theme.colors.accent)}, 0.1)`}
  // color: ${({ theme }) => theme.colors.accent}
  fontFamily: '"Consolas", "Courier Prime", menlo, monospace',
  padding: "0 0.2em",
});
