import { globalStyle, GlobalStyleRule } from "@vanilla-extract/css";

interface RecursiveGlobalStyle {
  [k: string]: GlobalStyleRule | RecursiveGlobalStyle;
}

const handleAmpersand = (key: string, nestedKey: string): string => {
  let finalSelector = nestedKey;
  if (nestedKey.startsWith("&")) {
    finalSelector = nestedKey.replace("&", key);
  } else {
    finalSelector = `${key} ${nestedKey.replace("&", key)}`;
  }
  return finalSelector;
};

export function bareNestedGlobalStyle(globalStyle: any) {
  return function globalUtil(selector: string, styles: RecursiveGlobalStyle) {
    const write = (
      key: string[],
      value: RecursiveGlobalStyle | GlobalStyleRule
    ) => {
      Object.entries(value).forEach(([nestedK, nestedV]) => {
        if (typeof nestedV === "string" || typeof nestedV === "number") {
          globalStyle(key.map((k) => handleAmpersand(selector, k)).join(", "), {
            [nestedK]: nestedV,
          });
        } else {
          write(
            key.map((k) => handleAmpersand(k, nestedK)),
            nestedV
          );
        }
      });
    };

    Object.entries(styles).forEach(([key, value]) => {
      write(
        key.split(",").map((k) => k.trim()),
        value
      );
    });
  };
}

export const nestedGlobalStyle = bareNestedGlobalStyle(globalStyle);
