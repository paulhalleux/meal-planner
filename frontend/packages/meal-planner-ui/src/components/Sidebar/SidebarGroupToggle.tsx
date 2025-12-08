import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { SidebarGroupProvider } from "./SidebarGroupProvider.tsx";
import { Button } from "../Button";

type SidebarGroupToggleProps = Omit<React.ComponentProps<"button">, "children">;

export const SidebarGroupToggle: React.FC<SidebarGroupToggleProps> = ({
  className,
  ...rest
}) => {
  const { expanded, setExpanded } = SidebarGroupProvider.useContext();

  return (
    <Button.Icon
      className={clsx(styles.sidebar__group_toggle, className)}
      onClick={() => setExpanded(!expanded)}
      size="sm"
      {...rest}
      icon={expanded ? "chevron-up" : "chevron-down"}
    />
  );
};
