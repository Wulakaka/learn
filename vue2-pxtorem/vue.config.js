const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  css: {
    loaderOptions: {
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
