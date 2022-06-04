import { nestedGlobalStyle } from "lib/nestedGlobalStyle";
import { vars } from "../vars.css";

export const mdWrapper = "md-article";

nestedGlobalStyle(`.${mdWrapper}`, {
  "p, h1, h2, h3, h4, h5, blockquote, li": {
    wordBreak: "break-word",
    hyphens: "auto",
  },
  h2: {
    fontSize: vars.fontSize["2xl"],
    lineHeight: vars.lineHeights["2xl"],
    fontWeight: "bold",
  },
  h3: {
    fontSize: vars.fontSize["2xl"],
    lineHeight: vars.lineHeights["2xl"],
  },
  h4: {
    fontSize: vars.fontSize.xl,
    lineHeight: vars.lineHeights.xl,
  },
  "h2, h3, h4": {
    fontWeight: "bold",
    margin: "1em 0 0.5em",
  },
  "p, figure, ul, ol": {
    marginBottom: "1.25em",
  },
  li: {
    listStyle: "none",
    marginBottom: "0.5em",
    "&::before": {
      color: vars.colors.blue10,
      position: "absolute",
    },
    counterIncrement: "listCounter",
    position: "relative",
  },
  "ul, ol": {
    paddingLeft: "3em",
    counterReset: "listCounter",
  },
  "ol li": {
    listStyle: "none",
    "&::before": {
      content: "counter(listCounter, decimal-leading-zero)",
      left: "-1.5rem",
      top: "0.25rem",
      fontSize: "0.8rem",
      fontWeight: "bold",
      position: "absolute",
    },
  },
  "ul li::before": {
    content: "counter(listCounter, disc)",
    left: "-1.25em",
    fontWeight: "bold",
  },
  hr: {
    margin: "3em 0",
    borderTop: `1px solid ${vars.colors.gray7}`,
  },
  blockquote: {
    color: vars.colors.gray11,
    fontSize: vars.fontSize["2xl"],
    position: "relative",
    margin: "2em 0",
    "&::before": {
      content: "",
      height: "120%",
      width: "2em",
      backgroundColor: "#017acc40",
      position: "absolute",
      left: "-0.75em",
      transform: "matrix(1, 1, 0, 1, -8, -17)",
    },
  },
  "p, li": {
    "> code.languageText": {
      // backgroundColor: ${({ theme }) =>
      //   `rgba(${hexToRgb(theme.colors.accent)}, 0.1)`}
      // color: ${({ theme }) => theme.colors.accent}
      fontFamily: '"Consolas", "Courier Prime", menlo, monospace',
      padding: "0 0.2rem",
    },
  },
  "table, pre, iframe, figure, img": {
    marginBottom: "1.25rem",
  },
  img: {
    // boxShadow: 0px 2px 10px 2px ${({ theme }) => theme.colors.grays[0]}
  },
  iframe: {
    width: "100%",
  },
  figure: {
    textAlign: "center",
  },
  figcaption: {
    color: vars.colors.gray11,
    fontSize: vars.fontSize.sm,
  },
  pre: {
    // Overriding the style tag
    padding: "1.5rem !important",
    marginLeft: "-1.5rem",
    marginRight: "-1.5rem",
    borderRadius: "10px",
    // fontSize: ${({ theme }) => theme.fontSizes[0]}
  },
  tr: {
    border: `1px solid ${vars.colors.gray7}`,
  },
  th: {
    fontWeight: "bold",
  },
  "td, th": {
    padding: "0.25em",
  },
});
