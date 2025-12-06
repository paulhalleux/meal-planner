import preview from "../../../.storybook/preview";

import { Sidebar } from "./index.ts";

const meta = preview.meta({
  component: Sidebar.Root,
});

export const Default = meta.story({});
