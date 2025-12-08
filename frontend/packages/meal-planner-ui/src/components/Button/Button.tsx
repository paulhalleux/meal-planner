import * as React from "react";
import { clsx } from "clsx";
import styles from "./Button.module.css";
import { ButtonIcon } from "./ButtonIcon.tsx";

type Variant = "default" | "ghost";
type Size = "sm" | "md" | "lg";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export const Button = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        styles.button,
        styles[`variant--${variant}`],
        styles[`size--${size}`],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.Icon = ButtonIcon;
