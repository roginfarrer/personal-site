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
// import shouldForwardProp from "@styled-system/should-forward-prop";

const Box = styled("div")(
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
    })
  )
);

export default Box;
