import { ComponentPropsWithoutRef, ElementType } from "react";
import { rainbowSprinkles, Sprinkles } from "./Box.css";

export type BoxProps<C extends ElementType> = Sprinkles &
  Omit<ComponentPropsWithoutRef<C>, keyof Sprinkles> & {
    as?: C;
  };

export function Box<C extends ElementType = "div">({
  as,
  className: propClasses,
  ...props
}: BoxProps<C>) {
  const { className, style, otherProps } = rainbowSprinkles(props);
  const Component = as || "div";

  return (
    <Component
      className={[className, propClasses].filter(Boolean).join(" ")}
      style={style}
      {...otherProps}
    />
  );
}
