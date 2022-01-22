/**
 * @type {import('@storybook/core-common').StorybookConfig}
 */
module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  webpackFinal: async (config, options) => {
    const path = require("path");

    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname, "../"),
    };

    return config;
  },
};
