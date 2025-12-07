import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";

type SidebarMenuProps = React.ComponentProps<"div">;

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <section className={clsx(styles.sidebar__menu, className)} {...rest}>
      {children}
    </section>
  );
};
