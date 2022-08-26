const autoprefixer = require("autoprefixer");
// const pxtorem = require("postcss-pxtorem");

module.exports = {
  css: {
    loaderOptions: {
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      // scss: {
      //   prependData: `@import "~@/styles/element-variables.scss";`,
      // },
      postcss: {
        postcssOptions: {
          plugins: [
            autoprefixer(),
            // pxtorem({
            //   rootValue: 16,
            //   propList: ["*"],
            // }),
          ],
        },
      },
    },
  },
};
