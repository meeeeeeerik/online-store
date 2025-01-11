// eslint-disable-next-line no-undef
require("@babel/register")({
  presets: ["@babel/preset-env"],
});

// eslint-disable-next-line no-undef
const { resolve } = require("path");

// eslint-disable-next-line no-undef
module.exports = {
  webpack: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": resolve(__dirname, "src"),
    },
  },
};
