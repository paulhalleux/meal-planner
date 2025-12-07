// filepath: w:\meal-planner\frontend\packages\meal-planner-ui\src\components\Sidebar\SidebarItem.tsx
import * as React from "react";
import { clsx } from "clsx";

import styles from "./Sidebar.module.css";
import { SidebarProvider } from "./SidebarProvider.tsx";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Text } from "../Text";
import { Tooltip } from "../Tooltip";

export type SidebarItemProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  icon?: IconName;
  label?: string;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  className,
  label,
  ...rest
}) => {
  const { collapsed } = SidebarProvider.useContext();

  const content = (
    <button
      type="button"
      className={clsx(styles.sidebar__item, className)}
      aria-pressed={rest["aria-pressed"]}
      {...rest}
    >
      {icon ? (
        <div className={styles.sidebar__item_icon}>
          <DynamicIcon name={icon} size={14} />
        </div>
      ) : (
        <div className={styles["sidebar__item_icon-placeholder"]} />
      )}
      {label !== undefined && !collapsed && <Text wrap={false}>{label}</Text>}
    </button>
  );

  if (!collapsed) return content;

  return (
    <Tooltip.Root placement="right">
      <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip.Root>
  );
};
