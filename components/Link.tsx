import { Box, BoxProps } from "./Box";
import NextLink from "next/link";

export interface LinkProps extends BoxProps<"a"> {
  openInNewWindow?: boolean;
  external?: boolean;
}

function Link({
  openInNewWindow = false,
  external = false,
  href,
  children,
  ...props
}: LinkProps) {
  const sharedProps = {
    target: openInNewWindow ? "_blank" : null,
    href,
  };

  return external ? (
    <Box as="a" rel="noreferrer" {...sharedProps} {...props}>
      {children}
    </Box>
  ) : (
    <NextLink {...sharedProps} passHref href={href}>
      <Box as="a" {...props}>
        {children}
      </Box>
    </NextLink>
  );
}

export default Link;
