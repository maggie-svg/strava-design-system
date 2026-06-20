import type { Preview } from "@storybook/react";
import "../src/styles/app.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  decorators: [
    (Story, context) => {
      // Docs pages opt into a left-aligned, scrollable, padded layout.
      const isPage = context.parameters.page === true;
      return (
        <div
          className={
            "bg-background text-on-surface min-h-screen p-2xl " +
            (isPage ? "" : "flex items-center justify-center")
          }
        >
          {isPage ? (
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
              <Story />
            </div>
          ) : (
            <Story />
          )}
        </div>
      );
    },
  ],
};

export default preview;
