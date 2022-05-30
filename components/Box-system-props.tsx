import { ReactNode } from "react";
import styled, { CSSProp } from "styled-components";
import {
  background,
  border,
  shadow,
  typography,
  position,
  grid,
  space,
  color,
  layout,
  flexbox,
  createSystem,
  PseudoProps,
  AllSystemProps,
  SystemProp,
} from "system-props";
import shouldForwardProp from "@styled-system/should-forward-prop";
import * as CSS from "csstype";

const system = createSystem();

const extraProps = {
  transform: true,
  textDecoration: true,
  transition: true,
  fontVariant: true,
  clipPath: true,
} as const;

type BaseProps = AllSystemProps<"all"> &
  {
    [k in keyof typeof extraProps]?: SystemProp<CSS.Properties[k]>;
  };

export interface BoxProps extends BaseProps, PseudoProps<BaseProps> {
  as?: any;
  is?: any;
  children?: ReactNode;
  css?: CSSProp;
}

const extraPropNames = new Set(...Object.keys(extraProps));

const Div = ({ is: Component = "div", ...props }: { is?: any }) => (
  <Component {...props} />
);

export const Box = styled(Div).withConfig({
  shouldForwardProp(prop, defaultValidatorFn) {
    return (
      shouldForwardProp(prop) &&
      defaultValidatorFn(prop) &&
      !extraPropNames.has(prop)
    );
  },
})<BoxProps>(
  { boxSizing: "border-box" },
  system({
    ...color,
    ...border,
    ...background,
    ...flexbox,
    ...grid,
    ...shadow,
    ...position,
    ...layout,
    ...space,
    ...typography,
    ...extraProps,
  })
);

// interface Foo extends BoxProps {
//   is?: any;
// }

export default Box;

// export default function Div({ is = "div", ...props }: Foo) {
//   return <Box as={is} {...props} />;
// }
