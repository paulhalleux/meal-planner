import { definePreview } from "@storybook/react-vite";

export default definePreview({
  addons: [],
  initialGlobals: {
    backgrounds: { value: "dark" },
  },
  parameters: {
    backgrounds: {
      options: {
        dark: {
          name: "Dark",
          value: "#1b1c1d",
        },
      },
    },
    layout: "fullscreen",
  },
});
