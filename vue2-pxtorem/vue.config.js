const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/element-variables.scss";`,
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16,
            propList: ["*"],
          }),
        ],
      },
    },
  },
};
