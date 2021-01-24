import styled from "styled-components";
import {
  border,
  shadow,
  typography,
  position,
  grid,
  space,
  color,
  layout,
  flexbox,
  system,
  compose,
} from "styled-system";
import shouldForwardProp from "@styled-system/should-forward-prop";

const Box = styled("div").withConfig({
  shouldForwardProp(prop, defaultValidatorFn) {
    return shouldForwardProp(prop) && defaultValidatorFn(prop);
  },
})(
  compose(
    border,
    shadow,
    typography,
    position,
    grid,
    space,
    color,
    layout,
    flexbox,
    system({
      transform: true,
      textDecoration: true,
      fontVariant: true,
      clipPath: true,
    })
  )
);

export default Box;
