module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        // 方式一：引入 css
        // styleLibraryName: "~node_modules/element-theme-tsl-purple/lib",
        // 方式二：引入 scss
        styleLibrary: {
          name: "~node_modules/element-theme-tsl-purple/src",
          path: "[module].scss",
        },
      },
    ],
  ],
};
