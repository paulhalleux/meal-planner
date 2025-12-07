import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";

type SidebarHeaderProps = React.ComponentProps<"div">;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <header className={clsx(styles.sidebar__header, className)} {...rest}>
      {children}
    </header>
  );
};
