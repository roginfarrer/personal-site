import React, { forwardRef } from "react";
import Box, { BoxProps } from "./Box";
import NextLink from "next/link";

interface Props extends BoxProps {
  openInNewWindow?: boolean;
  external?: boolean;
  href: string;
}

export const Link = forwardRef(function Link(
  {
    openInNewWindow = false,
    external = false,
    href,
    children,
    ...props
  }: Props,
  forwardedRef
) {
  const sharedProps = {
    target: openInNewWindow ? "_blank" : null,
    ref: forwardedRef,
    href,
  };

  return external ? (
    <Box is="a" {...sharedProps} {...props}>
      {children}
    </Box>
  ) : (
    <NextLink {...sharedProps} passHref href={href}>
      <Box is="a" {...props}>
        {children}
      </Box>
    </NextLink>
  );
});

export default Link;
