import { clsx } from "clsx";
import styles from "./Button.module.css";
import { Button, type ButtonProps } from "./Button.tsx";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

export type ButtonIconProps = Omit<ButtonProps, "children" | "size"> & {
  icon: IconName;
  size?: ButtonProps["size"] | number;
};

const SIZE_MAP: Record<NonNullable<ButtonProps["size"]>, number> = {
  sm: 16,
  md: 16,
  lg: 16,
};

export const ButtonIcon = ({
  className,
  icon,
  size = "md",
  ...rest
}: ButtonIconProps) => {
  return (
    <Button
      className={clsx(styles.button__icon, className)}
      size={typeof size === "number" ? "md" : size}
      {...rest}
    >
      <DynamicIcon
        name={icon}
        size={typeof size === "number" ? size : SIZE_MAP[size]}
      />
    </Button>
  );
};
