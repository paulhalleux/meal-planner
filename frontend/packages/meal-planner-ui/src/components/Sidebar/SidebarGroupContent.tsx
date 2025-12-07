import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { SidebarProvider } from "./SidebarProvider.tsx";
import { SidebarGroupProvider } from "./SidebarGroupProvider.tsx";

type SidebarGroupContentProps = React.ComponentProps<"div">;

export const SidebarGroupContent: React.FC<SidebarGroupContentProps> = ({
  children,
  className,
  ...rest
}) => {
  const { expanded } = SidebarGroupProvider.useContext();
  const { collapsed } = SidebarProvider.useContext();

  if (!expanded && !collapsed) {
    return null;
  }

  return (
    <div className={clsx(styles.sidebar__group_content, className)} {...rest}>
      {children}
    </div>
  );
};
