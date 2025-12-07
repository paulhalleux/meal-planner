import * as React from "react";
import { clsx } from "clsx";
import styles from "./Text.module.css";

type TextProps<ElementType extends React.ElementType> = {
  as?: ElementType;
  children: React.ReactNode;
  wrap?: boolean;
} & React.ComponentPropsWithoutRef<ElementType>;
export const Text = <ElementType extends React.ElementType = "span">({
  as,
  children,
  className,
  wrap = true,
  ...rest
}: TextProps<ElementType>) => {
  const Component = as || "span";
  return (
    <Component
      className={clsx(
        styles.text,
        {
          [styles.wrap]: wrap,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
