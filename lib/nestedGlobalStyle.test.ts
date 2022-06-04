import { bareNestedGlobalStyle } from "./nestedGlobalStyle";

test("does something", () => {
  const output = {};
  const globalStyle = (key, styles) => {
    output[key] = styles;
  };
  const func = bareNestedGlobalStyle(globalStyle);
  func(".parent", {
    "p, li": {
      marginBottom: "1.5em",
    },

    "ul, ol": {
      li: {
        color: "red",
        p: {
          color: "blue",
        },
      },
    },
  });

  expect(output).toMatchObject({
    ".parent p, .parent li": {
      marginBottom: "1.5em",
    },
    ".parent ul li, .parent ol li": {
      color: "red",
    },
    ".parent ul li p, .parent ol li p": {
      color: "blue",
    },
  });
});

test("& works", () => {
  const output = {};
  const globalStyle = (key, styles) => {
    output[key] = styles;
  };
  const func = bareNestedGlobalStyle(globalStyle);
  func(".parent", {
    "&:hover": {
      color: "black",
    },
    "a, p": {
      color: "red",
      "&:hover": {
        color: "yellow",
      },
    },
    div: {
      color: "red",
      "&:hover": {
        color: "yellow",
      },
    },
  });

  expect(output).toMatchObject({
    ".parent:hover": {
      color: "black",
    },
    ".parent a, .parent p": {
      color: "red",
    },
    ".parent a:hover, .parent p:hover": {
      color: "yellow",
    },
    ".parent div": {
      color: "red",
    },
    ".parent div:hover": {
      color: "yellow",
    },
  });
});
