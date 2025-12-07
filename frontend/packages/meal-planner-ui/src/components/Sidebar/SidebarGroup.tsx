import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { SidebarGroupProvider } from "./SidebarGroupProvider.tsx";

type SidebarGroupProps = React.ComponentProps<"div">;

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <SidebarGroupProvider>
      <section className={clsx(styles.sidebar__group, className)} {...rest}>
        {children}
      </section>
    </SidebarGroupProvider>
  );
};
