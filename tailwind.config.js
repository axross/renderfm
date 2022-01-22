const postcss = require("postcss");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./components/**/*.tsx",
    "./constants/style.ts",
    "./pages/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["'Neutra Text Bold'"],
      },
      backgroundImage: {
        "logo-pattern": "url('/logo-text-pattern.jpg')",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    plugin(({ addVariant, e }) => {
      addVariant("pointer-fine", ({ container, separator }) => {
        const pointerFine = postcss.atRule({
          name: "media",
          params: "(pointer: fine)",
        });
        pointerFine.append(container.nodes);
        container.append(pointerFine);
        pointerFine.walkRules((rule) => {
          rule.selector = `.${e(
            `pointer-fine${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });

      addVariant("hover-hover", ({ container, separator }) => {
        const hoverHover = postcss.atRule({
          name: "media",
          params: "(hover: hover)",
        });
        hoverHover.append(container.nodes);
        container.append(hoverHover);
        hoverHover.walkRules((rule) => {
          rule.selector = `.${e(
            `hover-hover${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
