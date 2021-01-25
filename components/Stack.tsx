import React from "react";
import Box, { BoxProps } from "./Box";
import css from "@styled-system/css";

interface Props extends BoxProps {
  gap?: number;
  direction?: "column" | "row";
}

const Stack = React.forwardRef(
  ({ gap = 3, direction = "column", ...props }: Props, ref) => {
    return (
      <Box
        {...props}
        css={
          gap
            ? css({
                "> * + *": {
                  marginTop: gap,
                },
              })
            : null
        }
        display="flex"
        flexDirection={direction}
        ref={ref}
      />
    );
  }
);

export default Stack;
