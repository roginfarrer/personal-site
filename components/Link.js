import React, { forwardRef } from "react";
import Box from "./Box";
import NextLink from "next/link";

export const Link = forwardRef(function Link(
  { openInNewWindow, external, href, children, ...props },
  forwardedRef
) {
  const sharedProps = {
    target: openInNewWindow ? "_blank" : null,
    ref: forwardedRef,
    href,
  };

  return external ? (
    <Box as="a" {...sharedProps} {...props}>
      {children}
    </Box>
  ) : (
    <NextLink {...sharedProps} passHref href={href}>
      <Box as="a" {...props}>
        {children}
      </Box>
    </NextLink>
  );
});

export default Link;
