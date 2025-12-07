import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { SidebarGroupProvider } from "./SidebarGroupProvider.tsx";
import { DynamicIcon } from "lucide-react/dynamic";

type SidebarGroupToggleProps = Omit<React.ComponentProps<"button">, "children">;

export const SidebarGroupToggle: React.FC<SidebarGroupToggleProps> = ({
  className,
  ...rest
}) => {
  const { expanded, setExpanded } = SidebarGroupProvider.useContext();

  return (
    <button
      type="button"
      className={clsx(styles.sidebar__group_toggle, className)}
      onClick={() => {
        console.log("toggling sidebar group", !expanded);
        setExpanded(!expanded);
      }}
      {...rest}
    >
      <DynamicIcon name={expanded ? "chevron-up" : "chevron-down"} size={16} />
    </button>
  );
};
