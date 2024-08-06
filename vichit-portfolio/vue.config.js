const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};

const aliases = {
  "@design": resolve("design/index.scss"),
};

module.exports = aliases;

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        ...aliases,
      },
    },
  },
};
