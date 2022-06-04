import { forwardRef, ElementType } from "react";
import * as Polymorphic from "../polymorphic";
import { rainbowSprinkles, Sprinkles } from "./Box.css";

interface OwnBoxProps extends Sprinkles {}

export type BoxProps<C extends ElementType> =
  Polymorphic.PolymorphicComponentProps<C, OwnBoxProps>;

type BoxComponent = <C extends React.ElementType = "div">(
  props: BoxProps<C>
) => React.ReactElement | null;

export const Box: BoxComponent = forwardRef(function Box<
  C extends ElementType = "div"
>(
  { as, className: propClasses, ...props }: BoxProps<C>,
  ref: Polymorphic.PolymorphicRef<C>
) {
  const { className, style, otherProps } = rainbowSprinkles(props);
  const Component = as || "div";

  return (
    <Component
      className={[className, propClasses].filter(Boolean).join(" ")}
      style={style}
      ref={ref}
      // ref={ref}
      {...otherProps}
    />
  );
});
