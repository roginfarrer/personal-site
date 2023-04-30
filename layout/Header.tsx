import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box } from "components/Box";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { vars } from "vars.css";

const TRANSITION = ".15s background-color ease";

function NavItem({ children, href }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Box
      as={NextLink}
      href={href}
      fontWeight={isActive ? "$bolder" : undefined}
      bg={{ hover: "$gray4" }}
      borderRadius="$md"
      px="$3"
      py="$1"
      color="$gray12"
      transition={TRANSITION}
    >
      {children}
    </Box>
  );
}

export function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box as="nav" display="flex" gap="$4">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/blog">Blog</NavItem>
      {isMounted && (
        <Box
          transition={TRANSITION}
          as="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          borderRadius="$md"
          p="$1"
          bg={{ _: "$gray4", hover: "$gray6" }}
          border={`2px solid ${vars.colors.gray6}`}
          size="32px"
          display="flex"
          placeItems="center"
          ml="auto"
        >
          {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Box>
      )}
    </Box>
  );
}
