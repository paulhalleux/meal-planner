import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { SidebarProvider } from "./SidebarProvider.tsx";

type SidebarGroupHeaderProps = React.ComponentProps<"div">;

export const SidebarGroupHeader: React.FC<SidebarGroupHeaderProps> = ({
  children,
  className,
  ...rest
}) => {
  const { collapsed } = SidebarProvider.useContext();

  if (collapsed) {
    return <div className={styles.sidebar__separator} />;
  }

  return (
    <header className={clsx(styles.sidebar__group_header, className)} {...rest}>
      {children}
    </header>
  );
};
