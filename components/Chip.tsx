import { ElementType } from "react";
import { vars } from "vars.css";
import { Box, BoxProps } from "./Box";

export interface ChipProps {
  icon: JSX.Element;
  children: string;
  iconColor?: BoxProps<any>["color"];
}

export function Chip({ icon, children, iconColor }: ChipProps) {
  return (
    <Box
      display="flex"
      gap="$2"
      borderRadius="50vw"
      alignItems="center"
      border={`1px solid ${vars.colors.gray7}`}
      py="$1"
      px="$2"
      type="$sm"
    >
      <Box
        as="span"
        color={iconColor}
        size="15px"
        display="flex"
        alignItems="center"
      >
        {icon}
      </Box>
      {children}
    </Box>
  );
}
