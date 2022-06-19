import { createRainbowSprinkles, defineProperties } from "rainbow-sprinkles";
import { vars } from "../../vars.css";

const responsiveProperties = defineProperties({
  conditions: {
    _: {},
    sm: { "@media": "screen and (min-width: 640px)" },
    md: { "@media": "screen and (min-width: 768px)" },
    lg: { "@media": "screen and (min-width: 1024px)" },
    xl: { "@media": "screen and (min-width: 1280px)" },
    "2xl": { "@media": "screen and (min-width: 1536)" },
  },
  defaultCondition: "_",
  dynamicProperties: {
    margin: true,
    marginRight: true,
    marginLeft: true,
    marginTop: true,
    marginBottom: true,
    padding: vars.space,
    paddingRight: vars.space,
    paddingLeft: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    fontSize: vars.fontSize,
    lineHeight: vars.lineHeights,
    borderRadius: vars.radii,
    width: true,
    minWidth: true,
    maxWidth: true,
    height: true,
    gap: vars.space,
    justifyContent: true,
    alignItems: true,
    flex: true,
    flexWrap: true,
    gridTemplateAreas: true,
    gridTemplateRows: true,
    gridTemplateColumns: true,
    gridArea: true,
    textAlign: true,
    clipPath: true,
    border: true,
  },
  staticProperties: {
    display: ["block", "inline-block", "grid", "inline-flex", "flex"],
    flexDirection: ["row", "column"],
    margin: vars.space,
    marginRight: vars.space,
    marginLeft: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    fontStyle: ["italic"],
    fontWeight: {
      bold: "600",
      bolder: "700",
    },
    overflow: ["hidden"],
  },
  shorthands: {
    m: ["margin"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
    mb: ["marginBottom"],
    mt: ["marginTop"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    p: ["padding"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pt: ["paddingTop"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    type: ["fontSize", "lineHeight"],
    size: ["height", "width"],
    placeItems: ["alignItems", "justifyContent"],
  },
});

const interactiveProperties = defineProperties({
  conditions: {
    _: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
  },
  defaultCondition: "_",
  dynamicProperties: {
    color: vars.colors,
    backgroundColor: vars.colors,
    transition: true,
    transform: true,
  },
  staticProperties: {
    textDecoration: ["none", "underline"],
  },
  shorthands: {
    bg: ["backgroundColor"],
  },
});

const nonResponsiveProperties = defineProperties({
  conditions: {
    _: {},
  },
  defaultCondition: "_",
  dynamicProperties: {
    zIndex: true,
  },
  staticProperties: {},
});

export const rainbowSprinkles = createRainbowSprinkles(
  responsiveProperties,
  interactiveProperties
  // nonResponsiveProperties
);

export type Sprinkles = Parameters<typeof rainbowSprinkles>[0];
