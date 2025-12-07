import { definePreview } from "@storybook/react-vite";
// @ts-ignore
import "./preview.css";
// @ts-ignore
import "../src/index.css";

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
          value: "#24262b",
        },
      },
    },
    layout: "fullscreen",
  },
});
